/**
 * Style options every block has (`style.background`, `style.spacing`). Shared by the block config and the renderers;
 * keep it free of Next.js and Payload imports.
 */

export const BACKGROUNDS = [
  { value: 'none', label: 'None' },
  { value: 'white', label: 'White' },
  { value: 'muted', label: 'Light grey' },
  { value: 'gradient', label: 'Light brand gradient' },
  { value: 'dark', label: 'Dark' },
  { value: 'primary', label: 'Brand colour' },
] as const
export type Background = (typeof BACKGROUNDS)[number]['value']

export const SPACINGS = [
  { value: 'normal', label: 'Normal' },
  { value: 'compact', label: 'Compact' },
] as const
export type Spacing = (typeof SPACINGS)[number]['value']

export type BlockStyle = { background?: Background | null; spacing?: Spacing | null } | null | undefined

/** Each block's original look; new blocks start with it and existing ones were migrated to it. */
export const DEFAULT_BACKGROUND: Record<string, Background> = {
  homeHero: 'gradient',
  serviceHero: 'gradient',
  dentalHero: 'gradient',
  audience: 'dark',
  package: 'dark',
  results: 'dark',
  cta: 'primary',
  trustBar: 'white',
  videoSlider: 'white',
}

export const defaultBackground = (blockType: string): Background => DEFAULT_BACKGROUND[blockType] ?? 'none'

/** Backgrounds with white text. */
export const DARK_BACKGROUNDS: ReadonlySet<Background> = new Set(['dark', 'primary'])
