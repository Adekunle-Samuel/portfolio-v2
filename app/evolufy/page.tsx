import { client } from '@/lib/sanity.client'
import { projectBySlugQuery, projectsQuery, siteSettingsQuery } from '@/lib/queries'
import { SiteSettings } from '@/types/siteSettings'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import VisualForwardContent from '@/components/evolufy/VisualForwardContent'

async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const settings = await client.fetch(siteSettingsQuery)
    return settings
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

async function getEvolufyProject() {
  try {
    // Try common slug variations for Evolufy
    const slugs = ['evolufy', 'evolufy-africa', 'evolufy-africa-platform']
    
    for (const slug of slugs) {
      const project = await client.fetch(projectBySlugQuery, { slug })
      if (project) return project
    }
    
    // If not found, try searching by title
    const allProjects = await client.fetch(projectsQuery)
    const evolufyProject = allProjects.find((p: any) => 
      p.title?.toLowerCase().includes('evolufy')
    )
    
    if (evolufyProject) {
      return await client.fetch(projectBySlugQuery, { slug: evolufyProject.slug.current })
    }
    
    return null
  } catch (error) {
    console.error('Error fetching Evolufy project:', error)
    return null
  }
}

export default async function EvolufyPage() {
  const [project, siteSettings] = await Promise.all([
    getEvolufyProject(),
    getSiteSettings(),
  ])

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <Navigation siteSettings={siteSettings} />
      <VisualForwardContent project={project} />
      <Footer siteSettings={siteSettings} />
    </main>
  )
}

