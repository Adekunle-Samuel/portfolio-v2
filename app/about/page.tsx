import { client } from '@/lib/sanity.client'
import { projectsQuery, aboutQuery, siteSettingsQuery } from '@/lib/queries'
import { Project } from '@/types/project'
import { About } from '@/types/about'
import { SiteSettings } from '@/types/siteSettings'
import { placeholderProjects } from '@/lib/placeholder-data'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AboutContent from '@/components/AboutContent'
import AboutProjectCarousel from '@/components/AboutProjectCarousel'

async function getProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(projectsQuery)
    return projects.length > 0 ? projects : placeholderProjects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return placeholderProjects
  }
}

async function getAboutData(): Promise<About | null> {
  try {
    const about = await client.fetch(aboutQuery)
    return about
  } catch (error) {
    console.error('Error fetching about data:', error)
    return null
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

export default async function AboutPage() {
  const [projects, aboutData, siteSettings] = await Promise.all([
    getProjects(),
    getAboutData(),
    getSiteSettings(),
  ])

  return (
    <main className="min-h-screen bg-white">
      <Navigation siteSettings={siteSettings} />
      <AboutContent aboutData={aboutData} siteSettings={siteSettings} />
      <AboutProjectCarousel projects={projects} />
      <Footer siteSettings={siteSettings} />
    </main>
  )
}

