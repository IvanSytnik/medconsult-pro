import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Privacy() {
  const { t } = useTranslation()

  const sections = [
    'overview',
    'responsible',
    'collection',
    'contactForm',
    'cookies',
    'analytics',
    'thirdParty',
    'rights',
    'storage',
    'changes',
  ]

  return (
    <div className="pt-[72px]">
      <section className="py-16 bg-secondary-50">
        <div className="max-w-3xl mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t('privacy.back')}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900">
            {t('privacy.title')}
          </h1>
          <p className="text-secondary-500 mt-3">
            {t('privacy.lastUpdated')}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          {sections.map((key) => (
            <div key={key} className="mb-10">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">
                {t(`privacy.sections.${key}.title`)}
              </h2>
              <p className="text-secondary-600 leading-relaxed whitespace-pre-line">
                {t(`privacy.sections.${key}.text`)}
              </p>
            </div>
          ))}

          {/* Contact for privacy */}
          <div className="mt-12 p-6 bg-secondary-50 rounded-xl">
            <h3 className="text-lg font-bold text-secondary-900 mb-3">
              {t('privacy.contactTitle')}
            </h3>
            <p className="text-secondary-600 mb-2">{t('privacy.contactText')}</p>
            <a href="mailto:info@medconsult-turkey.com" className="text-primary-600 font-medium hover:underline">
              info@medconsult-turkey.com
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
