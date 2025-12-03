import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ProjectContent from '@/components/project/ProjectContent'
import ProjectViewTracker from '@/components/ProjectViewTracker'
import { client } from '@/lib/sanity.client'
import { projectBySlugQuery, projectsQuery, projectSlugsQuery, siteSettingsQuery } from '@/lib/queries'

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static params for all projects
export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(projectSlugsQuery)
    return slugs.map((item: { slug: string }) => ({
      slug: item.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params

  try {
    const [project, allProjects, siteSettings] = await Promise.all([
      client.fetch(projectBySlugQuery, { slug }),
      client.fetch(projectsQuery),
      client.fetch(siteSettingsQuery).catch(() => null),
    ])

    if (!project) {
      notFound()
    }

    return (
      <main className="min-h-screen bg-white">
        <Navigation siteSettings={siteSettings} />
        <ProjectViewTracker
          projectSlug={project.slug}
          projectTitle={project.title}
        />
        <ProjectContent
          project={project}
          allProjects={allProjects}
          siteSettings={siteSettings}
        />
        <Footer siteSettings={siteSettings} />
      </main>
    )
  } catch (error) {
    console.error('Error fetching project:', error)
    notFound()
  }
}
