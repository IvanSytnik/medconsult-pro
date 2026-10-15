import { NextResponse } from 'next/server'
import { integrations } from '@/lib/submit'

export const dynamic = 'force-dynamic'

export function GET() {
  return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString(), ...integrations() })
}
