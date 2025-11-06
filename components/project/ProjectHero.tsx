'use client'

import { motion } from 'framer-motion'
import { getOptimizedImageUrl } from '@/lib/sanity.client'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface ProjectHeroProps {
  title: string
  description: string
  heroImage?: SanityImageSource | null
  imageUrl?: string | null
  onImageClick?: (imageUrl: string) => void
}

export default function ProjectHero({ title, description, heroImage, imageUrl, onImageClick }: ProjectHeroProps) {
  const finalImageUrl = heroImage ? getOptimizedImageUrl(heroImage, 1920, 1080) : imageUrl
  return (
    <>
      {/* Large Hero Image */}
      <motion.div 
        className="w-full h-[534px] mt-[121px] relative overflow-hidden cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        onClick={() => finalImageUrl && onImageClick?.(finalImageUrl)}
      >
        {finalImageUrl ? (
          <img 
            src={finalImageUrl} 
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="25" width="80" height="70" rx="4" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
              <circle cx="40" cy="45" r="8" fill="white" fillOpacity="0.3"/>
              <path d="M20 75L40 55L60 68L80 48L100 68V90C100 93 97 95 95 95H25C22 95 20 93 20 90V75Z" fill="white" fillOpacity="0.3"/>
            </svg>
          </div>
        )}
      </motion.div>

      {/* Title and Description */}
      <motion.div 
        className="w-full px-8 lg:px-16 py-8 border-b border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-2 max-w-[336px]">
            <h1 className="text-base font-normal text-black tracking-tight">
              {title}
            </h1>
            <p className="text-xs font-normal text-black leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  )
}

