import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import LegalText from '@/components/blocks/LegalText'
import { resolveLocale } from '@/i18n/locale'
import { Link } from '@/i18n/navigation'
import { getLegal } from '@/lib/cms'
import { pageMetadata } from '@/lib/site'

export async function generateMetadata({ params }: PageProps<'/[locale]/impressum'>): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const { impressum } = await getLegal(locale)
  return pageMetadata(locale, '/impressum', impressum?.title ?? 'Impressum', impressum?.description ?? '')
}

export default async function ImpressumPage({ params }: PageProps<'/[locale]/impressum'>) {
  const locale = await resolveLocale(params)
  const { impressum } = await getLegal(locale)

  return (
    <div className="pt-[72px]">
      <section className="py-16 bg-secondary-50">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {impressum?.backLabel}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900">{impressum?.title}</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 prose prose-secondary max-w-none">
          <LegalText data={impressum?.content} variant="impressum" />
        </div>
      </section>
    </div>
  )
}
