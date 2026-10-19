import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import { redirect } from 'next/navigation'
import type { AdminViewServerProps } from 'payload'
import { LEAD_STATUSES } from '../../lib/lead-status'
import type { Lead, Service, User } from '../../payload-types'
import LeadsBoard, { type BoardCard, type BoardColumn } from './LeadsBoard'

const PER_COLUMN = 100

const titleOf = (value: unknown): string | null => {
  if (!value || typeof value !== 'object') return null
  const v = value as Partial<Service & User>
  return v.title || v.name || v.email || null
}

/** Kanban view at /admin/leads-board. Reads with the signed-in user's access, so coordinators see only their leads. */
export default async function LeadsBoardView({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const { req, locale, permissions, visibleEntities } = initPageResult
  const { routes } = req.payload.config
  if (!req.user) redirect(`${routes.admin}/login?redirect=${encodeURIComponent(`${routes.admin}/leads-board`)}`)

  const columns: BoardColumn[] = await Promise.all(
    LEAD_STATUSES.map(async ({ value, label }) => {
      const { docs, totalDocs } = await req.payload.find({
        collection: 'leads',
        where: { status: { equals: value } },
        sort: '-createdAt',
        limit: PER_COLUMN,
        depth: 1,
        overrideAccess: false,
        user: req.user,
        req,
        select: { name: true, status: true, service: true, assignedTo: true, language: true, createdAt: true },
        populate: { services: { title: true }, users: { name: true, email: true } },
      })
      const cards: BoardCard[] = (docs as Lead[]).map((lead) => ({
        id: lead.id,
        name: lead.name,
        status: lead.status,
        service: titleOf(lead.service),
        assignee: titleOf(lead.assignedTo),
        language: lead.language ?? null,
        createdAt: lead.createdAt,
      }))
      return { status: value, label, cards, total: totalDocs }
    })
  )

  return (
    <DefaultTemplate
      i18n={req.i18n}
      locale={locale}
      params={params}
      payload={req.payload}
      permissions={permissions}
      req={req}
      searchParams={searchParams}
      user={req.user}
      visibleEntities={visibleEntities}
    >
      <Gutter>
        <LeadsBoard columns={columns} adminRoute={routes.admin} apiRoute={routes.api} />
      </Gutter>
    </DefaultTemplate>
  )
}
