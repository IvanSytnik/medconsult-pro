import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { 
  Shield, Award, Users, Sparkles, CheckCircle2, 
  MessageCircle, Calendar, Star, Clock, Zap
} from 'lucide-react'
import ContactForm from '../components/forms/ContactForm'
import { SparkleIcon } from '../components/ui/MedicalIcon'

export default function Aesthetic() {
  const { t } = useTranslation()

  return (
    <div className="pt-[72px]">
      <HeroSection />
      <WhyAestheticSection />
      <TreatmentsSection />
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
              <SparkleIcon size="sm" />
              <span className="font-medium text-secondary-700">{t('aesthetic.hero.tag')}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
              {t('aesthetic.hero.title')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                {t('aesthetic.hero.titleAccent')}
              </span>
            </h1>

            <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
              {t('aesthetic.hero.description')}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#contact" className="btn btn-primary btn-lg">
                <MessageCircle className="w-5 h-5" />
                {t('aesthetic.hero.consultation')}
              </a>
              <a href="#treatments" className="btn btn-outline btn-lg">
                {t('aesthetic.hero.allTreatments')}
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary-600">150€+</div>
                <div className="text-sm text-secondary-500">{t('aesthetic.hero.stats.price')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">0</div>
                <div className="text-sm text-secondary-500">{t('aesthetic.hero.stats.downtime')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600">70%</div>
                <div className="text-sm text-secondary-500">{t('aesthetic.hero.stats.savings')}</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=500&fit=crop" 
                alt={t('aesthetic.hero.tag')}
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
              <div className="text-4xl font-bold text-primary-600">30+</div>
              <div className="text-secondary-600 font-medium">{t('aesthetic.hero.stats.procedures')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// === WHY AESTHETIC SECTION ===
function WhyAestheticSection() {
  const { t } = useTranslation()

  const items = [
    { 
      icon: Award, 
      titleKey: 'aesthetic.why.items.specialists.title',
      descKey: 'aesthetic.why.items.specialists.desc'
    },
    { 
      icon: Shield, 
      titleKey: 'aesthetic.why.items.original.title',
      descKey: 'aesthetic.why.items.original.desc'
    },
    { 
      icon: Sparkles, 
      titleKey: 'aesthetic.why.items.natural.title',
      descKey: 'aesthetic.why.items.natural.desc'
    },
    { 
      icon: Users, 
      titleKey: 'aesthetic.why.items.individual.title',
      descKey: 'aesthetic.why.items.individual.desc'
    },
    { 
      icon: Zap, 
      titleKey: 'aesthetic.why.items.fast.title',
      descKey: 'aesthetic.why.items.fast.desc'
    },
    { 
      icon: Clock, 
      titleKey: 'aesthetic.why.items.minimal.title',
      descKey: 'aesthetic.why.items.minimal.desc'
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{t('aesthetic.why.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('aesthetic.why.title')}
          </h2>
          <p className="text-secondary-500 text-lg">
            {t('aesthetic.why.subtitle')}
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

// === TREATMENTS SECTION ===
function TreatmentsSection() {
  const { t } = useTranslation()

  const treatmentKeys = [
    'botox', 'fillers', 'mesotherapy', 'prp', 'peeling', 
    'laser', 'threads', 'removal', 'contouring'
  ]

  const treatmentImages = {
    botox: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop',
    fillers: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=300&fit=crop',
    mesotherapy: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    prp: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=300&fit=crop',
    peeling: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=300&fit=crop',
    laser: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=300&fit=crop',
    threads: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=300&fit=crop',
    removal: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=400&h=300&fit=crop',
    contouring: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop'
  }

  return (
    <section id="treatments" className="py-24 bg-secondary-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{t('aesthetic.treatments.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('aesthetic.treatments.title')}
          </h2>
          <p className="text-secondary-500 text-lg">
            {t('aesthetic.treatments.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatmentKeys.map((key) => {
            const price = t(`aesthetic.treatments.list.${key}.price`)
            return (
              <div key={key} className="card overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={treatmentImages[key]} 
                    alt={t(`aesthetic.treatments.list.${key}.title`)} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white text-xl font-bold">
                      {t(`aesthetic.treatments.list.${key}.title`)}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-secondary-600 mb-4">
                    {t(`aesthetic.treatments.list.${key}.desc`)}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary-500">{t('aesthetic.treatments.duration')}</span>
                      <span className="font-medium">{t(`aesthetic.treatments.list.${key}.duration`)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary-500">{t('aesthetic.treatments.effect')}</span>
                      <span className="font-medium">{t(`aesthetic.treatments.list.${key}.result`)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary-500">{t('aesthetic.treatments.downtime')}</span>
                      <span className="font-medium text-green-600">
                        {t(`aesthetic.treatments.list.${key}.downtime`)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-secondary-100 flex items-center justify-between">
                    <div>
                      <span className="text-sm text-secondary-500">{t('aesthetic.treatments.from')} </span>
                      <span className="text-2xl font-bold text-primary-600">
                        {price.split(' - ')[0]}
                      </span>
                    </div>
                    <a href="#contact" className="text-primary-600 font-semibold hover:underline">
                      {t('aesthetic.treatments.learnMore')}
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

  const benefits = t('aesthetic.benefits.list', { returnObjects: true })

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-tag">{t('aesthetic.benefits.tag')}</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('aesthetic.benefits.title')}
            </h2>
            <p className="text-lg text-secondary-600 mb-8">
              {t('aesthetic.benefits.description')}
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
              <p className="text-sm text-secondary-600 mb-2">{t('aesthetic.benefits.savingsLabel')}</p>
              <p className="text-3xl font-bold text-primary-600">{t('aesthetic.benefits.savingsValue')}</p>
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=500&fit=crop" 
              alt={t('aesthetic.hero.tag')}
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

  const stepKeys = ['consultation', 'preparation', 'procedure', 'care']

  return (
    <section className="py-24 bg-secondary-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{t('aesthetic.process.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('aesthetic.process.title')}
          </h2>
          <p className="text-secondary-500 text-lg">
            {t('aesthetic.process.subtitle')}
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
                {t(`aesthetic.process.steps.${key}.title`)}
              </h3>
              <p className="text-secondary-600">
                {t(`aesthetic.process.steps.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-2xl">
          <h3 className="text-2xl font-bold mb-6 text-center">
            {t('aesthetic.process.featuresTitle')}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-secondary-50 rounded-xl">
              <Zap className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h4 className="font-bold mb-2">{t('aesthetic.process.features.fast.title')}</h4>
              <p className="text-sm text-secondary-600">{t('aesthetic.process.features.fast.desc')}</p>
            </div>
            <div className="text-center p-6 bg-secondary-50 rounded-xl">
              <Shield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h4 className="font-bold mb-2">{t('aesthetic.process.features.safe.title')}</h4>
              <p className="text-sm text-secondary-600">{t('aesthetic.process.features.safe.desc')}</p>
            </div>
            <div className="text-center p-6 bg-secondary-50 rounded-xl">
              <Star className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h4 className="font-bold mb-2">{t('aesthetic.process.features.effective.title')}</h4>
              <p className="text-sm text-secondary-600">{t('aesthetic.process.features.effective.desc')}</p>
            </div>
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
          <span className="section-tag section-tag-light">{t('aesthetic.results.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('aesthetic.results.title')}
          </h2>
          <p className="text-xl opacity-90 mb-12">
            {t('aesthetic.results.subtitle')}
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 border border-white/15 rounded-xl p-8">
              <div className="text-4xl font-bold mb-2">99%</div>
              <p className="opacity-90">{t('aesthetic.results.stats.satisfaction')}</p>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-8">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <p className="opacity-90">{t('aesthetic.results.stats.procedures')}</p>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-8">
              <div className="text-4xl font-bold mb-2">0</div>
              <p className="opacity-90">{t('aesthetic.results.stats.downtime')}</p>
            </div>
          </div>

          <a href="#contact" className="btn btn-white btn-lg">
            <Calendar className="w-5 h-5" />
            {t('aesthetic.results.bookProcedure')}
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
          <span className="section-tag">{t('aesthetic.contact.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('aesthetic.contact.title')}
          </h2>
          <p className="text-secondary-500 text-lg">
            {t('aesthetic.contact.subtitle')}
          </p>
        </div>

        <div className="card p-8">
          <ContactForm />
        </div>

        <div className="mt-8 text-center">
          <p className="text-secondary-600 mb-4">{t('aesthetic.contact.directContact')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/491736631438" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <MessageCircle className="w-5 h-5" />
              {t('aesthetic.contact.whatsapp')}
            </a>
            <a href="mailto:info@medconsult-turkey.com" className="btn btn-outline">
              {t('aesthetic.contact.email')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
