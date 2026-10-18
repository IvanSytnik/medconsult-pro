'use client'

import { ChevronLeft, ChevronRight, Maximize2, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export type Video = { id: number; url: string; thumbnail: string }

type Props = {
  anchor?: string
  /** Section padding and background from the block style. */
  className: string
  videos: Video[]
  /** Grid classes for the thumbnail column; dental and plastic lay thumbnails out differently. */
  thumbnailGridClass: string
  tag: string
  title: string
  subtitle: string
  ctaTitle: string
  ctaDesc: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel: string
  secondaryHref: string
}

type FullscreenVideo = HTMLVideoElement & { webkitRequestFullscreen?: () => void }

export default function VideoSlider({
  anchor,
  className,
  videos,
  thumbnailGridClass,
  tag,
  title,
  subtitle,
  ctaTitle,
  ctaDesc,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: Props) {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<FullscreenVideo>(null)

  // React does not keep the `muted` attribute in sync, so the element property is the source of truth.
  // Re-apply it after every source change because load() resets playback state.
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted
  }, [isMuted, currentVideo])

  const handlePlayPause = () => {
    const video = videoRef.current
    if (!video) return
    if (isPlaying) video.pause()
    else void video.play()
    setIsPlaying(!isPlaying)
  }

  const handleMuteToggle = () => {
    const video = videoRef.current
    if (!video) return
    setIsMuted(!video.muted)
  }

  const handleVideoSelect = (index: number) => {
    setCurrentVideo(index)
    setIsPlaying(false)
    videoRef.current?.load()
  }

  const handlePrevious = () => handleVideoSelect(currentVideo === 0 ? videos.length - 1 : currentVideo - 1)
  const handleNext = () => handleVideoSelect(currentVideo === videos.length - 1 ? 0 : currentVideo + 1)

  const handleFullscreen = () => {
    const video = videoRef.current
    if (!video) return
    if (video.requestFullscreen) void video.requestFullscreen()
    else video.webkitRequestFullscreen?.()
  }

  return (
    <section id={anchor} className={className}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-semibold mb-4">
            <Play className="w-4 h-4" />
            {tag}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-secondary-500 text-lg">{subtitle}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto mb-12 items-start justify-center">
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <div
              className="relative bg-black rounded-2xl overflow-hidden shadow-2xl group w-[300px] sm:w-[340px]"
              style={{ aspectRatio: '9/16' }}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-contain bg-black"
                poster={videos[currentVideo].thumbnail}
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onVolumeChange={(e) => setIsMuted(e.currentTarget.muted)}
                muted={isMuted}
                playsInline
              >
                <source src={videos[currentVideo].url} type="video/mp4" />
              </video>

              <button
                type="button"
                onClick={handlePlayPause}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" fill="white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                )}
              </button>

              <button
                type="button"
                onClick={handlePrevious}
                aria-label="Previous"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>

              <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                <button
                  type="button"
                  onClick={handleMuteToggle}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  className="w-9 h-9 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
                </button>
                <button
                  type="button"
                  onClick={handleFullscreen}
                  aria-label="Fullscreen"
                  className="w-9 h-9 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
                >
                  <Maximize2 className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-medium z-10">
                {currentVideo + 1} / {videos.length}
              </div>
            </div>
          </div>

          <div className="flex-1 w-full lg:w-auto">
            <div className={thumbnailGridClass}>
              {videos.map((video, index) => (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => handleVideoSelect(index)}
                  aria-label={`Video ${index + 1}`}
                  className={`relative rounded-xl overflow-hidden group cursor-pointer transition-all ${
                    currentVideo === index
                      ? 'ring-3 ring-primary-600 scale-[1.03] shadow-xl'
                      : 'hover:scale-[1.03] hover:shadow-lg opacity-70 hover:opacity-100'
                  }`}
                  style={{ aspectRatio: '9/16' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- poster can be an external Cloudinary URL */}
                  <img src={video.thumbnail} alt={`Video ${index + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center transition-all ${
                        currentVideo === index ? 'bg-primary-600' : 'bg-white/30 group-hover:bg-white/50'
                      }`}
                    >
                      <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                    </div>
                  </div>

                  {currentVideo === index && (
                    <div className="absolute top-2 right-2">
                      <div className="w-2.5 h-2.5 bg-primary-600 rounded-full animate-pulse" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">{ctaTitle}</h3>
          <p className="text-secondary-600 text-lg mb-6 max-w-2xl mx-auto">{ctaDesc}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={primaryHref} className="inline-flex items-center gap-2 btn btn-primary btn-lg">
              {primaryLabel}
              <ChevronRight className="w-5 h-5" />
            </a>
            <a href={secondaryHref} className="inline-flex items-center gap-2 btn btn-outline btn-lg">
              {secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
