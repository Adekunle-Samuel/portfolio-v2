import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ExperienceContent from '@/components/ExperienceContent'
import { client } from '@/lib/sanity.client'
import { aboutQuery, siteSettingsQuery } from '@/lib/queries'
import { About } from '@/types/about'
import { SiteSettings } from '@/types/siteSettings'

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

export default async function ExperiencePage() {
  const [aboutData, siteSettings] = await Promise.all([
    getAboutData(),
    getSiteSettings(),
  ])

  return (
    <main className="min-h-screen bg-white">
      <Navigation siteSettings={siteSettings} />
      <ExperienceContent aboutData={aboutData} siteSettings={siteSettings} />
      <Footer siteSettings={siteSettings} />
    </main>
  )
}

