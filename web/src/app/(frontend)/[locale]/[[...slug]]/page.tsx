import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import RenderBlocks from '@/components/blocks/RenderBlocks'
import { resolveLocale } from '@/i18n/locale'
import { getPage, getPageSlugs, HOME_SLUG } from '@/lib/cms'
import { pageMetadata, pagePath } from '@/lib/site'

type Props = PageProps<'/[locale]/[[...slug]]'>

function slugOf(segments: string[] | undefined): string | null {
  if (!segments || segments.length === 0) return HOME_SLUG
  if (segments.length > 1 || segments[0] === HOME_SLUG) return null
  return segments[0]
}

export async function generateStaticParams() {
  const slugs = await getPageSlugs()
  return slugs.map((slug) => ({ slug: slug === HOME_SLUG ? [] : [slug] }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const slug = slugOf((await params).slug)
  const page = slug ? await getPage(slug, locale) : null
  if (!page) return {}
  return pageMetadata(locale, pagePath(page.slug), page.meta?.title || page.title, page.meta?.description ?? '')
}

export default async function CmsPage({ params }: Props) {
  const locale = await resolveLocale(params)
  const slug = slugOf((await params).slug)
  const page = slug ? await getPage(slug, locale) : null
  if (!page) notFound()

  return <RenderBlocks blocks={page.layout} locale={locale} />
}
