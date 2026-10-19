import type { CollectionConfig } from 'payload'
import { contentAccess, isOwner, isStaff, ownerField, ownerOrSelf } from './access'
import { ALL_BLOCKS } from './blocks'
import { icon, image, text, textarea } from './fields'
import { Leads } from './leads'
import { revalidateHooks } from './revalidate'

const CONTENT = 'Content'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: { useAsTitle: 'email', group: 'Admin', defaultColumns: ['email', 'name', 'role'] },
  hooks: {
    // The very first account (created on the admin's welcome screen) is the owner.
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation !== 'create') return data
        const { totalDocs } = await req.payload.count({ collection: 'users', req })
        return totalDocs === 0 ? { ...data, role: 'owner' } : data
      },
    ],
  },
  access: {
    read: ownerOrSelf,
    create: isOwner,
    update: ownerOrSelf,
    delete: isOwner,
    admin: isStaff,
  },
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'coordinator',
      saveToJWT: true,
      access: { create: ownerField, update: ownerField },
      options: [
        { label: 'Owner', value: 'owner' },
        { label: 'Coordinator', value: 'coordinator' },
      ],
    },
  ],
}

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: CONTENT },
  access: contentAccess,
  hooks: revalidateHooks,
  upload: {
    mimeTypes: ['image/*', 'video/*'],
    imageSizes: [
      { name: 'thumbnail', width: 400 },
      { name: 'card', width: 800 },
      { name: 'large', width: 1600 },
    ],
    // Files are served straight from Blob, so the admin preview must use the stored Blob URL as well.
    adminThumbnail: ({ doc }) => {
      const sizes = doc.sizes as { thumbnail?: { url?: string | null } } | undefined
      return sizes?.thumbnail?.url || (doc.url as string | undefined) || null
    },
    focalPoint: true,
  },
  fields: [
    text('alt'),
    // Set by the seed script to recognise files it uploaded; filenames can change on upload.
    { name: 'seedKey', type: 'text', index: true, admin: { hidden: true } },
  ],
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title', group: CONTENT, defaultColumns: ['title', 'slug', 'updatedAt'] },
  access: contentAccess,
  hooks: revalidateHooks,
  fields: [
    text('title', { required: true }),
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: '"home" is the start page; others become /<slug>' },
    },
    {
      type: 'tabs',
      tabs: [
        { label: 'Sections', fields: [{ name: 'layout', type: 'blocks', blocks: ALL_BLOCKS }] },
        { label: 'SEO', fields: [{ name: 'meta', type: 'group', fields: [text('title'), textarea('description')] }] },
      ],
    },
  ],
}

export const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'title', group: CONTENT, defaultColumns: ['title', 'slug', 'priceFrom'] },
  access: contentAccess,
  hooks: revalidateHooks,
  defaultSort: 'order',
  fields: [
    text('title', { required: true }),
    {
      type: 'row',
      fields: [
        { name: 'slug', type: 'text', required: true, unique: true, admin: { description: 'Page path and form value, e.g. dental' } },
        icon(),
        { name: 'order', type: 'number', defaultValue: 0 },
      ],
    },
    textarea('description'),
    { type: 'row', fields: [text('priceLabel'), text('priceFrom')] },
  ],
}

export const Treatments: CollectionConfig = {
  slug: 'treatments',
  admin: { useAsTitle: 'title', group: CONTENT, defaultColumns: ['title', 'service', 'price'] },
  access: contentAccess,
  hooks: revalidateHooks,
  fields: [
    text('title', { required: true }),
    {
      type: 'row',
      fields: [
        { name: 'key', type: 'text', required: true, unique: true },
        { name: 'service', type: 'relationship', relationTo: 'services' },
        icon(),
      ],
    },
    textarea('description'),
    image(),
    { type: 'row', fields: [text('priceLabel', { admin: { description: 'e.g. "from"' } }), text('price')] },
    { type: 'row', fields: [text('duration'), text('recovery'), text('downtime')] },
    { type: 'row', fields: [text('grafts'), text('survival'), text('effect')] },
  ],
}

export const Clinics: CollectionConfig = {
  slug: 'clinics',
  admin: { useAsTitle: 'name', group: CONTENT },
  access: contentAccess,
  hooks: revalidateHooks,
  fields: [
    { type: 'row', fields: [text('name', { required: true }), { name: 'slug', type: 'text', required: true, unique: true }] },
    text('subtitle'),
    {
      name: 'doctor',
      type: 'group',
      fields: [{ type: 'row', fields: [text('name'), text('role')] }, textarea('bio'), image('photo')],
    },
    {
      name: 'features',
      type: 'array',
      fields: [{ type: 'row', fields: [icon(), text('title')] }, textarea('desc')],
    },
    image('teamPhoto'),
    { name: 'gallery', type: 'array', fields: [image()] },
  ],
}

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  labels: { singular: 'Team member', plural: 'Team' },
  admin: { useAsTitle: 'name', group: CONTENT, defaultColumns: ['name', 'role', 'phone'] },
  access: contentAccess,
  hooks: revalidateHooks,
  fields: [
    { type: 'row', fields: [text('name', { required: true }), { name: 'key', type: 'text', required: true, unique: true }] },
    text('role'),
    textarea('description'),
    image('photo'),
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text' },
        {
          name: 'languages',
          type: 'select',
          hasMany: true,
          options: [
            { label: 'Deutsch', value: 'de' },
            { label: 'Русский', value: 'ru' },
            { label: 'Українська', value: 'uk' },
            { label: 'English', value: 'en' },
          ],
        },
        { name: 'chief', type: 'checkbox', defaultValue: false, admin: { description: 'Shows the lead coordinator badge' } },
      ],
    },
  ],
}

export const Videos: CollectionConfig = {
  slug: 'videos',
  admin: { useAsTitle: 'title', group: CONTENT, defaultColumns: ['title', 'url'] },
  access: contentAccess,
  hooks: revalidateHooks,
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'url',
      type: 'text',
      unique: true,
      admin: { description: 'Cloudinary (or other) MP4 URL. Leave empty when uploading a file below.' },
    },
    { name: 'thumbnailUrl', type: 'text', admin: { description: 'Poster image URL for the Cloudinary video' } },
    image('file', { admin: { description: 'Uploaded video, used instead of the URL' } }),
    image('poster', { admin: { description: 'Uploaded poster, used instead of the poster URL' } }),
  ],
}

export const COLLECTIONS = [Leads, Pages, Services, Treatments, Clinics, TeamMembers, Videos, Media, Users]
