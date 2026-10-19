import 'server-only'
import { LEAD_LANGUAGES } from '@/lib/lead-status'
import { getPayloadClient } from '@/lib/cms'
import type { Lead } from '@/payload-types'
import type { Submission } from '@/lib/submit'

type Language = NonNullable<Lead['language']>
const LANGUAGES = new Set<string>(LEAD_LANGUAGES.map((l) => l.value))

/** Error class and code only: database errors can quote the inserted values, which are patient data. */
export function describeError(error: unknown): string {
  if (!(error instanceof Error)) return typeof error
  const code = (error.cause as { code?: string } | undefined)?.code ?? (error as { code?: string }).code
  return code ? `${error.name} (${code})` : error.name
}

/** Stores the submission in the leads collection and returns its id. */
export async function saveLead(data: Submission): Promise<number> {
  const payload = await getPayloadClient()

  const { docs } = data.service
    ? await payload.find({
        collection: 'services',
        where: { slug: { equals: data.service } },
        depth: 0,
        limit: 1,
        select: {},
      })
    : { docs: [] }

  const lead = await payload.create({
    collection: 'leads',
    data: {
      name: `${data.firstName} ${data.lastName}`.trim(),
      email: data.email,
      phone: data.phone || undefined,
      service: docs[0]?.id,
      status: 'new',
      message: data.message || undefined,
      language: LANGUAGES.has(data.language) ? (data.language as Language) : undefined,
      source: { page: data.page || undefined, form: data.source || undefined },
      utm: Object.fromEntries(Object.entries(data.utm).filter(([, v]) => v)),
      consent: { given: data.consent, at: new Date().toISOString() },
    },
    depth: 0,
  })
  return lead.id
}
