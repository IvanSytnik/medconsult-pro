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

/** Fixed routes that are not CMS pages. */
export const LEGAL_PATHS = ['/impressum', '/privacy'] as const

/** Locale-independent path of a CMS page: "" for the start page, "/<slug>" otherwise. */
export function pagePath(slug: string): string {
  return slug === 'home' ? '' : `/${slug}`
}

export function absoluteUrl(locale: string, path: string): string {
  return `${SITE_URL}${localePrefix(locale)}${path}` || SITE_URL
}

export function alternateLanguages(path: string): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const locale of routing.locales) languages[locale] = absoluteUrl(locale, path)
  languages['x-default'] = absoluteUrl(routing.defaultLocale, path)
  return languages
}

export function pageMetadata(locale: string, path: string, title: string, description: string): Metadata {
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
