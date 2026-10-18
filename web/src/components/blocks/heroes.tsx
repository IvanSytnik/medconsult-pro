import clsx from 'clsx'
import { ArrowLeft, CheckCircle2, MessageCircle } from 'lucide-react'
import MedicalIcon from '@/components/ui/MedicalIcon'
import { Link } from '@/i18n/navigation'
import { getIcon } from '@/lib/icons'
import type { DentalHeroBlock, HomeHeroBlock, ServiceHeroBlock } from '@/payload-types'
import MediaImage from './MediaImage'
import { sectionStyle } from './style'

const FLOATING_POSITIONS = [
  { className: 'top-[10%] left-[5%]', delay: undefined },
  { className: 'top-[25%] right-[10%]', delay: '1.5s' },
  { className: 'top-[55%] left-[15%]', delay: '3s' },
  { className: 'bottom-[15%] right-[5%]', delay: '4.5s' },
]

/** Heroes keep their own padding; compact spacing drops the minimum height instead. */
function heroStyle(block: Parameters<typeof sectionStyle>[0], minHeight: string) {
  const { className, dark } = sectionStyle(block, { normal: minHeight, compact: '' })
  return { className, heading: dark ? 'text-white' : 'text-secondary-900', body: dark ? 'text-white/80' : 'text-secondary-600' }
}

export function HomeHero({ block }: { block: HomeHeroBlock }) {
  const style = heroStyle(block, 'min-h-screen')
  return (
    <section
      id={block.anchor || undefined}
      className={clsx('relative flex items-center pt-[72px] pb-20 overflow-hidden', style.className)}
    >
      <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-radial from-primary-100/50 to-transparent opacity-50 -z-10" />

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-6">
              <span className="text-lg">TR</span>
              <span className="font-medium text-secondary-700">{block.badge}</span>
            </div>

            <h1 className={clsx('text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight', style.heading)}>
              {block.title}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                {block.titleAccent}
              </span>
            </h1>

            <p className={clsx('text-lg mb-8 leading-relaxed', style.body)}>{block.subtitle}</p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a href={block.primary?.href || '#contact'} className="btn btn-primary btn-lg">
                <MessageCircle className="w-5 h-5" />
                {block.primary?.label}
              </a>
              <a href={block.secondary?.href || '#services'} className="btn btn-outline btn-lg">
                {block.secondary?.label}
              </a>
            </div>

            <div className="flex gap-8">
              {block.stats?.map((stat) => (
                <div key={stat.id}>
                  <div className="text-3xl font-bold text-primary-600">{stat.value}</div>
                  <div className="text-sm text-secondary-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block h-[500px]">
            {block.floating?.slice(0, FLOATING_POSITIONS.length).map((item, index) => {
              const { className, delay } = FLOATING_POSITIONS[index]
              return (
                <div
                  key={item.id}
                  className={`absolute ${className} bg-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 animate-float`}
                  style={delay ? { animationDelay: delay } : undefined}
                >
                  <MedicalIcon icon={getIcon(item.icon)} size="sm" />
                  <span className="font-semibold">{item.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/** Two-column service hero used by the plastic, hair and aesthetic pages. */
export function ServiceHero({ block }: { block: ServiceHeroBlock }) {
  const style = heroStyle(block, 'min-h-[600px]')
  return (
    <section id={block.anchor || undefined} className={clsx('relative flex items-center', style.className)}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-6">
              <MedicalIcon icon={getIcon(block.badgeIcon)} size="sm" />
              <span className="font-medium text-secondary-700">{block.tag}</span>
            </div>

            <h1 className={clsx('text-4xl md:text-5xl font-bold mb-4', style.heading)}>
              {block.title}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                {block.titleAccent}
              </span>
            </h1>

            <p className={clsx('text-lg mb-8 leading-relaxed', style.body)}>{block.description}</p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a href={block.primary?.href || '#contact'} className="btn btn-primary btn-lg">
                <MessageCircle className="w-5 h-5" />
                {block.primary?.label}
              </a>
              <a href={block.secondary?.href || '#'} className="btn btn-outline btn-lg">
                {block.secondary?.label}
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {block.stats?.map((stat) => (
                <div key={stat.id}>
                  <div className="text-3xl font-bold text-primary-600">{stat.value}</div>
                  <div className="text-sm text-secondary-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <MediaImage
                media={block.image}
                alt={block.tag ?? undefined}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
              <div className="text-4xl font-bold text-primary-600">{block.floatValue}</div>
              <div className="text-secondary-600 font-medium">{block.floatLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function DentalHero({ block }: { block: DentalHeroBlock }) {
  const style = heroStyle(block, 'min-h-[90vh]')
  return (
    <section
      id={block.anchor || undefined}
      className={clsx('relative pt-[72px] pb-20 flex items-center overflow-hidden', style.className)}
    >

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {block.backLabel && (
              <Link href="/" className="inline-flex items-center gap-2 text-secondary-500 hover:text-primary-600 mb-6">
                <ArrowLeft className="w-4 h-4" />
                {block.backLabel}
              </Link>
            )}

            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-6">
              <MedicalIcon icon={getIcon(block.badgeIcon)} size="sm" />
              <span className="font-medium">{block.badge}</span>
            </div>

            <h1 className={clsx('text-4xl md:text-5xl font-bold mb-2', style.heading)}>{block.title}</h1>
            <p className="text-xl text-primary-600 font-medium mb-6">{block.subtitle}</p>
            <p className={clsx('text-lg mb-8', style.body)}>{block.description}</p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href={block.primary?.href || '#contact'} className="btn btn-primary btn-lg">
                {block.primary?.label}
              </a>
              <a href={block.secondary?.href || '#'} className="btn btn-outline btn-lg">
                {block.secondary?.label}
              </a>
            </div>

            <div className="space-y-3">
              {block.features?.map((feature) => (
                <div key={feature.id} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block relative">
            <MediaImage
              media={block.image}
              fallback="portrait"
              sizes="448px"
              className="w-full max-w-md mx-auto"
            />
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6">
              {block.stats?.map((stat) => (
                <div key={stat.id} className="bg-white p-4 rounded-xl shadow-lg text-center">
                  <div className="text-2xl font-bold text-primary-600">{stat.value}</div>
                  <div className="text-sm text-secondary-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
