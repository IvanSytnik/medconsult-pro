import type { Field, GlobalConfig } from 'payload'
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

export const GLOBALS = [SiteSettings, Legal]
