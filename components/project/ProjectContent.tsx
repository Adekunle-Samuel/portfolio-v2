'use client'

import { useState, useMemo } from 'react'
import ProjectHero from '@/components/project/ProjectHero'
import ProjectInfo from '@/components/project/ProjectInfo'
import ContentSection from '@/components/project/ContentSection'
import ImageGrid from '@/components/project/ImageGrid'
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

      <div className="w-full px-8 lg:px-16 py-32">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-32">
          {/* TLDR Section */}
          {project.tldr && (
            <ContentSection
              title={project.tldr.title || "TLDR"}
              text={project.tldr.text}
              bullets={project.tldr.bullets}
              layout="image-right"
              image={project.tldr.image}
              onImageClick={handleImageClick}
            />
          )}

          {/* Content Sections */}
          {project.contentSections?.map((section: ContentSectionType, index: number) => {
            // Determine layout based on section structure
            const layout = section.layout || (index % 2 === 0 ? 'image-right' : 'image-left')
            
            return (
              <ContentSection
                key={index}
                title={section.title}
                text={section.text}
                bullets={section.bullets}
                layout={layout as 'image-right' | 'image-left'}
                image={section.image}
                onImageClick={handleImageClick}
              />
            )
          })}

          {/* Image Grid */}
          {project.gallery && (
            <ImageGrid 
              largeImage={project.gallery.largeImage}
              smallImages={project.gallery.smallImages}
              onImageClick={handleImageClick}
            />
          )}

          {/* Conclusion */}
          {project.conclusion && (
            <div className="flex flex-col gap-3 max-w-[500px]">
              <h3 className="text-sm font-medium text-gray-text tracking-tight">
                {project.conclusion.title || "Conclusion"}
              </h3>
              <div className="text-xs text-black leading-relaxed">
                {project.conclusion.text && <p className="mb-4">{project.conclusion.text}</p>}
                {project.conclusion.bullets && project.conclusion.bullets.length > 0 && (
                  <ul className="list-disc pl-5 space-y-2">
                    {project.conclusion.bullets.map((bullet: string, i: number) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

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

