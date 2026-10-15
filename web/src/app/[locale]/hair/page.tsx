import {
  ArrowRight,
  Award,
  BadgeCheck,
  Calendar,
  Infinity as InfinityIcon,
  Microscope,
  Shield,
  Sparkles,
  Sprout,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'
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
import { ScissorsIcon } from '@/components/ui/MedicalIcon'
import { resolveLocale } from '@/i18n/locale'
import { CONTACT, pageMetadata } from '@/lib/site'

const METHODS = {
  fue: 'https://images.unsplash.com/photo-1622296640557-8c1b5a6e69d0?w=400&h=300&fit=crop',
  sapphire: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop',
  dhi: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop',
  dhiPrp: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop',
  beard: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=300&fit=crop',
  afro: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop',
} as const

export async function generateMetadata({ params }: PageProps<'/[locale]/hair'>): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const t = await getTranslations({ locale })
  return pageMetadata(locale, '/hair', `${t('hair.hero.title')} ${t('hair.hero.titleAccent')}`, t('hair.hero.description'))
}

export default async function HairPage({ params }: PageProps<'/[locale]/hair'>) {
  await resolveLocale(params)
  const t = await getTranslations()

  const whyItems = [
    { icon: Award, key: 'leaders' },
    { icon: Shield, key: 'guarantee' },
    { icon: Microscope, key: 'technology' },
    { icon: Users, key: 'specialists' },
    { icon: Target, key: 'precision' },
    { icon: TrendingUp, key: 'survival' },
  ] as const

  const timeline = [
    { key: 'weeks', Icon: Calendar },
    { key: 'months3', Icon: Sprout },
    { key: 'months6', Icon: Sparkles },
    { key: 'months12', Icon: BadgeCheck },
  ] as const

  return (
    <div className="pt-[72px]">
      <ServiceHero
        badgeIcon={<ScissorsIcon size="sm" />}
        tag={t('hair.hero.tag')}
        title={t('hair.hero.title')}
        titleAccent={t('hair.hero.titleAccent')}
        description={t('hair.hero.description')}
        primaryLabel={t('hair.hero.freeAnalysis')}
        secondaryLabel={t('hair.hero.methods')}
        secondaryHref="#methods"
        stats={[
          { value: '1,800€+', label: t('hair.hero.stats.price') },
          { value: '5000+', label: t('hair.hero.stats.grafts') },
          { value: '95%+', label: t('hair.hero.stats.survival') },
        ]}
        image="https://images.unsplash.com/photo-1622296640557-8c1b5a6e69d0?w=600&h=500&fit=crop"
        floatValue="1.5M+"
        floatLabel={t('hair.hero.stats.operations')}
      />

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading tag={t('hair.why.tag')} title={t('hair.why.title')} subtitle={t('hair.why.subtitle')} />
          <IconCardGrid
            items={whyItems.map(({ icon, key }) => ({
              icon,
              title: t(`hair.why.items.${key}.title`),
              desc: t(`hair.why.items.${key}.desc`),
            }))}
          />
        </div>
      </section>

      <section id="methods" className="py-24 bg-secondary-50">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading tag={t('hair.methods.tag')} title={t('hair.methods.title')} subtitle={t('hair.methods.subtitle')} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(Object.keys(METHODS) as (keyof typeof METHODS)[]).map((key) => (
              <ProcedureCard
                key={key}
                title={t(`hair.methods.list.${key}.title`)}
                desc={t(`hair.methods.list.${key}.desc`)}
                image={METHODS[key]}
                rows={[
                  { label: t('hair.methods.graftsLabel'), value: t(`hair.methods.list.${key}.grafts`) },
                  { label: t('hair.methods.recoveryLabel'), value: t(`hair.methods.list.${key}.recovery`) },
                  {
                    label: t('hair.methods.survivalLabel'),
                    value: t(`hair.methods.list.${key}.survival`),
                    valueClass: 'font-medium text-green-600',
                  },
                ]}
                fromLabel={t('hair.methods.from')}
                price={t(`hair.methods.list.${key}.price`).split(' - ')[0]}
                learnMore={t('hair.methods.learnMore')}
                learnMoreIcon={ArrowRight}
              />
            ))}
          </div>
        </div>
      </section>

      <BenefitsSection
        tag={t('hair.benefits.tag')}
        title={t('hair.benefits.title')}
        description={t('hair.benefits.description')}
        items={t.raw('hair.benefits.list') as string[]}
        savingsLabel={t('hair.benefits.savingsLabel')}
        savingsValue={t('hair.benefits.savingsValue')}
        image="https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=600&h=500&fit=crop"
        imageAlt={t('hair.hero.tag')}
      />

      <section className="py-24 bg-secondary-50">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading tag={t('hair.process.tag')} title={t('hair.process.title')} subtitle={t('hair.process.subtitle')} />
          <ProcessSteps
            steps={(['analysis', 'preparation', 'operation', 'result'] as const).map((key) => ({
              title: t(`hair.process.steps.${key}.title`),
              desc: t(`hair.process.steps.${key}.desc`),
            }))}
          />

          <div className="mt-16 bg-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4 text-center">{t('hair.process.timelineTitle')}</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {timeline.map(({ key, Icon }) => (
                <div key={key} className="text-center">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-primary-50 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary-600" strokeWidth={1.5} />
                  </div>
                  <div className="font-bold mb-1">{t(`hair.process.timeline.${key}.title`)}</div>
                  <p className="text-sm text-secondary-600">{t(`hair.process.timeline.${key}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ResultsBand
        tag={t('hair.results.tag')}
        title={t('hair.results.title')}
        subtitle={t('hair.results.subtitle')}
        gridClass="grid md:grid-cols-4"
        stats={[
          { value: '95%+', label: t('hair.results.stats.survival') },
          { value: '1.5M+', label: t('hair.results.stats.operations') },
          { value: '70%', label: t('hair.results.stats.savings') },
          {
            value: (
              <div className="mb-2 flex justify-center">
                <InfinityIcon className="w-10 h-10" strokeWidth={2} aria-hidden="true" />
              </div>
            ),
            label: t('hair.results.stats.lifetime'),
          },
        ]}
        ctaLabel={t('hair.results.getFreeAnalysis')}
        ctaIcon={Calendar}
      />

      <ServiceContactSection
        tag={t('hair.contact.tag')}
        title={t('hair.contact.title')}
        subtitle={t('hair.contact.subtitle')}
        directContact={t('hair.contact.directContact')}
        whatsappLabel={t('hair.contact.whatsapp')}
        whatsappHref={CONTACT.whatsappHref}
        whatsappExternal
        emailLabel={t('hair.contact.email')}
        emailHref={CONTACT.emailHref}
      />
    </div>
  )
}
