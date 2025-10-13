export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  name: string
  profileImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    hotspot?: {
      x: number
      y: number
    }
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
    }
  }
  tagline?: string
  email?: string
  resumeFile?: {
    asset: {
      _ref: string
      _type: 'reference'
      url: string
    }
  }
  socialLinks?: {
    linkedin?: string
    github?: string
    twitter?: string
    dribbble?: string
    behance?: string
  }
}

