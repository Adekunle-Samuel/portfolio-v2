'use client'

import { useState, useMemo } from 'react'
import ProjectHero from '@/components/project/ProjectHero'
import CaseStudyBody from '@/components/project/CaseStudyBody'
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
        categories={project.categories}
        timeline={project.timeline}
        projectUrl={project.projectUrl}
        heroImage={project.heroImage}
        heroVideo={project.heroVideo}
        onImageClick={handleImageClick}
      />

      <CaseStudyBody project={project} onImageClick={handleImageClick} />

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

