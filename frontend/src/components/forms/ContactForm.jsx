import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'

const API_URL = import.meta.env.VITE_API_URL || '/api'
const WHATSAPP = '+4915751129620'

export default function ContactForm({ source = 'main' }) {
  const { t, i18n } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [agreed, setAgreed] = useState(false)

  const services = [
    { value: 'dental', label: t('services.dental.title') },
    { value: 'plastic', label: t('services.plastic.title') },
    { value: 'hair', label: t('services.hair.title') },
    { value: 'aesthetic', label: t('services.aesthetic.title') },
    { value: 'other', label: 'Other' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!agreed) return

    setIsLoading(true)
    setMessage({ type: '', text: '' })

    const formData = new FormData(e.target)
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName') || '',
      email: formData.get('email'),
      phone: formData.get('phone') || '',
      service: formData.get('service') || '',
      message: formData.get('message') || '',
      source,
      language: i18n.language,
      timestamp: new Date().toLocaleString('de-DE'),
    }

    try {
      const response = await fetch(`${API_URL}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: t('contact.form.success') })
        e.target.reset()
        setAgreed(false)
      } else {
        throw new Error('Server error')
      }
    } catch (error) {
      console.error('Form error:', error)
      // Fallback to WhatsApp
      const whatsappMsg = encodeURIComponent(
        `${t('hero.btnConsultation')}\n\n` +
        `Name: ${data.firstName} ${data.lastName}\n` +
        `Email: ${data.email}\n` +
        `Phone: ${data.phone}\n` +
        `Service: ${data.service}\n\n` +
        `${data.message}`
      )
      setMessage({
        type: 'error',
        text: `${t('contact.form.error')} <a href="https://wa.me/${WHATSAPP.replace(/[^0-9]/g, '')}?text=${whatsappMsg}" target="_blank" class="underline font-medium">WhatsApp</a>`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8 lg:p-10 shadow-lg">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="form-label" htmlFor="firstName">{t('contact.form.firstName')} *</label>
          <input type="text" id="firstName" name="firstName" required className="form-input" />
        </div>
        <div>
          <label className="form-label" htmlFor="lastName">{t('contact.form.lastName')}</label>
          <input type="text" id="lastName" name="lastName" className="form-input" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mt-5">
        <div>
          <label className="form-label" htmlFor="email">{t('contact.form.email')} *</label>
          <input type="email" id="email" name="email" required className="form-input" />
        </div>
        <div>
          <label className="form-label" htmlFor="phone">{t('contact.form.phone')}</label>
          <input type="tel" id="phone" name="phone" className="form-input" placeholder="+49..." />
        </div>
      </div>

      <div className="mt-5">
        <label className="form-label" htmlFor="service">{t('contact.form.service')}</label>
        <select id="service" name="service" className="form-input">
          <option value="">{t('contact.form.servicePlaceholder')}</option>
          {services.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label className="form-label" htmlFor="message">{t('contact.form.message')}</label>
        <textarea
          id="message"
          name="message"
          rows="4"
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
          <div className="w-5 h-5 border-2 border-secondary-300 rounded flex-shrink-0 mt-0.5 peer-checked:bg-primary-600 peer-checked:border-primary-600 flex items-center justify-center transition-all">
            <svg className="w-3 h-3 text-white hidden peer-checked:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
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
          className={clsx(
            'mt-4 p-4 rounded-lg text-sm',
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          )}
          dangerouslySetInnerHTML={{ __html: message.text }}
        />
      )}
    </form>
  )
}
