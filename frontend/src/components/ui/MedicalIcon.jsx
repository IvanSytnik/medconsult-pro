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

/**
 * MedicalIcon Component v2.0
 * Использует только Lucide иконки для единообразного стиля
 * Все иконки в едином векторном стиле - четкие, профессиональные, масштабируемые
 */

const MedicalIcon = ({ 
  icon: IconComponent,
  size = 'md',
  gradient = false,
  className = '',
  ...props 
}) => {
  // Размеры для иконок Lucide
  const sizes = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  const sizeClass = sizes[size] || sizes.md

  if (!IconComponent) {
    return null
  }

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
          className={`${sizeClass.split(' ')[0]} ${sizeClass.split(' ')[1]} text-primary-600`}
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

// ========================================
// ПРЕДУСТАНОВЛЕННЫЕ МЕДИЦИНСКИЕ ИКОНКИ
// ========================================

// Стоматология
export const ToothIcon = (props) => <MedicalIcon icon={Smile} {...props} />
export const CrownIcon = (props) => <MedicalIcon icon={Crown} {...props} />
export const DentalImplantIcon = (props) => <MedicalIcon icon={Award} {...props} />

// Общая медицина
export const PillIcon = (props) => <MedicalIcon icon={Pill} {...props} />
export const SyringeIcon = (props) => <MedicalIcon icon={Syringe} {...props} />
export const StethoscopeIcon = (props) => <MedicalIcon icon={Activity} {...props} />
export const HeartIcon = (props) => <MedicalIcon icon={Heart} {...props} />
export const ActivityIcon = (props) => <MedicalIcon icon={Activity} {...props} />
export const CrossIcon = (props) => <MedicalIcon icon={Cross} {...props} />

// Учреждения
export const HospitalIcon = (props) => <MedicalIcon icon={Building2} {...props} />
export const AmbulanceIcon = (props) => <MedicalIcon icon={Truck} {...props} />

// Процедуры
export const BandageIcon = (props) => <MedicalIcon icon={PlusCircle} {...props} />
export const ScissorsIcon = (props) => <MedicalIcon icon={Scissors} {...props} />
export const WrenchIcon = (props) => <MedicalIcon icon={Wrench} {...props} />

// Материалы и качество
export const DiamondIcon = (props) => <MedicalIcon icon={Diamond} {...props} />
export const SparkleIcon = (props) => <MedicalIcon icon={Sparkles} {...props} />
export const ZapIcon = (props) => <MedicalIcon icon={Zap} {...props} />

// Наука
export const TestTubeIcon = (props) => <MedicalIcon icon={TestTube2} {...props} />
export const DnaIcon = (props) => <MedicalIcon icon={Dna} {...props} />

// Прочее
export const MirrorIcon = (props) => <MedicalIcon icon={Scan} {...props} />
export const BoneIcon = (props) => <MedicalIcon icon={Bone} {...props} />
export const ShieldIcon = (props) => <MedicalIcon icon={Shield} {...props} />
export const CheckIcon = (props) => <MedicalIcon icon={CheckCircle2} {...props} />
export const FlagIcon = (props) => <MedicalIcon icon={Flag} {...props} />

// ========================================
// ЭКСПОРТ ВСЕХ ИКОНОК ДЛЯ УДОБСТВА
// ========================================
export const MedicalIcons = {
  // Стоматология
  Tooth: Smile,
  Crown: Crown,
  DentalImplant: Award,
  
  // Общая медицина
  Pill: Pill,
  Syringe: Syringe,
  Stethoscope: Activity,
  Heart: Heart,
  Activity: Activity,
  Cross: Cross,
  
  // Учреждения
  Hospital: Building2,
  Ambulance: Truck,
  
  // Процедуры
  Bandage: PlusCircle,
  Scissors: Scissors,
  Wrench: Wrench,
  
  // Материалы
  Diamond: Diamond,
  Sparkle: Sparkles,
  Zap: Zap,
  
  // Наука
  TestTube: TestTube2,
  Dna: Dna,
  
  // Прочее
  Mirror: Scan,
  Bone: Bone,
  Shield: Shield,
  Check: CheckCircle2,
  Flag: Flag,
}
