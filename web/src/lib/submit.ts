import 'server-only'
import { Resend } from 'resend'

export type Submission = {
  firstName: string
  lastName: string
  email: string
  phone: string
  whatsapp: string
  service: string
  message: string
  source: string
  language: string
  timestamp: string
  /** Path of the page the form was sent from. */
  page: string
  consent: boolean
  utm: Record<UtmKey, string>
}

export const UTM_KEYS = ['source', 'medium', 'campaign', 'term', 'content'] as const
export type UtmKey = (typeof UTM_KEYS)[number]

const LIMITS = { name: 100, email: 254, phone: 40, short: 50, message: 3000, page: 300, utm: 200 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const config = {
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
  },
  email: {
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.EMAIL_FROM || 'MedConsult Turkey <noreply@sytnik-studio.com>',
    to: process.env.EMAIL_TO || 'info@medconsult-turkey.com',
  },
}

let resend: Resend | null | undefined
function getResend(): Resend | null {
  if (resend !== undefined) return resend
  resend = config.email.apiKey ? new Resend(config.email.apiKey) : null
  return resend
}

export function integrations() {
  return { telegram: Boolean(config.telegram.botToken && config.telegram.chatId), email: getResend() !== null }
}

export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

/** Trims and caps every field; returns an error message if the submission is not acceptable. */
export function parseSubmission(body: unknown): { data: Submission } | { error: string } {
  const b = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>
  const utm = (b.utm && typeof b.utm === 'object' ? b.utm : {}) as Record<string, unknown>
  const data: Submission = {
    firstName: clean(b.firstName, LIMITS.name),
    lastName: clean(b.lastName, LIMITS.name),
    email: clean(b.email, LIMITS.email),
    phone: clean(b.phone, LIMITS.phone),
    whatsapp: clean(b.whatsapp, LIMITS.phone),
    service: clean(b.service, LIMITS.short),
    message: clean(b.message, LIMITS.message),
    source: clean(b.source, LIMITS.short),
    language: clean(b.language, 10),
    timestamp: clean(b.timestamp, 40),
    page: clean(b.page, LIMITS.page),
    consent: b.consent === true,
    utm: Object.fromEntries(UTM_KEYS.map((key) => [key, clean(utm[`utm_${key}`], LIMITS.utm)])) as Record<UtmKey, string>,
  }
  if (!data.page.startsWith('/')) data.page = ''

  if (!data.firstName || !data.email) return { error: 'Name and email are required' }
  if (!EMAIL_RE.test(data.email)) return { error: 'Invalid email format' }
  if (!data.consent) return { error: 'Consent is required' }
  return { data }
}

const SERVICE_NAMES: Record<string, string> = {
  dental: 'Stomatologie / Стоматология',
  plastic: 'Plastische Chirurgie / Пластическая хирургия',
  hair: 'Haartransplantation / Пересадка волос',
  aesthetic: 'Ästhetische Medizin / Эстетическая медицина',
  implants: 'Implantate / Импланты',
  crowns: 'Kronen / Коронки',
  veneers: 'Veneers / Виниры',
  'all-on': 'All-on-4/6',
  other: 'Andere / Другое',
}

const TIME = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Berlin',
})

type Row = { label: string; value: string; href?: string }

/**
 * What the team is told about a new lead, in Telegram and in the e-mail alike. The patient's message is only
 * flagged; its text stays in the admin.
 */
export function notificationRows(data: Submission, receivedAt: Date): Row[] {
  const utm = [data.utm.source, data.utm.campaign].filter(Boolean).join(' / ')
  const rows: (Row | false)[] = [
    { label: 'Name', value: `${data.firstName} ${data.lastName}`.trim() },
    { label: 'Telefon', value: data.phone || '—', href: data.phone ? `tel:${data.phone.replace(/[^\d+]/g, '')}` : undefined },
    { label: 'E-Mail', value: data.email, href: `mailto:${data.email}` },
    Boolean(data.whatsapp) && { label: 'WhatsApp', value: data.whatsapp },
    { label: 'Service', value: SERVICE_NAMES[data.service] || data.service || '—' },
    { label: 'Sprache', value: data.language || 'de' },
    { label: 'Seite', value: data.page || data.source || '—' },
    Boolean(utm) && { label: 'UTM', value: utm },
    { label: 'Zeit', value: TIME.format(receivedAt) },
    { label: 'Nachricht', value: data.message ? 'ja / есть сообщение' : 'nein / нет' },
  ]
  return rows.filter((row): row is Row => Boolean(row))
}

