import clsx from 'clsx'
import { ArrowRight, CheckCircle2, Mail, MessageCircle, Phone, Wallet } from 'lucide-react'
import { CheckList, ProcessSteps, SectionHeading } from '@/components/sections/common'
import CmsIcon from '@/components/ui/CmsIcon'
import MedicalIcon from '@/components/ui/MedicalIcon'
import { Link } from '@/i18n/navigation'
import { populated } from '@/lib/cms'
import { getIcon } from '@/lib/icons'
import type {
  AboutBlock,
  AudienceBlock,
  BenefitsBlock,
  Clinic as ClinicDoc,
  ClinicBlock,
  CtaBlock,
  IconCardsBlock,
  PackageBlock,
  PricingTableBlock,
  ProcedureCardsBlock,
  ProcessBlock,
  ResultsBlock,
  Service,
  ServicesGridBlock,
  TeamBlock,
  TeamMember,
  Treatment,
  TreatmentListBlock,
  TrustBarBlock,
} from '@/payload-types'
import MediaImage from './MediaImage'
import { sectionStyle } from './style'

const id = (anchor: string | null | undefined) => anchor || undefined

function Heading({ block }: { block: { tag?: string | null; title?: string | null; subtitle?: string | null } }) {
  return <SectionHeading tag={block.tag ?? ''} title={block.title ?? ''} subtitle={block.subtitle ?? undefined} />
}

