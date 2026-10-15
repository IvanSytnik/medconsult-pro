import { ArrowRight, Award, Calendar, Clock, HeartPulse, Shield, Stethoscope, Users } from 'lucide-react'
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
import VideoSlider, { type Video } from '@/components/sections/VideoSlider'
import { SyringeIcon } from '@/components/ui/MedicalIcon'
import { resolveLocale } from '@/i18n/locale'
import { CONTACT, pageMetadata } from '@/lib/site'

const VIDEOS: Video[] = [
  { id: 1, url: 'https://res.cloudinary.com/di36itbpm/video/upload/plastic1_ihmouw.mp4', thumbnail: 'https://res.cloudinary.com/di36itbpm/video/upload/so_2,w_400/plastic1_ihmouw.jpg' },
  { id: 2, url: 'https://res.cloudinary.com/di36itbpm/video/upload/plastic2_h5nt7p.mp4', thumbnail: 'https://res.cloudinary.com/di36itbpm/video/upload/so_2,w_400/plastic2_h5nt7p.jpg' },
  { id: 3, url: 'https://res.cloudinary.com/di36itbpm/video/upload/plastic3_dqkzkq.mp4', thumbnail: 'https://res.cloudinary.com/di36itbpm/video/upload/so_2,w_400/plastic3_dqkzkq.jpg' },
]

const PROCEDURES = {
  rhinoplasty: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop',
  mammoplasty: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop',
  abdominoplasty: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
  liposuction: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=300&fit=crop',
  facelift: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop',
  mommyMakeover: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
} as const

export async function generateMetadata({ params }: PageProps<'/[locale]/plastic'>): Promise<Metadata> {
  const locale = await resolveLocale(params)
  const t = await getTranslations({ locale })
  return pageMetadata(
    locale,
    '/plastic',
    `${t('plastic.hero.title')} ${t('plastic.hero.titleAccent')}`,
    t('plastic.hero.description')
  )
}

export default async function PlasticPage({ params }: PageProps<'/[locale]/plastic'>) {
  await resolveLocale(params)
  const t = await getTranslations()

  const whyItems = [
    { icon: Award, key: 'surgeons' },
    { icon: Shield, key: 'safety' },
    { icon: Users, key: 'individual' },
    { icon: HeartPulse, key: 'equipment' },
    { icon: Stethoscope, key: 'care' },
    { icon: Clock, key: 'recovery' },
  ] as const

  return (
    <div className="pt-[72px]">
      <ServiceHero
        badgeIcon={<SyringeIcon size="sm" />}
        tag={t('plastic.hero.tag')}
        title={t('plastic.hero.title')}
        titleAccent={t('plastic.hero.titleAccent')}
        description={t('plastic.hero.description')}
        primaryLabel={t('plastic.hero.consultation')}
        secondaryLabel={t('plastic.hero.procedures')}
        secondaryHref="#procedures"
        stats={[
          { value: '2,500€+', label: t('plastic.hero.stats.price') },
          { value: 'JCI', label: t('plastic.hero.stats.accreditation') },
          { value: '70%', label: t('plastic.hero.stats.savings') },
        ]}
        image="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=500&fit=crop"
        floatValue="15+"
        floatLabel={t('plastic.hero.stats.experience')}
      />

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading tag={t('plastic.why.tag')} title={t('plastic.why.title')} subtitle={t('plastic.why.subtitle')} />
          <IconCardGrid
            items={whyItems.map(({ icon, key }) => ({
              icon,
              title: t(`plastic.why.items.${key}.title`),
              desc: t(`plastic.why.items.${key}.desc`),
            }))}
          />
        </div>
      </section>

      <section id="procedures" className="py-24 bg-secondary-50">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            tag={t('plastic.procedures.tag')}
            title={t('plastic.procedures.title')}
            subtitle={t('plastic.procedures.subtitle')}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(Object.keys(PROCEDURES) as (keyof typeof PROCEDURES)[]).map((key) => (
              <ProcedureCard
                key={key}
                title={t(`plastic.procedures.list.${key}.title`)}
                desc={t(`plastic.procedures.list.${key}.desc`)}
                image={PROCEDURES[key]}
                rows={[
                  { label: t('plastic.procedures.durationLabel'), value: t(`plastic.procedures.list.${key}.duration`) },
                  { label: t('plastic.procedures.recoveryLabel'), value: t(`plastic.procedures.list.${key}.recovery`) },
                ]}
                fromLabel={t('plastic.procedures.from')}
                price={t(`plastic.procedures.list.${key}.price`)}
                learnMore={t('plastic.procedures.learnMore')}
                learnMoreIcon={ArrowRight}
              />
            ))}
          </div>
        </div>
      </section>

      <VideoSlider
        videos={VIDEOS}
        thumbnailGridClass="grid grid-cols-3 lg:grid-cols-3 gap-3"
        tag={t('plastic.videos.tag')}
        title={t('plastic.videos.title')}
        subtitle={t('plastic.videos.subtitle')}
        ctaTitle={t('plastic.videos.ctaTitle')}
        ctaDesc={t('plastic.videos.ctaDesc')}
        primaryLabel={t('plastic.hero.consultation')}
        secondaryLabel={t('plastic.hero.procedures')}
        secondaryHref="#procedures"
      />

      <BenefitsSection
        tag={t('plastic.benefits.tag')}
        title={t('plastic.benefits.title')}
        description={t('plastic.benefits.description')}
        items={t.raw('plastic.benefits.list') as string[]}
        savingsLabel={t('plastic.benefits.savingsLabel')}
        savingsValue={t('plastic.benefits.savingsValue')}
        image="https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=500&fit=crop"
        imageAlt={t('plastic.hero.tag')}
      />

      <section className="py-24 bg-secondary-50">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading tag={t('plastic.process.tag')} title={t('plastic.process.title')} subtitle={t('plastic.process.subtitle')} />
          <ProcessSteps
            steps={(['consultation', 'planning', 'operation', 'recovery'] as const).map((key) => ({
              title: t(`plastic.process.steps.${key}.title`),
              desc: t(`plastic.process.steps.${key}.desc`),
            }))}
          />
        </div>
      </section>

      <ResultsBand
        tag={t('plastic.results.tag')}
        title={t('plastic.results.title')}
        subtitle={t('plastic.results.subtitle')}
        gridClass="grid md:grid-cols-3"
        stats={[
          { value: '98%', label: t('plastic.results.stats.satisfaction') },
          { value: '500+', label: t('plastic.results.stats.operations') },
          { value: '15+', label: t('plastic.results.stats.experience') },
        ]}
        ctaLabel={t('plastic.results.bookConsultation')}
        ctaIcon={Calendar}
      />

      <ServiceContactSection
        tag={t('plastic.contact.tag')}
        title={t('plastic.contact.title')}
        subtitle={t('plastic.contact.subtitle')}
        directContact={t('plastic.contact.directContact')}
        whatsappLabel={t('plastic.contact.whatsapp')}
        whatsappHref={CONTACT.whatsappHref}
        whatsappExternal
        emailLabel={t('plastic.contact.email')}
        emailHref={CONTACT.emailHref}
      />
    </div>
  )
}
