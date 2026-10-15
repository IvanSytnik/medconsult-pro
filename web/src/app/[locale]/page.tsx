import {
  Building2,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Palmtree,
  Phone,
  Shield,
  Stethoscope,
  Wallet,
} from 'lucide-react'
import type { Metadata } from 'next'
import Image, { type StaticImageData } from 'next/image'
import { getTranslations } from 'next-intl/server'
import alexImg from '@/assets/team/alex.png'
import galinaImg from '@/assets/team/galina.png'
import olegImg from '@/assets/team/oleg.png'
import ContactForm from '@/components/forms/ContactForm'
import { IconCardGrid, ProcessSteps, SectionHeading } from '@/components/sections/common'
import {
  ScissorsIcon,
  SparkleIcon,
  SyringeIcon,
  ToothIcon,
  type IconComponent,
} from '@/components/ui/MedicalIcon'
import { resolveLocale } from '@/i18n/locale'
import { Link } from '@/i18n/navigation'
import { CONTACT, pageMetadata } from '@/lib/site'

type T = Awaited<ReturnType<typeof getTranslations>>

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const t = await getTranslations({ locale })
  return pageMetadata(locale, '', t('hero.title'), t('hero.subtitle'))
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  await resolveLocale(params)
  const t = await getTranslations()

  return (
    <>
      <HeroSection t={t} />
      <WhySection t={t} />
      <ServicesSection t={t} />
      <AboutSection t={t} />
      <AudienceSection t={t} />
      <ProcessSection t={t} />
      <TeamSection t={t} />
      <CTASection t={t} />
      <ContactSection t={t} />
    </>
  )
}

