import { useTranslation } from 'react-i18next'
import ComingSoon from '../components/ComingSoon'
import { Syringe } from 'lucide-react'

export default function Plastic() {
  const { t } = useTranslation()
  
  return (
    <ComingSoon 
      icon={<Syringe className="w-20 h-20 text-primary-600 mx-auto" />} 
      title={t('services.plastic.title')} 
    />
  )
}
