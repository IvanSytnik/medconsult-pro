import { useTranslation } from 'react-i18next'
import ComingSoon from '../components/ComingSoon'
import { Sparkles } from 'lucide-react'

export default function Aesthetic() {
  const { t } = useTranslation()
  
  return (
    <ComingSoon 
      icon={<Sparkles className="w-20 h-20 text-primary-600 mx-auto" />} 
      title={t('services.aesthetic.title')} 
    />
  )
}
