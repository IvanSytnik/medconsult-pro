import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { contactLinks, getServices, getSiteSettings } from '@/lib/cms'
import type { Page } from '@/payload-types'
import { Contact, VideoSlider } from './contact'
import { DentalHero, HomeHero, ServiceHero } from './heroes'
import {
  About,
  Audience,
  Benefits,
  Clinic,
  CTA,
  IconCards,
  Package,
  PricingTable,
  ProcedureCards,
  Process,
  Results,
  ServicesGrid,
  Team,
  TreatmentList,
  TrustBar,
} from './sections'

type Block = NonNullable<Page['layout']>[number]

/** Heroes that already leave room for the fixed navbar. */
const OFFSETS_NAVBAR = new Set<Block['blockType']>(['homeHero', 'dentalHero'])

export default async function RenderBlocks({ blocks, locale }: { blocks: Page['layout']; locale: Locale }) {
  const visible = (blocks ?? []).filter((block) => !block.hidden)
  const [settings, services, t] = await Promise.all([getSiteSettings(locale), getServices(locale), getTranslations({ locale })])
  const contact = contactLinks(settings)
  const serviceOptions = services.map((s) => ({ value: s.slug, label: s.title }))
  const languageNames: Record<string, string> = {
    de: t('team.languages.de'),
    ru: t('team.languages.ru'),
    uk: t('team.languages.uk'),
    en: t('team.languages.en'),
  }

  const content = visible.map((block) => {
    const key = block.id ?? `${block.blockType}-${visible.indexOf(block)}`
    switch (block.blockType) {
      case 'homeHero':
        return <HomeHero key={key} block={block} />
      case 'serviceHero':
        return <ServiceHero key={key} block={block} />
      case 'dentalHero':
        return <DentalHero key={key} block={block} />
      case 'iconCards':
        return <IconCards key={key} block={block} />
      case 'servicesGrid':
        return <ServicesGrid key={key} block={block} />
      case 'about':
        return <About key={key} block={block} />
      case 'audience':
        return <Audience key={key} block={block} />
      case 'process':
        return <Process key={key} block={block} />
      case 'team':
        return <Team key={key} block={block} languageNames={languageNames} />
      case 'cta':
        return <CTA key={key} block={block} />
      case 'contact':
        return <Contact key={key} block={block} contact={contact} services={serviceOptions} />
      case 'trustBar':
        return <TrustBar key={key} block={block} />
      case 'treatmentList':
        return <TreatmentList key={key} block={block} />
      case 'procedureCards':
        return <ProcedureCards key={key} block={block} />
      case 'pricingTable':
        return <PricingTable key={key} block={block} />
      case 'clinic':
        return <Clinic key={key} block={block} />
      case 'package':
        return <Package key={key} block={block} />
      case 'videoSlider':
        return <VideoSlider key={key} block={block} />
      case 'benefits':
        return <Benefits key={key} block={block} />
      case 'results':
        return <Results key={key} block={block} />
      default:
        return null
    }
  })

  if (visible.length > 0 && OFFSETS_NAVBAR.has(visible[0].blockType)) return <>{content}</>
  return <div className="pt-[72px]">{content}</div>
}
