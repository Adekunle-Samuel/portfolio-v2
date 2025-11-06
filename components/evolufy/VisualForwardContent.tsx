'use client'

import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import ImagePreview from '@/components/project/ImagePreview'
import { getOptimizedImageUrl } from '@/lib/sanity.client'
import { ContentSection as ContentSectionType } from '@/types/project'

interface VisualForwardContentProps {
  project: any
}

export default function VisualForwardContent({ project }: VisualForwardContentProps) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Collect all images from the project
  const allImages = useMemo(() => {
    if (!project) return []
    
    const images: string[] = []
    
    // Hero image
    if (project.heroImage) {
      images.push(getOptimizedImageUrl(project.heroImage, 2880, 1068))
    }
    
    // TLDR image
    if (project.tldr?.image) {
      images.push(getOptimizedImageUrl(project.tldr.image, 1400, 634))
    }
    
    // Content sections images
    project.contentSections?.forEach((section: ContentSectionType) => {
      if (section.image) {
        images.push(getOptimizedImageUrl(section.image, 1400, 634))
      }
    })
    
    // Gallery images
    if (project.gallery?.largeImage) {
      images.push(getOptimizedImageUrl(project.gallery.largeImage, 2360, 1144))
    }
    if (project.gallery?.smallImages) {
      project.gallery.smallImages.forEach((img: any) => {
        images.push(getOptimizedImageUrl(img, 762, 550))
      })
    }
    
    return images
  }, [project])

  const handleImageClick = (imageUrl: string) => {
    const index = allImages.indexOf(imageUrl)
    if (index !== -1) {
      setCurrentImageIndex(index)
      setPreviewOpen(true)
    }
  }

  const handleClose = () => {
    setPreviewOpen(false)
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  // Get hero image URL
  const heroImageUrl = project.heroImage 
    ? getOptimizedImageUrl(project.heroImage, 2880, 1068)
    : null

  return (
    <>
      {/* Hero Section - Larger but with margins */}
      <motion.section 
        className="w-full px-8 lg:px-16 mt-[121px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-[1440px] mx-auto">
          <motion.div 
            className="w-full h-[600px] lg:h-[700px] rounded-lg overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.01 }}
            onClick={() => heroImageUrl && handleImageClick(heroImageUrl)}
          >
            {heroImageUrl ? (
              <img 
                src={heroImageUrl} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="25" width="80" height="70" rx="4" stroke="#666" strokeOpacity="0.3" strokeWidth="2"/>
                  <circle cx="40" cy="45" r="8" fill="#666" fillOpacity="0.3"/>
                  <path d="M20 75L40 55L60 68L80 48L100 68V90C100 93 97 95 95 95H25C22 95 20 93 20 90V75Z" fill="#666" fillOpacity="0.3"/>
                </svg>
              </div>
            )}
          </motion.div>

          {/* Title and Description - Below image */}
          <motion.div 
            className="mt-8 pb-8 border-b border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex flex-col gap-2 max-w-[500px]">
              <h1 className="text-base font-normal text-black tracking-tight">
                {project.title}
              </h1>
              <p className="text-xs font-normal text-black leading-relaxed">
                {project.description || ""}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Large Image Sections - Visual Forward with Margins */}
      <section className="w-full px-8 lg:px-16 py-16">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-24">
          {/* TLDR Section - Image First */}
          {project.tldr?.image && (
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div 
                className="w-full h-[500px] lg:h-[600px] rounded-lg overflow-hidden cursor-pointer"
                onClick={() => {
                  const imgUrl = getOptimizedImageUrl(project.tldr.image, 1400, 634)
                  handleImageClick(imgUrl)
                }}
              >
                <motion.img 
                  src={getOptimizedImageUrl(project.tldr.image, 1400, 634)} 
                  alt={project.tldr.title || "TLDR"}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              {/* Text below image */}
              {project.tldr && (
                <div className="mt-6 max-w-[600px]">
                  <h3 className="text-sm font-medium text-gray-text tracking-tight mb-3">
                    {project.tldr.title || "TLDR"}
                  </h3>
                  {project.tldr.text && (
                    <p className="text-xs text-black leading-relaxed mb-4 whitespace-pre-line">
                      {project.tldr.text}
                    </p>
                  )}
                  {project.tldr.bullets && project.tldr.bullets.length > 0 && (
                    <ul className="list-disc pl-5 space-y-2 text-xs text-black">
                      {project.tldr.bullets.map((bullet: string, i: number) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Content Sections - Large Images First */}
          {project.contentSections?.map((section: ContentSectionType, index: number) => {
            if (!section.image) return null
            
            const imageUrl = getOptimizedImageUrl(section.image, 1400, 634)
            
            return (
              <motion.div
                key={index}
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div 
                  className="w-full h-[500px] lg:h-[600px] rounded-lg overflow-hidden cursor-pointer mb-6"
                  onClick={() => handleImageClick(imageUrl)}
                >
                  <motion.img 
                    src={imageUrl} 
                    alt={section.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                
                {/* Text below image */}
                <div className="max-w-[600px]">
                  <h3 className="text-sm font-medium text-gray-text tracking-tight mb-3">
                    {section.title}
                  </h3>
                  {section.text && (
                    <p className="text-xs text-black leading-relaxed mb-4 whitespace-pre-line">
                      {section.text}
                    </p>
                  )}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="list-disc pl-5 space-y-2 text-xs text-black">
                      {section.bullets.map((bullet: string, i: number) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Gallery Section - Large Format */}
      {project.gallery && (
        <section className="w-full px-8 lg:px-16 py-16">
          <div className="max-w-[1440px] mx-auto">
            {/* Large Image */}
            {project.gallery.largeImage && (
              <motion.div
                className="w-full mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div 
                  className="w-full h-[500px] lg:h-[600px] rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => {
                    const imgUrl = getOptimizedImageUrl(project.gallery.largeImage, 2360, 1144)
                    handleImageClick(imgUrl)
                  }}
                >
                  <motion.img 
                    src={getOptimizedImageUrl(project.gallery.largeImage, 2360, 1144)} 
                    alt="Gallery"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            )}

            {/* Small Images Grid */}
            {project.gallery.smallImages && project.gallery.smallImages.length > 0 && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {project.gallery.smallImages.map((img: any, index: number) => {
                  const imgUrl = getOptimizedImageUrl(img, 762, 550)
                  return (
                    <div
                      key={index}
                      className="w-full h-[400px] rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => handleImageClick(imgUrl)}
                    >
                      <motion.img 
                        src={imgUrl} 
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  )
                })}
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Conclusion Section */}
      {project.conclusion && (
        <section className="w-full px-8 lg:px-16 py-16">
          <div className="max-w-[1440px] mx-auto">
            <div className="max-w-[600px]">
              <h3 className="text-sm font-medium text-gray-text tracking-tight mb-3">
                {project.conclusion.title || "Conclusion"}
              </h3>
              {project.conclusion.text && (
                <p className="text-xs text-black leading-relaxed mb-4 whitespace-pre-line">
                  {project.conclusion.text}
                </p>
              )}
              {project.conclusion.bullets && project.conclusion.bullets.length > 0 && (
                <ul className="list-disc pl-5 space-y-2 text-xs text-black">
                  {project.conclusion.bullets.map((bullet: string, i: number) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Image Preview Modal */}
      <ImagePreview
        images={allImages}
        currentIndex={currentImageIndex}
        isOpen={previewOpen}
        onClose={handleClose}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </>
  )
}
