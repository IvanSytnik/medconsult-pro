import { Manrope, Montserrat, Open_Sans, Roboto } from 'next/font/google'

// Alternative theme fonts, self-hosted by next/font. Each only defines a CSS variable that the theme's
// --font-sans may point to, so browsers download a font only when the theme selects it. Inter, the default,
// comes from @fontsource-variable/inter.
// next/font only accepts literal options, hence the repetition.
const manrope = Manrope({ subsets: ['latin', 'latin-ext', 'cyrillic'], display: 'swap', preload: false, variable: '--font-manrope' })
const montserrat = Montserrat({ subsets: ['latin', 'latin-ext', 'cyrillic'], display: 'swap', preload: false, variable: '--font-montserrat' })
const openSans = Open_Sans({ subsets: ['latin', 'latin-ext', 'cyrillic'], display: 'swap', preload: false, variable: '--font-open-sans' })
const roboto = Roboto({ subsets: ['latin', 'latin-ext', 'cyrillic'], display: 'swap', preload: false, variable: '--font-roboto' })

export const fontVariables = [manrope, montserrat, openSans, roboto].map((font) => font.variable).join(' ')
