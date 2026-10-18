import { Activity } from 'lucide-react'
import Image from 'next/image'
import { SITE_NAME } from '@/lib/site'
import { DEFAULT_LOGO } from '@/lib/theme'
import type { Media, Theme } from '@/payload-types'

const VARIANTS = {
  header: {
    box: 'w-11 h-11 bg-gradient-to-br from-primary-600 to-primary-500',
    icon: 'w-6 h-6',
    image: 'h-11',
    text: 'text-xl font-bold text-secondary-900',
    accent: 'text-primary-600',
  },
  footer: {
    box: 'w-10 h-10 bg-primary-600',
    icon: 'w-5 h-5',
    image: 'h-10',
    text: 'text-lg font-bold text-white',
    accent: 'text-primary-400',
  },
} as const

/** Logo from the theme: the uploaded image (or the default icon) followed by the two-part name. */
export default function Logo({ logo, variant }: { logo: Theme['logo']; variant: keyof typeof VARIANTS }) {
  const v = VARIANTS[variant]
  const image = logo?.image && typeof logo.image === 'object' ? (logo.image as Media) : null
  // Unset fields (no theme saved yet) show the original name; empty strings hide it.
  const text = logo?.text ?? DEFAULT_LOGO.text
  const accent = logo?.accent ?? DEFAULT_LOGO.accent

  return (
    <>
      {image?.url && image.width && image.height ? (
        <Image src={image.url} alt={image.alt || SITE_NAME} width={image.width} height={image.height} className={`${v.image} w-auto`} />
      ) : (
        <div className={`${v.box} rounded-lg flex items-center justify-center text-white`}>
          <Activity className={v.icon} />
        </div>
      )}
      {(text || accent) && (
        <span className={v.text}>
          {text}
          <span className={v.accent}>{accent}</span>
        </span>
      )}
    </>
  )
}
