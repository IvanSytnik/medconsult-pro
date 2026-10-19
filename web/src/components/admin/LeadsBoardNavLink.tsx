'use client'

import { useConfig } from '@payloadcms/ui'
import Link from 'next/link'

/** Extra entry at the end of the admin navigation. */
export default function LeadsBoardNavLink() {
  const { config } = useConfig()
  return (
    <Link className="nav__link" href={`${config.routes.admin}/leads-board`}>
      <span className="nav__link-label">Leads board</span>
    </Link>
  )
}
