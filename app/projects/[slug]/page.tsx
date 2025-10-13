import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ProjectHero from '@/components/project/ProjectHero'
import ProjectInfo from '@/components/project/ProjectInfo'
import ContentSection from '@/components/project/ContentSection'
import ImageGrid from '@/components/project/ImageGrid'
import ProjectCarousel from '@/components/project/ProjectCarousel'
import BackButton from '@/components/project/BackButton'
import { client } from '@/lib/sanity.client'
import { projectBySlugQuery, projectSlugsQuery, projectsQuery, siteSettingsQuery } from '@/lib/queries'
import { SiteSettings } from '@/types/siteSettings'

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = await client.fetch<{ slug: string }[]>(projectSlugsQuery)
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

// Fetch project data from Sanity
async function getProjectDetail(slug: string) {
  const project = await client.fetch(projectBySlugQuery, { slug })
  return project
}

async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const settings = await client.fetch(siteSettingsQuery)
    return settings
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const [project, allProjects, siteSettings] = await Promise.all([
    getProjectDetail(slug),
    client.fetch(projectsQuery),
    getSiteSettings(),
  ])

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <Navigation siteSettings={siteSettings} />
      
      <ProjectHero 
        title={project.title}
        description={project.description || "Product description outlining goal of the project/business"}
        heroImage={project.heroImage}
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
            />
          )}

          {/* Content Sections */}
          {project.contentSections?.map((section, index) => {
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
              />
            )
          })}

          {/* Image Grid */}
          {project.gallery && (
            <ImageGrid 
              largeImage={project.gallery.largeImage}
              smallImages={project.gallery.smallImages}
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
                    {project.conclusion.bullets.map((bullet, i) => (
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

      <ProjectCarousel currentSlug={slug} projects={allProjects} />

      <BackButton />

      <Footer siteSettings={siteSettings} />
    </main>
  )
}

