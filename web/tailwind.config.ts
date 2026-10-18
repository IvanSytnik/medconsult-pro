import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import { RADIUS_SCALE, SHADES, themeVariables } from './src/lib/theme'

type ScaleName = 'primary' | 'secondary'

/** Theme colours are CSS variables holding RGB channels, so opacity modifiers such as `primary-100/50` keep working. */
const colorScale = (name: ScaleName) =>
  Object.fromEntries(SHADES.map((shade) => [shade, `rgb(var(--color-${name}-${shade}) / <alpha-value>)`]))

/**
 * Utilities read --color-<name>-<shade>, which points at the theme's --<name>-<shade>. Dark sections point the
 * neutral scale the other way round (50 <-> 900), so grey text and light panels of any block stay readable there.
 */
const aliases = (name: ScaleName, inverted = false) =>
  Object.fromEntries(
    SHADES.map((shade, i) => [`--color-${name}-${shade}`, `var(--${name}-${inverted ? SHADES[SHADES.length - 1 - i] : shade})`])
  )

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { primary: colorScale('primary'), secondary: colorScale('secondary') },
      fontFamily: {
        // Set by the theme; the default is the self-hosted variable Inter (@fontsource-variable/inter).
        sans: ['var(--font-sans)'],
      },
      borderRadius: Object.fromEntries(
        Object.entries(RADIUS_SCALE).map(([size, factor]) => [size, factor === 1 ? 'var(--radius)' : `calc(var(--radius) * ${factor})`])
      ),
      animation: {
        float: 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    // Default theme values; the layout overrides them with the theme saved in the CMS.
    plugin(({ addBase }) =>
      addBase({
        ':root': { ...themeVariables(null), ...aliases('primary'), ...aliases('secondary') },
        '.section-dark > *': aliases('secondary', true),
        // White cards and buttons inside a dark section keep the normal palette and dark text. :where() keeps the
        // specificity low, so text and background utilities on these elements still win.
        '.section-dark :where(.card, .bg-white, .btn-white)': aliases('secondary'),
        '.section-dark :where(.card, .bg-white)': { color: 'rgb(var(--secondary-800))' },
      })
    ),
  ],
}

export default config
