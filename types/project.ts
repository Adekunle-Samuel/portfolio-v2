export interface Project {
  _id: string
  title: string
  slug: {
    current: string
  }
  categories: string[]
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
  heroVideo?: {
    asset?: {
      _id?: string
      url?: string
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
    video?: {
      asset?: {
        _id?: string
        url?: string
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
    largeVideo?: {
      asset?: {
        _id?: string
        url?: string
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
  video?: {
    asset?: {
      _id?: string
      url?: string
    }
  }
  layout?: 'image-right' | 'image-left' | 'text-only'
}

