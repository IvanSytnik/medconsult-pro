'use client'

import { useConfig } from '@payloadcms/ui'
import Link from 'next/link'

/** Shown above the leads list. */
export default function LeadsBoardLink() {
  const { config } = useConfig()
  return (
    <div style={{ marginBottom: '1rem' }}>
      <Link href={`${config.routes.admin}/leads-board`}>Board view</Link>
    </div>
  )
}
