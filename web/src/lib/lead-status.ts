/** Lead pipeline, in board order. Shared by the collection config and the admin board. */
export const LEAD_STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'consultation', label: 'Consultation' },
  { value: 'offer_sent', label: 'Offer sent' },
  { value: 'booked', label: 'Booked' },
  { value: 'treated', label: 'Treated' },
  { value: 'closed', label: 'Closed' },
  { value: 'lost', label: 'Lost' },
] as const

export type LeadStatus = (typeof LEAD_STATUSES)[number]['value']

export const LEAD_LANGUAGES = [
  { value: 'de', label: 'Deutsch' },
  { value: 'ru', label: 'Русский' },
  { value: 'uk', label: 'Українська' },
  { value: 'en', label: 'English' },
] as const
