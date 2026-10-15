import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { absoluteUrl, alternateLanguages, PAGES } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : path === '/impressum' || path === '/privacy' ? 0.3 : 0.8,
      alternates: { languages: alternateLanguages(path) },
    }))
  )
}
