import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import { 
  ArrowLeft, 
  CheckCircle2, 
  Hotel, 
  Car, 
  HeadphonesIcon, 
  ClipboardList, 
  Building2, 
  FlaskConical, 
  Globe,
  Flag,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react'
import ContactForm from '../components/forms/ContactForm'
import MedicalIcon, { 
  ToothIcon, 
  CrownIcon, 
  SparkleIcon, 
  DiamondIcon,
  WrenchIcon,
  BoneIcon,
  HospitalIcon,
  ShieldIcon,
  CheckIcon,
  DentalImplantIcon
} from '../components/ui/MedicalIcon'

export default function Dental() {
  const { t } = useTranslation()

  return (
    <>
      <DentalHero />
      <TrustBar />
      <TreatmentsSection />
      <PricingSection />
      <ClinicSection />
      <PackageSection />
      <VideoSliderSection />
      <DentalContactSection />
    </>
  )
}

// === DENTAL HERO ===
function DentalHero() {
  const { t } = useTranslation()

  return (
    <section className="relative pt-[72px] pb-20 min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 -z-10" />
      
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-secondary-500 hover:text-primary-600 mb-6">
              <ArrowLeft className="w-4 h-4" />
              {t('dental.back')}
            </Link>

            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-6">
              <ToothIcon size="sm" />
              <span className="font-medium">{t('dental.badge')}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-2">
              {t('dental.heroTitle')}
            </h1>
            <p className="text-xl text-primary-600 font-medium mb-6">
              {t('dental.heroSubtitle')}
            </p>
            <p className="text-lg text-secondary-600 mb-8">
              {t('dental.heroDesc')}
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#contact" className="btn btn-primary btn-lg">
                {t('hero.btnConsultation')}
              </a>
              <a href="#pricing" className="btn btn-outline btn-lg">
                {t('dental.pricingTag')}
              </a>
            </div>

            <div className="space-y-3">
              {['guarantee', 'materials', 'experience'].map((key) => (
                <div key={key} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{t(`dental.features.${key}`)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block relative">
            <img
              src="https://dentanatura.com/wp-content/uploads/2025/11/dokt-scaled.png"
              alt="Dr. Mevlüt"
              className="w-full max-w-md mx-auto"
            />
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6">
              <div className="bg-white p-4 rounded-xl shadow-lg text-center">
                <div className="text-2xl font-bold text-primary-600">5000+</div>
                <div className="text-sm text-secondary-500">{t('hero.stats.clients')}</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-lg text-center">
                <div className="text-2xl font-bold text-primary-600">70%</div>
                <div className="text-sm text-secondary-500">{t('hero.stats.savings')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// === TRUST BAR ===
function TrustBar() {
  const { t } = useTranslation()

  const items = [
    { key: 'ministry', Icon: HospitalIcon },
    { key: 'german', Icon: Flag, label: 'DE' },
    { key: 'swiss', Icon: Flag, label: 'CH' },
    { key: 'certified', Icon: CheckIcon },
  ]

  return (
    <section className="py-8 border-y border-secondary-200 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ key, Icon, label }) => (
            <div key={key} className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                {label ? (
                  <span className="text-sm font-bold text-secondary-700">{label}</span>
                ) : (
                  <Icon className="w-6 h-6 text-primary-600" strokeWidth={1.5} />
                )}
              </div>
              <div>
                <div className="font-semibold text-secondary-800">{t(`dental.trust.${key}`)}</div>
                <div className="text-sm text-secondary-500">{t(`dental.trust.${key}Desc`)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// === TREATMENTS SECTION ===
function TreatmentsSection() {
  const { t } = useTranslation()

  const treatments = [
    { key: 'implants', Icon: DentalImplantIcon, price: '€450' },
    { key: 'crowns', Icon: CrownIcon, price: '€150' },
    { key: 'veneers', Icon: SparkleIcon, price: '€250' },
    { key: 'zirconium', Icon: DiamondIcon, price: '€200' },
    { key: 'allOn', Icon: WrenchIcon, price: '€3,500' },
    { key: 'bone', Icon: BoneIcon, price: '€200' },
  ]

  return (
    <section id="treatments" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{t('dental.servicesTag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('dental.servicesTitle')}</h2>
          <p className="text-secondary-500 text-lg">{t('dental.servicesSubtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {treatments.map(({ key, Icon, price }) => (
            <div key={key} className="card card-hover p-6 flex gap-5">
              <Icon size="lg" gradient className="flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{t(`dental.treatments.${key}.title`)}</h3>
                <p className="text-secondary-600 text-sm mb-3">{t(`dental.treatments.${key}.desc`)}</p>
                <div className="text-sm text-secondary-500">
                  {t(`dental.treatments.${key}.price`)} <span className="text-2xl font-bold text-primary-600">{price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// === PRICING SECTION ===
function PricingSection() {
  const { t } = useTranslation()

  const prices = [
    { name: 'Dental Implant (Premium)', germany: '€1,800 - €3,500', our: '€450', savings: '75%', Icon: DentalImplantIcon },
    { name: 'Ceramic Crown', germany: '€700 - €1,200', our: '€150', savings: '80%', Icon: CrownIcon },
    { name: 'Zirconium Crown', germany: '€900 - €1,500', our: '€200', savings: '78%', Icon: DiamondIcon },
    { name: 'Veneer', germany: '€800 - €1,500', our: '€250', savings: '70%', Icon: SparkleIcon },
    { name: 'All-on-4 (jaw)', germany: '€12,000 - €20,000', our: '€3,500', savings: '75%', Icon: WrenchIcon },
    { name: 'Smile Makeover (20 veneers)', germany: '€16,000 - €30,000', our: '€5,000', savings: '70%', Icon: ToothIcon },
  ]

  return (
    <section id="pricing" className="py-24 bg-secondary-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{t('dental.pricingTag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('dental.pricingTitle')}</h2>
          <p className="text-secondary-500 text-lg">{t('dental.pricingSubtitle')}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-5 bg-primary-600 text-white p-5 font-semibold">
            <div className="col-span-2">{t('dental.pricingTable.procedure')}</div>
            <div className="hidden sm:block">{t('dental.pricingTable.germany')}</div>
            <div>{t('dental.pricingTable.ourPrice')}</div>
            <div>{t('dental.pricingTable.savings')}</div>
          </div>
          {prices.map((item, i) => (
            <div key={i} className="grid grid-cols-5 p-5 border-b border-secondary-100 items-center hover:bg-secondary-50 transition-colors">
              <div className="col-span-2 flex items-center gap-3">
                <item.Icon size="sm" />
                <span className="font-medium">{item.name}</span>
              </div>
              <div className="hidden sm:block text-secondary-500 line-through">{item.germany}</div>
              <div className="font-bold text-primary-600 text-lg">{item.our}</div>
              <div>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {item.savings}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// === CLINIC SECTION ===
function ClinicSection() {
  const { t } = useTranslation()

  const features = [
    { key: 'equipment', icon: Building2 },
    { key: 'lab', icon: FlaskConical },
    { key: 'team', icon: Globe },
  ]

  return (
    <section id="clinic" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{t('dental.clinicTag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('dental.clinicTitle')}</h2>
          <p className="text-secondary-500 text-lg">{t('dental.clinicSubtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="flex gap-6 bg-secondary-50 p-6 rounded-xl mb-8">
              <img
                src="https://dentanatura.com/wp-content/uploads/2025/11/mav-scaled.png"
                alt="Dr. Mevlüt"
                className="w-28 h-28 object-cover rounded-xl"
              />
              <div>
                <h3 className="text-xl font-bold">{t('dental.doctor.name')}</h3>
                <p className="text-primary-600 font-medium mb-2">{t('dental.doctor.role')}</p>
                <p className="text-secondary-600 text-sm">{t('dental.doctor.desc')}</p>
              </div>
            </div>

            <div className="space-y-5">
              {features.map(({ key, icon: Icon }) => (
                <div key={key} className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-bold">{t(`dental.clinicFeatures.${key}.title`)}</h4>
                    <p className="text-secondary-600 text-sm">{t(`dental.clinicFeatures.${key}.desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="rounded-xl overflow-hidden mb-4">
              <img
                src="https://dentanatura.com/wp-content/uploads/2025/11/zespolowo-scaled.png"
                alt="Clinic team"
                className="w-full h-72 object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {['pozy', 'd1', 'd2'].map((img) => (
                <img
                  key={img}
                  src={`https://dentanatura.com/wp-content/uploads/2025/10/${img}.png`}
                  alt="Clinic"
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// === PACKAGE SECTION ===
function PackageSection() {
  const { t } = useTranslation()

  const items = [
    { key: 'hotel', icon: Hotel },
    { key: 'transfer', icon: Car },
    { key: 'support', icon: HeadphonesIcon },
    { key: 'plan', icon: ClipboardList },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-secondary-800 to-primary-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag section-tag-light">{t('dental.packageTag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('dental.packageTitle')}</h2>
          <p className="text-white/80 text-lg">{t('dental.packageSubtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {items.map(({ key, icon: Icon }) => (
            <div key={key} className="bg-white/10 border border-white/15 rounded-xl p-8 text-center hover:bg-white/15 transition-colors">
              <Icon className="w-10 h-10 mx-auto mb-4 opacity-90" />
              <h3 className="font-bold text-lg mb-2">{t(`dental.package.${key}.title`)}</h3>
              <p className="text-white/80 text-sm">{t(`dental.package.${key}.desc`)}</p>
            </div>
          ))}
        </div>

        <div className="text-center bg-white/10 p-5 rounded-lg">
          <p className="font-medium">{t('dental.packageNote')}</p>
        </div>
      </div>
    </section>
  )
}

// === VIDEO SLIDER SECTION ===
function VideoSliderSection() {
  const { t } = useTranslation()
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef(null)

  const videos = [
    {
      id: 1,
      url: 'https://res.cloudinary.com/di36itbpm/video/upload/7_mig4ta.mp4',
      thumbnail: 'https://res.cloudinary.com/di36itbpm/video/upload/so_2,w_800/7_mig4ta.jpg',
    },
    {
      id: 2,
      url: 'https://res.cloudinary.com/di36itbpm/video/upload/2_gjhs9z.mp4',
      thumbnail: 'https://res.cloudinary.com/di36itbpm/video/upload/so_2,w_800/2_gjhs9z.jpg',
    },
    {
      id: 3,
      url: 'https://res.cloudinary.com/di36itbpm/video/upload/6_c25jdc.mp4',
      thumbnail: 'https://res.cloudinary.com/di36itbpm/video/upload/so_2,w_800/6_c25jdc.jpg',
    },
    {
      id: 4,
      url: 'https://res.cloudinary.com/di36itbpm/video/upload/1_uxj8lj.mp4',
      thumbnail: 'https://res.cloudinary.com/di36itbpm/video/upload/so_2,w_800/1_uxj8lj.jpg',
    },
    {
      id: 5,
      url: 'https://res.cloudinary.com/di36itbpm/video/upload/5_oaqkv5.mp4',
      thumbnail: 'https://res.cloudinary.com/di36itbpm/video/upload/so_2,w_800/5_oaqkv5.jpg',
    }
  ]

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVideoSelect = (index) => {
    setCurrentVideo(index)
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.load()
    }
  }

  const handlePrevious = () => {
    const newIndex = currentVideo === 0 ? videos.length - 1 : currentVideo - 1
    handleVideoSelect(newIndex)
  }

  const handleNext = () => {
    const newIndex = currentVideo === videos.length - 1 ? 0 : currentVideo + 1
    handleVideoSelect(newIndex)
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen()
      }
    }
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-semibold mb-4">
            <Play className="w-4 h-4" />
            {t('dental.videos.tag')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('dental.videos.title')}
          </h2>
          <p className="text-secondary-500 text-lg">
            {t('dental.videos.subtitle')}
          </p>
        </div>

        {/* Main Video Player */}
        <div className="mb-8">
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video max-w-5xl mx-auto group">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster={videos[currentVideo].thumbnail}
              onEnded={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              playsInline
            >
              <source src={videos[currentVideo].url} type="video/mp4" />
            </video>

            {/* Play/Pause Button */}
            <button
              onClick={handlePlayPause}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all hover:scale-110 group-hover:w-24 group-hover:h-24 z-10"
            >
              {isPlaying ? (
                <Pause className="w-10 h-10 text-white" fill="white" />
              ) : (
                <Play className="w-10 h-10 text-white ml-1" fill="white" />
              )}
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Video Controls */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-10">
              <button
                onClick={handleMuteToggle}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
              <button
                onClick={handleFullscreen}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
              >
                <Maximize2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Video Thumbnails Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 max-w-5xl mx-auto">
          {videos.map((video, index) => (
            <button
              key={video.id}
              onClick={() => handleVideoSelect(index)}
              className={`relative rounded-xl overflow-hidden aspect-video group cursor-pointer transition-all ${
                currentVideo === index
                  ? 'ring-4 ring-primary-600 scale-105 shadow-xl'
                  : 'hover:scale-105 hover:shadow-lg'
              }`}
            >
              <img
                src={video.thumbnail}
                alt={`Video ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              
              {/* Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-12 h-12 backdrop-blur-sm rounded-full flex items-center justify-center transition-all ${
                  currentVideo === index 
                    ? 'bg-primary-600' 
                    : 'bg-white/30 group-hover:bg-white/50'
                }`}>
                  <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                </div>
              </div>

              {/* Active Indicator */}
              {currentVideo === index && (
                <div className="absolute top-3 right-3">
                  <div className="w-3 h-3 bg-primary-600 rounded-full animate-pulse"></div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-12">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => handleVideoSelect(index)}
              className={`h-2 rounded-full transition-all ${
                currentVideo === index
                  ? 'w-8 bg-primary-600'
                  : 'w-2 bg-secondary-300 hover:bg-secondary-400'
              }`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {t('dental.videos.ctaTitle')}
          </h3>
          <p className="text-secondary-600 text-lg mb-6 max-w-2xl mx-auto">
            {t('dental.videos.ctaDesc')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 btn btn-primary btn-lg"
            >
              {t('hero.btnConsultation')}
              <ChevronRight className="w-5 h-5" />
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 btn btn-outline btn-lg"
            >
              {t('dental.pricingTag')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}


// === CONTACT SECTION ===
function DentalContactSection() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag">{t('contact.tag')}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('hero.btnConsultation')}</h2>
          <p className="text-secondary-500 text-lg">{t('contact.subtitle')}</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <ContactForm source="dental" />
        </div>
      </div>
    </section>
  )
}
