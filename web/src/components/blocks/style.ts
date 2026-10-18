import clsx from 'clsx'
import { DARK_BACKGROUNDS, defaultBackground, type Background, type BlockStyle } from '@/lib/block-style'

const BACKGROUND_CLASS: Record<Background, string> = {
  none: '',
  white: 'bg-white',
  muted: 'bg-secondary-50',
  gradient: 'bg-gradient-to-br from-primary-50 via-white to-secondary-50',
  dark: 'section-dark bg-gradient-to-br from-secondary-800 to-primary-900 text-white',
  primary: 'section-dark bg-gradient-to-r from-primary-600 to-primary-700 text-white',
}

type Padding = { normal: string; compact: string }

/** Vertical padding of a regular section. */
export const SECTION_PADDING: Padding = { normal: 'py-24', compact: 'py-12' }

/**
 * Classes for a block's <section> from its style settings. `dark` tells the renderer to use the light-on-dark
 * variants of its cards and buttons.
 */
export function sectionStyle(block: { blockType: string; style?: BlockStyle }, padding: Padding = SECTION_PADDING) {
  const background = block.style?.background ?? defaultBackground(block.blockType)
  const compact = block.style?.spacing === 'compact'
  return {
    className: clsx(compact ? padding.compact : padding.normal, BACKGROUND_CLASS[background]),
    dark: DARK_BACKGROUNDS.has(background),
    compact,
  }
}
