import { ArrowRight, Award, Calendar, Clock, Shield, Sparkles, Star, Users, Zap } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import {
  BenefitsSection,
  IconCardGrid,
  ProcedureCard,
  ProcessSteps,
  ResultsBand,
  SectionHeading,
  ServiceContactSection,
  ServiceHero,
} from '@/components/sections/common'
import { SparkleIcon } from '@/components/ui/MedicalIcon'
import { resolveLocale } from '@/i18n/locale'
import { CONTACT, pageMetadata } from '@/lib/site'

const TREATMENTS = {
  botox: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop',
  fillers: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=300&fit=crop',
  mesotherapy: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
  prp: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=300&fit=crop',
  peeling: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=300&fit=crop',
  laser: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=300&fit=crop',
  threads: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=300&fit=crop',
  removal: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=400&h=300&fit=crop',
  contouring: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop',
} as const

export async function generateMetadata({ params }: PageProps<'/[locale]/aesthetic'>): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const t = await getTranslations({ locale })
  return pageMetadata(
    locale,
    '/aesthetic',
    `${t('aesthetic.hero.title')} ${t('aesthetic.hero.titleAccent')}`,
    t('aesthetic.hero.description')
  )
}

export default async function AestheticPage({ params }: PageProps<'/[locale]/aesthetic'>) {
  await resolveLocale(params)
  const t = await getTranslations()

  const whyItems = [
    { icon: Award, key: 'specialists' },
    { icon: Shield, key: 'original' },
    { icon: Sparkles, key: 'natural' },
    { icon: Users, key: 'individual' },
    { icon: Zap, key: 'fast' },
    { icon: Clock, key: 'minimal' },
  ] as const

  const features = [
    { key: 'fast', Icon: Zap },
    { key: 'safe', Icon: Shield },
    { key: 'effective', Icon: Star },
  ] as const

  return (
    <div className="pt-[72px]">
      <ServiceHero
        badgeIcon={<SparkleIcon size="sm" />}
        tag={t('aesthetic.hero.tag')}
        title={t('aesthetic.hero.title')}
        titleAccent={t('aesthetic.hero.titleAccent')}
        description={t('aesthetic.hero.description')}
        primaryLabel={t('aesthetic.hero.consultation')}
        secondaryLabel={t('aesthetic.hero.allTreatments')}
        secondaryHref="#treatments"
        stats={[
          { value: '150€+', label: t('aesthetic.hero.stats.price') },
          { value: '0–2', label: t('aesthetic.hero.stats.downtime') },
          { value: '70%', label: t('aesthetic.hero.stats.savings') },
        ]}
        image="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=500&fit=crop"
        floatValue="9"
        floatLabel={t('aesthetic.hero.stats.procedures')}
      />

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading tag={t('aesthetic.why.tag')} title={t('aesthetic.why.title')} subtitle={t('aesthetic.why.subtitle')} />
          <IconCardGrid
            items={whyItems.map(({ icon, key }) => ({
              icon,
              title: t(`aesthetic.why.items.${key}.title`),
              desc: t(`aesthetic.why.items.${key}.desc`),
            }))}
          />
        </div>
      </section>

      <section id="treatments" className="py-24 bg-secondary-50">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            tag={t('aesthetic.treatments.tag')}
            title={t('aesthetic.treatments.title')}
            subtitle={t('aesthetic.treatments.subtitle')}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(Object.keys(TREATMENTS) as (keyof typeof TREATMENTS)[]).map((key) => (
              <ProcedureCard
                key={key}
                title={t(`aesthetic.treatments.list.${key}.title`)}
                desc={t(`aesthetic.treatments.list.${key}.desc`)}
                image={TREATMENTS[key]}
                rows={[
                  { label: t('aesthetic.treatments.duration'), value: t(`aesthetic.treatments.list.${key}.duration`) },
                  { label: t('aesthetic.treatments.effect'), value: t(`aesthetic.treatments.list.${key}.result`) },
                  {
                    label: t('aesthetic.treatments.downtime'),
                    value: t(`aesthetic.treatments.list.${key}.downtime`),
                    valueClass: 'font-medium text-green-600',
                  },
                ]}
                fromLabel={t('aesthetic.treatments.from')}
                price={t(`aesthetic.treatments.list.${key}.price`).split(' - ')[0]}
                learnMore={t('aesthetic.treatments.learnMore')}
                learnMoreIcon={ArrowRight}
              />
            ))}
          </div>
        </div>
      </section>

      <BenefitsSection
        tag={t('aesthetic.benefits.tag')}
        title={t('aesthetic.benefits.title')}
        description={t('aesthetic.benefits.description')}
        items={t.raw('aesthetic.benefits.list') as string[]}
        savingsLabel={t('aesthetic.benefits.savingsLabel')}
        savingsValue={t('aesthetic.benefits.savingsValue')}
        image="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=500&fit=crop"
        imageAlt={t('aesthetic.hero.tag')}
      />

      <section className="py-24 bg-secondary-50">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            tag={t('aesthetic.process.tag')}
            title={t('aesthetic.process.title')}
            subtitle={t('aesthetic.process.subtitle')}
          />
          <ProcessSteps
            steps={(['consultation', 'preparation', 'procedure', 'care'] as const).map((key) => ({
              title: t(`aesthetic.process.steps.${key}.title`),
              desc: t(`aesthetic.process.steps.${key}.desc`),
            }))}
          />

          <div className="mt-16 bg-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center">{t('aesthetic.process.featuresTitle')}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map(({ key, Icon }) => (
                <div key={key} className="text-center p-6 bg-secondary-50 rounded-xl">
                  <Icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h4 className="font-bold mb-2">{t(`aesthetic.process.features.${key}.title`)}</h4>
                  <p className="text-sm text-secondary-600">{t(`aesthetic.process.features.${key}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ResultsBand
        tag={t('aesthetic.results.tag')}
        title={t('aesthetic.results.title')}
        subtitle={t('aesthetic.results.subtitle')}
        gridClass="grid md:grid-cols-3"
        stats={[
          { value: '99%', label: t('aesthetic.results.stats.satisfaction') },
          { value: '1000+', label: t('aesthetic.results.stats.procedures') },
          { value: '0–2', label: t('aesthetic.results.stats.downtime') },
        ]}
        ctaLabel={t('aesthetic.results.bookProcedure')}
        ctaIcon={Calendar}
      />

      <ServiceContactSection
        tag={t('aesthetic.contact.tag')}
        title={t('aesthetic.contact.title')}
        subtitle={t('aesthetic.contact.subtitle')}
        directContact={t('aesthetic.contact.directContact')}
        whatsappLabel={t('aesthetic.contact.whatsapp')}
        whatsappHref={CONTACT.whatsappHref}
        whatsappExternal
        emailLabel={t('aesthetic.contact.email')}
        emailHref={CONTACT.emailHref}
      />
    </div>
  )
}
