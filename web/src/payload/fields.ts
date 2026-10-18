import type { Field, SelectField, TextField } from 'payload'
import { BACKGROUNDS, defaultBackground, SPACINGS } from '../lib/block-style'
import { ICON_NAMES } from '../lib/icon-names'

/** Localised plain text. */
export const text = (name: string, opts: Partial<TextField> = {}): Field =>
  ({ name, type: 'text', localized: true, ...opts }) as Field

/** Localised multi-line text. */
export const textarea = (name: string, opts: Record<string, unknown> = {}): Field =>
  ({ name, type: 'textarea', localized: true, ...opts }) as Field

export const icon = (name = 'icon', opts: Partial<SelectField> = {}): Field =>
  ({
    name,
    type: 'select',
    options: ICON_NAMES.map((value) => ({ label: value, value })),
    ...opts,
  }) as Field

export const image = (name = 'image', opts: Record<string, unknown> = {}): Field =>
  ({ name, type: 'upload', relationTo: 'media', ...opts }) as Field

/** Tag, title and subtitle shown above most sections. */
export const heading = (opts: { subtitle?: boolean } = {}): Field[] => [
  {
    type: 'row',
    fields: [text('tag', { admin: { width: '30%' } }), text('title', { admin: { width: '70%' } })],
  },
  ...(opts.subtitle === false ? [] : [textarea('subtitle')]),
]

/** Section background and vertical spacing; the default background is the block's original look. */
export const blockStyle = (blockType: string): Field => ({
  name: 'style',
  type: 'group',
  admin: { description: 'Section style' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'background',
          type: 'select',
          defaultValue: defaultBackground(blockType),
          options: BACKGROUNDS.map(({ value, label }) => ({ value, label })),
          admin: { width: '50%' },
        },
        {
          name: 'spacing',
          type: 'select',
          defaultValue: 'normal',
          options: SPACINGS.map(({ value, label }) => ({ value, label })),
          admin: { width: '50%', description: 'Compact halves the space above and below the section' },
        },
      ],
    },
  ],
})

export const link = (name: string, labelOpts: Partial<TextField> = {}): Field => ({
  name,
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        text('label', { admin: { width: '60%' }, ...labelOpts }),
        { name: 'href', type: 'text', admin: { width: '40%', description: 'e.g. #contact or /dental' } },
      ],
    },
  ],
})

/** Stat figure: a value that is the same in every language and a translated label. */
export const stats = (name = 'stats', extra: Field[] = []): Field => ({
  name,
  type: 'array',
  fields: [
    {
      type: 'row',
      fields: [{ name: 'value', type: 'text', admin: { width: '30%' } }, text('label', { admin: { width: '70%' } }), ...extra],
    },
  ],
})

/** Fields every block has: anchor id for in-page links and a switch to hide it. */
export const blockMeta: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'anchor',
        type: 'text',
        admin: { width: '50%', description: 'Section id for links such as #contact' },
      },
      {
        name: 'hidden',
        type: 'checkbox',
        defaultValue: false,
        admin: { width: '50%', description: 'Hide this section on the site' },
      },
    ],
  },
]
