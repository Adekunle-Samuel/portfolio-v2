'use client'

import { motion } from 'framer-motion'
import { getOptimizedImageUrl } from '@/lib/sanity.client'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface ContentSectionProps {
  title: string
  text?: string
  bullets?: string[]
  image?: SanityImageSource | null
  video?: { asset?: { url?: string } } | null
  imageUrl?: string | null
  layout?: 'image-left' | 'image-right'
  onImageClick?: (imageUrl: string) => void
}

const PlaceholderImage = () => (
  <div className="w-full h-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center rounded-lg">
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="15" width="60" height="50" rx="4" stroke="white" strokeOpacity="0.3" strokeWidth="2" />
      <circle cx="25" cy="30" r="5" fill="white" fillOpacity="0.3" />
      <path d="M10 50L25 35L40 45L55 30L70 45V60C70 62.2091 68.2091 64 66 64H14C11.7909 64 10 62.2091 10 60V50Z" fill="white" fillOpacity="0.3" />
    </svg>
  </div>
)

export default function ContentSection({
  title,
  text,
  bullets,
  image,
  video,
  imageUrl,
  layout = 'image-right',
  onImageClick
}: ContentSectionProps) {
  const finalImageUrl = image ? getOptimizedImageUrl(image, 1400, 634) : imageUrl
  const videoUrl = video?.asset?.url

  const content = (
    <div className="flex flex-col gap-3 w-full lg:w-auto lg:flex-1 lg:max-w-[450px]">
      <h3 className="text-sm font-medium text-gray-text tracking-tight">
        {title}
      </h3>
      <div className="text-xs text-black leading-relaxed">
        {text && <p className="mb-4 whitespace-pre-line">{text}</p>}
        {bullets && bullets.length > 0 && (
          <ul className="list-disc pl-5 space-y-2">
            {bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )

  const mediaElement = (
    <motion.div
      className="w-full lg:w-auto lg:flex-1 lg:max-w-[700px] h-[480px] rounded-lg overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
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
        <img src={finalImageUrl} alt={title} className="w-full h-full object-cover" />
      ) : (
        <PlaceholderImage />
      )}
    </motion.div>
  )

  return (
    <motion.div
      className="flex flex-col lg:flex-row items-start justify-between gap-12 w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {layout === 'image-left' ? (
        <>
          {mediaElement}
          {content}
        </>
      ) : (
        <>
          {content}
          {mediaElement}
        </>
      )}
    </motion.div>
  )
}

