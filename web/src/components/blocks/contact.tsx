import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import ContactForm, { type ServiceOption } from '@/components/forms/ContactForm'
import { SectionHeading } from '@/components/sections/common'
import VideoSliderClient from '@/components/sections/VideoSlider'
import { mediaOf, populated, type ContactLinks } from '@/lib/cms'
import type { ContactBlock, Video, VideoSliderBlock } from '@/payload-types'

type ContactProps = { block: ContactBlock; contact: ContactLinks; services: ServiceOption[] }

export function Contact({ block, contact, services }: ContactProps) {
  const anchor = block.anchor || undefined
  const form = <ContactForm source={block.source || 'main'} services={services} fallbackWhatsapp={contact.formWhatsapp} />

  if (block.variant === 'compact') {
    return (
      <section id={anchor} className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading tag={block.tag ?? ''} title={block.title ?? ''} subtitle={block.subtitle ?? undefined} />
          <div className="max-w-2xl mx-auto">{form}</div>
        </div>
      </section>
    )
  }

  if (block.variant === 'direct') {
    return (
      <section id={anchor} className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="section-tag">{block.tag}</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{block.title}</h2>
            <p className="text-secondary-500 text-lg">{block.subtitle}</p>
          </div>

          <div className="card p-8">{form}</div>

          <div className="mt-8 text-center">
            <p className="text-secondary-600 mb-4">{block.direct?.text}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <MessageCircle className="w-5 h-5" />
                {block.direct?.whatsappLabel}
              </a>
              <a href={contact.emailHref} className="btn btn-outline">
                {block.direct?.emailLabel}
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const c = block.cards
  const cards = [
    {
      key: 'phone',
      Icon: Phone,
      title: c?.phoneTitle,
      body: (
        <a href={contact.phoneHref} className="text-primary-600 font-medium">
          {contact.phone}
        </a>
      ),
      note: c?.phoneNote,
    },
    {
      key: 'whatsapp',
      Icon: MessageCircle,
      title: c?.whatsappTitle,
      body: (
        <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-primary-600 font-medium">
          {c?.whatsappText}
        </a>
      ),
      note: c?.whatsappNote,
    },
    {
      key: 'email',
      Icon: Mail,
      title: c?.emailTitle,
      body: (
        <a href={contact.emailHref} className="text-primary-600 font-medium">
          {contact.email}
        </a>
      ),
      note: c?.emailNote,
    },
    {
      key: 'office',
      Icon: MapPin,
      title: c?.officeTitle,
      body: <p className="text-secondary-700">{c?.officeText}</p>,
      note: c?.officeNote,
    },
  ]

  return (
    <section id={anchor} className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading tag={block.tag ?? ''} title={block.title ?? ''} subtitle={block.subtitle ?? undefined} />

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">{form}</div>

          <div className="lg:col-span-2 space-y-4">
            {cards.map(({ key, Icon, title, body, note }) => (
              <div key={key} className="card p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{title}</h4>
                  {body}
                  <p className="text-sm text-secondary-500">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const THUMBNAIL_GRID = {
  four: 'grid grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3',
  three: 'grid grid-cols-3 lg:grid-cols-3 gap-3',
} as const

export function VideoSlider({ block }: { block: VideoSliderBlock }) {
  const videos = populated<Video>(block.videos)
    .map((video) => ({
      id: video.id,
      url: mediaOf(video.file)?.url ?? video.url ?? '',
      thumbnail: mediaOf(video.poster)?.url ?? video.thumbnailUrl ?? '',
    }))
    .filter((video) => video.url)
  if (videos.length === 0) return null

  return (
    <VideoSliderClient
      anchor={block.anchor || undefined}
      videos={videos}
      thumbnailGridClass={THUMBNAIL_GRID[block.thumbnails ?? 'four']}
      tag={block.tag ?? ''}
      title={block.title ?? ''}
      subtitle={block.subtitle ?? ''}
      ctaTitle={block.ctaTitle ?? ''}
      ctaDesc={block.ctaDesc ?? ''}
      primaryLabel={block.primary?.label ?? ''}
      primaryHref={block.primary?.href || '#contact'}
      secondaryLabel={block.secondary?.label ?? ''}
      secondaryHref={block.secondary?.href || '#'}
    />
  )
}
