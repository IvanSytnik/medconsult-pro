/**
 * Content of the site as it was before the CMS: copy from the JSON locales plus the figures, prices,
 * team data and media that were hardcoded in the page components. Texts are taken over unchanged.
 */
import type messages from './data/de.json'

export type Messages = typeof messages
export type Locale = 'de' | 'ru' | 'uk' | 'en'
export const LOCALES: Locale[] = ['de', 'ru', 'uk', 'en']

/** Remote images used by the old pages; downloaded into the media library by the seed. */
const unsplash = (id: string, size: string) => `https://images.unsplash.com/photo-${id}?${size}&fit=crop`
export const REMOTE_IMAGES = {
  about: unsplash('1551076805-e1869033e561', 'w=600&h=500'),
  plasticHero: unsplash('1579684385127-1ef15d508118', 'w=600&h=500'),
  hairBenefits: unsplash('1512069772995-ec65ed45afd6', 'w=600&h=500'),
  aestheticHero: unsplash('1516975080664-ed2fc6a32937', 'w=600&h=500'),
  rhinoplasty: unsplash('1631815588090-d4bfec5b1ccb', 'w=400&h=300'),
  mammoplasty: unsplash('1576091160550-2173dba999ef', 'w=400&h=300'),
  abdominoplasty: unsplash('1571019613454-1cb2f99b2d8b', 'w=400&h=300'),
  liposuction: unsplash('1505751172876-fa1923c5c528', 'w=400&h=300'),
  facelift: unsplash('1487412947147-5cebf100ffc2', 'w=400&h=300'),
  mommyMakeover: unsplash('1544367567-0f2fcb009e0b', 'w=400&h=300'),
  sapphire: unsplash('1629909613654-28e377c37b09', 'w=400&h=300'),
  dhi: unsplash('1519494026892-80bbd2d6fd0d', 'w=400&h=300'),
  dhiPrp: unsplash('1576091160550-2173dba999ef', 'w=400&h=300'),
  beard: unsplash('1564564321837-a57b7070ac4f', 'w=400&h=300'),
  afro: unsplash('1506794778202-cad84cf45f1d', 'w=400&h=300'),
  botox: unsplash('1570172619644-dfd03ed5d881', 'w=400&h=300'),
  fillers: unsplash('1616394584738-fc6e612e71b9', 'w=400&h=300'),
  mesotherapy: unsplash('1571019613454-1cb2f99b2d8b', 'w=400&h=300'),
  prp: unsplash('1559757175-5700dde675bc', 'w=400&h=300'),
  peeling: unsplash('1596755389378-c31d21fd1273', 'w=400&h=300'),
  laser: unsplash('1598440947619-2c35fc9aa908', 'w=400&h=300'),
  threads: unsplash('1560750588-73207b1ef5b8', 'w=400&h=300'),
  removal: unsplash('1579165466741-7f35e4755660', 'w=400&h=300'),
  contouring: unsplash('1515377905703-c4788e51af15', 'w=400&h=300'),
} as const

export const SETTINGS = {
  phone: '+49 173 6631438',
  email: 'info@medconsult-turkey.com',
  website: 'https://medconsult-turkey.com',
  websiteLabel: 'www.medconsult-turkey.com',
  whatsapp: '+49 173 6631438',
  whatsappFloat: '+49 1575 1129620',
  whatsappForm: '+4915751129620',
}

export const SERVICES = [
  { slug: 'dental', icon: 'smile', priceFrom: '€450' },
  { slug: 'plastic', icon: 'syringe', priceFrom: '€3,000' },
  { slug: 'hair', icon: 'scissors', priceFrom: '€1,800' },
  { slug: 'aesthetic', icon: 'sparkles', priceFrom: '€150' },
] as const

