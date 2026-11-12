// Phone numbers, names and photos of the team are read from VITE_* variables at build time
// so that they are not stored in the repository. Without them the site shows placeholders.
// See frontend/.env.example for the full list.

const env = import.meta.env

export const PLACEHOLDER_PHONE = '+49 000 0000000'

const read = (key) => (typeof env[key] === 'string' ? env[key].trim() : '')

/** Main phone: footer, contact section, Impressum, privacy policy and the direct-contact buttons. */
export const CONTACT_PHONE = read('VITE_CONTACT_PHONE') || PLACEHOLDER_PHONE

/** WhatsApp number of the floating button and of the contact form's fallback link. */
export const WHATSAPP_PHONE = read('VITE_WHATSAPP_PHONE') || PLACEHOLDER_PHONE

export const telHref = (phone) => `tel:${phone.replace(/[^+0-9]/g, '')}`
export const whatsappHref = (phone) => `https://wa.me/${phone.replace(/[^0-9]/g, '')}`

/**
 * Team cards on the home page. `key` selects the role and description in the locale files
 * (team.members.<key>); `id` is the part of the variable names: VITE_TEAM_<id>_NAME,
 * VITE_TEAM_<id>_NAME_<LANG> (optional, e.g. a Cyrillic spelling for RU/UK),
 * VITE_TEAM_<id>_PHONE and VITE_TEAM_<id>_PHOTO (image URL).
 */
export const TEAM = [
  { key: 'chief', id: 'CHIEF', langs: ['ru'], chief: true },
  { key: 'finance', id: 'FINANCE', langs: ['ru', 'de', 'uk'], chief: false },
  { key: 'travel', id: 'TRAVEL', langs: ['ru', 'de'], chief: false },
].map((member) => ({
  ...member,
  phone: read(`VITE_TEAM_${member.id}_PHONE`) || PLACEHOLDER_PHONE,
  photo: read(`VITE_TEAM_${member.id}_PHOTO`),
}))

/** Name of a team member in the given language, or an empty string when none is configured. */
export function teamMemberName(id, language = '') {
  const lang = language.split('-')[0].toUpperCase()
  return (lang && read(`VITE_TEAM_${id}_NAME_${lang}`)) || read(`VITE_TEAM_${id}_NAME`)
}
