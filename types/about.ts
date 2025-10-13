export interface WorkExperience {
  company: string
  role: string
  period: string
  description?: string
  order?: number
}

export interface BioParagraph {
  text: string
}

export interface About {
  _id: string
  _type: 'about'
  title?: string
  bioParagraphs?: BioParagraph[]
  decorativeImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  workExperience?: WorkExperience[]
}


