import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import LegalText from '@/components/blocks/LegalText'
import { resolveLocale } from '@/i18n/locale'
import { Link } from '@/i18n/navigation'
import { contactLinks, getLegal, getSiteSettings } from '@/lib/cms'
import { pageMetadata } from '@/lib/site'

export async function generateMetadata({ params }: PageProps<'/[locale]/privacy'>): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const { privacy } = await getLegal(locale)
  return pageMetadata(locale, '/privacy', privacy?.title ?? 'Privacy', privacy?.description ?? '')
}

export default async function PrivacyPage({ params }: PageProps<'/[locale]/privacy'>) {
  const locale = await resolveLocale(params)
  const [{ privacy }, settings] = await Promise.all([getLegal(locale), getSiteSettings(locale)])
  const contact = contactLinks(settings)

  return (
    <div className="pt-[72px]">
      <section className="py-16 bg-secondary-50">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {privacy?.backLabel}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900">{privacy?.title}</h1>
          <p className="text-secondary-500 mt-3">{privacy?.lastUpdated}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <LegalText data={privacy?.content} variant="privacy" />

          <div className="mt-12 p-6 bg-secondary-50 rounded-xl">
            <h3 className="text-lg font-bold text-secondary-900 mb-3">{privacy?.contactTitle}</h3>
            <p className="text-secondary-600 mb-2">{privacy?.contactText}</p>
            <a href={contact.emailHref} className="text-primary-600 font-medium hover:underline">
              {contact.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
