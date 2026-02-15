import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Impressum() {
  const { t } = useTranslation()

  return (
    <div className="pt-[72px]">
      <section className="py-16 bg-secondary-50">
        <div className="max-w-3xl mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t('impressum.back')}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900">
            {t('impressum.title')}
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 prose prose-secondary max-w-none">
          
          {/* Company Info */}
          <h2 className="text-xl font-bold text-secondary-900 mb-4">
            {t('impressum.companyInfo.title')}
          </h2>
          <p className="text-secondary-600 mb-1">{t('impressum.companyInfo.name')}</p>
          <p className="text-secondary-600 mb-1">{t('impressum.companyInfo.address1')}</p>
          <p className="text-secondary-600 mb-6">{t('impressum.companyInfo.address2')}</p>

          {/* Represented by */}
          <h2 className="text-xl font-bold text-secondary-900 mb-4">
            {t('impressum.represented.title')}
          </h2>
          <p className="text-secondary-600 mb-6">{t('impressum.represented.name')}</p>

          {/* Contact */}
          <h2 className="text-xl font-bold text-secondary-900 mb-4">
            {t('impressum.contact.title')}
          </h2>
          <p className="text-secondary-600 mb-1">
            {t('impressum.contact.phone')}: <a href="tel:+491736631438" className="text-primary-600 hover:underline">+49 173 6631438</a>
          </p>
          <p className="text-secondary-600 mb-1">
            {t('impressum.contact.email')}: <a href="mailto:info@medconsult-turkey.com" className="text-primary-600 hover:underline">info@medconsult-turkey.com</a>
          </p>
          <p className="text-secondary-600 mb-6">
            {t('impressum.contact.website')}: <a href="https://medconsult-turkey.com" className="text-primary-600 hover:underline">www.medconsult-turkey.com</a>
          </p>

          {/* Disclaimer */}
          <h2 className="text-xl font-bold text-secondary-900 mb-4">
            {t('impressum.disclaimer.title')}
          </h2>
          <p className="text-secondary-600 mb-6">
            {t('impressum.disclaimer.text')}
          </p>

          {/* Liability for Content */}
          <h2 className="text-xl font-bold text-secondary-900 mb-4">
            {t('impressum.liability.title')}
          </h2>
          <p className="text-secondary-600 mb-6">
            {t('impressum.liability.text')}
          </p>

          {/* Liability for Links */}
          <h2 className="text-xl font-bold text-secondary-900 mb-4">
            {t('impressum.links.title')}
          </h2>
          <p className="text-secondary-600 mb-6">
            {t('impressum.links.text')}
          </p>

          {/* Copyright */}
          <h2 className="text-xl font-bold text-secondary-900 mb-4">
            {t('impressum.copyright.title')}
          </h2>
          <p className="text-secondary-600 mb-6">
            {t('impressum.copyright.text')}
          </p>

          {/* Medical Disclaimer */}
          <h2 className="text-xl font-bold text-secondary-900 mb-4">
            {t('impressum.medical.title')}
          </h2>
          <p className="text-secondary-600 mb-6">
            {t('impressum.medical.text')}
          </p>

        </div>
      </section>
    </div>
  )
}