export const TEAM = [
  { key: 'oleg', msgKey: 'oleg', phone: '+49 173 6631438', languages: ['ru'], chief: true, photo: 'team/oleg.png' },
  { key: 'alexander', msgKey: 'alexander', phone: '+49 1575 1129620', languages: ['ru', 'de', 'uk'], chief: false, photo: 'team/alex.png' },
  { key: 'galina', msgKey: 'galina', phone: '+49 1578 9123142', languages: ['ru', 'de'], chief: false, photo: 'team/galina.png' },
] as const

const cloudinary = (id: string) => ({
  url: `https://res.cloudinary.com/di36itbpm/video/upload/${id}.mp4`,
  thumbnailUrl: `https://res.cloudinary.com/di36itbpm/video/upload/so_2,w_400/${id}.jpg`,
})
export const VIDEOS = {
  dental: ['7_mig4ta', '2_gjhs9z', '6_c25jdc', '1_uxj8lj', '5_oaqkv5'].map((id, i) => ({ title: `Dental ${i + 1}`, ...cloudinary(id) })),
  plastic: ['plastic1_ihmouw', 'plastic2_h5nt7p', 'plastic3_dqkzkq'].map((id, i) => ({ title: `Plastic ${i + 1}`, ...cloudinary(id) })),
}

type TreatmentSeed = { key: string; service: string; data: (m: Messages) => Record<string, unknown>; icon?: string; image?: keyof typeof REMOTE_IMAGES }

const dental = (key: keyof Messages['dental']['treatments'], icon: string, price: string): TreatmentSeed => ({
  key: `dental-${key}`,
  service: 'dental',
  icon,
  data: (m) => {
    const t = m.dental.treatments[key]
    return { title: t.title, description: t.desc, priceLabel: t.price, price }
  },
})
const plastic = (key: keyof Messages['plastic']['procedures']['list']): TreatmentSeed => ({
  key: `plastic-${key}`,
  service: 'plastic',
  image: key,
  data: (m) => {
    const t = m.plastic.procedures.list[key]
    return { title: t.title, description: t.desc, price: t.price, duration: t.duration, recovery: t.recovery }
  },
})
const hair = (key: keyof Messages['hair']['methods']['list']): TreatmentSeed => ({
  key: `hair-${key}`,
  service: 'hair',
  // The FUE photo URL is gone (404); the card shows a placeholder until a photo is uploaded.
  image: key === 'fue' ? undefined : key,
  data: (m) => {
    const t = m.hair.methods.list[key]
    return { title: t.title, description: t.desc, price: t.price, grafts: t.grafts, recovery: t.recovery, survival: t.survival }
  },
})
const aesthetic = (key: keyof Messages['aesthetic']['treatments']['list']): TreatmentSeed => ({
  key: `aesthetic-${key}`,
  service: 'aesthetic',
  image: key,
  data: (m) => {
    const t = m.aesthetic.treatments.list[key]
    return { title: t.title, description: t.desc, price: t.price, duration: t.duration, effect: t.result, downtime: t.downtime }
  },
})

export const TREATMENTS: TreatmentSeed[] = [
  dental('implants', 'award', '€450'),
  dental('crowns', 'crown', '€150'),
  dental('veneers', 'sparkles', '€250'),
  dental('zirconium', 'diamond', '€200'),
  dental('allOn', 'wrench', '€3,500'),
  dental('bone', 'bone', '€200'),
  ...(['rhinoplasty', 'mammoplasty', 'abdominoplasty', 'liposuction', 'facelift', 'mommyMakeover'] as const).map(plastic),
  ...(['fue', 'sapphire', 'dhi', 'dhiPrp', 'beard', 'afro'] as const).map(hair),
  ...(['botox', 'fillers', 'mesotherapy', 'prp', 'peeling', 'laser', 'threads', 'removal', 'contouring'] as const).map(aesthetic),
]

