import type { ComponentProps } from 'react'
import {
  Award,
  Bone,
  Building2,
  CheckCircle2,
  Crown,
  Diamond,
  Scissors,
  Smile,
  Sparkles,
  Syringe,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

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

export type IconComponent = (props: IconProps) => React.JSX.Element

export const ToothIcon: IconComponent = (props) => <MedicalIcon icon={Smile} {...props} />
export const CrownIcon: IconComponent = (props) => <MedicalIcon icon={Crown} {...props} />
export const DentalImplantIcon: IconComponent = (props) => <MedicalIcon icon={Award} {...props} />
export const SyringeIcon: IconComponent = (props) => <MedicalIcon icon={Syringe} {...props} />
export const ScissorsIcon: IconComponent = (props) => <MedicalIcon icon={Scissors} {...props} />
export const WrenchIcon: IconComponent = (props) => <MedicalIcon icon={Wrench} {...props} />
export const DiamondIcon: IconComponent = (props) => <MedicalIcon icon={Diamond} {...props} />
export const SparkleIcon: IconComponent = (props) => <MedicalIcon icon={Sparkles} {...props} />
export const BoneIcon: IconComponent = (props) => <MedicalIcon icon={Bone} {...props} />
export const HospitalIcon: IconComponent = (props) => <MedicalIcon icon={Building2} {...props} />
export const CheckIcon: IconComponent = (props) => <MedicalIcon icon={CheckCircle2} {...props} />
