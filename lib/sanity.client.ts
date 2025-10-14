import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Helper function to check if an image is a GIF
function isGif(source: SanityImageSource): boolean {
  if (typeof source === 'string') {
    return source.toLowerCase().includes('.gif')
  }
  if (source && typeof source === 'object') {
    const asset = (source as any).asset
    if (asset) {
      // Check _ref or _id for gif extension
      const ref = asset._ref || asset._id || ''
      if (ref.toLowerCase().includes('gif')) return true
      
      // Check extension field if available
      if (asset.extension === 'gif') return true
      
      // Check mimeType if available
      if (asset.mimeType === 'image/gif') return true
    }
  }
  return false
}

// Smart image URL builder that preserves GIF animations
// Default quality increased to 95 for high-resolution displays
export function getOptimizedImageUrl(
  source: SanityImageSource,
  width: number,
  height?: number,
  quality: number = 95
): string {
  // Double the dimensions for retina displays (2x)
  const retinaWidth = width * 2
  const urlBuilder = urlFor(source).width(retinaWidth).quality(quality)
  
  // Only apply WebP format for non-GIF images
  if (!isGif(source)) {
    urlBuilder.format('webp')
  }
  
  if (height) {
    const retinaHeight = height * 2
    urlBuilder.height(retinaHeight)
  }
  
  return urlBuilder.url()
}

