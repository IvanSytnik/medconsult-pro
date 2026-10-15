import { defineRouting } from 'next-intl/routing'

export const locales = ['de', 'ru', 'uk', 'en'] as const
export type Locale = (typeof locales)[number]

export const routing = defineRouting({
  locales,
  defaultLocale: 'de',
  localePrefix: 'as-needed',
})

export const languages: { code: Locale; label: string; fullName: string }[] = [
  { code: 'de', label: 'DE', fullName: 'Deutsch' },
  { code: 'ru', label: 'RU', fullName: 'Русский' },
  { code: 'uk', label: 'УКР', fullName: 'Українська' },
  { code: 'en', label: 'EN', fullName: 'English' },
]

/** Path prefix for a locale: German lives at the root, the others under /ru, /uk, /en. */
export function localePrefix(locale: string): string {
  return locale === routing.defaultLocale ? '' : `/${locale}`
}

/** Locale-aware path for plain anchors, e.g. localePath('ru', '/#contact') -> '/ru/#contact'. */
export function localePath(locale: string, path: string): string {
  return `${localePrefix(locale)}${path}`
}
