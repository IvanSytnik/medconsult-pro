import type { EmailAdapter, SendEmailOptions } from 'payload'
import { Resend } from 'resend'

type Address = { name?: string; address: string }
type Recipients = SendEmailOptions['to']

/** "Name <a@b.c>" or "a@b.c" -> { name, address } */
function parseAddress(value: string): Address {
  const match = value.match(/^\s*(.*?)\s*<([^>]+)>\s*$/)
  return match ? { name: match[1].replace(/^"|"$/g, ''), address: match[2] } : { address: value.trim() }
}

const format = (a: string | Address) => (typeof a === 'string' ? a : a.name ? `${a.name} <${a.address}>` : a.address)

function list(value: Recipients): string[] {
  if (!value) return []
  return (Array.isArray(value) ? value : [value]).map(format)
}

/**
 * Sends Payload's own e-mails (password reset, verification) through Resend, with the same API key and sender
 * as the contact form. Without RESEND_API_KEY Payload keeps its default of logging e-mails to the console.
 */
export function resendAdapter(): EmailAdapter | undefined {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return undefined
  const from = parseAddress(process.env.EMAIL_FROM || 'MedConsult Turkey <noreply@sytnik-studio.com>')

  return ({ payload }) => {
    const resend = new Resend(apiKey)
    return {
      name: 'resend',
      defaultFromAddress: from.address,
      defaultFromName: from.name ?? '',
      sendEmail: async (message) => {
        const { data, error } = await resend.emails.send({
          from: message.from ? format(message.from) : format(from),
          to: list(message.to),
          cc: list(message.cc),
          bcc: list(message.bcc),
          replyTo: list(message.replyTo),
          subject: message.subject ?? '',
          html: typeof message.html === 'string' ? message.html : undefined,
          text: typeof message.text === 'string' ? message.text : '',
        })
        if (error) {
          payload.logger.error(`Resend could not send "${message.subject}": ${error.message}`)
          throw new Error(error.message)
        }
        return data
      },
    }
  }
}
