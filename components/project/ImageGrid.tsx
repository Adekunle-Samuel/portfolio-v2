'use client'

import { motion } from 'framer-motion'
import { getOptimizedImageUrl } from '@/lib/sanity.client'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface ImageGridProps {
  largeImage?: SanityImageSource | null
  smallImages?: SanityImageSource[] | null
  onImageClick?: (imageUrl: string) => void
}

const PlaceholderImage = ({ className }: { className?: string }) => (
  <div className={`bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center rounded-lg ${className}`}>
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="15" width="60" height="50" rx="4" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
      <circle cx="25" cy="30" r="5" fill="white" fillOpacity="0.3"/>
      <path d="M10 50L25 35L40 45L55 30L70 45V60C70 62.2091 68.2091 64 66 64H14C11.7909 64 10 62.2091 10 60V50Z" fill="white" fillOpacity="0.3"/>
    </svg>
  </div>
)

export default function ImageGrid({ largeImage, smallImages, onImageClick }: ImageGridProps) {
  const largeImageUrl = largeImage ? getOptimizedImageUrl(largeImage, 1920, 1080) : null
  const smallImageUrls = smallImages?.map(img => getOptimizedImageUrl(img, 800, 600)) || []
  return (
    <motion.div 
      className="flex flex-col gap-4 w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Large Image */}
      <motion.div 
        className="w-full h-[572px] rounded-lg overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
        onClick={() => largeImageUrl && onImageClick?.(largeImageUrl)}
      >
        {largeImageUrl ? (
          <img src={largeImageUrl} alt="Project showcase" className="w-full h-full object-cover" />
        ) : (
          <PlaceholderImage className="w-full h-full" />
        )}
      </motion.div>

      {/* Three Small Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <motion.div 
            key={i}
            className="w-full h-[420px] rounded-lg overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => smallImageUrls[i] && onImageClick?.(smallImageUrls[i])}
          >
            {smallImageUrls[i] ? (
              <img src={smallImageUrls[i]} alt={`Project detail ${i + 1}`} className="w-full h-full object-cover" />
            ) : (
              <PlaceholderImage className="w-full h-full" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

