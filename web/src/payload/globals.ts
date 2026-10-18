import type { Field, GlobalConfig } from 'payload'
import { DEFAULT_LOGO, DEFAULT_SCALES, DEFAULT_THEME, FONTS, HEX_COLOR, RADII, SHADES, type Scale } from '../lib/theme'
import { isOwner } from './access'
import { text, textarea } from './fields'
import { revalidateGlobal } from './revalidate'

const access = { read: () => true, update: isOwner }
const hooks = { afterChange: [revalidateGlobal] }

const navLink = (name: string): Field => ({
  name,
  type: 'array',
  fields: [{ type: 'row', fields: [text('label'), { name: 'href', type: 'text' }] }],
})

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: { group: 'Settings' },
  access,
  hooks,
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contacts',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'phone', type: 'text', admin: { description: 'Main phone as displayed' } },
                { name: 'email', type: 'email' },
                { name: 'website', type: 'text' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'whatsapp', type: 'text', admin: { description: 'WhatsApp number for contact links' } },
                { name: 'whatsappFloat', type: 'text', admin: { description: 'Number behind the floating WhatsApp button' } },
                { name: 'whatsappForm', type: 'text', admin: { description: 'Number offered when the form fails' } },
              ],
            },
            {
              name: 'social',
              type: 'array',
              fields: [{ type: 'row', fields: [{ name: 'network', type: 'text' }, { name: 'url', type: 'text' }] }],
            },
          ],
        },
        {
          label: 'Navigation',
          fields: [{ name: 'nav', type: 'group', fields: [navLink('links'), text('ctaLabel'), { name: 'ctaHref', type: 'text' }] }],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footer',
              type: 'group',
              fields: [
                textarea('description'),
                { type: 'row', fields: [text('servicesTitle'), text('companyTitle'), text('contactTitle')] },
                navLink('companyLinks'),
                text('copyright'),
                { type: 'row', fields: [text('privacyLabel'), text('impressumLabel')] },
              ],
            },
          ],
        },
      ],
    },
  ],
}

const legalFields = [
  { type: 'row' as const, fields: [text('title'), text('backLabel')] },
  textarea('description', { admin: { description: 'Search engine description' } }),
  { name: 'content', type: 'richText' as const, localized: true },
]

export const Legal: GlobalConfig = {
  slug: 'legal',
  admin: { group: 'Settings' },
  access,
  hooks,
  fields: [
    {
      type: 'tabs',
      tabs: [
        { label: 'Impressum', fields: [{ name: 'impressum', type: 'group', fields: legalFields }] },
        {
          label: 'Privacy',
          fields: [
            {
              name: 'privacy',
              type: 'group',
              fields: [...legalFields, text('lastUpdated'), text('contactTitle'), textarea('contactText')],
            },
          ],
        },
      ],
    },
  ],
}

const validateHex = (value: unknown) => !value || (typeof value === 'string' && HEX_COLOR.test(value)) || 'Use a hex colour such as #0f766e'

const hexField = (name: string, defaultValue: string, admin: Record<string, unknown> = {}, label?: string): Field => ({
  name,
  ...(label ? { label } : {}),
  type: 'text',
  defaultValue,
  validate: validateHex,
  admin: { placeholder: '#000000', ...admin },
})

/** A colour scale: either ten shades entered by hand or one base colour the shades are generated from. */
const colorScale = (name: string, label: string, defaults: Scale): Field => ({
  name,
  label,
  type: 'group',
  fields: [
    {
      name: 'mode',
      type: 'radio',
      defaultValue: 'scale',
      options: [
        { label: 'Shades 50–900', value: 'scale' },
        { label: 'Generate from one colour', value: 'base' },
      ],
    },
    hexField('base', defaults['600'], {
      description: 'Becomes shade 600 (buttons, links); lighter and darker shades are mixed with white and black.',
      condition: (_: unknown, sibling: { mode?: string }) => sibling?.mode === 'base',
    }),
    {
      name: 'scale',
      type: 'group',
      label: false,
      admin: { condition: (_, sibling) => sibling?.mode !== 'base' },
      fields: [SHADES.slice(0, 5), SHADES.slice(5)].map((shades) => ({
        type: 'row' as const,
        fields: shades.map((shade) => hexField(`s${shade}`, defaults[shade], { width: '20%' }, shade)),
      })),
    },
  ],
})

export const Theme: GlobalConfig = {
  slug: 'theme',
  admin: { group: 'Settings', description: 'Colours, font, logo and corner radius of the whole site.' },
  access,
  hooks,
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Colours',
          fields: [
            colorScale('primary', 'Brand colour (primary)', DEFAULT_SCALES.primary),
            colorScale('secondary', 'Neutral colour (secondary: text, borders, light backgrounds)', DEFAULT_SCALES.secondary),
          ],
        },
        {
          label: 'Font and shape',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'font', type: 'select', defaultValue: DEFAULT_THEME.font, options: FONTS.map(({ value, label }) => ({ value, label })) },
                {
                  name: 'radius',
                  label: 'Corner radius',
                  type: 'select',
                  defaultValue: DEFAULT_THEME.radius,
                  options: RADII.map(({ value, label }) => ({ value, label })),
                },
              ],
            },
          ],
        },
        {
          label: 'Logo',
          fields: [
            {
              name: 'logo',
              type: 'group',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { description: 'Replaces the icon in front of the name. Square or wide image, shown 44 px high.' },
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'text', type: 'text', defaultValue: DEFAULT_LOGO.text, admin: { description: 'Leave both parts empty to show only the image' } },
                    { name: 'accent', type: 'text', defaultValue: DEFAULT_LOGO.accent, admin: { description: 'Second part, in the brand colour' } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export const GLOBALS = [SiteSettings, Legal, Theme]