export function IconCards({ block }: { block: IconCardsBlock }) {
  return (
    <section id={id(block.anchor)} className={sectionStyle(block).className}>
      <div className="max-w-6xl mx-auto px-6">
        <Heading block={block} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {block.items?.map((item) => {
            const Icon = getIcon(item.icon)
            return (
              <div key={item.id} className="card card-hover p-8">
                <Icon className="w-10 h-10 text-primary-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-secondary-600">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function ServicesGrid({ block }: { block: ServicesGridBlock }) {
  return (
    <section id={id(block.anchor)} className={sectionStyle(block).className}>
      <div className="max-w-6xl mx-auto px-6">
        <Heading block={block} />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {populated<Service>(block.services).map((service) => {
            const Icon = getIcon(service.icon)
            return (
              <Link key={service.id} href={`/${service.slug}`} className="card card-hover overflow-hidden flex flex-col">
                <div className="relative bg-secondary-200 h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50">
                    <MedicalIcon icon={Icon} size="xl" className="text-white" />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <MedicalIcon icon={Icon} size="md" className="mb-3" />
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-secondary-600 mb-4 flex-1">{service.description}</p>
                  <div className="pt-4 border-t border-secondary-100 flex items-baseline justify-between">
                    <div>
                      <span className="text-sm text-secondary-500">{service.priceLabel} </span>
                      <span className="text-2xl font-bold text-primary-600">{service.priceFrom}</span>
                    </div>
                    <span className="text-primary-600 font-semibold flex items-center gap-2">
                      {block.moreLabel}
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function About({ block }: { block: AboutBlock }) {
  return (
    <section id={id(block.anchor)} className={sectionStyle(block).className}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <MediaImage media={block.image} sizes="(min-width: 1024px) 560px, 100vw" className="w-full h-[400px] object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="text-4xl font-bold text-primary-600">{block.badgeValue}</div>
                <div className="text-secondary-600 font-medium">{block.badgeLabel}</div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="section-tag">{block.tag}</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{block.title}</h2>
            <p className="text-lg text-secondary-700 font-medium mb-4">{block.lead}</p>
            <p className="text-secondary-600 mb-8">{block.text}</p>

            <div className="space-y-3">
              {block.features?.map((feature) => (
                <div key={feature.id} className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Audience({ block }: { block: AudienceBlock }) {
  const { className, dark } = sectionStyle(block)
  return (
    <section id={id(block.anchor)} className={className}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{block.tag}</span>
          <h2 className="text-3xl md:text-4xl font-bold">{block.title}</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {block.items?.map((item) => (
            <div
              key={item.id}
              className={clsx(
                'rounded-xl p-8 text-center transition-all hover:-translate-y-1',
                dark ? 'bg-white/10 border border-white/15 hover:bg-white/15' : 'card hover:shadow-lg'
              )}
            >
              <div className="text-3xl mb-4">{item.label}</div>
              <p className="opacity-90">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Process({ block }: { block: ProcessBlock }) {
  const extra = block.extra
  return (
    <section id={id(block.anchor)} className={sectionStyle(block).className}>
      <div className="max-w-6xl mx-auto px-6">
        <Heading block={block} />
        <ProcessSteps steps={(block.steps ?? []).map((s) => ({ title: s.title ?? '', desc: s.desc ?? '' }))} />

        {extra?.style === 'timeline' && (
          <div className="mt-16 bg-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4 text-center">{extra.title}</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {extra.items?.map((item) => {
                const Icon = getIcon(item.icon)
                return (
                  <div key={item.id} className="text-center">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-primary-50 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary-600" strokeWidth={1.5} />
                    </div>
                    <div className="font-bold mb-1">{item.title}</div>
                    <p className="text-sm text-secondary-600">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {extra?.style === 'cards' && (
          <div className="mt-16 bg-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center">{extra.title}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {extra.items?.map((item) => {
                const Icon = getIcon(item.icon)
                return (
                  <div key={item.id} className="text-center p-6 bg-secondary-50 rounded-xl">
                    <Icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                    <h4 className="font-bold mb-2">{item.title}</h4>
                    <p className="text-sm text-secondary-600">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export function Team({ block, languageNames }: { block: TeamBlock; languageNames: Record<string, string> }) {
  return (
    <section id={id(block.anchor)} className={sectionStyle(block).className}>
      <div className="max-w-6xl mx-auto px-6">
        <Heading block={block} />

        <div className="grid md:grid-cols-3 gap-8">
          {populated<TeamMember>(block.members).map((member) => {
            const phone = member.phone ?? ''
            return (
              <div key={member.id} className="card overflow-hidden">
                <div className="relative h-72">
                  <MediaImage
                    media={member.photo}
                    fallback="portrait"
                    alt={member.name}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="w-full h-full object-contain bg-secondary-100"
                  />
                  {member.chief && (
                    <div className="absolute bottom-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {block.chiefLabel}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.languages?.map((lang) => (
                      <span key={lang} className="bg-secondary-100 px-3 py-1 rounded-full text-xs font-medium">
                        {languageNames[lang] ?? lang}
                      </span>
                    ))}
                  </div>

                  <p className="text-secondary-600 text-sm mb-5">{member.description}</p>

                  {phone && (
                    <div className="space-y-2">
                      <a
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-all"
                      >
                        <Phone className="w-5 h-5" />
                        <span className="font-medium">{phone}</span>
                      </a>
                      <a
                        href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-[#25d366] text-white rounded-lg hover:bg-[#1da851] transition-all"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span className="font-medium">{block.whatsappLabel}</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function CTA({ block }: { block: CtaBlock }) {
  const { className, dark } = sectionStyle(block, { normal: 'py-20', compact: 'py-12' })
  return (
    <section id={id(block.anchor)} className={clsx(className, 'text-center')}>
      <div className="max-w-3xl mx-auto px-6">
        <Mail className="w-16 h-16 mx-auto mb-6 opacity-90" />
        <h2 className="text-3xl md:text-4xl font-bold mb-2">{block.title}</h2>
        <p className="text-xl opacity-90 mb-6">{block.subtitle}</p>
        <p className="opacity-90 mb-8 max-w-xl mx-auto">{block.text}</p>
        <a href={block.button?.href || '#contact'} className={clsx('btn btn-lg', dark ? 'btn-white' : 'btn-primary')}>
          {block.button?.label}
        </a>
      </div>
    </section>
  )
}

export function TrustBar({ block }: { block: TrustBarBlock }) {
  return (
    <section
      id={id(block.anchor)}
      className={clsx(sectionStyle(block, { normal: 'py-8', compact: 'py-4' }).className, 'border-y border-secondary-200')}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {block.items?.map((item) => {
            const Icon = getIcon(item.icon)
            return (
              <div key={item.id} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {item.badgeText ? (
                    <span className="text-sm font-bold text-secondary-700">{item.badgeText}</span>
                  ) : (
                    <MedicalIcon icon={Icon} className="w-6 h-6 text-primary-600" />
                  )}
                </div>
                <div className="min-w-0 max-sm:hyphens-auto max-sm:[hyphenate-limit-chars:11]">
                  <div className="font-semibold text-secondary-800">{item.title}</div>
                  <div className="text-sm text-secondary-500">{item.desc}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function TreatmentList({ block }: { block: TreatmentListBlock }) {
  return (
    <section id={id(block.anchor)} className={sectionStyle(block).className}>
      <div className="max-w-6xl mx-auto px-6">
        <Heading block={block} />

        <div className="grid md:grid-cols-2 gap-6">
          {populated<Treatment>(block.treatments).map((treatment) => (
            <div key={treatment.id} className="card card-hover p-6 flex gap-5">
              <MedicalIcon icon={getIcon(treatment.icon)} size="lg" gradient className="flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{treatment.title}</h3>
                <p className="text-secondary-600 text-sm mb-3">{treatment.description}</p>
                <div className="text-sm text-secondary-500">
                  {treatment.priceLabel} <span className="text-2xl font-bold text-primary-600">{treatment.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProcedureCards({ block }: { block: ProcedureCardsBlock }) {
  return (
    <section id={id(block.anchor)} className={sectionStyle(block).className}>
      <div className="max-w-6xl mx-auto px-6">
        <Heading block={block} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {populated<Treatment>(block.treatments).map((treatment) => (
            <div key={treatment.id} className="card overflow-hidden">
              <div className="relative h-48">
                <MediaImage
                  media={treatment.image}
                  alt={treatment.title}
                  sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white text-xl font-bold">{treatment.title}</div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-secondary-600 mb-4">{treatment.description}</p>

                <div className="space-y-2 mb-4">
                  {block.rows?.map((row) => (
                    <div key={row.id} className="flex justify-between text-sm">
                      <span className="text-secondary-500">{row.label}</span>
                      <span className={row.highlight ? 'font-medium text-green-600' : 'font-medium'}>{treatment[row.field]}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-secondary-100 flex items-center justify-between">
                  <div>
                    <span className="text-sm text-secondary-500">{block.fromLabel} </span>
                    <span className="text-2xl font-bold text-primary-600">{(treatment.price ?? '').split(' - ')[0]}</span>
                  </div>
                  <a href="#contact" className="inline-flex items-center gap-1 text-primary-600 font-semibold hover:underline">
                    {block.learnMoreLabel}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PricingTable({ block }: { block: PricingTableBlock }) {
  const columns = block.columns
  return (
    <section id={id(block.anchor)} className={sectionStyle(block).className}>
      <div className="max-w-6xl mx-auto px-6">
        <Heading block={block} />

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-5 bg-primary-600 text-white p-5 font-semibold">
            <div className="col-span-2">{columns?.procedure}</div>
            <div className="hidden sm:block">{columns?.germany}</div>
            <div>{columns?.ourPrice}</div>
            <div>{columns?.savings}</div>
          </div>
          {block.rows?.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-5 p-5 border-b border-secondary-100 items-center hover:bg-secondary-50 transition-colors"
            >
              <div className="col-span-2 flex items-center gap-3">
                <MedicalIcon icon={getIcon(row.icon)} size="sm" />
                <span className="font-medium">{row.label}</span>
              </div>
              <div className="hidden sm:block text-secondary-500 line-through">{row.germanyPrice}</div>
              <div className="font-bold text-primary-600 text-lg">{row.ourPrice}</div>
              <div>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">{row.savings}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Clinic({ block }: { block: ClinicBlock }) {
  const clinic = typeof block.clinic === 'object' ? (block.clinic as ClinicDoc | null) : null
  if (!clinic) return null
  const doctor = clinic.doctor
  const gallery = clinic.gallery?.length ? clinic.gallery : [{ id: '1', image: null }, { id: '2', image: null }, { id: '3', image: null }]

  return (
    <section id={id(block.anchor)} className={sectionStyle(block).className}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading tag={block.tag ?? ''} title={clinic.name} subtitle={clinic.subtitle ?? undefined} />

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            {doctor?.name && (
              <div className="flex gap-6 bg-secondary-50 p-6 rounded-xl mb-8">
                <MediaImage
                  media={doctor.photo}
                  fallback="portrait"
                  alt={doctor.name}
                  sizes="112px"
                  className="w-28 h-28 flex-shrink-0 object-cover rounded-xl"
                />
                <div>
                  <h3 className="text-xl font-bold">{doctor.name}</h3>
                  <p className="text-primary-600 font-medium mb-2">{doctor.role}</p>
                  <p className="text-secondary-600 text-sm">{doctor.bio}</p>
                </div>
              </div>
            )}

            <div className="space-y-5">
              {clinic.features?.map((feature) => {
                const Icon = getIcon(feature.icon)
                return (
                  <div key={feature.id} className="flex gap-4">
                    <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-bold">{feature.title}</h4>
                      <p className="text-secondary-600 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <div className="rounded-xl overflow-hidden mb-4">
              <MediaImage media={clinic.teamPhoto} alt={clinic.name} sizes="(min-width: 1024px) 560px, 100vw" className="w-full h-72 object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {gallery.map((item) => (
                <MediaImage
                  key={item.id}
                  media={item.image}
                  alt={clinic.name}
                  sizes="200px"
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Package({ block }: { block: PackageBlock }) {
  const { className, dark } = sectionStyle(block)
  const muted = dark ? 'text-white/80' : 'text-secondary-600'
  return (
    <section id={id(block.anchor)} className={className}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{block.tag}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{block.title}</h2>
          <p className={clsx(muted, 'text-lg')}>{block.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {block.items?.map((item) => {
            const Icon = getIcon(item.icon)
            return (
              <div
                key={item.id}
                className={clsx(
                  'rounded-xl p-8 text-center transition-colors',
                  dark ? 'bg-white/10 border border-white/15 hover:bg-white/15' : 'card'
                )}
              >
                <Icon className={clsx('w-10 h-10 mx-auto mb-4', dark ? 'opacity-90' : 'text-primary-600')} />
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className={clsx(muted, 'text-sm')}>{item.desc}</p>
              </div>
            )
          })}
        </div>

        {block.note && (
          <div className={clsx('text-center p-5 rounded-lg', dark ? 'bg-white/10' : 'bg-secondary-50')}>
            <p className="font-medium">{block.note}</p>
          </div>
        )}
      </div>
    </section>
  )
}

export function Benefits({ block }: { block: BenefitsBlock }) {
  return (
    <section id={id(block.anchor)} className={sectionStyle(block).className}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-tag">{block.tag}</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{block.title}</h2>
            <p className="text-lg text-secondary-600 mb-8">{block.description}</p>

            <CheckList items={(block.items ?? []).map((item) => item.text ?? '')} />

            <div className="mt-8 p-6 bg-primary-50 rounded-xl">
              <p className="text-sm text-secondary-600 mb-2 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-primary-600" strokeWidth={1.75} />
                {block.savingsLabel}
              </p>
              <p className="text-3xl font-bold text-primary-600">{block.savingsValue}</p>
            </div>
          </div>

          <div className="relative">
            <MediaImage media={block.image} sizes="(min-width: 1024px) 560px, 100vw" className="rounded-2xl shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function Results({ block }: { block: ResultsBlock }) {
  const { className, dark } = sectionStyle(block)
  return (
    <section id={id(block.anchor)} className={className}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="section-tag">{block.tag}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{block.title}</h2>
          <p className="text-xl opacity-90 mb-12">{block.subtitle}</p>

          <div className={clsx('grid gap-8 mb-12', block.columns === '4' ? 'md:grid-cols-4' : 'md:grid-cols-3')}>
            {block.stats?.map((stat) => {
              const Icon = stat.icon ? getIcon(stat.icon) : null
              return (
                <div key={stat.id} className={clsx('rounded-xl p-8', dark ? 'bg-white/10 border border-white/15' : 'card')}>
                  {Icon ? (
                    <div className="mb-2 flex justify-center">
                      <Icon className="w-10 h-10" strokeWidth={2} aria-hidden="true" />
                    </div>
                  ) : (
                    <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  )}
                  <p className="opacity-90">{stat.label}</p>
                </div>
              )
            })}
          </div>

          <a href="#contact" className={clsx('btn btn-lg btn-wrap', dark ? 'btn-white' : 'btn-primary')}>
            <CmsIcon name={block.ctaIcon || 'calendar'} className="w-5 h-5" />
            {block.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
