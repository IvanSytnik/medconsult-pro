import type { LucideProps } from 'lucide-react'
import { createElement } from 'react'
import { getIcon } from '@/lib/icons'

/** Renders the lucide icon picked in the CMS by its key. */
export default function CmsIcon({ name, ...props }: { name: string | null | undefined } & LucideProps) {
  return createElement(getIcon(name), props)
}