export const clinic = (m: Messages) => ({
  name: m.dental.clinicTitle,
  slug: 'dentanatura',
  subtitle: m.dental.clinicSubtitle,
  doctor: { name: m.dental.doctor.name, role: m.dental.doctor.role, bio: m.dental.doctor.desc },
  features: (
    [
      ['equipment', 'building'],
      ['lab', 'flask'],
      ['team', 'globe'],
    ] as const
  ).map(([key, icon]) => ({ icon, title: m.dental.clinicFeatures[key].title, desc: m.dental.clinicFeatures[key].desc })),
})

const link = (label: string, href: string) => ({ label, href })
const items = (list: readonly (readonly [string, string])[], get: (key: string) => { title: string; desc: string }) =>
  list.map(([key, icon]) => ({ icon, ...get(key) }))

/** Ids of documents the page blocks point to. */
export type Refs = {
  services: Record<string, number>
  treatments: Record<string, number>
  team: Record<string, number>
  videos: { dental: number[]; plastic: number[] }
  clinic: number
  media: Partial<Record<keyof typeof REMOTE_IMAGES, number | null>>
}

export function pages(m: Messages, r: Refs) {
  const treatmentsOf = (service: string) => TREATMENTS.filter((t) => t.service === service).map((t) => r.treatments[t.key])

  const home = {
    slug: 'home',
    title: 'Startseite',
    meta: { title: m.hero.title, description: m.hero.subtitle },
    layout: [
      {
        blockType: 'homeHero',
        badge: m.hero.badge,
        title: m.hero.title,
        titleAccent: m.hero.titleAccent,
        subtitle: m.hero.subtitle,
        primary: link(m.hero.btnConsultation, '#contact'),
        secondary: link(m.hero.btnCalculate, '#services'),
        stats: [
          { value: '500+', label: m.hero.stats.clients },
          { value: '15+', label: m.hero.stats.clinics },
          { value: '70%', label: m.hero.stats.savings },
        ],
        floating: SERVICES.map((s) => ({ icon: s.icon, label: m.services[s.slug].title })),
      },
      {
        blockType: 'iconCards',
        anchor: 'why',
        tag: m.why.tag,
        title: m.why.title,
        subtitle: m.why.subtitle,
        items: items(
          [
            ['clinics', 'building'],
            ['doctors', 'stethoscope'],
            ['savings', 'wallet'],
            ['fast', 'clock'],
            ['comfort', 'palmtree'],
            ['guarantee', 'shield'],
          ],
          (k) => m.why.items[k as keyof Messages['why']['items']]
        ),
      },
      {
        blockType: 'servicesGrid',
        anchor: 'services',
        background: 'muted',
        tag: m.services.tag,
        title: m.services.title,
        subtitle: m.services.subtitle,
        services: SERVICES.map((s) => r.services[s.slug]),
        moreLabel: m.services.more,
      },
      {
        blockType: 'about',
        tag: m.about.tag,
        title: m.about.title,
        lead: m.about.lead,
        text: m.about.text,
        image: r.media.about ?? null,
        badgeValue: '100%',
        badgeLabel: m.about.transparency,
        features: (['consultation', 'selection', 'plan', 'translation', 'organization', 'support', 'aftercare'] as const).map((k) => ({
          text: m.about.features[k],
        })),
      },
      {
        blockType: 'audience',
        tag: m.audience.tag,
        title: m.audience.title,
        items: (['germany', 'quality', 'safety', 'trust'] as const).map((k) => ({ label: m.audience.labels[k], text: m.audience.items[k] })),
      },
      {
        blockType: 'process',
        tag: m.process.tag,
        title: m.process.title,
        subtitle: m.process.subtitle,
        steps: (['consultation', 'plan', 'trip', 'result'] as const).map((k) => m.process.steps[k]),
      },
      {
        blockType: 'team',
        anchor: 'team',
        background: 'muted',
        tag: m.team.tag,
        title: m.team.title,
        subtitle: m.team.subtitle,
        members: TEAM.map((t) => r.team[t.key]),
        chiefLabel: m.team.roles.chief,
        whatsappLabel: m.team.whatsapp,
      },
      { blockType: 'cta', title: m.cta.title, subtitle: m.cta.subtitle, text: m.cta.text, button: link(m.cta.btn, '#contact') },
      {
        blockType: 'contact',
        anchor: 'contact',
        variant: 'full',
        tag: m.contact.tag,
        title: m.contact.title,
        subtitle: m.contact.subtitle,
        source: 'main',
        cards: {
          phoneTitle: m.contact.info.phone,
          phoneNote: m.contact.info.phoneHours,
          whatsappTitle: m.contact.info.whatsapp,
          whatsappText: m.contact.info.whatsappText,
          whatsappNote: m.contact.info.whatsappFast,
          emailTitle: m.contact.info.email,
          emailNote: m.contact.info.emailText,
          officeTitle: m.contact.info.office,
          officeText: m.contact.info.officeGermany,
          officeNote: m.contact.info.officeTurkey,
        },
      },
    ],
  }

  const d = m.dental
  const dentalPage = {
    slug: 'dental',
    title: m.services.dental.title,
    meta: { title: d.heroTitle, description: d.heroDesc },
    layout: [
      {
        blockType: 'dentalHero',
        backLabel: d.back,
        badgeIcon: 'smile',
        badge: d.badge,
        title: d.heroTitle,
        subtitle: d.heroSubtitle,
        description: d.heroDesc,
        primary: link(m.hero.btnConsultation, '#contact'),
        secondary: link(d.pricingTag, '#pricing'),
        features: (['guarantee', 'materials', 'experience'] as const).map((k) => ({ text: d.features[k] })),
        stats: [
          { value: '500+', label: m.hero.stats.clients },
          { value: '70%', label: m.hero.stats.savings },
        ],
      },
      {
        blockType: 'trustBar',
        items: [
          { icon: 'building', title: d.trust.ministry, desc: d.trust.ministryDesc },
          { badgeText: 'DE', title: d.trust.german, desc: d.trust.germanDesc },
          { badgeText: 'CH', title: d.trust.swiss, desc: d.trust.swissDesc },
          { icon: 'check-circle', title: d.trust.certified, desc: d.trust.certifiedDesc },
        ],
      },
      {
        blockType: 'treatmentList',
        anchor: 'treatments',
        tag: d.servicesTag,
        title: d.servicesTitle,
        subtitle: d.servicesSubtitle,
        treatments: treatmentsOf('dental'),
      },
      {
        blockType: 'pricingTable',
        anchor: 'pricing',
        background: 'muted',
        tag: d.pricingTag,
        title: d.pricingTitle,
        subtitle: d.pricingSubtitle,
        columns: d.pricingTable,
        rows: (
          [
            ['implant', 'award', '€1,800 - €3,500', '€450', '75%'],
            ['ceramicCrown', 'crown', '€700 - €1,200', '€150', '80%'],
            ['zirconiumCrown', 'diamond', '€900 - €1,500', '€200', '78%'],
            ['veneer', 'sparkles', '€800 - €1,500', '€250', '70%'],
            ['allOn4', 'wrench', '€12,000 - €20,000', '€3,500', '75%'],
            ['smileMakeover', 'smile', '€16,000 - €30,000', '€5,000', '70%'],
          ] as const
        ).map(([key, icon, germanyPrice, ourPrice, savings]) => ({ icon, label: d.pricingRows[key], germanyPrice, ourPrice, savings })),
      },
      { blockType: 'clinic', anchor: 'clinic', tag: d.clinicTag, clinic: r.clinic },
      {
        blockType: 'package',
        tag: d.packageTag,
        title: d.packageTitle,
        subtitle: d.packageSubtitle,
        items: items(
          [
            ['hotel', 'hotel'],
            ['transfer', 'car'],
            ['support', 'headphones'],
            ['plan', 'clipboard-list'],
          ],
          (k) => d.package[k as keyof typeof d.package]
        ),
        note: d.packageNote,
      },
      {
        blockType: 'videoSlider',
        thumbnails: 'four',
        tag: d.videos.tag,
        title: d.videos.title,
        subtitle: d.videos.subtitle,
        videos: r.videos.dental,
        ctaTitle: d.videos.ctaTitle,
        ctaDesc: d.videos.ctaDesc,
        primary: link(m.hero.btnConsultation, '#contact'),
        secondary: link(d.pricingTag, '#pricing'),
      },
      {
        blockType: 'contact',
        anchor: 'contact',
        variant: 'compact',
        tag: m.contact.tag,
        title: m.hero.btnConsultation,
        subtitle: m.contact.subtitle,
        source: 'dental',
      },
    ],
  }

  const p = m.plastic
  const plasticPage = {
    slug: 'plastic',
    title: m.services.plastic.title,
    meta: { title: `${p.hero.title} ${p.hero.titleAccent}`, description: p.hero.description },
    layout: [
      {
        blockType: 'serviceHero',
        badgeIcon: 'syringe',
        tag: p.hero.tag,
        title: p.hero.title,
        titleAccent: p.hero.titleAccent,
        description: p.hero.description,
        primary: link(p.hero.consultation, '#contact'),
        secondary: link(p.hero.procedures, '#procedures'),
        stats: [
          { value: '2,500€+', label: p.hero.stats.price },
          { value: 'JCI', label: p.hero.stats.accreditation },
          { value: '70%', label: p.hero.stats.savings },
        ],
        image: r.media.plasticHero ?? null,
        floatValue: '15+',
        floatLabel: p.hero.stats.experience,
      },
      {
        blockType: 'iconCards',
        background: 'white',
        tag: p.why.tag,
        title: p.why.title,
        subtitle: p.why.subtitle,
        items: items(
          [
            ['surgeons', 'award'],
            ['safety', 'shield'],
            ['individual', 'users'],
            ['equipment', 'heart-pulse'],
            ['care', 'stethoscope'],
            ['recovery', 'clock'],
          ],
          (k) => p.why.items[k as keyof typeof p.why.items]
        ),
      },
      {
        blockType: 'procedureCards',
        anchor: 'procedures',
        background: 'muted',
        tag: p.procedures.tag,
        title: p.procedures.title,
        subtitle: p.procedures.subtitle,
        treatments: treatmentsOf('plastic'),
        rows: [
          { field: 'duration', label: p.procedures.durationLabel },
          { field: 'recovery', label: p.procedures.recoveryLabel },
        ],
        fromLabel: p.procedures.from,
        learnMoreLabel: p.procedures.learnMore,
      },
      {
        blockType: 'videoSlider',
        thumbnails: 'three',
        tag: p.videos.tag,
        title: p.videos.title,
        subtitle: p.videos.subtitle,
        videos: r.videos.plastic,
        ctaTitle: p.videos.ctaTitle,
        ctaDesc: p.videos.ctaDesc,
        primary: link(p.hero.consultation, '#contact'),
        secondary: link(p.hero.procedures, '#procedures'),
      },
      {
        blockType: 'benefits',
        tag: p.benefits.tag,
        title: p.benefits.title,
        description: p.benefits.description,
        items: p.benefits.list.map((text) => ({ text })),
        savingsLabel: p.benefits.savingsLabel,
        savingsValue: p.benefits.savingsValue,
        image: r.media.about ?? null,
      },
      {
        blockType: 'process',
        background: 'muted',
        tag: p.process.tag,
        title: p.process.title,
        subtitle: p.process.subtitle,
        steps: (['consultation', 'planning', 'operation', 'recovery'] as const).map((k) => p.process.steps[k]),
      },
      {
        blockType: 'results',
        columns: '3',
        tag: p.results.tag,
        title: p.results.title,
        subtitle: p.results.subtitle,
        stats: [
          { value: '98%', label: p.results.stats.satisfaction },
          { value: '500+', label: p.results.stats.operations },
          { value: '15+', label: p.results.stats.experience },
        ],
        ctaLabel: p.results.bookConsultation,
        ctaIcon: 'calendar',
      },
      directContact(p.contact),
    ],
  }

  const h = m.hair
  const hairPage = {
    slug: 'hair',
    title: m.services.hair.title,
    meta: { title: `${h.hero.title} ${h.hero.titleAccent}`, description: h.hero.description },
    layout: [
      {
        blockType: 'serviceHero',
        badgeIcon: 'scissors',
        tag: h.hero.tag,
        title: h.hero.title,
        titleAccent: h.hero.titleAccent,
        description: h.hero.description,
        primary: link(h.hero.freeAnalysis, '#contact'),
        secondary: link(h.hero.methods, '#methods'),
        stats: [
          { value: '1,800€+', label: h.hero.stats.price },
          { value: '5000+', label: h.hero.stats.grafts },
          { value: '95%+', label: h.hero.stats.survival },
        ],
        // The original hero photo URL is gone (404); a placeholder shows until a photo is uploaded.
        image: null,
        floatValue: '1.5M+',
        floatLabel: h.hero.stats.operations,
      },
      {
        blockType: 'iconCards',
        background: 'white',
        tag: h.why.tag,
        title: h.why.title,
        subtitle: h.why.subtitle,
        items: items(
          [
            ['leaders', 'award'],
            ['guarantee', 'shield'],
            ['technology', 'microscope'],
            ['specialists', 'users'],
            ['precision', 'target'],
            ['survival', 'trending-up'],
          ],
          (k) => h.why.items[k as keyof typeof h.why.items]
        ),
      },
      {
        blockType: 'procedureCards',
        anchor: 'methods',
        background: 'muted',
        tag: h.methods.tag,
        title: h.methods.title,
        subtitle: h.methods.subtitle,
        treatments: treatmentsOf('hair'),
        rows: [
          { field: 'grafts', label: h.methods.graftsLabel },
          { field: 'recovery', label: h.methods.recoveryLabel },
          { field: 'survival', label: h.methods.survivalLabel, highlight: true },
        ],
        fromLabel: h.methods.from,
        learnMoreLabel: h.methods.learnMore,
      },
      {
        blockType: 'benefits',
        tag: h.benefits.tag,
        title: h.benefits.title,
        description: h.benefits.description,
        items: h.benefits.list.map((text) => ({ text })),
        savingsLabel: h.benefits.savingsLabel,
        savingsValue: h.benefits.savingsValue,
        image: r.media.hairBenefits ?? null,
      },
      {
        blockType: 'process',
        background: 'muted',
        tag: h.process.tag,
        title: h.process.title,
        subtitle: h.process.subtitle,
        steps: (['analysis', 'preparation', 'operation', 'result'] as const).map((k) => h.process.steps[k]),
        extra: {
          style: 'timeline',
          title: h.process.timelineTitle,
          items: items(
            [
              ['weeks', 'calendar'],
              ['months3', 'sprout'],
              ['months6', 'sparkles'],
              ['months12', 'badge-check'],
            ],
            (k) => h.process.timeline[k as keyof typeof h.process.timeline]
          ),
        },
      },
      {
        blockType: 'results',
        columns: '4',
        tag: h.results.tag,
        title: h.results.title,
        subtitle: h.results.subtitle,
        stats: [
          { value: '95%+', label: h.results.stats.survival },
          { value: '1.5M+', label: h.results.stats.operations },
          { value: '70%', label: h.results.stats.savings },
          { value: '∞', icon: 'infinity', label: h.results.stats.lifetime },
        ],
        ctaLabel: h.results.getFreeAnalysis,
        ctaIcon: 'calendar',
      },
      directContact(h.contact),
    ],
  }

  const a = m.aesthetic
  const aestheticPage = {
    slug: 'aesthetic',
    title: m.services.aesthetic.title,
    meta: { title: `${a.hero.title} ${a.hero.titleAccent}`, description: a.hero.description },
    layout: [
      {
        blockType: 'serviceHero',
        badgeIcon: 'sparkles',
        tag: a.hero.tag,
        title: a.hero.title,
        titleAccent: a.hero.titleAccent,
        description: a.hero.description,
        primary: link(a.hero.consultation, '#contact'),
        secondary: link(a.hero.allTreatments, '#treatments'),
        stats: [
          { value: '150€+', label: a.hero.stats.price },
          { value: '0–2', label: a.hero.stats.downtime },
          { value: '70%', label: a.hero.stats.savings },
        ],
        image: r.media.aestheticHero ?? null,
        floatValue: '9',
        floatLabel: a.hero.stats.procedures,
      },
      {
        blockType: 'iconCards',
        background: 'white',
        tag: a.why.tag,
        title: a.why.title,
        subtitle: a.why.subtitle,
        items: items(
          [
            ['specialists', 'award'],
            ['original', 'shield'],
            ['natural', 'sparkles'],
            ['individual', 'users'],
            ['fast', 'zap'],
            ['minimal', 'clock'],
          ],
          (k) => a.why.items[k as keyof typeof a.why.items]
        ),
      },
      {
        blockType: 'procedureCards',
        anchor: 'treatments',
        background: 'muted',
        tag: a.treatments.tag,
        title: a.treatments.title,
        subtitle: a.treatments.subtitle,
        treatments: treatmentsOf('aesthetic'),
        rows: [
          { field: 'duration', label: a.treatments.duration },
          { field: 'effect', label: a.treatments.effect },
          { field: 'downtime', label: a.treatments.downtime, highlight: true },
        ],
        fromLabel: a.treatments.from,
        learnMoreLabel: a.treatments.learnMore,
      },
      {
        blockType: 'benefits',
        tag: a.benefits.tag,
        title: a.benefits.title,
        description: a.benefits.description,
        items: a.benefits.list.map((text) => ({ text })),
        savingsLabel: a.benefits.savingsLabel,
        savingsValue: a.benefits.savingsValue,
        image: r.media.aestheticHero ?? null,
      },
      {
        blockType: 'process',
        background: 'muted',
        tag: a.process.tag,
        title: a.process.title,
        subtitle: a.process.subtitle,
        steps: (['consultation', 'preparation', 'procedure', 'care'] as const).map((k) => a.process.steps[k]),
        extra: {
          style: 'cards',
          title: a.process.featuresTitle,
          items: items(
            [
              ['fast', 'zap'],
              ['safe', 'shield'],
              ['effective', 'star'],
            ],
            (k) => a.process.features[k as keyof typeof a.process.features]
          ),
        },
      },
      {
        blockType: 'results',
        columns: '3',
        tag: a.results.tag,
        title: a.results.title,
        subtitle: a.results.subtitle,
        stats: [
          { value: '99%', label: a.results.stats.satisfaction },
          { value: '1000+', label: a.results.stats.procedures },
          { value: '0–2', label: a.results.stats.downtime },
        ],
        ctaLabel: a.results.bookProcedure,
        ctaIcon: 'calendar',
      },
      directContact(a.contact),
    ],
  }

  return [home, dentalPage, plasticPage, hairPage, aestheticPage]
}

