import '@fontsource-variable/inter/wght.css'
import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import { resolveLocale } from '@/i18n/locale'
import { routing } from '@/i18n/routing'
import { contactLinks, getServices, getSiteSettings } from '@/lib/cms'
import { ALLOW_INDEXING, SITE_NAME, SITE_URL } from '@/lib/site'
import '../globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  icons: { icon: '/favicon.svg' },
  robots: ALLOW_INDEXING ? undefined : { index: false, follow: false },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const locale = await resolveLocale(params)
  const [settings, services] = await Promise.all([getSiteSettings(locale), getServices(locale)])
  const contact = contactLinks(settings)

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar
              links={(settings.nav?.links ?? []).map((l) => ({ label: l.label ?? '', href: l.href ?? '' }))}
              ctaLabel={settings.nav?.ctaLabel ?? ''}
              ctaHref={settings.nav?.ctaHref || '/#contact'}
            />
            <main className="flex-1">{children}</main>
            <Footer settings={settings} services={services} contact={contact} />
            <WhatsAppFloat href={contact.floatWhatsappHref} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
