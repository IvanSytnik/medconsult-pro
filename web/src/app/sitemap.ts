import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { getPageSlugs, HOME_SLUG } from '@/lib/cms'
import { absoluteUrl, alternateLanguages, LEGAL_PATHS, pagePath } from '@/lib/site'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getPageSlugs()
  const entries = [
    ...slugs.map((slug) => ({ path: pagePath(slug), priority: slug === HOME_SLUG ? 1 : 0.8 })),
    ...LEGAL_PATHS.map((path) => ({ path, priority: 0.3 })),
  ]
  return entries.flatMap(({ path, priority }) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      changeFrequency: 'monthly' as const,
      priority,
      alternates: { languages: alternateLanguages(path) },
    }))
  )
}