function directContact(c: Messages['plastic']['contact']) {
  return {
    blockType: 'contact',
    anchor: 'contact',
    variant: 'direct',
    tag: c.tag,
    title: c.title,
    subtitle: c.subtitle,
    source: 'main',
    direct: { text: c.directContact, whatsappLabel: c.whatsapp, emailLabel: c.email },
  }
}

export function siteSettings(m: Messages) {
  return {
    phone: SETTINGS.phone,
    email: SETTINGS.email,
    website: SETTINGS.website,
    whatsapp: SETTINGS.whatsapp,
    whatsappFloat: SETTINGS.whatsappFloat,
    whatsappForm: SETTINGS.whatsappForm,
    nav: {
      links: [
        link(m.nav.services, '/#services'),
        link(m.nav.why, '/#why'),
        link(m.nav.team, '/#team'),
        link(m.nav.contact, '/#contact'),
      ],
      ctaLabel: m.nav.consultation,
      ctaHref: '/#contact',
    },
    footer: {
      description: m.footer.description,
      servicesTitle: m.footer.services,
      companyTitle: m.footer.company,
      contactTitle: m.nav.contact,
      companyLinks: [
        link(m.footer.aboutUs, '/#why'),
        link(m.team.tag, '/#team'),
        link(m.nav.contact, '/#contact'),
        link(m.footer.impressum, '/impressum'),
      ],
      copyright: m.footer.copyright,
      privacyLabel: m.footer.privacy,
      impressumLabel: m.footer.impressum,
    },
  }
}

