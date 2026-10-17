import type { Block, Field } from 'payload'
import { background, blockMeta, heading, icon, image, link, stats, text, textarea } from './fields'

const block = (slug: string, label: string, fields: Field[]): Block => ({
  slug,
  labels: { singular: label, plural: label },
  interfaceName: `${slug.charAt(0).toUpperCase()}${slug.slice(1)}Block`,
  fields: [...blockMeta, ...fields],
})

const textList = (name: string): Field => ({ name, type: 'array', fields: [text('text')] })
const iconItems = (name = 'items'): Field => ({
  name,
  type: 'array',
  fields: [{ type: 'row', fields: [icon('icon', { admin: { width: '30%' } }), text('title', { admin: { width: '70%' } })] }, textarea('desc')],
})

export const HomeHero = block('homeHero', 'Hero (home)', [
  text('badge'),
  text('title'),
  text('titleAccent'),
  textarea('subtitle'),
  { type: 'row', fields: [link('primary'), link('secondary')] },
  stats(),
  {
    name: 'floating',
    type: 'array',
    labels: { singular: 'Floating card', plural: 'Floating cards' },
    fields: [{ type: 'row', fields: [icon('icon', { admin: { width: '30%' } }), text('label', { admin: { width: '70%' } })] }],
  },
])

export const ServiceHero = block('serviceHero', 'Hero (service page)', [
  icon('badgeIcon'),
  text('tag'),
  text('title'),
  text('titleAccent'),
  textarea('description'),
  { type: 'row', fields: [link('primary'), link('secondary')] },
  stats(),
  image(),
  { type: 'row', fields: [{ name: 'floatValue', type: 'text' }, text('floatLabel')] },
])

export const DentalHero = block('dentalHero', 'Hero (with back link and checklist)', [
  text('backLabel'),
  { type: 'row', fields: [icon('badgeIcon', { admin: { width: '30%' } }), text('badge', { admin: { width: '70%' } })] },
  text('title'),
  text('subtitle'),
  textarea('description'),
  { type: 'row', fields: [link('primary'), link('secondary')] },
  textList('features'),
  image(),
  stats(),
])

export const IconCards = block('iconCards', 'Icon cards', [...heading(), background, iconItems()])

export const ServicesGrid = block('servicesGrid', 'Services grid', [
  ...heading(),
  background,
  { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true },
  text('moreLabel'),
])

export const About = block('about', 'About', [
  text('tag'),
  text('title'),
  textarea('lead'),
  textarea('text'),
  image(),
  { type: 'row', fields: [{ name: 'badgeValue', type: 'text' }, text('badgeLabel')] },
  textList('features'),
])

export const Audience = block('audience', 'Audience', [
  text('tag'),
  text('title'),
  { name: 'items', type: 'array', fields: [text('label'), textarea('text')] },
])

export const Process = block('process', 'Process steps', [
  ...heading(),
  background,
  { name: 'steps', type: 'array', fields: [text('title'), textarea('desc')] },
  {
    name: 'extra',
    type: 'group',
    admin: { description: 'Optional panel under the steps' },
    fields: [
      {
        name: 'style',
        type: 'select',
        defaultValue: 'none',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Timeline', value: 'timeline' },
          { label: 'Cards', value: 'cards' },
        ],
      },
      text('title'),
      iconItems(),
    ],
  },
])

export const Team = block('team', 'Team', [
  ...heading(),
  background,
  { name: 'members', type: 'relationship', relationTo: 'team-members', hasMany: true },
  { type: 'row', fields: [text('chiefLabel'), text('whatsappLabel')] },
])

export const CTA = block('cta', 'Call to action', [
  text('title'),
  text('subtitle'),
  textarea('text'),
  link('button'),
])

export const Contact = block('contact', 'Contact form', [
  {
    name: 'variant',
    type: 'select',
    defaultValue: 'full',
    options: [
      { label: 'Form with contact cards', value: 'full' },
      { label: 'Form only', value: 'compact' },
      { label: 'Form with direct links', value: 'direct' },
    ],
  },
  ...heading(),
  { name: 'source', type: 'text', defaultValue: 'main', admin: { description: 'Shown in the lead notification' } },
  {
    name: 'cards',
    type: 'group',
    admin: { condition: (_, s) => s?.variant === 'full' },
    fields: [
      { type: 'row', fields: [text('phoneTitle'), text('phoneNote')] },
      { type: 'row', fields: [text('whatsappTitle'), text('whatsappText'), text('whatsappNote')] },
      { type: 'row', fields: [text('emailTitle'), text('emailNote')] },
      { type: 'row', fields: [text('officeTitle'), text('officeText'), text('officeNote')] },
    ],
  },
  {
    name: 'direct',
    type: 'group',
    admin: { condition: (_, s) => s?.variant === 'direct' },
    fields: [text('text'), { type: 'row', fields: [text('whatsappLabel'), text('emailLabel')] }],
  },
])

