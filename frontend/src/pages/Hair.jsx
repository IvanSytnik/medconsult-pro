import { useTranslation } from 'react-i18next'
import ComingSoon from '../components/ComingSoon'
import { Scissors } from 'lucide-react'

export default function Hair() {
  const { t } = useTranslation()
  
  return (
    <ComingSoon 
      icon={<Scissors className="w-20 h-20 text-primary-600 mx-auto" />} 
      title={t('services.hair.title')} 
    />
  )
}
