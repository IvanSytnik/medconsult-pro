import type { Metadata } from 'next'
import { localePrefix, routing } from '@/i18n/routing'

export const SITE_NAME = 'MedConsult Turkey'

/** Absolute base URL used for canonical links, hreflang and the sitemap. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '')

/** Search engines are kept out until the site is cut over to its final domain. */
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'

export const CONTACT = {
  phone: '+49 173 6631438',
  phoneHref: 'tel:+491736631438',
  whatsappHref: 'https://wa.me/491736631438',
  floatWhatsappHref: 'https://wa.me/4915751129620',
  formWhatsapp: '+4915751129620',
  email: 'info@medconsult-turkey.com',
  emailHref: 'mailto:info@medconsult-turkey.com',
}

/** Every public page, as a locale-independent path. */
export const PAGES = ['', '/dental', '/plastic', '/hair', '/aesthetic', '/impressum', '/privacy'] as const
export type PagePath = (typeof PAGES)[number]

export function absoluteUrl(locale: string, path: PagePath): string {
  return `${SITE_URL}${localePrefix(locale)}${path}` || SITE_URL
}

export function alternateLanguages(path: PagePath): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const locale of routing.locales) languages[locale] = absoluteUrl(locale, path)
  languages['x-default'] = absoluteUrl(routing.defaultLocale, path)
  return languages
}

export function pageMetadata(locale: string, path: PagePath, title: string, description: string): Metadata {
  const fullTitle = path === '' ? `${SITE_NAME} – ${title}` : `${title} | ${SITE_NAME}`
  const url = absoluteUrl(locale, path)
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url, languages: alternateLanguages(path) },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale,
      type: 'website',
    },
  }
}
