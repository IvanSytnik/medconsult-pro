import { CheckCircle2, MessageCircle, Wallet, type LucideIcon } from 'lucide-react'
import ContactForm from '@/components/forms/ContactForm'

export function SectionHeading({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-16">
      <span className="section-tag">{tag}</span>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      {subtitle && <p className="text-secondary-500 text-lg">{subtitle}</p>}
    </div>
  )
}

export function IconCardGrid({ items }: { items: { icon: LucideIcon; title: string; desc: string }[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="card card-hover p-8">
          <Icon className="w-10 h-10 text-primary-600 mb-4" />
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-secondary-600">{desc}</p>
        </div>
      ))}
    </div>
  )
}

export function ProcessSteps({ steps }: { steps: { title: string; desc: string }[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
      <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-secondary-200" />
      {steps.map(({ title, desc }, index) => (
        <div key={title} className="text-center relative">
          <div className="w-20 h-20 mx-auto mb-6 bg-white border-2 border-primary-600 rounded-full flex items-center justify-center text-2xl font-bold text-primary-600 relative z-10">
            {String(index + 1).padStart(2, '0')}
          </div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-secondary-600">{desc}</p>
        </div>
      ))}
    </div>
  )
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0" />
          <span className="font-medium">{item}</span>
        </div>
      ))}
    </div>
  )
}

type BenefitsProps = {
  tag: string
  title: string
  description: string
  items: string[]
  savingsLabel: string
  savingsValue: string
  image: string
  imageAlt: string
}

export function BenefitsSection({ tag, title, description, items, savingsLabel, savingsValue, image, imageAlt }: BenefitsProps) {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-tag">{tag}</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
            <p className="text-lg text-secondary-600 mb-8">{description}</p>

            <CheckList items={items} />

            <div className="mt-8 p-6 bg-primary-50 rounded-xl">
              <p className="text-sm text-secondary-600 mb-2 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-primary-600" strokeWidth={1.75} />
                {savingsLabel}
              </p>
              <p className="text-3xl font-bold text-primary-600">{savingsValue}</p>
            </div>
          </div>

          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element -- remote media moves to the CMS in phase 2 */}
            <img src={image} alt={imageAlt} className="rounded-2xl shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

type ContactSectionProps = {
  tag: string
  title: string
  subtitle: string
  directContact: string
  whatsappLabel: string
  whatsappHref: string
  whatsappExternal: boolean
  emailLabel: string
  emailHref: string
}

/** Contact block shared by the plastic, hair and aesthetic pages. */
export function ServiceContactSection(props: ContactSectionProps) {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-tag">{props.tag}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{props.title}</h2>
          <p className="text-secondary-500 text-lg">{props.subtitle}</p>
        </div>

        <div className="card p-8">
          <ContactForm />
        </div>

        <div className="mt-8 text-center">
          <p className="text-secondary-600 mb-4">{props.directContact}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={props.whatsappHref}
              {...(props.whatsappExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="btn btn-outline"
            >
              <MessageCircle className="w-5 h-5" />
              {props.whatsappLabel}
            </a>
            <a href={props.emailHref} className="btn btn-outline">
              {props.emailLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Dark gradient band with a few big figures and a call to action. */
export function ResultsBand({
  tag,
  title,
  subtitle,
  gridClass,
  stats,
  ctaLabel,
  ctaIcon: CtaIcon,
}: {
  tag: string
  title: string
  subtitle: string
  gridClass: string
  stats: { value: React.ReactNode; label: string }[]
  ctaLabel: string
  ctaIcon: LucideIcon
}) {
  return (
    <section className="py-24 bg-gradient-to-br from-secondary-800 to-primary-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="section-tag section-tag-light">{tag}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
          <p className="text-xl opacity-90 mb-12">{subtitle}</p>

          <div className={`${gridClass} gap-8 mb-12`}>
            {stats.map(({ value, label }) => (
              <div key={label} className="bg-white/10 border border-white/15 rounded-xl p-8">
                {typeof value === 'string' ? <div className="text-4xl font-bold mb-2">{value}</div> : value}
                <p className="opacity-90">{label}</p>
              </div>
            ))}
          </div>

          <a href="#contact" className="btn btn-white btn-lg">
            <CtaIcon className="w-5 h-5" />
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  )
}

/** Two-column service hero used by the plastic, hair and aesthetic pages. */
export function ServiceHero({
  badgeIcon,
  tag,
  title,
  titleAccent,
  description,
  primaryLabel,
  secondaryLabel,
  secondaryHref,
  stats,
  image,
  floatValue,
  floatLabel,
}: {
  badgeIcon: React.ReactNode
  tag: string
  title: string
  titleAccent: string
  description: string
  primaryLabel: string
  secondaryLabel: string
  secondaryHref: string
  stats: { value: string; label: string }[]
  image: string
  floatValue: string
  floatLabel: string
}) {
  return (
    <section className="relative min-h-[600px] flex items-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-6">
              {badgeIcon}
              <span className="font-medium text-secondary-700">{tag}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
              {title}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                {titleAccent}
              </span>
            </h1>

            <p className="text-lg text-secondary-600 mb-8 leading-relaxed">{description}</p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#contact" className="btn btn-primary btn-lg">
                <MessageCircle className="w-5 h-5" />
                {primaryLabel}
              </a>
              <a href={secondaryHref} className="btn btn-outline btn-lg">
                {secondaryLabel}
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div className="text-3xl font-bold text-primary-600">{value}</div>
                  <div className="text-sm text-secondary-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element -- remote media moves to the CMS in phase 2 */}
              <img src={image} alt={tag} className="w-full h-[500px] object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
              <div className="text-4xl font-bold text-primary-600">{floatValue}</div>
              <div className="text-secondary-600 font-medium">{floatLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Card with a photo, a few label/value rows and a "from" price, used by procedure lists. */
export function ProcedureCard({
  title,
  desc,
  image,
  rows,
  fromLabel,
  price,
  learnMore,
  learnMoreIcon: LearnIcon,
}: {
  title: string
  desc: string
  image: string
  rows: { label: string; value: string; valueClass?: string }[]
  fromLabel: string
  price: string
  learnMore: string
  learnMoreIcon: LucideIcon
}) {
  return (
    <div className="card overflow-hidden">
      <div className="relative h-48">
        {/* eslint-disable-next-line @next/next/no-img-element -- remote media moves to the CMS in phase 2 */}
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-white text-xl font-bold">{title}</div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-secondary-600 mb-4">{desc}</p>

        <div className="space-y-2 mb-4">
          {rows.map(({ label, value, valueClass }) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-secondary-500">{label}</span>
              <span className={valueClass ?? 'font-medium'}>{value}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-secondary-100 flex items-center justify-between">
          <div>
            <span className="text-sm text-secondary-500">{fromLabel} </span>
            <span className="text-2xl font-bold text-primary-600">{price}</span>
          </div>
          <a href="#contact" className="inline-flex items-center gap-1 text-primary-600 font-semibold hover:underline">
            {learnMore}
            <LearnIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
