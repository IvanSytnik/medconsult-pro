import React from 'react'
import {
  Pill,
  Syringe,
  Heart,
  Activity,
  Cross,
  Sparkles,
  Crown,
  Scissors,
  Wrench,
  Diamond,
  Building2,
  PlusCircle,
  TestTube2,
  Dna,
  Bone,
  Smile,
  CheckCircle2,
  Shield,
  Award,
  Zap,
  Flag,
  Truck,
  Scan
} from 'lucide-react'

const sizes = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
}

const MedicalIcon = ({
  icon: IconComponent,
  size = 'md',
  gradient = false,
  className = '',
  ...props
}) => {
  if (!IconComponent) {
    return null
  }

  const sizeClass = sizes[size] || sizes.md

  if (gradient) {
    return (
      <div
        className={`
          ${sizeClass}
          flex items-center justify-center
          bg-gradient-to-br from-primary-50 to-primary-100
          rounded-xl
          ${className}
        `}
        {...props}
      >
        <IconComponent
          className={`${sizeClass} text-primary-600`}
          strokeWidth={1.5}
        />
      </div>
    )
  }

  return (
    <IconComponent
      className={`${sizeClass} text-primary-600 ${className}`}
      strokeWidth={1.5}
      {...props}
    />
  )
}

export default MedicalIcon

// Dental
export const ToothIcon = (props) => <MedicalIcon icon={Smile} {...props} />
export const CrownIcon = (props) => <MedicalIcon icon={Crown} {...props} />
export const DentalImplantIcon = (props) => <MedicalIcon icon={Award} {...props} />

// General medicine
export const PillIcon = (props) => <MedicalIcon icon={Pill} {...props} />
export const SyringeIcon = (props) => <MedicalIcon icon={Syringe} {...props} />
export const StethoscopeIcon = (props) => <MedicalIcon icon={Activity} {...props} />
export const HeartIcon = (props) => <MedicalIcon icon={Heart} {...props} />
export const ActivityIcon = (props) => <MedicalIcon icon={Activity} {...props} />
export const CrossIcon = (props) => <MedicalIcon icon={Cross} {...props} />

// Facilities
export const HospitalIcon = (props) => <MedicalIcon icon={Building2} {...props} />
export const AmbulanceIcon = (props) => <MedicalIcon icon={Truck} {...props} />

// Procedures
export const BandageIcon = (props) => <MedicalIcon icon={PlusCircle} {...props} />
export const ScissorsIcon = (props) => <MedicalIcon icon={Scissors} {...props} />
export const WrenchIcon = (props) => <MedicalIcon icon={Wrench} {...props} />

// Quality
export const DiamondIcon = (props) => <MedicalIcon icon={Diamond} {...props} />
export const SparkleIcon = (props) => <MedicalIcon icon={Sparkles} {...props} />
export const ZapIcon = (props) => <MedicalIcon icon={Zap} {...props} />

// Science
export const TestTubeIcon = (props) => <MedicalIcon icon={TestTube2} {...props} />
export const DnaIcon = (props) => <MedicalIcon icon={Dna} {...props} />

// Other
export const MirrorIcon = (props) => <MedicalIcon icon={Scan} {...props} />
export const BoneIcon = (props) => <MedicalIcon icon={Bone} {...props} />
export const ShieldIcon = (props) => <MedicalIcon icon={Shield} {...props} />
export const CheckIcon = (props) => <MedicalIcon icon={CheckCircle2} {...props} />
export const FlagIcon = (props) => <MedicalIcon icon={Flag} {...props} />
