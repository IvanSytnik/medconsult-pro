import { Activity } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import WhatsAppGlyph from '@/components/ui/WhatsAppGlyph'
import { Link } from '@/i18n/navigation'
import { localePath } from '@/i18n/routing'
import { CONTACT } from '@/lib/site'

export default async function Footer() {
  const t = await getTranslations()
  const locale = await getLocale()
  const year = new Date().getFullYear()
  const href = (path: string) => localePath(locale, path)

  return (
    <footer className="bg-secondary-900 text-secondary-400 pt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-secondary-800">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white">
                MedConsult<span className="text-primary-400">Turkey</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">{t('footer.description')}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5">{t('footer.services')}</h4>
            <ul className="space-y-3">
              {(['dental', 'plastic', 'hair', 'aesthetic'] as const).map((key) => (
                <li key={key}>
                  <Link href={`/${key}`} className="hover:text-primary-400 transition-colors">
                    {t(`services.${key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5">{t('footer.company')}</h4>
            <ul className="space-y-3">
              <li>
                <a href={href('/#why')} className="hover:text-primary-400 transition-colors">
                  {t('footer.aboutUs')}
                </a>
              </li>
              <li>
                <a href={href('/#team')} className="hover:text-primary-400 transition-colors">
                  {t('team.tag')}
                </a>
              </li>
              <li>
                <a href={href('/#contact')} className="hover:text-primary-400 transition-colors">
                  {t('nav.contact')}
                </a>
              </li>
              <li>
                <a href={href('/impressum')} className="hover:text-primary-400 transition-colors">
                  {t('footer.impressum')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5">{t('nav.contact')}</h4>
            <div className="space-y-2">
              <a href={CONTACT.phoneHref} className="block hover:text-primary-400 transition-colors">
                {CONTACT.phone}
              </a>
              <a href={CONTACT.emailHref} className="block hover:text-primary-400 transition-colors">
                {CONTACT.email}
              </a>
            </div>
            <div className="mt-4">
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#25d366] text-white rounded-lg text-sm font-medium hover:bg-[#1da851] transition-colors"
              >
                <WhatsAppGlyph className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>
            © {year} MedConsult Turkey. {t('footer.copyright')}
          </p>
          <div className="flex gap-6">
            <a href={href('/privacy')} className="hover:text-primary-400 transition-colors">
              {t('footer.privacy')}
            </a>
            <a href={href('/impressum')} className="hover:text-primary-400 transition-colors">
              {t('footer.impressum')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