function HeroSection({ t }: { t: T }) {
  const floating = [
    { Icon: ToothIcon, label: t('services.dental.title'), className: 'top-[10%] left-[5%]', delay: undefined },
    { Icon: SyringeIcon, label: t('services.plastic.title'), className: 'top-[25%] right-[10%]', delay: '1.5s' },
    { Icon: ScissorsIcon, label: t('services.hair.title'), className: 'top-[55%] left-[15%]', delay: '3s' },
    { Icon: SparkleIcon, label: t('services.aesthetic.title'), className: 'bottom-[15%] right-[5%]', delay: '4.5s' },
  ]

  return (
    <section className="relative min-h-screen flex items-center pt-[72px] pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 -z-10" />
      <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-radial from-primary-100/50 to-transparent opacity-50 -z-10" />

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-6">
              <span className="text-lg">TR</span>
              <span className="font-medium text-secondary-700">{t('hero.badge')}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 mb-4 leading-tight">
              {t('hero.title')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                {t('hero.titleAccent')}
              </span>
            </h1>

            <p className="text-lg text-secondary-600 mb-8 leading-relaxed">{t('hero.subtitle')}</p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#contact" className="btn btn-primary btn-lg">
                <MessageCircle className="w-5 h-5" />
                {t('hero.btnConsultation')}
              </a>
              <a href="#services" className="btn btn-outline btn-lg">
                {t('hero.btnCalculate')}
              </a>
            </div>

            <div className="flex gap-8">
              {[
                { value: '500+', label: t('hero.stats.clients') },
                { value: '15+', label: t('hero.stats.clinics') },
                { value: '70%', label: t('hero.stats.savings') },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-3xl font-bold text-primary-600">{value}</div>
                  <div className="text-sm text-secondary-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block h-[500px]">
            {floating.map(({ Icon, label, className, delay }) => (
              <div
                key={label}
                className={`absolute ${className} bg-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 animate-float`}
                style={delay ? { animationDelay: delay } : undefined}
              >
                <Icon size="sm" />
                <span className="font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function WhySection({ t }: { t: T }) {
  const items = [
    { icon: Building2, key: 'clinics' },
    { icon: Stethoscope, key: 'doctors' },
    { icon: Wallet, key: 'savings' },
    { icon: Clock, key: 'fast' },
    { icon: Palmtree, key: 'comfort' },
    { icon: Shield, key: 'guarantee' },
  ] as const

  return (
    <section id="why" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading tag={t('why.tag')} title={t('why.title')} subtitle={t('why.subtitle')} />
        <IconCardGrid
          items={items.map(({ icon, key }) => ({
            icon,
            title: t(`why.items.${key}.title`),
            desc: t(`why.items.${key}.desc`),
          }))}
        />
      </div>
    </section>
  )
}

function ServicesSection({ t }: { t: T }) {
  const services: { key: 'dental' | 'plastic' | 'hair' | 'aesthetic'; Icon: IconComponent; price: string }[] = [
    { key: 'dental', Icon: ToothIcon, price: '€450' },
    { key: 'plastic', Icon: SyringeIcon, price: '€3,000' },
    { key: 'hair', Icon: ScissorsIcon, price: '€1,800' },
    { key: 'aesthetic', Icon: SparkleIcon, price: '€150' },
  ]

  return (
    <section id="services" className="py-24 bg-secondary-50">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading tag={t('services.tag')} title={t('services.title')} subtitle={t('services.subtitle')} />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ key, Icon, price }) => (
            <Link key={key} href={`/${key}`} className="card card-hover overflow-hidden flex flex-col">
              <div className="relative bg-secondary-200 h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50">
                  <Icon size="xl" className="text-white" />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <Icon size="md" className="mb-3" />
                <h3 className="text-xl font-bold mb-2">{t(`services.${key}.title`)}</h3>
                <p className="text-secondary-600 mb-4 flex-1">{t(`services.${key}.desc`)}</p>
                <div className="pt-4 border-t border-secondary-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-sm text-secondary-500">{t(`services.${key}.price`)} </span>
                    <span className="text-2xl font-bold text-primary-600">{price}</span>
                  </div>
                  <span className="text-primary-600 font-semibold flex items-center gap-2">
                    {t('services.more')}
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection({ t }: { t: T }) {
  const features = ['consultation', 'selection', 'plan', 'translation', 'organization', 'support', 'aftercare'] as const

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element -- remote media moves to the CMS in phase 2 */}
                <img
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=500&fit=crop"
                  alt="Medical consultation"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="text-4xl font-bold text-primary-600">100%</div>
                <div className="text-secondary-600 font-medium">{t('about.transparency')}</div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="section-tag">{t('about.tag')}</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('about.title')}</h2>
            <p className="text-lg text-secondary-700 font-medium mb-4">{t('about.lead')}</p>
            <p className="text-secondary-600 mb-8">{t('about.text')}</p>

            <div className="space-y-3">
              {features.map((key) => (
                <div key={key} className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <span className="font-medium">{t(`about.features.${key}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AudienceSection({ t }: { t: T }) {
  const items = [
    { key: 'germany', label: 'DE' },
    { key: 'quality', label: 'Premium' },
    { key: 'safety', label: 'Safe' },
    { key: 'trust', label: 'Trust' },
  ] as const

  return (
    <section className="py-24 bg-gradient-to-br from-secondary-800 to-primary-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag section-tag-light">{t('audience.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold">{t('audience.title')}</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ key, label }) => (
            <div
              key={key}
              className="bg-white/10 border border-white/15 rounded-xl p-8 text-center hover:bg-white/15 transition-all hover:-translate-y-1"
            >
              <div className="text-3xl mb-4">{label}</div>
              <p className="opacity-90">{t(`audience.items.${key}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessSection({ t }: { t: T }) {
  const steps = ['consultation', 'plan', 'trip', 'result'] as const

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading tag={t('process.tag')} title={t('process.title')} subtitle={t('process.subtitle')} />
        <ProcessSteps
          steps={steps.map((key) => ({
            title: t(`process.steps.${key}.title`),
            desc: t(`process.steps.${key}.desc`),
          }))}
        />
      </div>
    </section>
  )
}

function TeamSection({ t }: { t: T }) {
  const team: {
    key: 'oleg' | 'alexander' | 'galina'
    phone: string
    langs: ('ru' | 'de' | 'uk')[]
    chief?: boolean
    image: StaticImageData
  }[] = [
    { key: 'oleg', phone: '+49 173 6631438', langs: ['ru'], chief: true, image: olegImg },
    { key: 'alexander', phone: '+49 1575 1129620', langs: ['ru', 'de', 'uk'], image: alexImg },
    { key: 'galina', phone: '+49 1578 9123142', langs: ['ru', 'de'], image: galinaImg },
  ]

  return (
    <section id="team" className="py-24 bg-secondary-50">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading tag={t('team.tag')} title={t('team.title')} subtitle={t('team.subtitle')} />

        <div className="grid md:grid-cols-3 gap-8">
          {team.map(({ key, phone, langs, chief, image }) => (
            <div key={key} className="card overflow-hidden">
              <div className="relative h-72">
                <Image
                  src={image}
                  alt={t(`team.members.${key}.name`)}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="w-full h-full object-contain bg-secondary-100"
                />
                {chief && (
                  <div className="absolute bottom-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {t('team.roles.chief')}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-1">{t(`team.members.${key}.name`)}</h3>
                <p className="text-primary-600 font-medium mb-3">{t(`team.members.${key}.role`)}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {langs.map((lang) => (
                    <span key={lang} className="bg-secondary-100 px-3 py-1 rounded-full text-xs font-medium">
                      {t(`team.languages.${lang}`)}
                    </span>
                  ))}
                </div>

                <p className="text-secondary-600 text-sm mb-5">{t(`team.members.${key}.desc`)}</p>

                <div className="space-y-2">
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-all"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="font-medium">{phone}</span>
                  </a>
                  <a
                    href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-[#25d366] text-white rounded-lg hover:bg-[#1da851] transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">{t('team.whatsapp')}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection({ t }: { t: T }) {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center">
      <div className="max-w-3xl mx-auto px-6">
        <Mail className="w-16 h-16 mx-auto mb-6 opacity-90" />
        <h2 className="text-3xl md:text-4xl font-bold mb-2">{t('cta.title')}</h2>
        <p className="text-xl opacity-90 mb-6">{t('cta.subtitle')}</p>
        <p className="opacity-90 mb-8 max-w-xl mx-auto">{t('cta.text')}</p>
        <a href="#contact" className="btn btn-white btn-lg">
          {t('cta.btn')}
        </a>
      </div>
    </section>
  )
}

function ContactSection({ t }: { t: T }) {
  const cards = [
    {
      Icon: Phone,
      title: t('contact.info.phone'),
      body: (
        <a href={CONTACT.phoneHref} className="text-primary-600 font-medium">
          {CONTACT.phone}
        </a>
      ),
      note: t('contact.info.phoneHours'),
    },
    {
      Icon: MessageCircle,
      title: t('contact.info.whatsapp'),
      body: (
        <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-primary-600 font-medium">
          {t('contact.info.whatsappText')}
        </a>
      ),
      note: t('contact.info.whatsappFast'),
    },
    {
      Icon: Mail,
      title: t('contact.info.email'),
      body: (
        <a href={CONTACT.emailHref} className="text-primary-600 font-medium">
          {CONTACT.email}
        </a>
      ),
      note: t('contact.info.emailText'),
    },
    {
      Icon: MapPin,
      title: t('contact.info.office'),
      body: <p className="text-secondary-700">{t('contact.info.officeGermany')}</p>,
      note: t('contact.info.officeTurkey'),
    },
  ]

  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading tag={t('contact.tag')} title={t('contact.title')} subtitle={t('contact.subtitle')} />

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <div className="lg:col-span-2 space-y-4">
            {cards.map(({ Icon, title, body, note }) => (
              <div key={title} className="card p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{title}</h4>
                  {body}
                  <p className="text-sm text-secondary-500">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
