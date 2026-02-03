import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function ComingSoon({ icon, title }) {
  const { t } = useTranslation()

  return (
    <section className="min-h-screen flex items-center justify-center pt-[72px] pb-20 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-lg mx-auto px-6 text-center">
        <div className="text-7xl mb-6">{icon}</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-secondary-600 mb-4">{t('comingSoon.title')}</p>
        <p className="text-secondary-500 mb-8">{t('comingSoon.text')}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="/#contact" className="btn btn-primary">
            {t('comingSoon.btnConsultation')}
          </a>
          <Link to="/" className="btn btn-outline">
            {t('comingSoon.btnHome')}
          </Link>
        </div>
      </div>
    </section>
  )
}
