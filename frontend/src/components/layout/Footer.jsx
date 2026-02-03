import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Activity } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-secondary-900 text-secondary-400 pt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-secondary-800">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white">
                MedConsult<span className="text-primary-400">Turkey</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-5">{t('footer.services')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/dental" className="hover:text-primary-400 transition-colors">
                  {t('services.dental.title')}
                </Link>
              </li>
              <li>
                <Link to="/plastic" className="hover:text-primary-400 transition-colors">
                  {t('services.plastic.title')}
                </Link>
              </li>
              <li>
                <Link to="/hair" className="hover:text-primary-400 transition-colors">
                  {t('services.hair.title')}
                </Link>
              </li>
              <li>
                <Link to="/aesthetic" className="hover:text-primary-400 transition-colors">
                  {t('services.aesthetic.title')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-5">{t('footer.company')}</h4>
            <ul className="space-y-3">
              <li>
                <a href="/#why" className="hover:text-primary-400 transition-colors">
                  {t('footer.aboutUs')}
                </a>
              </li>
              <li>
                <a href="/#team" className="hover:text-primary-400 transition-colors">
                  {t('team.tag')}
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-primary-400 transition-colors">
                  {t('nav.contact')}
                </a>
              </li>
              <li>
                <a href="/impressum" className="hover:text-primary-400 transition-colors">
                  {t('footer.impressum')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5">{t('nav.contact')}</h4>
            <div className="space-y-2">
              <a href="tel:+491736631438" className="block hover:text-primary-400 transition-colors">
                +49 173 6631438
              </a>
              <a href="mailto:info@medconsult-turkey.com" className="block hover:text-primary-400 transition-colors">
                info@medconsult-turkey.com
              </a>
            </div>
            <div className="mt-4">
              <a
                href="https://wa.me/491736631438"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#25d366] text-white rounded-lg text-sm font-medium hover:bg-[#1da851] transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>© {year} MedConsult Turkey. {t('footer.copyright')}</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-primary-400 transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="/impressum" className="hover:text-primary-400 transition-colors">
              {t('footer.impressum')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
