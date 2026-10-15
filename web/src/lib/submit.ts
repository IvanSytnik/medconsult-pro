import 'server-only'
import nodemailer, { type Transporter } from 'nodemailer'

export type Submission = {
  firstName: string
  lastName: string
  email: string
  phone: string
  service: string
  message: string
  source: string
  language: string
  timestamp: string
}

const LIMITS = { name: 100, email: 254, phone: 40, short: 50, message: 3000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const config = {
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
  },
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT ?? '', 10) || 587,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    to: process.env.EMAIL_TO || 'info@medconsult-turkey.com',
  },
}

let transporter: Transporter | null | undefined
function getTransporter(): Transporter | null {
  if (transporter !== undefined) return transporter
  const { host, port, user, pass } = config.email
  transporter = user && pass ? nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } }) : null
  return transporter
}

export function integrations() {
  return { telegram: Boolean(config.telegram.botToken), email: getTransporter() !== null }
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
  const data: Submission = {
    firstName: clean(b.firstName, LIMITS.name),
    lastName: clean(b.lastName, LIMITS.name),
    email: clean(b.email, LIMITS.email),
    phone: clean(b.phone, LIMITS.phone),
    service: clean(b.service, LIMITS.short),
    message: clean(b.message, LIMITS.message),
    source: clean(b.source, LIMITS.short),
    language: clean(b.language, 10),
    timestamp: clean(b.timestamp, 40),
  }

  if (!data.firstName || !data.email) return { error: 'Name and email are required' }
  if (!EMAIL_RE.test(data.email)) return { error: 'Invalid email format' }
  return { data }
}

const TELEGRAM_SERVICE_NAMES: Record<string, string> = {
  dental: 'Stomatologie',
  plastic: 'Plastische Chirurgie',
  hair: 'Haartransplantation',
  aesthetic: 'Ästhetische Medizin',
  implants: 'Implantate',
  crowns: 'Kronen',
  veneers: 'Veneers',
  'all-on': 'All-on-4/6',
}

const EMAIL_SERVICE_NAMES: Record<string, string> = {
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

export async function sendTelegram(data: Submission): Promise<boolean> {
  const { botToken, chatId } = config.telegram
  if (!botToken || !chatId) {
    console.log('Telegram not configured')
    return false
  }

  const text = `
<b>Neue Anfrage / Новая заявка</b>

<b>Name:</b> ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}
<b>Email:</b> ${escapeHtml(data.email)}
<b>Telefon:</b> ${escapeHtml(data.phone) || '—'}
<b>Service:</b> ${escapeHtml(TELEGRAM_SERVICE_NAMES[data.service] || data.service) || '—'}
<b>Quelle:</b> ${escapeHtml(data.source) || 'main'}
<b>Sprache:</b> ${escapeHtml(data.language) || 'de'}
<b>Zeit:</b> ${escapeHtml(data.timestamp)}

${data.message ? `<b>Nachricht:</b>\n${escapeHtml(data.message)}` : ''}
  `.trim()

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    })
    const result = (await response.json()) as { ok: boolean; description?: string }
    if (!result.ok) throw new Error(result.description)
    return true
  } catch (error) {
    console.error('Telegram error:', error instanceof Error ? error.message : error)
    return false
  }
}

export async function sendEmail(data: Submission): Promise<boolean> {
  const mailer = getTransporter()
  if (!mailer) {
    console.log('Email not configured')
    return false
  }

  const e = {
    firstName: escapeHtml(data.firstName),
    lastName: escapeHtml(data.lastName),
    email: escapeHtml(data.email),
    phone: escapeHtml(data.phone),
    message: escapeHtml(data.message),
    source: escapeHtml(data.source),
    language: escapeHtml(data.language),
    timestamp: escapeHtml(data.timestamp),
    service: escapeHtml(EMAIL_SERVICE_NAMES[data.service] || data.service || '—'),
  }
  const row = 'padding: 12px 0; border-bottom: 1px solid #e5e7eb;'

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #0f766e 0%, #0d5d56 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">Neue Anfrage / Новая заявка</h1>
        <p style="margin: 10px 0 0; opacity: 0.9;">MedConsult Turkey</p>
      </div>
      <div style="padding: 30px; background: #f9fafb; border: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="${row} font-weight: bold;">Name:</td><td style="${row}">${e.firstName} ${e.lastName}</td></tr>
          <tr><td style="${row} font-weight: bold;">Email:</td><td style="${row}"><a href="mailto:${e.email}">${e.email}</a></td></tr>
          <tr><td style="${row} font-weight: bold;">Telefon:</td><td style="${row}">${e.phone ? `<a href="tel:${e.phone}">${e.phone}</a>` : '—'}</td></tr>
          <tr><td style="${row} font-weight: bold;">Service:</td><td style="${row}">${e.service}</td></tr>
          <tr><td style="${row} font-weight: bold;">Quelle:</td><td style="${row}">${e.source || 'main'}</td></tr>
          <tr><td style="${row} font-weight: bold;">Sprache:</td><td style="${row}">${e.language || 'de'}</td></tr>
          <tr><td style="padding: 12px 0; font-weight: bold;">Zeit:</td><td style="padding: 12px 0;">${e.timestamp}</td></tr>
        </table>
        ${
          e.message
            ? `<div style="margin-top: 20px; padding: 20px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
          <strong>Nachricht / Сообщение:</strong>
          <p style="margin: 10px 0 0; white-space: pre-wrap;">${e.message}</p>
        </div>`
            : ''
        }
      </div>
    </div>
  `

  try {
    await mailer.sendMail({
      from: `"MedConsult Turkey" <${config.email.user}>`,
      to: config.email.to,
      replyTo: data.email,
      subject: `Neue Anfrage: ${data.firstName} ${data.lastName} — ${EMAIL_SERVICE_NAMES[data.service] || 'Beratung'}`.replace(/[\r\n]+/g, ' '),
      html,
    })
    return true
  } catch (error) {
    console.error('Email error:', error instanceof Error ? error.message : error)
    return false
  }
}
