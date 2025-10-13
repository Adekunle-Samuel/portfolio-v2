export interface Project {
  _id: string
  title: string
  slug: {
    current: string
  }
  category: string
  coverImage?: {
    asset: {
      _ref: string
      _type: string
    }
  } | null
  description?: string
  projectUrl?: string
  order?: number
  
  // Detail page fields
  heroImage?: {
    asset: {
      _ref: string
      _type: string
    }
  }
  overview?: string
  timeline?: string
  tools?: string
  role?: string
  
  tldr?: {
    title?: string
    text?: string
    bullets?: string[]
    image?: {
      asset: {
        _ref: string
        _type: string
      }
    }
  }
  
  contentSections?: ContentSection[]
  
  gallery?: {
    largeImage?: {
      asset: {
        _ref: string
        _type: string
      }
    }
    smallImages?: Array<{
      asset: {
        _ref: string
        _type: string
      }
    }>
  }
  
  conclusion?: {
    title?: string
    text?: string
    bullets?: string[]
  }
}

export interface ContentSection {
  title: string
  text?: string
  bullets?: string[]
  image?: {
    asset: {
      _ref: string
      _type: string
    }
  }
  layout?: 'image-right' | 'image-left' | 'text-only'
}

