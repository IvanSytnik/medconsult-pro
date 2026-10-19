import { NextResponse } from 'next/server'
import { describeError, saveLead } from '@/lib/leads'
import { clientIp, createRateLimiter } from '@/lib/rate-limit'
import { parseSubmission, sendEmail, sendTelegram } from '@/lib/submit'

const MAX_BODY_BYTES = 10 * 1024
// Same budget as the Express API: 100 requests per IP per 15 minutes.
const limit = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 100 })

export async function POST(request: Request) {
  const { ok, retryAfter } = limit(clientIp(request.headers))
  if (!ok) {
    return NextResponse.json(
      { error: 'Too many requests, please try again later.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    )
  }

  const raw = await request.text()
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
    return NextResponse.json({ success: false, error: 'Payload too large' }, { status: 413 })
  }

  let body: unknown
  try {
    body = JSON.parse(raw)
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = parseSubmission(body)
  if ('error' in parsed) {
    return NextResponse.json({ success: false, error: parsed.error }, { status: 400 })
  }

  const receivedAt = new Date()
  // The lead is stored first, so a failing notification channel never loses it.
  let leadUrl: string | null = null
  try {
    const id = await saveLead(parsed.data)
    leadUrl = `${new URL(request.url).origin}/admin/collections/leads/${id}`
  } catch (error) {
    console.error('Lead not saved:', describeError(error))
  }

  const [telegram, email] = await Promise.all([
    sendTelegram(parsed.data, leadUrl, receivedAt),
    sendEmail(parsed.data, leadUrl, receivedAt),
  ])
  console.log(
    `Submission handled | lead: ${leadUrl ? 'saved' : 'failed'} | telegram: ${telegram ? 'ok' : 'failed'} | email: ${email ? 'ok' : 'failed'}`
  )

  if (leadUrl || telegram || email) return NextResponse.json({ success: true })
  return NextResponse.json({ success: false, error: 'Failed to process the request' }, { status: 500 })
}
