import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SideProjectsContent from '@/components/SideProjectsContent'
import { client } from '@/lib/sanity.client'
import { sideProjectsQuery, siteSettingsQuery } from '@/lib/queries'
import { SideProject } from '@/types/sideProject'
import { SiteSettings } from '@/types/siteSettings'

export const metadata = {
  title: 'Lab — Sam Adekunle',
  description: 'Side projects and spare-time experiments.',
}

// ISR: pick up new side projects from Sanity within a minute.
export const revalidate = 60

async function getSideProjects(): Promise<SideProject[]> {
  try {
    return await client.fetch(sideProjectsQuery)
  } catch (error) {
    console.error('Error fetching side projects:', error)
    return []
  }
}

async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await client.fetch(siteSettingsQuery)
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

export default async function LabPage() {
  const [sideProjects, siteSettings] = await Promise.all([
    getSideProjects(),
    getSiteSettings(),
  ])

  return (
    <main className="min-h-screen bg-white">
      <Navigation siteSettings={siteSettings} />
      <SideProjectsContent sideProjects={sideProjects} />
      <Footer siteSettings={siteSettings} />
    </main>
  )
}
