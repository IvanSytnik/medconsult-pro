import {
  ArrowLeft,
  Building2,
  Car,
  CheckCircle2,
  ClipboardList,
  FlaskConical,
  Globe,
  Headphones,
  Hotel,
} from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import ContactForm from '@/components/forms/ContactForm'
import { SectionHeading } from '@/components/sections/common'
import VideoSlider, { type Video } from '@/components/sections/VideoSlider'
import {
  BoneIcon,
  CheckIcon,
  CrownIcon,
  DentalImplantIcon,
  DiamondIcon,
  HospitalIcon,
  SparkleIcon,
  ToothIcon,
  WrenchIcon,
  type IconComponent,
} from '@/components/ui/MedicalIcon'
import { resolveLocale } from '@/i18n/locale'
import { Link } from '@/i18n/navigation'
import { pageMetadata } from '@/lib/site'

type T = Awaited<ReturnType<typeof getTranslations>>

const VIDEOS: Video[] = [
  { id: 1, url: 'https://res.cloudinary.com/di36itbpm/video/upload/7_mig4ta.mp4', thumbnail: 'https://res.cloudinary.com/di36itbpm/video/upload/so_2,w_400/7_mig4ta.jpg' },
  { id: 2, url: 'https://res.cloudinary.com/di36itbpm/video/upload/2_gjhs9z.mp4', thumbnail: 'https://res.cloudinary.com/di36itbpm/video/upload/so_2,w_400/2_gjhs9z.jpg' },
  { id: 3, url: 'https://res.cloudinary.com/di36itbpm/video/upload/6_c25jdc.mp4', thumbnail: 'https://res.cloudinary.com/di36itbpm/video/upload/so_2,w_400/6_c25jdc.jpg' },
  { id: 4, url: 'https://res.cloudinary.com/di36itbpm/video/upload/1_uxj8lj.mp4', thumbnail: 'https://res.cloudinary.com/di36itbpm/video/upload/so_2,w_400/1_uxj8lj.jpg' },
  { id: 5, url: 'https://res.cloudinary.com/di36itbpm/video/upload/5_oaqkv5.mp4', thumbnail: 'https://res.cloudinary.com/di36itbpm/video/upload/so_2,w_400/5_oaqkv5.jpg' },
]

export async function generateMetadata({ params }: PageProps<'/[locale]/dental'>): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const t = await getTranslations({ locale })
  return pageMetadata(locale, '/dental', t('dental.heroTitle'), t('dental.heroDesc'))
}

export default async function DentalPage({ params }: PageProps<'/[locale]/dental'>) {
  await resolveLocale(params)
  const t = await getTranslations()

  return (
    <>
      <DentalHero t={t} />
      <TrustBar t={t} />
      <TreatmentsSection t={t} />
      <PricingSection t={t} />
      <ClinicSection t={t} />
      <PackageSection t={t} />
      <VideoSlider
        videos={VIDEOS}
        thumbnailGridClass="grid grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3"
        tag={t('dental.videos.tag')}
        title={t('dental.videos.title')}
        subtitle={t('dental.videos.subtitle')}
        ctaTitle={t('dental.videos.ctaTitle')}
        ctaDesc={t('dental.videos.ctaDesc')}
        primaryLabel={t('hero.btnConsultation')}
        secondaryLabel={t('dental.pricingTag')}
        secondaryHref="#pricing"
      />
      <DentalContactSection t={t} />
    </>
  )
}

