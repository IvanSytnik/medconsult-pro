import { APIError, type CollectionBeforeChangeHook, type CollectionConfig, type Field } from 'payload'
import { LEAD_LANGUAGES, LEAD_STATUSES } from '../lib/lead-status'
import { isOwner, leadAccess, ownerField, staffAccess } from './access'

type Note = { id?: string | null; text?: string | null; author?: unknown; authorName?: string | null; date?: string | null }
type StaffUser = { id: number | string; role?: string; name?: string | null; email?: string | null }

const idOf = (value: unknown): number | string | null => {
  if (value === null || value === undefined || value === '') return null
  if (typeof value === 'object') return ((value as { id?: number | string }).id ?? null) as number | string | null
  return value as number | string
}

/**
 * Coordinators may only take a lead themselves or release it; notes are an append-only history whose author and
 * date are set on the server. The owner may edit or remove any note.
 */
const enforceLeadRules: CollectionBeforeChangeHook = ({ data, originalDoc, req }) => {
  const user = req.user as StaffUser | null
  if (!user) return data
  const owner = user.role === 'owner'

  if (!owner && 'assignedTo' in data) {
    const assignee = idOf(data.assignedTo)
    if (assignee !== null && String(assignee) !== String(user.id)) {
      throw new APIError('Coordinators can only assign leads to themselves.', 403, null, true)
    }
  }

  if (Array.isArray(data.notes)) {
    const previous: Note[] = Array.isArray(originalDoc?.notes) ? originalDoc.notes : []
    const byId = new Map(previous.filter((n) => n.id).map((n) => [String(n.id), n]))
    const fresh = (data.notes as Note[])
      .filter((n) => !n.id || !byId.has(String(n.id)))
      .filter((n) => n.text?.trim())
      .map((n) => ({
        ...n,
        author: user.id,
        authorName: user.name || user.email || String(user.id),
        date: new Date().toISOString(),
      }))
    const kept = owner
      ? (data.notes as Note[])
          .filter((n) => n.id && byId.has(String(n.id)))
          .map((n) => {
            const prev = byId.get(String(n.id))!
            return { ...n, author: idOf(prev.author), authorName: prev.authorName, date: prev.date }
          })
      : previous.map((n) => ({ ...n, author: idOf(n.author) }))
    data.notes = [...kept, ...fresh]
  }

  return data
}

/** Fields captured from the website form: readable by staff, changeable only by the owner. */
const fromForm = (field: Field): Field => ({ ...field, access: { update: ownerField } }) as Field

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Lead', plural: 'Leads' },
  admin: {
    group: 'CRM',
    useAsTitle: 'name',
    defaultColumns: ['name', 'status', 'service', 'assignedTo', 'language', 'createdAt'],
    listSearchableFields: ['name', 'email', 'phone', 'whatsapp'],
    pagination: { defaultLimit: 50 },
    components: { beforeList: ['/components/admin/LeadsBoardLink#default'] },
  },
  defaultSort: '-createdAt',
  // Patient data stays out of the GraphQL API; the admin works over REST.
  graphQL: false,
  access: {
    read: leadAccess,
    update: leadAccess,
    create: staffAccess,
    delete: isOwner,
  },
  hooks: { beforeChange: [enforceLeadRules] },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'whatsapp', type: 'text', label: 'WhatsApp' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'service', type: 'relationship', relationTo: 'services', index: true },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'new',
          index: true,
          options: LEAD_STATUSES.map((s) => ({ ...s })),
        },
        {
          name: 'assignedTo',
          label: 'Coordinator',
          type: 'relationship',
          relationTo: 'users',
          index: true,
        },
      ],
    },
    { name: 'message', type: 'textarea', admin: { rows: 6 } },
    {
      name: 'notes',
      type: 'array',
      labels: { singular: 'Note', plural: 'Notes' },
      admin: { description: 'History of contacts and decisions. Author and date are filled in when saved.' },
      fields: [
        { name: 'text', type: 'textarea', required: true },
        {
          type: 'row',
          fields: [
            { name: 'authorName', label: 'Author', type: 'text', admin: { readOnly: true } },
            {
              name: 'date',
              type: 'date',
              admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } },
            },
          ],
        },
        { name: 'author', type: 'relationship', relationTo: 'users', admin: { hidden: true } },
      ],
    },
    fromForm({
      name: 'language',
      type: 'select',
      options: LEAD_LANGUAGES.map((l) => ({ ...l })),
      admin: { position: 'sidebar', description: 'Language of the page the form was sent from' },
    }),
    fromForm({
      name: 'source',
      type: 'group',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'page', type: 'text', admin: { description: 'Path of the page with the form' } },
        { name: 'form', type: 'text', admin: { description: 'Form placement, e.g. main or dental' } },
      ],
    }),
    fromForm({
      name: 'utm',
      label: 'UTM',
      type: 'group',
      admin: { position: 'sidebar' },
      fields: ['source', 'medium', 'campaign', 'term', 'content'].map((name) => ({ name, type: 'text' }) as Field),
    }),
    fromForm({
      name: 'consent',
      type: 'group',
      label: 'Data processing consent',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'given', type: 'checkbox', defaultValue: false },
        { name: 'at', label: 'Given at', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
      ],
    }),
  ],
  timestamps: true,
}
