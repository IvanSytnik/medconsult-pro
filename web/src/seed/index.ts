/**
 * Seeds the CMS with the content of the pre-CMS site.
 *
 *   npm run seed            create whatever is missing, keep existing documents untouched
 *   SEED_FORCE=1 npm run seed   overwrite seeded documents with the original content
 *   SEED_IF_EMPTY=1             only seed a database without pages (used by the Vercel build)
 *   SEED_SKIP_OWNER=1           do not create the owner account (the first admin sign-up becomes owner)
 *
 * Safe to run repeatedly: documents are matched by slug/key/filename, never duplicated.
 */
import { randomBytes } from 'crypto'
import { readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import config from '@payload-config'
import { getPayload, type CollectionSlug, type Where } from 'payload'
import {
  clinic,
  legal,
  LOCALES,
  pages,
  REMOTE_IMAGES,
  SERVICES,
  siteSettings,
  TEAM,
  TREATMENTS,
  VIDEOS,
  type Locale,
  type Messages,
  type Refs,
} from './content'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const FORCE = process.env.SEED_FORCE === '1'
const context = { disableRevalidate: true }
const counts = { created: 0, updated: 0, skipped: 0 }

const payload = await getPayload({ config })

if (process.env.SEED_IF_EMPTY === '1' && (await payload.count({ collection: 'pages' })).totalDocs > 0) {
  console.log('Database already has content; skipping seed.')
  process.exit(0)
}

const messages = Object.fromEntries(
  await Promise.all(
    LOCALES.map(async (l) => [l, JSON.parse(await readFile(path.join(dirname, 'data', `${l}.json`), 'utf8')) as Messages])
  )
) as Record<Locale, Messages>

type Data = Record<string, unknown>

/** Copies array-row and block ids from the stored German document onto another locale's data, so writing a
 *  locale updates the existing rows instead of replacing them (which would drop the other translations). */
function withIds(target: unknown, source: unknown): unknown {
  if (Array.isArray(target) && Array.isArray(source)) {
    return target.map((item, i) => withIds(item, source[i]))
  }
  if (target && typeof target === 'object' && source && typeof source === 'object') {
    const out: Data = { ...(target as Data) }
    const src = source as Data
    if (typeof src.id === 'string') out.id = src.id
    for (const key of Object.keys(out)) {
      if (key in src && typeof out[key] === 'object') out[key] = withIds(out[key], src[key])
    }
    return out
  }
  return target
}

async function upsert(collection: CollectionSlug, where: Where, build: (locale: Locale) => Data): Promise<number> {
  const { docs } = await payload.find({ collection, where, limit: 1, depth: 0 })
  const existing = docs[0] as { id: number } | undefined
  if (existing && !FORCE) {
    counts.skipped++
    return existing.id
  }

  const de = build('de')
  const stored = existing
    ? await payload.update({ collection, id: existing.id, data: de, locale: 'de', depth: 0, context })
    : await payload.create({ collection, data: de, locale: 'de', depth: 0, context })
  for (const locale of LOCALES.filter((l) => l !== 'de')) {
    await payload.update({ collection, id: stored.id, data: withIds(build(locale), stored) as Data, locale, depth: 0, context })
  }
  counts[existing ? 'updated' : 'created']++
  return stored.id as number
}

async function seedGlobal(slug: 'site-settings' | 'legal', build: (locale: Locale) => Data, isSeeded: (doc: Data) => boolean) {
  const current = (await payload.findGlobal({ slug, depth: 0 })) as unknown as Data
  if (isSeeded(current) && !FORCE) {
    counts.skipped++
    return
  }
  const stored = await payload.updateGlobal({ slug, data: build('de'), locale: 'de', depth: 0, context })
  for (const locale of LOCALES.filter((l) => l !== 'de')) {
    await payload.updateGlobal({ slug, data: withIds(build(locale), stored) as Data, locale, depth: 0, context })
  }
  counts.updated++
}

const MIME: Record<string, string> = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml' }

/** Uploads a file once (matched by its seed key). Returns null when a remote image cannot be downloaded. */
async function ensureMedia(filename: string, source: string, alt: (locale: Locale) => string): Promise<number | null> {
  const { docs } = await payload.find({ collection: 'media', where: { seedKey: { equals: filename } }, limit: 1, depth: 0 })
  if (docs[0]) {
    counts.skipped++
    return docs[0].id
  }

  let data: Buffer
  try {
    if (/^https?:/.test(source)) {
      const response = await fetch(source, { signal: AbortSignal.timeout(20_000) })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      data = Buffer.from(await response.arrayBuffer())
    } else {
      data = await readFile(path.join(dirname, 'media', source))
    }
  } catch (error) {
    payload.logger.warn(`Skipping ${filename} (${source}): ${error instanceof Error ? error.message : error}`)
    return null
  }

  const mimetype = MIME[path.extname(filename)] ?? 'application/octet-stream'
  const created = await payload.create({
    collection: 'media',
    data: { alt: alt('de'), seedKey: filename },
    file: { data, mimetype, name: filename, size: data.length },
    locale: 'de',
    depth: 0,
    context,
  })
  for (const locale of LOCALES.filter((l) => l !== 'de')) {
    await payload.update({ collection: 'media', id: created.id, data: { alt: alt(locale) }, locale, depth: 0, context })
  }
  counts.created++
  return created.id
}

async function seedOwner() {
  const { totalDocs } = await payload.count({ collection: 'users', where: { role: { equals: 'owner' } } })
  if (totalDocs > 0) return
  const email = process.env.OWNER_EMAIL || 'ivan.sytnik02@gmail.com'
  const password = randomBytes(12).toString('base64url')
  await payload.create({ collection: 'users', data: { email, password, name: 'Owner', role: 'owner' }, context })
  console.log(`\nOwner account created (shown once):\n  login:    ${email}\n  password: ${password}\n`)
}

// --- Media ---------------------------------------------------------------------------------------

const t = messages
const remoteAlt: Partial<Record<keyof typeof REMOTE_IMAGES, (l: Locale) => string>> = {
  about: () => 'Medical consultation',
  plasticHero: (l) => t[l].plastic.hero.tag,
  hairBenefits: (l) => t[l].hair.hero.tag,
  aestheticHero: (l) => t[l].aesthetic.hero.tag,
}
const treatmentImageAlt = (key: string) => (l: Locale) => {
  const seed = TREATMENTS.find((tr) => tr.image === key)
  return seed ? String(seed.data(t[l]).title) : ''
}

const media: Refs['media'] = {}
const byUrl = new Map<string, number | null>()
for (const [key, url] of Object.entries(REMOTE_IMAGES) as [keyof typeof REMOTE_IMAGES, string][]) {
  // The same photo is used in several places; upload it once.
  if (!byUrl.has(url)) {
    const filename = `${url.match(/photo-([\w-]+)/)?.[1] ?? key}.jpg`
    byUrl.set(url, await ensureMedia(filename, url, remoteAlt[key] ?? treatmentImageAlt(key)))
  }
  media[key] = byUrl.get(url) ?? null
}

const teamPhotos: Record<string, number | null> = {}
for (const member of TEAM) {
  teamPhotos[member.key] = await ensureMedia(`team-${member.key}.png`, member.photo, (l) => t[l].team.members[member.msgKey].name)
}

// --- Collections ---------------------------------------------------------------------------------

const services: Refs['services'] = {}
for (const [order, s] of SERVICES.entries()) {
  services[s.slug] = await upsert('services', { slug: { equals: s.slug } }, (l) => ({
    slug: s.slug,
    icon: s.icon,
    order,
    title: t[l].services[s.slug].title,
    description: t[l].services[s.slug].desc,
    priceLabel: t[l].services[s.slug].price,
    priceFrom: s.priceFrom,
  }))
}

const treatments: Refs['treatments'] = {}
for (const tr of TREATMENTS) {
  treatments[tr.key] = await upsert('treatments', { key: { equals: tr.key } }, (l) => ({
    key: tr.key,
    service: services[tr.service],
    icon: tr.icon,
    image: tr.image ? (media[tr.image] ?? null) : null,
    ...tr.data(t[l]),
  }))
}

const team: Refs['team'] = {}
for (const member of TEAM) {
  team[member.key] = await upsert('team-members', { key: { equals: member.key } }, (l) => ({
    key: member.key,
    name: t[l].team.members[member.msgKey].name,
    role: t[l].team.members[member.msgKey].role,
    description: t[l].team.members[member.msgKey].desc,
    photo: teamPhotos[member.key],
    phone: member.phone,
    languages: [...member.languages],
    chief: member.chief,
  }))
}

const videos: Refs['videos'] = { dental: [], plastic: [] }
for (const group of ['dental', 'plastic'] as const) {
  for (const video of VIDEOS[group]) {
    videos[group].push(await upsert('videos', { url: { equals: video.url } }, () => ({ ...video })))
  }
}

const clinicId = await upsert('clinics', { slug: { equals: 'dentanatura' } }, (l) => clinic(t[l]))

const refs: Refs = { services, treatments, team, videos, clinic: clinicId, media }
for (const [index, page] of pages(t.de, refs).entries()) {
  await upsert('pages', { slug: { equals: page.slug } }, (l) => pages(t[l], refs)[index])
}

await seedGlobal('site-settings', (l) => siteSettings(t[l]), (doc) => Boolean(doc.phone))
await seedGlobal('legal', (l) => legal(t[l]), (doc) => Boolean((doc.impressum as Data | undefined)?.title))
if (process.env.SEED_SKIP_OWNER !== '1') await seedOwner()

console.log(`Seed finished: ${counts.created} created, ${counts.updated} updated, ${counts.skipped} unchanged.`)
process.exit(0)
