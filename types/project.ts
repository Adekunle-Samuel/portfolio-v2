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
}

