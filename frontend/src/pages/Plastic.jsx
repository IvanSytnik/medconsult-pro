import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { 
  Shield, Award, Users, HeartPulse, CheckCircle2, 
  MessageCircle, Calendar, Plane, Stethoscope, Clock
} from 'lucide-react'
import ContactForm from '../components/forms/ContactForm'
import { SyringeIcon } from '../components/ui/MedicalIcon'

export default function Plastic() {
  const { t } = useTranslation()

  return (
    <div className="pt-[72px]">
      <HeroSection />
      <WhyPlasticSection />
      <ProceduresSection />
      <BenefitsSection />
      <ProcessSection />
      <ResultsSection />
      <ContactFormSection />
    </div>
  )
}

// === HERO SECTION ===
function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-[600px] flex items-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-6">
              <SyringeIcon size="sm" />
              <span className="font-medium text-secondary-700">{t('plastic.hero.tag')}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
              {t('plastic.hero.title')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                {t('plastic.hero.titleAccent')}
              </span>
            </h1>

            <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
              {t('plastic.hero.description')}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#contact" className="btn btn-primary btn-lg">
                <MessageCircle className="w-5 h-5" />
                {t('plastic.hero.consultation')}
              </a>
              <a href="#procedures" className="btn btn-outline btn-lg">
                {t('plastic.hero.procedures')}
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary-600">2,500€+</div>
                <div className="text-sm text-secondary-500">{t('plastic.hero.stats.price')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">JCI</div>
                <div className="text-sm text-secondary-500">{t('plastic.hero.stats.accreditation')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">60%</div>
                <div className="text-sm text-secondary-500">{t('plastic.hero.stats.savings')}</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=500&fit=crop" 
                alt={t('plastic.hero.tag')}
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
              <div className="text-4xl font-bold text-primary-600">15+</div>
              <div className="text-secondary-600 font-medium">{t('plastic.hero.stats.experience')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// === WHY PLASTIC SECTION ===
function WhyPlasticSection() {
  const { t } = useTranslation()

  const items = [
    { 
      icon: Award, 
      titleKey: 'plastic.why.items.surgeons.title',
      descKey: 'plastic.why.items.surgeons.desc'
    },
    { 
      icon: Shield, 
      titleKey: 'plastic.why.items.safety.title',
      descKey: 'plastic.why.items.safety.desc'
    },
    { 
      icon: Users, 
      titleKey: 'plastic.why.items.individual.title',
      descKey: 'plastic.why.items.individual.desc'
    },
    { 
      icon: HeartPulse, 
      titleKey: 'plastic.why.items.equipment.title',
      descKey: 'plastic.why.items.equipment.desc'
    },
    { 
      icon: Stethoscope, 
      titleKey: 'plastic.why.items.care.title',
      descKey: 'plastic.why.items.care.desc'
    },
    { 
      icon: Clock, 
      titleKey: 'plastic.why.items.recovery.title',
      descKey: 'plastic.why.items.recovery.desc'
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{t('plastic.why.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('plastic.why.title')}
          </h2>
          <p className="text-secondary-500 text-lg">
            {t('plastic.why.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ icon: Icon, titleKey, descKey }) => (
            <div key={titleKey} className="card card-hover p-8">
              <Icon className="w-10 h-10 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">{t(titleKey)}</h3>
              <p className="text-secondary-600">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// === PROCEDURES SECTION ===
function ProceduresSection() {
  const { t } = useTranslation()

  const procedureKeys = [
    'rhinoplasty', 
    'mammoplasty', 
    'abdominoplasty', 
    'liposuction', 
    'facelift', 
    'mommyMakeover'
  ]

  const procedureImages = {
    rhinoplasty: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop',
    mammoplasty: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop',
    abdominoplasty: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    liposuction: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=300&fit=crop',
    facelift: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop',
    mommyMakeover: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop'
  }

  return (
    <section id="procedures" className="py-24 bg-secondary-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{t('plastic.procedures.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('plastic.procedures.title')}
          </h2>
          <p className="text-secondary-500 text-lg">
            {t('plastic.procedures.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {procedureKeys.map((key) => (
            <div key={key} className="card overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={procedureImages[key]} 
                  alt={t(`plastic.procedures.list.${key}.title`)} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white text-xl font-bold">
                    {t(`plastic.procedures.list.${key}.title`)}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-secondary-600 mb-4">
                  {t(`plastic.procedures.list.${key}.desc`)}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-500">{t('plastic.procedures.durationLabel')}</span>
                    <span className="font-medium">{t(`plastic.procedures.list.${key}.duration`)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-500">{t('plastic.procedures.recoveryLabel')}</span>
                    <span className="font-medium">{t(`plastic.procedures.list.${key}.recovery`)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-secondary-100 flex items-center justify-between">
                  <div>
                    <span className="text-sm text-secondary-500">{t('plastic.procedures.from')} </span>
                    <span className="text-2xl font-bold text-primary-600">
                      {t(`plastic.procedures.list.${key}.price`)}
                    </span>
                  </div>
                  <a href="#contact" className="text-primary-600 font-semibold hover:underline">
                    {t('plastic.procedures.learnMore')}
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

// === BENEFITS SECTION ===
function BenefitsSection() {
  const { t } = useTranslation()

  const benefits = t('plastic.benefits.list', { returnObjects: true })

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-tag">{t('plastic.benefits.tag')}</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('plastic.benefits.title')}
            </h2>
            <p className="text-lg text-secondary-600 mb-8">
              {t('plastic.benefits.description')}
            </p>

            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-primary-50 rounded-xl">
              <p className="text-sm text-secondary-600 mb-2">{t('plastic.benefits.savingsLabel')}</p>
              <p className="text-3xl font-bold text-primary-600">{t('plastic.benefits.savingsValue')}</p>
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=500&fit=crop" 
              alt={t('plastic.hero.tag')}
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// === PROCESS SECTION ===
function ProcessSection() {
  const { t } = useTranslation()

  const stepKeys = ['consultation', 'planning', 'operation', 'recovery']

  return (
    <section className="py-24 bg-secondary-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{t('plastic.process.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('plastic.process.title')}
          </h2>
          <p className="text-secondary-500 text-lg">
            {t('plastic.process.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-secondary-200" />
          
          {stepKeys.map((key, index) => (
            <div key={key} className="text-center relative">
              <div className="w-20 h-20 mx-auto mb-6 bg-white border-2 border-primary-600 rounded-full flex items-center justify-center text-2xl font-bold text-primary-600 relative z-10">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t(`plastic.process.steps.${key}.title`)}
              </h3>
              <p className="text-secondary-600">
                {t(`plastic.process.steps.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// === RESULTS SECTION ===
function ResultsSection() {
  const { t } = useTranslation()

  return (
    <section className="py-24 bg-gradient-to-br from-secondary-800 to-primary-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="section-tag section-tag-light">{t('plastic.results.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('plastic.results.title')}
          </h2>
          <p className="text-xl opacity-90 mb-12">
            {t('plastic.results.subtitle')}
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 border border-white/15 rounded-xl p-8">
              <div className="text-4xl font-bold mb-2">98%</div>
              <p className="opacity-90">{t('plastic.results.stats.satisfaction')}</p>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-8">
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="opacity-90">{t('plastic.results.stats.operations')}</p>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-8">
              <div className="text-4xl font-bold mb-2">15+</div>
              <p className="opacity-90">{t('plastic.results.stats.experience')}</p>
            </div>
          </div>

          <a href="#contact" className="btn btn-white btn-lg">
            <Calendar className="w-5 h-5" />
            {t('plastic.results.bookConsultation')}
          </a>
        </div>
      </div>
    </section>
  )
}

// === CONTACT FORM SECTION ===
function ContactFormSection() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-tag">{t('plastic.contact.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('plastic.contact.title')}
          </h2>
          <p className="text-secondary-500 text-lg">
            {t('plastic.contact.subtitle')}
          </p>
        </div>

        <div className="card p-8">
          <ContactForm />
        </div>

        <div className="mt-8 text-center">
          <p className="text-secondary-600 mb-4">{t('plastic.contact.directContact')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+491736631438" className="btn btn-outline">
              <MessageCircle className="w-5 h-5" />
              {t('plastic.contact.whatsapp')}
            </a>
            <a href="mailto:info@medconsult-turkey.com" className="btn btn-outline">
              {t('plastic.contact.email')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
