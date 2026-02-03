import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Crown, Sparkles, Diamond, Wrench, Bone, Hotel, Car, HeadphonesIcon, ClipboardList, Building2, FlaskConical, Globe } from 'lucide-react'
import ContactForm from '../components/forms/ContactForm'

export default function Dental() {
  const { t } = useTranslation()

  return (
    <>
      <DentalHero />
      <TrustBar />
      <TreatmentsSection />
      <PricingSection />
      <ClinicSection />
      <PackageSection />
      <DentalContactSection />
    </>
  )
}

// === DENTAL HERO ===
function DentalHero() {
  const { t } = useTranslation()

  return (
    <section className="relative pt-[72px] pb-20 min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 -z-10" />
      
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-secondary-500 hover:text-primary-600 mb-6">
              <ArrowLeft className="w-4 h-4" />
              {t('dental.back')}
            </Link>

            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-6">
              <Crown className="w-5 h-5 text-primary-600" />
              <span className="font-medium">{t('dental.badge')}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-2">
              {t('dental.heroTitle')}
            </h1>
            <p className="text-xl text-primary-600 font-medium mb-6">
              {t('dental.heroSubtitle')}
            </p>
            <p className="text-lg text-secondary-600 mb-8">
              {t('dental.heroDesc')}
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#contact" className="btn btn-primary btn-lg">
                {t('hero.btnConsultation')}
              </a>
              <a href="#pricing" className="btn btn-outline btn-lg">
                {t('dental.pricingTag')}
              </a>
            </div>

            <div className="space-y-3">
              {['guarantee', 'materials', 'experience'].map((key) => (
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
            <img
              src="https://dentanatura.com/wp-content/uploads/2025/11/dokt-scaled.png"
              alt="Dr. Mevlüt"
              className="w-full max-w-md mx-auto"
            />
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6">
              <div className="bg-white p-4 rounded-xl shadow-lg text-center">
                <div className="text-2xl font-bold text-primary-600">5000+</div>
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

// === TRUST BAR ===
function TrustBar() {
  const { t } = useTranslation()

  const items = [
    { key: 'ministry', icon: '🏥' },
    { key: 'german', icon: 'DE' },
    { key: 'swiss', icon: 'CH' },
    { key: 'certified', icon: '✓' },
  ]

  return (
    <section className="py-8 border-y border-secondary-200 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ key, icon }) => (
            <div key={key} className="flex items-center gap-4">
              <div className="text-2xl w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center font-bold">
                {icon}
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

// === TREATMENTS SECTION ===
function TreatmentsSection() {
  const { t } = useTranslation()

  const treatments = [
    { key: 'implants', icon: Crown, price: '€450' },
    { key: 'crowns', icon: Crown, price: '€150' },
    { key: 'veneers', icon: Sparkles, price: '€250' },
    { key: 'zirconium', icon: Diamond, price: '€200' },
    { key: 'allOn', icon: Wrench, price: '€3,500' },
    { key: 'bone', icon: Bone, price: '€200' },
  ]

  return (
    <section id="treatments" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{t('dental.servicesTag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('dental.servicesTitle')}</h2>
          <p className="text-secondary-500 text-lg">{t('dental.servicesSubtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {treatments.map(({ key, icon: Icon, price }) => (
            <div key={key} className="card card-hover p-6 flex gap-5">
              <Icon className="w-10 h-10 text-primary-600 flex-shrink-0" />
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

// === PRICING SECTION ===
function PricingSection() {
  const { t } = useTranslation()

  const prices = [
    { name: 'Dental Implant (Premium)', germany: '€1,800 - €3,500', our: '€450', savings: '75%' },
    { name: 'Ceramic Crown', germany: '€700 - €1,200', our: '€150', savings: '80%' },
    { name: 'Zirconium Crown', germany: '€900 - €1,500', our: '€200', savings: '78%' },
    { name: 'Veneer', germany: '€800 - €1,500', our: '€250', savings: '70%' },
    { name: 'All-on-4 (jaw)', germany: '€12,000 - €20,000', our: '€3,500', savings: '75%' },
    { name: 'Smile Makeover (20 veneers)', germany: '€16,000 - €30,000', our: '€5,000', savings: '70%' },
  ]

  return (
    <section id="pricing" className="py-24 bg-secondary-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{t('dental.pricingTag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('dental.pricingTitle')}</h2>
          <p className="text-secondary-500 text-lg">{t('dental.pricingSubtitle')}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-4 bg-primary-600 text-white p-5 font-semibold">
            <div>{t('dental.pricingTable.procedure')}</div>
            <div className="hidden sm:block">{t('dental.pricingTable.germany')}</div>
            <div>{t('dental.pricingTable.ourPrice')}</div>
            <div>{t('dental.pricingTable.savings')}</div>
          </div>
          {prices.map((item, i) => (
            <div key={i} className="grid grid-cols-4 p-5 border-b border-secondary-100 items-center hover:bg-secondary-50">
              <div className="font-medium">{item.name}</div>
              <div className="hidden sm:block text-secondary-500 line-through">{item.germany}</div>
              <div className="font-bold text-primary-600">{item.our}</div>
              <div>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {t('dental.pricingTable.savings')} {item.savings}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// === CLINIC SECTION ===
function ClinicSection() {
  const { t } = useTranslation()

  const features = [
    { key: 'equipment', icon: Building2 },
    { key: 'lab', icon: FlaskConical },
    { key: 'team', icon: Globe },
  ]

  return (
    <section id="clinic" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{t('dental.clinicTag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('dental.clinicTitle')}</h2>
          <p className="text-secondary-500 text-lg">{t('dental.clinicSubtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="flex gap-6 bg-secondary-50 p-6 rounded-xl mb-8">
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
              <img
                src="https://dentanatura.com/wp-content/uploads/2025/11/zespolowo-scaled.png"
                alt="Clinic team"
                className="w-full h-72 object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {['pozy', 'd1', 'd2'].map((img) => (
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

// === PACKAGE SECTION ===
function PackageSection() {
  const { t } = useTranslation()

  const items = [
    { key: 'hotel', icon: Hotel },
    { key: 'transfer', icon: Car },
    { key: 'support', icon: HeadphonesIcon },
    { key: 'plan', icon: ClipboardList },
  ]

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
            <div key={key} className="bg-white/10 border border-white/15 rounded-xl p-8 text-center">
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

// === CONTACT SECTION ===
function DentalContactSection() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{t('contact.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('hero.btnConsultation')}</h2>
          <p className="text-secondary-500 text-lg">{t('contact.subtitle')}</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <ContactForm source="dental" />
        </div>
      </div>
    </section>
  )
}
