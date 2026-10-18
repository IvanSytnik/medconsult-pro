/**
 * Site theme: colour scales, font and corner radius, stored in the `theme` global and applied as CSS variables.
 * Tailwind's `primary-*`/`secondary-*` colours, `font-sans` and `rounded-*` read these variables, so a theme change
 * needs no rebuild. Shared by the Payload config, the Tailwind config and the frontend layout: keep it free of
 * Next.js and Payload imports.
 */

export const SHADES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const
export type Shade = (typeof SHADES)[number]
export type Scale = Record<Shade, string>

/** The palette the site was built with. Shade 600 is the main brand colour (buttons, links). */
export const DEFAULT_SCALES: Record<'primary' | 'secondary', Scale> = {
  primary: {
    '50': '#f0fdfa',
    '100': '#ccfbf1',
    '200': '#99f6e4',
    '300': '#5eead4',
    '400': '#2dd4bf',
    '500': '#14b8a6',
    '600': '#0f766e',
    '700': '#0d5d56',
    '800': '#115e59',
    '900': '#134e4a',
  },
  secondary: {
    '50': '#f8fafc',
    '100': '#f1f5f9',
    '200': '#e2e8f0',
    '300': '#cbd5e1',
    '400': '#94a3b8',
    '500': '#64748b',
    '600': '#475569',
    '700': '#334155',
    '800': '#1e293b',
    '900': '#0f172a',
  },
}

export const FONTS = [
  { value: 'inter', label: 'Inter' },
  { value: 'manrope', label: 'Manrope' },
  { value: 'montserrat', label: 'Montserrat' },
  { value: 'open-sans', label: 'Open Sans' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'system', label: 'System font' },
] as const
export type FontId = (typeof FONTS)[number]['value']

const FALLBACK_STACK = 'system-ui, -apple-system, sans-serif'

/** CSS font-family per option. Web fonts other than Inter are exposed by the frontend layout as CSS variables. */
export const FONT_STACKS: Record<FontId, string> = {
  inter: `"Inter Variable", Inter, ${FALLBACK_STACK}`,
  manrope: `var(--font-manrope), ${FALLBACK_STACK}`,
  montserrat: `var(--font-montserrat), ${FALLBACK_STACK}`,
  'open-sans': `var(--font-open-sans), ${FALLBACK_STACK}`,
  roboto: `var(--font-roboto), ${FALLBACK_STACK}`,
  system: FALLBACK_STACK,
}

/** Base corner radius (Tailwind `rounded-lg`); the other `rounded-*` sizes scale with it. */
export const RADII = [
  { value: 'none', label: 'Square', rem: 0 },
  { value: 'small', label: 'Small', rem: 0.25 },
  { value: 'medium', label: 'Medium', rem: 0.5 },
  { value: 'large', label: 'Large', rem: 0.75 },
  { value: 'xlarge', label: 'Extra large', rem: 1 },
] as const
export type RadiusId = (typeof RADII)[number]['value']

/** Multipliers of the base radius that reproduce Tailwind's default sizes at a 0.5rem base. */
export const RADIUS_SCALE = { sm: 0.25, DEFAULT: 0.5, md: 0.75, lg: 1, xl: 1.5, '2xl': 2, '3xl': 3 } as const

export const DEFAULT_THEME = { font: 'inter' as FontId, radius: 'medium' as RadiusId }

/** The site name as the logo shows it: plain part and brand-coloured part. */
export const DEFAULT_LOGO = { text: 'MedConsult', accent: 'Turkey' }

export const HEX_COLOR = /^#[0-9a-f]{6}$/i

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function rgbToHex(rgb: number[]): string {
  return `#${rgb.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')}`
}

/** Mix factors towards white (lighter shades) or black (darker shades) around the base colour at 600. */
const MIX: Record<Shade, ['white' | 'black', number]> = {
  '50': ['white', 0.95],
  '100': ['white', 0.88],
  '200': ['white', 0.75],
  '300': ['white', 0.58],
  '400': ['white', 0.38],
  '500': ['white', 0.18],
  '600': ['white', 0],
  '700': ['black', 0.18],
  '800': ['black', 0.33],
  '900': ['black', 0.48],
}

/** Builds a 50–900 scale from one colour, which becomes shade 600. */
export function generateScale(base: string): Scale {
  const rgb = hexToRgb(base)
  const scale = {} as Scale
  for (const shade of SHADES) {
    const [towards, amount] = MIX[shade]
    const target = towards === 'white' ? 255 : 0
    scale[shade] = rgbToHex(rgb.map((c) => c + (target - c) * amount))
  }
  return scale
}

/** "#0f766e" -> "15 118 110", the form Tailwind needs for colour opacity modifiers. */
export const rgbChannels = (hex: string) => hexToRgb(hex).join(' ')

export type ColorSetting = {
  mode?: 'scale' | 'base' | null
  base?: string | null
  scale?: Partial<Record<`s${Shade}`, string | null>> | null
}

/** Resolves a stored colour setting; invalid or missing values fall back to the default palette. */
export function resolveScale(setting: ColorSetting | null | undefined, fallback: Scale): Scale {
  if (setting?.mode === 'base') return setting.base && HEX_COLOR.test(setting.base) ? generateScale(setting.base) : fallback
  const scale = {} as Scale
  for (const shade of SHADES) {
    const value = setting?.scale?.[`s${shade}`]
    scale[shade] = value && HEX_COLOR.test(value) ? value : fallback[shade]
  }
  return scale
}

export type ThemeSettings = {
  primary?: ColorSetting | null
  secondary?: ColorSetting | null
  font?: FontId | null
  radius?: RadiusId | null
}

/** CSS custom properties for a theme; missing values use the defaults, so an empty theme renders the original site. */
export function themeVariables(theme: ThemeSettings | null | undefined): Record<string, string> {
  const vars: Record<string, string> = {}
  for (const name of ['primary', 'secondary'] as const) {
    const scale = resolveScale(theme?.[name], DEFAULT_SCALES[name])
    for (const shade of SHADES) vars[`--${name}-${shade}`] = rgbChannels(scale[shade])
  }
  vars['--font-sans'] = FONT_STACKS[theme?.font ?? DEFAULT_THEME.font] ?? FONT_STACKS.inter
  const radius = RADII.find((r) => r.value === (theme?.radius ?? DEFAULT_THEME.radius)) ?? RADII[2]
  vars['--radius'] = `${radius.rem}rem`
  return vars
}

/** Theme override for the page head; `html:root` outranks the defaults on `:root` regardless of stylesheet order. */
export function themeCss(theme: ThemeSettings | null | undefined): string {
  const body = Object.entries(themeVariables(theme))
    .map(([key, value]) => `${key}:${value}`)
    .join(';')
  return `html:root{${body}}`
}
