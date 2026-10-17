import Image from 'next/image'
import { mediaOf } from '@/lib/cms'
import { PLACEHOLDER } from '@/lib/media'
import type { Media } from '@/payload-types'

type Props = {
  media: number | Media | null | undefined
  /** Shown while no photo is uploaded yet. */
  fallback?: keyof typeof PLACEHOLDER
  alt?: string
  className?: string
  sizes?: string
}

/** CMS image with a neutral placeholder while the owner has not uploaded a photo yet. */
export default function MediaImage({ media, fallback = 'landscape', alt, className, sizes = '100vw' }: Props) {
  const file = mediaOf(media)
  if (!file?.url || !file.width || !file.height) {
    // eslint-disable-next-line @next/next/no-img-element -- static placeholder SVG
    return <img src={file?.url ?? PLACEHOLDER[fallback]} alt={alt ?? file?.alt ?? ''} className={className} />
  }
  return (
    <Image
      src={file.url}
      alt={alt ?? file.alt ?? ''}
      width={file.width}
      height={file.height}
      sizes={sizes}
      className={className}
    />
  )
}