const NOT_SAVED = 'Nicht im CRM gespeichert / Не сохранено в CRM'
const OPEN_IN_ADMIN = 'Im Admin öffnen / Открыть в админке'

/**
 * The Bot API does not accept tel: links; Telegram makes a phone number tappable itself when it is written
 * without spaces, so the number is sent in that form.
 */
export function telegramText(data: Submission, leadUrl: string | null, receivedAt: Date): string {
  return [
    '<b>MedConsult</b> · Neue Anfrage / Новая заявка',
    '',
    ...notificationRows(data, receivedAt).map(
      (r) => `<b>${r.label}:</b> ${escapeHtml(r.href?.startsWith('tel:') ? r.href.slice(4) : r.value)}`
    ),
    '',
    leadUrl ? `<a href="${escapeHtml(leadUrl)}">${OPEN_IN_ADMIN}</a>` : NOT_SAVED,
  ].join('\n')
}

export async function sendTelegram(data: Submission, leadUrl: string | null, receivedAt: Date): Promise<boolean> {
  const { botToken, chatId } = config.telegram
  if (!botToken || !chatId) {
    console.log('Telegram not configured')
    return false
  }

  const text = telegramText(data, leadUrl, receivedAt)

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', link_preview_options: { is_disabled: true } }),
    })
    const result = (await response.json()) as { ok: boolean; description?: string }
    if (!result.ok) throw new Error(result.description)
    return true
  } catch (error) {
    console.error('Telegram error:', error instanceof Error ? error.message : error)
    return false
  }
}

export function emailHtml(data: Submission, leadUrl: string | null, receivedAt: Date): string {
  const row = 'padding: 12px 0; border-bottom: 1px solid #e5e7eb;'
  const cell = (r: Row) => (r.href ? `<a href="${escapeHtml(r.href)}">${escapeHtml(r.value)}</a>` : escapeHtml(r.value))
  const rows = notificationRows(data, receivedAt)
    .map((r) => `<tr><td style="${row} font-weight: bold;">${r.label}:</td><td style="${row}">${cell(r)}</td></tr>`)
    .join('\n          ')

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #0f766e 0%, #0d5d56 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">MedConsult</h1>
        <p style="margin: 10px 0 0; opacity: 0.9;">Neue Anfrage / Новая заявка</p>
      </div>
      <div style="padding: 30px; background: #f9fafb; border: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse;">
          ${rows}
        </table>
        <p style="margin: 24px 0 0;">${leadUrl ? `<a href="${escapeHtml(leadUrl)}">${OPEN_IN_ADMIN}</a>` : NOT_SAVED}</p>
      </div>
    </div>
  `
}

export async function sendEmail(data: Submission, leadUrl: string | null, receivedAt: Date): Promise<boolean> {
  const mailer = getResend()
  if (!mailer) {
    console.log('Email not configured')
    return false
  }

  try {
    const { error } = await mailer.emails.send({
      from: config.email.from,
      to: config.email.to.split(',').map((address) => address.trim()).filter(Boolean),
      replyTo: data.email,
      subject: `Neue Anfrage: ${data.firstName} ${data.lastName} — ${SERVICE_NAMES[data.service] || 'Beratung'}`.replace(/[\r\n]+/g, ' '),
      html: emailHtml(data, leadUrl, receivedAt),
    })
    if (error) throw new Error(`${error.name}: ${error.message}`)
    return true
  } catch (error) {
    console.error('Email error:', error instanceof Error ? error.message : error)
    return false
  }
}
