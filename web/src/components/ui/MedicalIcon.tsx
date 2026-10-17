import type { ComponentProps } from 'react'
import type { LucideIcon } from 'lucide-react'

const sizes = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
} as const

export type IconSize = keyof typeof sizes

export type IconProps = {
  size?: IconSize
  gradient?: boolean
  className?: string
}

type MedicalIconProps = IconProps & { icon: LucideIcon } & Omit<ComponentProps<'svg'>, 'ref'>

export default function MedicalIcon({ icon: Icon, size = 'md', gradient = false, className = '', ...props }: MedicalIconProps) {
  const sizeClass = sizes[size]

  if (gradient) {
    return (
      <div
        className={`${sizeClass} flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl ${className}`}
      >
        <Icon className={`${sizeClass} text-primary-600`} strokeWidth={1.5} />
      </div>
    )
  }

  return <Icon className={`${sizeClass} text-primary-600 ${className}`} strokeWidth={1.5} {...props} />
}