function DentalHero({ t }: { t: T }) {
  return (
    <section className="relative pt-[72px] pb-20 min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 -z-10" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-secondary-500 hover:text-primary-600 mb-6">
              <ArrowLeft className="w-4 h-4" />
              {t('dental.back')}
            </Link>

            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-6">
              <ToothIcon size="sm" />
              <span className="font-medium">{t('dental.badge')}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-2">{t('dental.heroTitle')}</h1>
            <p className="text-xl text-primary-600 font-medium mb-6">{t('dental.heroSubtitle')}</p>
            <p className="text-lg text-secondary-600 mb-8">{t('dental.heroDesc')}</p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#contact" className="btn btn-primary btn-lg">
                {t('hero.btnConsultation')}
              </a>
              <a href="#pricing" className="btn btn-outline btn-lg">
                {t('dental.pricingTag')}
              </a>
            </div>

            <div className="space-y-3">
              {(['guarantee', 'materials', 'experience'] as const).map((key) => (
                <div key={key} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{t(`dental.features.${key}`)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block relative">
            {/* eslint-disable-next-line @next/next/no-img-element -- remote media moves to the CMS in phase 2 */}
            <img
              src="https://dentanatura.com/wp-content/uploads/2025/11/dokt-scaled.png"
              alt="Dr. Mevlüt"
              className="w-full max-w-md mx-auto"
            />
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6">
              <div className="bg-white p-4 rounded-xl shadow-lg text-center">
                <div className="text-2xl font-bold text-primary-600">500+</div>
                <div className="text-sm text-secondary-500">{t('hero.stats.clients')}</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-lg text-center">
                <div className="text-2xl font-bold text-primary-600">70%</div>
                <div className="text-sm text-secondary-500">{t('hero.stats.savings')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustBar({ t }: { t: T }) {
  const items: { key: 'ministry' | 'german' | 'swiss' | 'certified'; Icon?: IconComponent; label?: string }[] = [
    { key: 'ministry', Icon: HospitalIcon },
    { key: 'german', label: 'DE' },
    { key: 'swiss', label: 'CH' },
    { key: 'certified', Icon: CheckIcon },
  ]

  return (
    <section className="py-8 border-y border-secondary-200 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ key, Icon, label }) => (
            <div key={key} className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                {label ? (
                  <span className="text-sm font-bold text-secondary-700">{label}</span>
                ) : (
                  Icon && <Icon className="w-6 h-6 text-primary-600" />
                )}
              </div>
              <div>
                <div className="font-semibold text-secondary-800">{t(`dental.trust.${key}`)}</div>
                <div className="text-sm text-secondary-500">{t(`dental.trust.${key}Desc`)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TreatmentsSection({ t }: { t: T }) {
  const treatments: { key: 'implants' | 'crowns' | 'veneers' | 'zirconium' | 'allOn' | 'bone'; Icon: IconComponent; price: string }[] = [
    { key: 'implants', Icon: DentalImplantIcon, price: '€450' },
    { key: 'crowns', Icon: CrownIcon, price: '€150' },
    { key: 'veneers', Icon: SparkleIcon, price: '€250' },
    { key: 'zirconium', Icon: DiamondIcon, price: '€200' },
    { key: 'allOn', Icon: WrenchIcon, price: '€3,500' },
    { key: 'bone', Icon: BoneIcon, price: '€200' },
  ]

  return (
    <section id="treatments" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading tag={t('dental.servicesTag')} title={t('dental.servicesTitle')} subtitle={t('dental.servicesSubtitle')} />

        <div className="grid md:grid-cols-2 gap-6">
          {treatments.map(({ key, Icon, price }) => (
            <div key={key} className="card card-hover p-6 flex gap-5">
              <Icon size="lg" gradient className="flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{t(`dental.treatments.${key}.title`)}</h3>
                <p className="text-secondary-600 text-sm mb-3">{t(`dental.treatments.${key}.desc`)}</p>
                <div className="text-sm text-secondary-500">
                  {t(`dental.treatments.${key}.price`)} <span className="text-2xl font-bold text-primary-600">{price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingSection({ t }: { t: T }) {
  const prices: {
    key: 'implant' | 'ceramicCrown' | 'zirconiumCrown' | 'veneer' | 'allOn4' | 'smileMakeover'
    germany: string
    our: string
    savings: string
    Icon: IconComponent
  }[] = [
    { key: 'implant', germany: '€1,800 - €3,500', our: '€450', savings: '75%', Icon: DentalImplantIcon },
    { key: 'ceramicCrown', germany: '€700 - €1,200', our: '€150', savings: '80%', Icon: CrownIcon },
    { key: 'zirconiumCrown', germany: '€900 - €1,500', our: '€200', savings: '78%', Icon: DiamondIcon },
    { key: 'veneer', germany: '€800 - €1,500', our: '€250', savings: '70%', Icon: SparkleIcon },
    { key: 'allOn4', germany: '€12,000 - €20,000', our: '€3,500', savings: '75%', Icon: WrenchIcon },
    { key: 'smileMakeover', germany: '€16,000 - €30,000', our: '€5,000', savings: '70%', Icon: ToothIcon },
  ]

  return (
    <section id="pricing" className="py-24 bg-secondary-50">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading tag={t('dental.pricingTag')} title={t('dental.pricingTitle')} subtitle={t('dental.pricingSubtitle')} />

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-5 bg-primary-600 text-white p-5 font-semibold">
            <div className="col-span-2">{t('dental.pricingTable.procedure')}</div>
            <div className="hidden sm:block">{t('dental.pricingTable.germany')}</div>
            <div>{t('dental.pricingTable.ourPrice')}</div>
            <div>{t('dental.pricingTable.savings')}</div>
          </div>
          {prices.map(({ key, germany, our, savings, Icon }) => (
            <div
              key={key}
              className="grid grid-cols-5 p-5 border-b border-secondary-100 items-center hover:bg-secondary-50 transition-colors"
            >
              <div className="col-span-2 flex items-center gap-3">
                <Icon size="sm" />
                <span className="font-medium">{t(`dental.pricingRows.${key}`)}</span>
              </div>
              <div className="hidden sm:block text-secondary-500 line-through">{germany}</div>
              <div className="font-bold text-primary-600 text-lg">{our}</div>
              <div>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">{savings}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ClinicSection({ t }: { t: T }) {
  const features = [
    { key: 'equipment', icon: Building2 },
    { key: 'lab', icon: FlaskConical },
    { key: 'team', icon: Globe },
  ] as const

  return (
    <section id="clinic" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading tag={t('dental.clinicTag')} title={t('dental.clinicTitle')} subtitle={t('dental.clinicSubtitle')} />

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="flex gap-6 bg-secondary-50 p-6 rounded-xl mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element -- remote media moves to the CMS in phase 2 */}
              <img
                src="https://dentanatura.com/wp-content/uploads/2025/11/mav-scaled.png"
                alt="Dr. Mevlüt"
                className="w-28 h-28 object-cover rounded-xl"
              />
              <div>
                <h3 className="text-xl font-bold">{t('dental.doctor.name')}</h3>
                <p className="text-primary-600 font-medium mb-2">{t('dental.doctor.role')}</p>
                <p className="text-secondary-600 text-sm">{t('dental.doctor.desc')}</p>
              </div>
            </div>

            <div className="space-y-5">
              {features.map(({ key, icon: Icon }) => (
                <div key={key} className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-bold">{t(`dental.clinicFeatures.${key}.title`)}</h4>
                    <p className="text-secondary-600 text-sm">{t(`dental.clinicFeatures.${key}.desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="rounded-xl overflow-hidden mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element -- remote media moves to the CMS in phase 2 */}
              <img
                src="https://dentanatura.com/wp-content/uploads/2025/11/zespolowo-scaled.png"
                alt="Clinic team"
                className="w-full h-72 object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {['pozy', 'd1', 'd2'].map((img) => (
                // eslint-disable-next-line @next/next/no-img-element -- remote media moves to the CMS in phase 2
                <img
                  key={img}
                  src={`https://dentanatura.com/wp-content/uploads/2025/10/${img}.png`}
                  alt="Clinic"
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PackageSection({ t }: { t: T }) {
  const items = [
    { key: 'hotel', icon: Hotel },
    { key: 'transfer', icon: Car },
    { key: 'support', icon: Headphones },
    { key: 'plan', icon: ClipboardList },
  ] as const

  return (
    <section className="py-24 bg-gradient-to-br from-secondary-800 to-primary-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag section-tag-light">{t('dental.packageTag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('dental.packageTitle')}</h2>
          <p className="text-white/80 text-lg">{t('dental.packageSubtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {items.map(({ key, icon: Icon }) => (
            <div key={key} className="bg-white/10 border border-white/15 rounded-xl p-8 text-center hover:bg-white/15 transition-colors">
              <Icon className="w-10 h-10 mx-auto mb-4 opacity-90" />
              <h3 className="font-bold text-lg mb-2">{t(`dental.package.${key}.title`)}</h3>
              <p className="text-white/80 text-sm">{t(`dental.package.${key}.desc`)}</p>
            </div>
          ))}
        </div>

        <div className="text-center bg-white/10 p-5 rounded-lg">
          <p className="font-medium">{t('dental.packageNote')}</p>
        </div>
      </div>
    </section>
  )
}

function DentalContactSection({ t }: { t: T }) {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading tag={t('contact.tag')} title={t('hero.btnConsultation')} subtitle={t('contact.subtitle')} />
        <div className="max-w-2xl mx-auto">
          <ContactForm source="dental" />
        </div>
      </div>
    </section>
  )
}
