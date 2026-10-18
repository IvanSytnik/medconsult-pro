import '@fontsource-variable/inter/wght.css'
import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import Footer from '@/components/layout/Footer'
import Logo from '@/components/layout/Logo'
import Navbar from '@/components/layout/Navbar'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import { resolveLocale } from '@/i18n/locale'
import { routing } from '@/i18n/routing'
import { contactLinks, getServices, getSiteSettings, getTheme } from '@/lib/cms'
import { fontVariables } from '@/lib/fonts'
import { ALLOW_INDEXING, SITE_NAME, SITE_URL } from '@/lib/site'
import { themeCss } from '@/lib/theme'
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
  const [settings, services, theme] = await Promise.all([getSiteSettings(locale), getServices(locale), getTheme()])
  const contact = contactLinks(settings)

  return (
    <html lang={locale} className={fontVariables}>
      <head>
        {/* Theme colours, font and radius from the CMS; values are validated, so the CSS cannot break out. */}
        <style dangerouslySetInnerHTML={{ __html: themeCss(theme) }} />
      </head>
      <body>
        <NextIntlClientProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar
              logo={<Logo logo={theme.logo} variant="header" />}
              links={(settings.nav?.links ?? []).map((l) => ({ label: l.label ?? '', href: l.href ?? '' }))}
              ctaLabel={settings.nav?.ctaLabel ?? ''}
              ctaHref={settings.nav?.ctaHref || '/#contact'}
            />
            <main className="flex-1">{children}</main>
            <Footer settings={settings} services={services} contact={contact} logo={theme.logo} />
            <WhatsAppFloat href={contact.floatWhatsappHref} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
