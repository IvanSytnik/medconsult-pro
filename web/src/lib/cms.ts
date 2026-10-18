import 'server-only'
import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import type { Locale } from '@/i18n/routing'
import type { Media, Page, Service, SiteSetting, Theme } from '@/payload-types'

export const getPayloadClient = () => getPayload({ config })

export const HOME_SLUG = 'home'

export const getPage = cache(async (slug: string, locale: Locale): Promise<Page | null> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    locale,
    depth: 2,
    limit: 1,
  })
  return docs[0] ?? null
})

/** Slugs of all pages; empty when the database is unreachable so a build can still finish (pages then render on demand). */
export async function getPageSlugs(): Promise<string[]> {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({ collection: 'pages', depth: 0, limit: 100, pagination: false, select: { slug: true } })
    return docs.map((d) => d.slug)
  } catch (error) {
    console.warn('Could not list pages:', error instanceof Error ? error.message : error)
    return []
  }
}

export const getSiteSettings = cache(async (locale: Locale): Promise<SiteSetting> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings', locale, depth: 0 })
})

export const getTheme = cache(async (): Promise<Theme> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'theme', depth: 1 })
})

export const getLegal = cache(async (locale: Locale) => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'legal', locale, depth: 1 })
})

export const getServices = cache(async (locale: Locale): Promise<Service[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'services', locale, sort: 'order', depth: 0, limit: 50 })
  return docs
})

/** Keeps the populated documents of a relationship field (ids mean the document was deleted or not populated). */
export function populated<T extends object>(items: (number | T)[] | null | undefined): T[] {
  return (items ?? []).filter((item): item is T => typeof item === 'object' && item !== null)
}

export function mediaOf(value: number | Media | null | undefined): Media | null {
  return value && typeof value === 'object' && value.url ? value : null
}

/** Phone and WhatsApp links derived from the numbers stored in the site settings. */
export function contactLinks(settings: SiteSetting) {
  const digits = (value?: string | null) => (value ?? '').replace(/[^0-9]/g, '')
  const email = settings.email ?? ''
  return {
    phone: settings.phone ?? '',
    phoneHref: `tel:${(settings.phone ?? '').replace(/[^0-9+]/g, '')}`,
    email,
    emailHref: `mailto:${email}`,
    whatsappHref: `https://wa.me/${digits(settings.whatsapp)}`,
    floatWhatsappHref: `https://wa.me/${digits(settings.whatsappFloat || settings.whatsapp)}`,
    formWhatsapp: settings.whatsappForm || settings.whatsapp || '',
  }
}

export type ContactLinks = ReturnType<typeof contactLinks>