export const TrustBar = block('trustBar', 'Trust bar', [
  {
    name: 'items',
    type: 'array',
    fields: [
      {
        type: 'row',
        fields: [
          icon('icon', { admin: { width: '30%' } }),
          { name: 'badgeText', type: 'text', admin: { width: '20%', description: 'Short text instead of the icon' } },
          text('title', { admin: { width: '50%' } }),
        ],
      },
      text('desc'),
    ],
  },
])

export const TreatmentList = block('treatmentList', 'Treatments (icon list)', [
  ...heading(),
  { name: 'treatments', type: 'relationship', relationTo: 'treatments', hasMany: true },
])

export const ProcedureCards = block('procedureCards', 'Treatments (photo cards)', [
  ...heading(),
  background,
  { name: 'treatments', type: 'relationship', relationTo: 'treatments', hasMany: true },
  {
    name: 'rows',
    type: 'array',
    admin: { description: 'Which treatment details each card shows' },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'field',
            type: 'select',
            required: true,
            options: ['duration', 'recovery', 'grafts', 'survival', 'effect', 'downtime'].map((v) => ({ label: v, value: v })),
          },
          text('label'),
          { name: 'highlight', type: 'checkbox', defaultValue: false },
        ],
      },
    ],
  },
  { type: 'row', fields: [text('fromLabel'), text('learnMoreLabel')] },
])

export const PricingTable = block('pricingTable', 'Price comparison table', [
  ...heading(),
  background,
  {
    name: 'columns',
    type: 'group',
    fields: [{ type: 'row', fields: [text('procedure'), text('germany'), text('ourPrice'), text('savings')] }],
  },
  {
    name: 'rows',
    type: 'array',
    fields: [
      { type: 'row', fields: [icon('icon', { admin: { width: '30%' } }), text('label', { admin: { width: '70%' } })] },
      {
        type: 'row',
        fields: [
          { name: 'germanyPrice', type: 'text', localized: true },
          { name: 'ourPrice', type: 'text', localized: true },
          { name: 'savings', type: 'text' },
        ],
      },
    ],
  },
])

export const Clinic = block('clinic', 'Clinic', [
  text('tag'),
  { name: 'clinic', type: 'relationship', relationTo: 'clinics' },
])

export const Package = block('package', 'Package (dark)', [...heading(), iconItems(), textarea('note')])

export const VideoSlider = block('videoSlider', 'Video slider', [
  ...heading(),
  {
    name: 'thumbnails',
    type: 'select',
    defaultValue: 'four',
    options: [
      { label: 'Four per row', value: 'four' },
      { label: 'Three per row', value: 'three' },
    ],
  },
  { name: 'videos', type: 'relationship', relationTo: 'videos', hasMany: true },
  text('ctaTitle'),
  textarea('ctaDesc'),
  { type: 'row', fields: [link('primary'), link('secondary')] },
])

export const Benefits = block('benefits', 'Benefits with photo', [
  text('tag'),
  text('title'),
  textarea('description'),
  textList('items'),
  { type: 'row', fields: [text('savingsLabel'), text('savingsValue')] },
  image(),
])

export const Results = block('results', 'Results (dark)', [
  ...heading(),
  {
    name: 'columns',
    type: 'select',
    defaultValue: '3',
    options: [
      { label: '3', value: '3' },
      { label: '4', value: '4' },
    ],
  },
  stats('stats', [icon('icon', { admin: { width: '30%', description: 'Shown instead of the value' } })]),
  { type: 'row', fields: [text('ctaLabel'), icon('ctaIcon')] },
])

export const ALL_BLOCKS: Block[] = [
  HomeHero,
  ServiceHero,
  DentalHero,
  IconCards,
  ServicesGrid,
  About,
  Audience,
  Process,
  Team,
  CTA,
  Contact,
  TrustBar,
  TreatmentList,
  ProcedureCards,
  PricingTable,
  Clinic,
  Package,
  VideoSlider,
  Benefits,
  Results,
]
