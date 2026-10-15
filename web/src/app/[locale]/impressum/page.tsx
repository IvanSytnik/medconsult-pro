import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { resolveLocale } from '@/i18n/locale'
import { Link } from '@/i18n/navigation'
import { CONTACT, pageMetadata } from '@/lib/site'

export async function generateMetadata({ params }: PageProps<'/[locale]/impressum'>): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const t = await getTranslations({ locale })
  return pageMetadata(locale, '/impressum', t('impressum.title'), t('impressum.disclaimer.text'))
}

const h2 = 'text-xl font-bold text-secondary-900 mb-4'

export default async function ImpressumPage({ params }: PageProps<'/[locale]/impressum'>) {
  await resolveLocale(params)
  const t = await getTranslations()

  const textSections = ['disclaimer', 'liability', 'links', 'copyright', 'medical'] as const

  return (
    <div className="pt-[72px]">
      <section className="py-16 bg-secondary-50">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t('impressum.back')}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900">{t('impressum.title')}</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 prose prose-secondary max-w-none">
          <h2 className={h2}>{t('impressum.companyInfo.title')}</h2>
          <p className="text-secondary-600 mb-1">{t('impressum.companyInfo.name')}</p>
          <p className="text-secondary-600 mb-1">{t('impressum.companyInfo.address1')}</p>
          <p className="text-secondary-600 mb-6">{t('impressum.companyInfo.address2')}</p>

          <h2 className={h2}>{t('impressum.represented.title')}</h2>
          <p className="text-secondary-600 mb-6">{t('impressum.represented.name')}</p>

          <h2 className={h2}>{t('impressum.contact.title')}</h2>
          <p className="text-secondary-600 mb-1">
            {t('impressum.contact.phone')}:{' '}
            <a href={CONTACT.phoneHref} className="text-primary-600 hover:underline">
              {CONTACT.phone}
            </a>
          </p>
          <p className="text-secondary-600 mb-1">
            {t('impressum.contact.email')}:{' '}
            <a href={CONTACT.emailHref} className="text-primary-600 hover:underline">
              {CONTACT.email}
            </a>
          </p>
          <p className="text-secondary-600 mb-6">
            {t('impressum.contact.website')}:{' '}
            <a href="https://medconsult-turkey.com" className="text-primary-600 hover:underline">
              www.medconsult-turkey.com
            </a>
          </p>

          {textSections.map((key) => (
            <div key={key}>
              <h2 className={h2}>{t(`impressum.${key}.title`)}</h2>
              <p className="text-secondary-600 mb-6">{t(`impressum.${key}.text`)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
