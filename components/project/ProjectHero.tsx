'use client'

import { motion } from 'framer-motion'
import { getOptimizedImageUrl } from '@/lib/sanity.client'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface ProjectHeroProps {
  title: string
  description: string
  categories?: string[]
  timeline?: string
  projectUrl?: string
  heroImage?: SanityImageSource | null
  heroVideo?: { asset?: { url?: string } } | null
  imageUrl?: string | null
  onImageClick?: (imageUrl: string) => void
}

export default function ProjectHero({
  title,
  description,
  categories,
  timeline,
  projectUrl,
  heroImage,
  heroVideo,
  imageUrl,
  onImageClick,
}: ProjectHeroProps) {
  const finalImageUrl = heroImage ? getOptimizedImageUrl(heroImage, 2880, 1068) : imageUrl
  const videoUrl = heroVideo?.asset?.url
  const eyebrow = [...(categories || []), timeline].filter(Boolean).join(' · ')

  return (
    <>
      {/* Title block */}
      <motion.div
        className="w-full px-8 lg:px-16 pt-32 lg:pt-40 pb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="max-w-[1440px] mx-auto">
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.16em] text-gray-text mb-5">
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-black tracking-[-0.02em] leading-[1.1] max-w-[24ch]">
            {title}
          </h1>
          {description && (
            <p className="text-lg sm:text-xl text-[#2a2a2a] leading-relaxed max-w-[64ch] mt-5">
              {description}
            </p>
          )}
          {projectUrl && (
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-black border border-gray-300 hover:border-gray-400 transition-colors px-4 py-2.5 mt-6"
            >
              View live
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>
      </motion.div>

      {/* Cover image */}
      <motion.div
        className="w-full px-8 lg:px-16 pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.25 }}
      >
        <div
          className={`group max-w-[1440px] mx-auto h-[360px] sm:h-[480px] lg:h-[534px] relative overflow-hidden rounded-lg ${videoUrl ? '' : 'cursor-zoom-in'}`}
          onClick={() => !videoUrl && finalImageUrl && onImageClick?.(finalImageUrl)}
        >
          {videoUrl ? (
            <video
              src={videoUrl}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : finalImageUrl ? (
            <>
              <img src={finalImageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
              <span className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
              <span className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-black opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
                Expand
              </span>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="25" width="80" height="70" rx="4" stroke="white" strokeOpacity="0.3" strokeWidth="2" />
                <circle cx="40" cy="45" r="8" fill="white" fillOpacity="0.3" />
                <path d="M20 75L40 55L60 68L80 48L100 68V90C100 93 97 95 95 95H25C22 95 20 93 20 90V75Z" fill="white" fillOpacity="0.3" />
              </svg>
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}