// --- Lexical rich text for the legal pages ------------------------------------------------------

const textNode = (text: string) => ({ type: 'text', text, format: 0, detail: 0, mode: 'normal', style: '', version: 1 })
const linebreak = () => ({ type: 'linebreak', version: 1 })
const paragraph = (children: object[]) => ({
  type: 'paragraph',
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  textStyle: '',
  version: 1,
})
const heading = (text: string) => ({ type: 'heading', tag: 'h2', children: [textNode(text)], direction: 'ltr', format: '', indent: 0, version: 1 })
const linkNode = (url: string, text: string) => ({
  type: 'link',
  fields: { url, newTab: false, linkType: 'custom' },
  children: [textNode(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 3,
})
const root = (children: object[]) => ({ root: { type: 'root', children, direction: 'ltr', format: '', indent: 0, version: 1 } })
const lines = (parts: object[][]) => parts.flatMap((part, i) => (i === 0 ? part : [linebreak(), ...part]))
/** Paragraph whose "\n" line breaks are kept as Lexical line breaks. */
const multiline = (text: string) => paragraph(lines(text.split('\n').map((line) => (line ? [textNode(line)] : []))))

export function legal(m: Messages) {
  const i = m.impressum
  const phoneHref = `tel:${SETTINGS.phone.replace(/[^0-9+]/g, '')}`
  const impressumContent = root([
    heading(i.companyInfo.title),
    paragraph(lines([[textNode(i.companyInfo.name)], [textNode(i.companyInfo.address1)], [textNode(i.companyInfo.address2)]])),
    heading(i.represented.title),
    paragraph([textNode(i.represented.name)]),
    heading(i.contact.title),
    paragraph(
      lines([
        [textNode(`${i.contact.phone}: `), linkNode(phoneHref, SETTINGS.phone)],
        [textNode(`${i.contact.email}: `), linkNode(`mailto:${SETTINGS.email}`, SETTINGS.email)],
        [textNode(`${i.contact.website}: `), linkNode(SETTINGS.website, SETTINGS.websiteLabel)],
      ])
    ),
    ...(['disclaimer', 'liability', 'links', 'copyright', 'medical'] as const).flatMap((key) => [
      heading(i[key].title),
      paragraph([textNode(i[key].text)]),
    ]),
  ])

  const pr = m.privacy
  const sections = [
    'overview',
    'responsible',
    'collection',
    'contactForm',
    'cookies',
    'analytics',
    'thirdParty',
    'rights',
    'storage',
    'changes',
  ] as const
  const privacyContent = root(sections.flatMap((key) => [heading(pr.sections[key].title), multiline(pr.sections[key].text)]))

  return {
    impressum: { title: i.title, backLabel: i.back, description: i.disclaimer.text, content: impressumContent },
    privacy: {
      title: pr.title,
      backLabel: pr.back,
      description: pr.sections.overview.text,
      content: privacyContent,
      lastUpdated: pr.lastUpdated,
      contactTitle: pr.contactTitle,
      contactText: pr.contactText,
    },
  }
}
