import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { 
  Shield, Award, Users, Microscope, CheckCircle2, 
  MessageCircle, Calendar, Target, TrendingUp, Clock
} from 'lucide-react'
import ContactForm from '../components/forms/ContactForm'
import { ScissorsIcon } from '../components/ui/MedicalIcon'

export default function Hair() {
  const { t } = useTranslation()

  return (
    <div className="pt-[72px]">
      <HeroSection />
      <WhyHairSection />
      <MethodsSection />
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
              <ScissorsIcon size="sm" />
              <span className="font-medium text-secondary-700">{t('hair.hero.tag')}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
              {t('hair.hero.title')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                {t('hair.hero.titleAccent')}
              </span>
            </h1>

            <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
              {t('hair.hero.description')}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#contact" className="btn btn-primary btn-lg">
                <MessageCircle className="w-5 h-5" />
                {t('hair.hero.freeAnalysis')}
              </a>
              <a href="#methods" className="btn btn-outline btn-lg">
                {t('hair.hero.methods')}
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary-600">1,800€+</div>
                <div className="text-sm text-secondary-500">{t('hair.hero.stats.price')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">5000+</div>
                <div className="text-sm text-secondary-500">{t('hair.hero.stats.grafts')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">95%+</div>
                <div className="text-sm text-secondary-500">{t('hair.hero.stats.survival')}</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1622296640557-8c1b5a6e69d0?w=600&h=500&fit=crop" 
                alt={t('hair.hero.tag')}
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
              <div className="text-4xl font-bold text-primary-600">1.5M+</div>
              <div className="text-secondary-600 font-medium">{t('hair.hero.stats.operations')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// === WHY HAIR SECTION ===
function WhyHairSection() {
  const { t } = useTranslation()

  const items = [
    { 
      icon: Award, 
      titleKey: 'hair.why.items.leaders.title',
      descKey: 'hair.why.items.leaders.desc'
    },
    { 
      icon: Shield, 
      titleKey: 'hair.why.items.guarantee.title',
      descKey: 'hair.why.items.guarantee.desc'
    },
    { 
      icon: Microscope, 
      titleKey: 'hair.why.items.technology.title',
      descKey: 'hair.why.items.technology.desc'
    },
    { 
      icon: Users, 
      titleKey: 'hair.why.items.specialists.title',
      descKey: 'hair.why.items.specialists.desc'
    },
    { 
      icon: Target, 
      titleKey: 'hair.why.items.precision.title',
      descKey: 'hair.why.items.precision.desc'
    },
    { 
      icon: TrendingUp, 
      titleKey: 'hair.why.items.survival.title',
      descKey: 'hair.why.items.survival.desc'
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{t('hair.why.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('hair.why.title')}
          </h2>
          <p className="text-secondary-500 text-lg">
            {t('hair.why.subtitle')}
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

// === METHODS SECTION ===
function MethodsSection() {
  const { t } = useTranslation()

  const methodKeys = ['fue', 'sapphire', 'dhi', 'dhiPrp', 'beard', 'afro']

  const methodImages = {
    fue: 'https://images.unsplash.com/photo-1622296640557-8c1b5a6e69d0?w=400&h=300&fit=crop',
    sapphire: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop',
    dhi: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop',
    dhiPrp: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop',
    beard: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=300&fit=crop',
    afro: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop'
  }

  return (
    <section id="methods" className="py-24 bg-secondary-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{t('hair.methods.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('hair.methods.title')}
          </h2>
          <p className="text-secondary-500 text-lg">
            {t('hair.methods.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {methodKeys.map((key) => {
            const price = t(`hair.methods.list.${key}.price`)
            return (
              <div key={key} className="card overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={methodImages[key]} 
                    alt={t(`hair.methods.list.${key}.title`)} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white text-xl font-bold">
                      {t(`hair.methods.list.${key}.title`)}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-secondary-600 mb-4">
                    {t(`hair.methods.list.${key}.desc`)}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary-500">{t('hair.methods.graftsLabel')}</span>
                      <span className="font-medium">{t(`hair.methods.list.${key}.grafts`)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary-500">{t('hair.methods.recoveryLabel')}</span>
                      <span className="font-medium">{t(`hair.methods.list.${key}.recovery`)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary-500">{t('hair.methods.survivalLabel')}</span>
                      <span className="font-medium text-green-600">
                        {t(`hair.methods.list.${key}.survival`)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-secondary-100 flex items-center justify-between">
                    <div>
                      <span className="text-sm text-secondary-500">{t('hair.methods.from')} </span>
                      <span className="text-2xl font-bold text-primary-600">
                        {price.split(' - ')[0]}
                      </span>
                    </div>
                    <a href="#contact" className="text-primary-600 font-semibold hover:underline">
                      {t('hair.methods.learnMore')}
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// === BENEFITS SECTION ===
function BenefitsSection() {
  const { t } = useTranslation()

  const benefits = t('hair.benefits.list', { returnObjects: true })

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-tag">{t('hair.benefits.tag')}</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('hair.benefits.title')}
            </h2>
            <p className="text-lg text-secondary-600 mb-8">
              {t('hair.benefits.description')}
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
              <p className="text-sm text-secondary-600 mb-2">{t('hair.benefits.savingsLabel')}</p>
              <p className="text-3xl font-bold text-primary-600">{t('hair.benefits.savingsValue')}</p>
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=600&h=500&fit=crop" 
              alt={t('hair.hero.tag')}
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

  const stepKeys = ['analysis', 'preparation', 'operation', 'result']
  const timelineKeys = ['weeks', 'months3', 'months6', 'months12']
  const timelineEmojis = ['📅', '🌱', '✨', '🎉']

  return (
    <section className="py-24 bg-secondary-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{t('hair.process.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('hair.process.title')}
          </h2>
          <p className="text-secondary-500 text-lg">
            {t('hair.process.subtitle')}
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
                {t(`hair.process.steps.${key}.title`)}
              </h3>
              <p className="text-secondary-600">
                {t(`hair.process.steps.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4 text-center">
            {t('hair.process.timelineTitle')}
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {timelineKeys.map((key, index) => (
              <div key={key} className="text-center">
                <div className="text-4xl mb-2">{timelineEmojis[index]}</div>
                <div className="font-bold mb-1">
                  {t(`hair.process.timeline.${key}.title`)}
                </div>
                <p className="text-sm text-secondary-600">
                  {t(`hair.process.timeline.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
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
          <span className="section-tag section-tag-light">{t('hair.results.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('hair.results.title')}
          </h2>
          <p className="text-xl opacity-90 mb-12">
            {t('hair.results.subtitle')}
          </p>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="bg-white/10 border border-white/15 rounded-xl p-8">
              <div className="text-4xl font-bold mb-2">95%+</div>
              <p className="opacity-90">{t('hair.results.stats.survival')}</p>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-8">
              <div className="text-4xl font-bold mb-2">1.5M</div>
              <p className="opacity-90">{t('hair.results.stats.operations')}</p>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-8">
              <div className="text-4xl font-bold mb-2">70%</div>
              <p className="opacity-90">{t('hair.results.stats.savings')}</p>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-8">
              <div className="text-4xl font-bold mb-2">∞</div>
              <p className="opacity-90">{t('hair.results.stats.lifetime')}</p>
            </div>
          </div>

          <a href="#contact" className="btn btn-white btn-lg">
            <Calendar className="w-5 h-5" />
            {t('hair.results.getFreeAnalysis')}
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
          <span className="section-tag">{t('hair.contact.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('hair.contact.title')}
          </h2>
          <p className="text-secondary-500 text-lg">
            {t('hair.contact.subtitle')}
          </p>
        </div>

        <div className="card p-8">
          <ContactForm />
        </div>

        <div className="mt-8 text-center">
          <p className="text-secondary-600 mb-4">{t('hair.contact.directContact')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/491736631438" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <MessageCircle className="w-5 h-5" />
              {t('hair.contact.whatsapp')}
            </a>
            <a href="mailto:info@medconsult-turkey.com" className="btn btn-outline">
              {t('hair.contact.email')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
