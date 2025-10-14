import { client } from '@/lib/sanity.client'
import { projectsQuery, siteSettingsQuery } from '@/lib/queries'
import { Project } from '@/types/project'
import { SiteSettings } from '@/types/siteSettings'
import { placeholderProjects } from '@/lib/placeholder-data'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ProjectSection from '@/components/ProjectSection'
import Footer from '@/components/Footer'

async function getProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(projectsQuery)
    // If no projects in Sanity, show placeholder projects for demo
    return projects.length > 0 ? projects : placeholderProjects
  } catch (error) {
    console.error('Error fetching projects:', error)
    // Return placeholder projects if Sanity is not configured yet
    return placeholderProjects
  }
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

export default async function Home() {
  const [projects, siteSettings] = await Promise.all([
    getProjects(),
    getSiteSettings(),
  ])

  return (
    <main className="min-h-screen bg-white">
      <Navigation siteSettings={siteSettings} />
      <Hero siteSettings={siteSettings} />
      <ProjectSection projects={projects} />
      <Footer siteSettings={siteSettings} />
    </main>
  )
}

