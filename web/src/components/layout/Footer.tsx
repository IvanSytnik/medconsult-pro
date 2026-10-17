import { Activity } from 'lucide-react'
import { getLocale } from 'next-intl/server'
import WhatsAppGlyph from '@/components/ui/WhatsAppGlyph'
import { Link } from '@/i18n/navigation'
import { localePath } from '@/i18n/routing'
import type { ContactLinks } from '@/lib/cms'
import type { Service, SiteSetting } from '@/payload-types'

type Props = { settings: SiteSetting; services: Service[]; contact: ContactLinks }

export default async function Footer({ settings, services, contact }: Props) {
  const footer = settings.footer
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
            <p className="text-sm leading-relaxed">{footer?.description}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5">{footer?.servicesTitle}</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link href={`/${service.slug}`} className="hover:text-primary-400 transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5">{footer?.companyTitle}</h4>
            <ul className="space-y-3">
              {footer?.companyLinks?.map((link) => (
                <li key={link.id}>
                  <a href={href(link.href ?? '/')} className="hover:text-primary-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5">{footer?.contactTitle}</h4>
            <div className="space-y-2">
              <a href={contact.phoneHref} className="block hover:text-primary-400 transition-colors">
                {contact.phone}
              </a>
              <a href={contact.emailHref} className="block hover:text-primary-400 transition-colors">
                {contact.email}
              </a>
            </div>
            <div className="mt-4">
              <a
                href={contact.whatsappHref}
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
            © {year} MedConsult Turkey. {footer?.copyright}
          </p>
          <div className="flex gap-6">
            <a href={href('/privacy')} className="hover:text-primary-400 transition-colors">
              {footer?.privacyLabel}
            </a>
            <a href={href('/impressum')} className="hover:text-primary-400 transition-colors">
              {footer?.impressumLabel}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
