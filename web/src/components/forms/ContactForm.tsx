'use client'

import clsx from 'clsx'
import { useLocale, useTranslations } from 'next-intl'
import { useState, type FormEvent } from 'react'

type Status = { type: '' | 'success' | 'error'; text: string; whatsappUrl?: string }

export type ServiceOption = { value: string; label: string }

type Props = {
  source?: string
  /** Services offered in the select; "other" is appended automatically. */
  services: ServiceOption[]
  /** Number offered as a WhatsApp fallback when sending fails. */
  fallbackWhatsapp: string
}

export default function ContactForm({ source = 'main', services: serviceOptions, fallbackWhatsapp }: Props) {
  const t = useTranslations()
  const locale = useLocale()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<Status>({ type: '', text: '' })
  const [agreed, setAgreed] = useState(false)

  const services = [...serviceOptions, { value: 'other', label: t('contact.form.serviceOther') }]

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!agreed) return

    const form = e.currentTarget
    setIsLoading(true)
    setMessage({ type: '', text: '' })

    const formData = new FormData(form)
    const field = (name: string) => String(formData.get(name) ?? '')
    const data = {
      firstName: field('firstName'),
      lastName: field('lastName'),
      email: field('email'),
      phone: field('phone'),
      service: field('service'),
      message: field('message'),
      source,
      language: locale,
      timestamp: new Date().toLocaleString('de-DE'),
    }

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error(`Server error ${response.status}`)

      setMessage({ type: 'success', text: t('contact.form.success') })
      form.reset()
      setAgreed(false)
    } catch (error) {
      console.error('Form error:', error)
      const whatsappMsg = encodeURIComponent(
        `${t('contact.form.whatsappSubject')}\n\n` +
          `Name: ${data.firstName} ${data.lastName}\n` +
          `Email: ${data.email}\n` +
          `Phone: ${data.phone}\n` +
          `Service: ${data.service}\n\n` +
          `${data.message}`
      )
      setMessage({
        type: 'error',
        text: t('contact.form.error'),
        whatsappUrl: `https://wa.me/${fallbackWhatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMsg}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8 lg:p-10 shadow-lg">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label" htmlFor="firstName">
            {t('contact.form.firstName')} *
          </label>
          <input type="text" id="firstName" name="firstName" required className="form-input" />
        </div>
        <div>
          <label className="form-label" htmlFor="lastName">
            {t('contact.form.lastName')}
          </label>
          <input type="text" id="lastName" name="lastName" className="form-input" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mt-5">
        <div>
          <label className="form-label" htmlFor="email">
            {t('contact.form.email')} *
          </label>
          <input type="email" id="email" name="email" required className="form-input" />
        </div>
        <div>
          <label className="form-label" htmlFor="phone">
            {t('contact.form.phone')}
          </label>
          <input type="tel" id="phone" name="phone" className="form-input" placeholder="+49..." />
        </div>
      </div>

      <div className="mt-5">
        <label className="form-label" htmlFor="service">
          {t('contact.form.service')}
        </label>
        <select id="service" name="service" className="form-input" defaultValue="">
          <option value="">{t('contact.form.servicePlaceholder')}</option>
          {services.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label className="form-label" htmlFor="message">
          {t('contact.form.message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="form-input resize-y min-h-[120px]"
          placeholder={t('contact.form.messagePlaceholder')}
        />
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-5 h-5 border-2 border-secondary-300 rounded flex-shrink-0 mt-0.5 peer-checked:bg-primary-600 peer-checked:border-primary-600 peer-checked:[&>svg]:block peer-focus-visible:ring-2 peer-focus-visible:ring-primary-300 flex items-center justify-center transition-all">
            <svg
              className="w-3 h-3 text-white hidden"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              aria-hidden="true"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-sm text-secondary-600">{t('contact.form.privacy')}</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading || !agreed}
        className={clsx(
          'w-full mt-6 py-4 px-8 bg-primary-600 text-white font-semibold rounded-lg transition-all',
          'hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      >
        {isLoading ? t('contact.form.sending') : t('contact.form.submit')}
      </button>

      {message.text && (
        <div
          role={message.type === 'error' ? 'alert' : 'status'}
          className={clsx(
            'mt-4 p-4 rounded-lg text-sm',
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          )}
        >
          {message.text}
          {message.whatsappUrl && (
            <>
              {' '}
              <a href={message.whatsappUrl} target="_blank" rel="noopener noreferrer" className="underline font-medium">
                WhatsApp
              </a>
            </>
          )}
        </div>
      )}
    </form>
  )
}
