'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import ProjectHero from '@/components/project/ProjectHero'
import ProjectInfo from '@/components/project/ProjectInfo'
import ProjectCarousel from '@/components/project/ProjectCarousel'
import BackButton from '@/components/project/BackButton'
import ImagePreview from '@/components/project/ImagePreview'
import { getOptimizedImageUrl } from '@/lib/sanity.client'
import { SiteSettings } from '@/types/siteSettings'
import { ContentSection as ContentSectionType } from '@/types/project'

interface ProjectContentProps {
  project: any
  allProjects: any[]
  siteSettings: SiteSettings | null
}

export default function ProjectContent({ project, allProjects, siteSettings }: ProjectContentProps) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Collect all images from the project
  const allImages = useMemo(() => {
    if (!project) return []
    
    const images: string[] = []
    
    // Hero image
    if (project.heroImage) {
      images.push(getOptimizedImageUrl(project.heroImage, 1920, 1080))
    }
    
    // TLDR image
    if (project.tldr?.image) {
      images.push(getOptimizedImageUrl(project.tldr.image, 1920, 1080))
    }
    
    // Content sections images
    project.contentSections?.forEach((section: ContentSectionType) => {
      if (section.image) {
        images.push(getOptimizedImageUrl(section.image, 1920, 1080))
      }
    })
    
    // Gallery images
    if (project.gallery?.largeImage) {
      images.push(getOptimizedImageUrl(project.gallery.largeImage, 1920, 1080))
    }
    if (project.gallery?.smallImages) {
      project.gallery.smallImages.forEach((img: any) => {
        images.push(getOptimizedImageUrl(img, 800, 600))
      })
    }
    
    return images
  }, [project])

  // Handle image click
  const handleImageClick = (imageUrl: string) => {
    const index = allImages.indexOf(imageUrl)
    if (index !== -1) {
      setCurrentImageIndex(index)
      setPreviewOpen(true)
    }
  }

  // Navigation handlers
  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  const handleClose = () => {
    setPreviewOpen(false)
  }

  return (
    <>
      <ProjectHero 
        title={project.title}
        description={project.description || ""}
        heroImage={project.heroImage}
        onImageClick={handleImageClick}
      />
      
      <ProjectInfo
        overview={project.overview || "Project overview coming soon..."}
        timeline={project.timeline || "TBD"}
        tools={project.tools || "N/A"}
        role={project.role || "N/A"}
      />

      <div className="w-full px-8 lg:px-16">
        <div className="max-w-[1440px] mx-auto border-t border-gray-200" />
      </div>

      {/* Visual-Forward Content Sections */}
      <section className="w-full px-8 lg:px-16 py-16">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-24">
          {/* TLDR Section - Image First */}
          {project.tldr && (
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Image if available */}
              {project.tldr.image && (
                <div 
                  className="w-full h-[500px] lg:h-[600px] rounded-lg overflow-hidden cursor-pointer mb-6"
                onClick={() => {
                  const imgUrl = getOptimizedImageUrl(project.tldr.image, 1920, 1080)
                  handleImageClick(imgUrl)
                }}
              >
                <motion.img 
                  src={getOptimizedImageUrl(project.tldr.image, 1920, 1080)}
                    alt={project.tldr.title || "TLDR"}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
              
              {/* Text below image */}
              <div className="max-w-[600px]">
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
            </motion.div>
          )}

          {/* Content Sections - Large Images First */}
          {project.contentSections?.map((section: ContentSectionType, index: number) => {
            const imageUrl = section.image ? getOptimizedImageUrl(section.image, 1920, 1080) : null
            
            return (
              <motion.div
                key={index}
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Image if available */}
                {section.image && imageUrl && (
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
                )}
                
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
                    const imgUrl = getOptimizedImageUrl(project.gallery.largeImage, 1920, 1080)
                    handleImageClick(imgUrl)
                  }}
                >
                  <motion.img 
                    src={getOptimizedImageUrl(project.gallery.largeImage, 1920, 1080)} 
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
                  const imgUrl = getOptimizedImageUrl(img, 800, 600)
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

      <div className="w-full px-8 lg:px-16">
        <div className="max-w-[1440px] mx-auto border-t border-gray-200" />
      </div>

      <ProjectCarousel currentSlug={project.slug.current} projects={allProjects} />

      <BackButton />

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

