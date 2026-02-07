import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { 
  Building2, Stethoscope, Wallet, Clock, Palmtree, Shield,
  CheckCircle2, Phone, Mail, MapPin, MessageCircle, Syringe, Scissors, Sparkles
} from 'lucide-react'
import ContactForm from '../components/forms/ContactForm'
import { ToothIcon, SyringeIcon, ScissorsIcon, SparkleIcon } from '../components/ui/MedicalIcon'
import OlegImg from "../photo/oleg.png";
import AlexImg from "../photo/alex.png";
import GalinaImg from "../photo/galina.png";

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <HeroSection />
      <WhySection />
      <ServicesSection />
      <AboutSection />
      <AudienceSection />
      <ProcessSection />
      <TeamSection />
      <CTASection />
      <ContactSection />
    </>
  )
}

// === HERO SECTION ===
function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-screen flex items-center pt-[72px] pb-20 overflow-hidden">
      {/* Background */}
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

            <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>

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
              <div>
                <div className="text-3xl font-bold text-primary-600">500+</div>
                <div className="text-sm text-secondary-500">{t('hero.stats.clients')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">15+</div>
                <div className="text-sm text-secondary-500">{t('hero.stats.clinics')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">60%</div>
                <div className="text-sm text-secondary-500">{t('hero.stats.savings')}</div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block h-[500px]">
            <div className="absolute top-[10%] left-[5%] bg-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 animate-float">
              <ToothIcon size="sm" />
              <span className="font-semibold">{t('services.dental.title')}</span>
            </div>
            <div className="absolute top-[25%] right-[10%] bg-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 animate-float" style={{ animationDelay: '1.5s' }}>
              <SyringeIcon size="sm" />
              <span className="font-semibold">{t('services.plastic.title')}</span>
            </div>
            <div className="absolute top-[55%] left-[15%] bg-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 animate-float" style={{ animationDelay: '3s' }}>
              <ScissorsIcon size="sm" />
              <span className="font-semibold">{t('services.hair.title')}</span>
            </div>
            <div className="absolute bottom-[15%] right-[5%] bg-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 animate-float" style={{ animationDelay: '4.5s' }}>
              <SparkleIcon size="sm" />
              <span className="font-semibold">{t('services.aesthetic.title')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// === WHY SECTION ===
function WhySection() {
  const { t } = useTranslation()

  const items = [
    { icon: Building2, key: 'clinics' },
    { icon: Stethoscope, key: 'doctors' },
    { icon: Wallet, key: 'savings' },
    { icon: Clock, key: 'fast' },
    { icon: Palmtree, key: 'comfort' },
    { icon: Shield, key: 'guarantee' },
  ]

  return (
    <section id="why" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{t('why.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('why.title')}</h2>
          <p className="text-secondary-500 text-lg">{t('why.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ icon: Icon, key }) => (
            <div key={key} className="card card-hover p-8">
              <Icon className="w-10 h-10 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">{t(`why.items.${key}.title`)}</h3>
              <p className="text-secondary-600">{t(`why.items.${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// === SERVICES SECTION ===
function ServicesSection() {
  const { t } = useTranslation()

  const services = [
    { key: 'dental', IconComponent: ToothIcon, link: '/dental', price: '€450' },
    { key: 'plastic', IconComponent: SyringeIcon, link: '/plastic', price: '€2,500'},
    { key: 'hair', IconComponent: ScissorsIcon, link: '/hair', price: '€1,800'},
    { key: 'aesthetic', IconComponent: SparkleIcon, link: '/aesthetic', price: '€150'},
  ]

  return (
    <section id="services" className="py-24 bg-secondary-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{t('services.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('services.title')}</h2>
          <p className="text-secondary-500 text-lg">{t('services.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ key, IconComponent, link, price, soon }) => (
            <Link
              key={key}
              to={link}
              className="card card-hover overflow-hidden flex flex-col"
            >
              <div className="relative bg-secondary-200 h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50">
                  <IconComponent size="xl" className="text-white" />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <IconComponent size="md" className="mb-3" />
                <h3 className="text-xl font-bold mb-2">{t(`services.${key}.title`)}</h3>
                <p className="text-secondary-600 mb-4 flex-1">{t(`services.${key}.desc`)}</p>
                <div className="pt-4 border-t border-secondary-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-sm text-secondary-500">{t(`services.${key}.price`)} </span>
                    <span className="text-2xl font-bold text-primary-600">{price}</span>
                  </div>
                  <span className="text-primary-600 font-semibold flex items-center gap-2">
                    {soon ? t('services.soon') : t('services.more')}
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
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

// === ABOUT SECTION ===
function AboutSection() {
  const { t } = useTranslation()

  const features = ['consultation', 'selection', 'plan', 'translation', 'organization', 'support', 'aftercare']

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
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

// === AUDIENCE SECTION ===
function AudienceSection() {
  const { t } = useTranslation()
  const items = ['germany', 'quality', 'safety', 'trust']
  const icons = ['DE', 'Premium', 'Safe', 'Trust']

  return (
    <section className="py-24 bg-gradient-to-br from-secondary-800 to-primary-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag section-tag-light">{t('audience.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold">{t('audience.title')}</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((key, i) => (
            <div key={key} className="bg-white/10 border border-white/15 rounded-xl p-8 text-center hover:bg-white/15 transition-all hover:-translate-y-1">
              <div className="text-3xl mb-4">{icons[i]}</div>
              <p className="opacity-90">{t(`audience.items.${key}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// === PROCESS SECTION ===
function ProcessSection() {
  const { t } = useTranslation()
  const steps = ['consultation', 'plan', 'trip', 'result']

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{t('process.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('process.title')}</h2>
          <p className="text-secondary-500 text-lg">{t('process.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-secondary-200" />
          
          {steps.map((key, i) => (
            <div key={key} className="text-center relative">
              <div className="w-20 h-20 mx-auto mb-6 bg-white border-2 border-primary-600 rounded-full flex items-center justify-center text-2xl font-bold text-primary-600 relative z-10">
                0{i + 1}
              </div>
              <h3 className="text-xl font-bold mb-2">{t(`process.steps.${key}.title`)}</h3>
              <p className="text-secondary-600">{t(`process.steps.${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// === TEAM SECTION ===
function TeamSection() {
  const { t } = useTranslation()

  const team = [
    {
      key: 'oleg',
      phone: '+49 173 6631438',
      langs: ['ru'],
      chief: true,
      image: OlegImg,
    },
    {
      key: 'alexander',
      phone: '+49 1575 1129620',
      langs: ['ru', 'de', 'uk'],
      image: AlexImg,
    },
    {
      key: 'galina',
      phone: '+49 1578 9123142',
      langs: ['ru', 'de'],
      image: GalinaImg,
    },
  ]

  return (
    <section id="team" className="py-24 bg-secondary-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{t('team.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('team.title')}</h2>
          <p className="text-secondary-500 text-lg">{t('team.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map(({ key, phone, langs, chief, image }) => (
            <div key={key} className="card overflow-hidden">
              <div className="relative h-72">
                <img src={image} alt={t(`team.members.${key}.name`)} className="w-full h-full object-contain bg-secondary-100" />
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
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-all">
                    <Phone className="w-5 h-5" />
                    <span className="font-medium">{phone}</span>
                  </a>
                  <a href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-[#25d366] text-white rounded-lg hover:bg-[#1da851] transition-all">
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

// === CTA SECTION ===
function CTASection() {
  const { t } = useTranslation()

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

// === CONTACT SECTION ===
function ContactSection() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{t('contact.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('contact.title')}</h2>
          <p className="text-secondary-500 text-lg">{t('contact.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="card p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h4 className="font-bold mb-1">{t('contact.info.phone')}</h4>
                <a href="tel:+491736631438" className="text-primary-600 font-medium">+49 173 6631438</a>
                <p className="text-sm text-secondary-500">{t('contact.info.phoneHours')}</p>
              </div>
            </div>

            <div className="card p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h4 className="font-bold mb-1">{t('contact.info.whatsapp')}</h4>
                <a href="https://wa.me/491736631438" target="_blank" rel="noopener noreferrer" className="text-primary-600 font-medium">
                  {t('contact.info.whatsappText')}
                </a>
                <p className="text-sm text-secondary-500">{t('contact.info.whatsappFast')}</p>
              </div>
            </div>

            <div className="card p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h4 className="font-bold mb-1">{t('contact.info.email')}</h4>
                <a href="mailto:info@medconsult-turkey.com" className="text-primary-600 font-medium">
                  info@medconsult-turkey.com
                </a>
                <p className="text-sm text-secondary-500">{t('contact.info.emailText')}</p>
              </div>
            </div>

            <div className="card p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h4 className="font-bold mb-1">{t('contact.info.office')}</h4>
                <p className="text-secondary-700">{t('contact.info.officeGermany')}</p>
                <p className="text-sm text-secondary-500">{t('contact.info.officeTurkey')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
