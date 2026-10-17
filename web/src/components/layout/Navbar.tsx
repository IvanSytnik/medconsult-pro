'use client'

import clsx from 'clsx'
import { Activity, Menu, X } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { languages, localePath, type Locale } from '@/i18n/routing'

type NavLink = { label: string; href: string }

/** Links are stored locale-independent ("/#services") and prefixed with the active locale here. */
export default function Navbar({ links, ctaLabel, ctaHref }: { links: NavLink[]; ctaLabel: string; ctaHref: string }) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close the mobile menu whenever the route changes.
  const [lastPathname, setLastPathname] = useState(pathname)
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setIsOpen(false)
  }

  const changeLanguage = (next: Locale) => {
    router.replace(pathname, { locale: next })
  }

  const navLinks = links.map((link) => ({ label: link.label, href: localePath(locale, link.href) }))
  const contactHref = localePath(locale, ctaHref)

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'bg-white/95 backdrop-blur-md border-b border-secondary-200',
        isScrolled && 'shadow-md'
      )}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-[72px]">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-primary-600 to-primary-500 rounded-lg flex items-center justify-center text-white">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-secondary-900">
              MedConsult<span className="text-primary-600">Turkey</span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="px-4 py-2 font-medium text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={contactHref}
                className="ml-2 px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all"
              >
                {ctaLabel}
              </a>
            </li>
          </ul>

          <div className="hidden lg:flex items-center gap-1 ml-4 pl-4 border-l border-secondary-200">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => changeLanguage(lang.code)}
                aria-current={locale === lang.code ? 'true' : undefined}
                title={lang.fullName}
                className={clsx(
                  'px-2.5 py-1.5 text-sm font-medium rounded transition-all',
                  locale === lang.code
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-secondary-500 hover:text-primary-600 hover:bg-primary-50'
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-secondary-700"
            aria-label="Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        className={clsx(
          'lg:hidden fixed inset-x-0 top-[72px] bg-white border-b border-secondary-200 transition-all duration-300',
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <div className="px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block px-4 py-3 font-medium text-secondary-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={contactHref}
            className="block px-4 py-3 bg-primary-600 text-white font-semibold text-center rounded-lg mt-4"
            onClick={() => setIsOpen(false)}
          >
            {ctaLabel}
          </a>

          <div className="flex justify-center gap-2 pt-4 border-t border-secondary-100 mt-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  changeLanguage(lang.code)
                  setIsOpen(false)
                }}
                aria-current={locale === lang.code ? 'true' : undefined}
                title={lang.fullName}
                className={clsx(
                  'px-3 py-2 text-sm font-medium rounded',
                  locale === lang.code ? 'bg-primary-100 text-primary-600' : 'text-secondary-500'
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
