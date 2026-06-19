export interface SideProject {
  _id: string
  title: string
  url: string
  displayUrl?: string
  excerpt?: string
  tools?: string[]
  goal?: string
  embed?: boolean
  poster?: {
    asset: {
      _ref: string
      _type: string
    }
  } | null
}
