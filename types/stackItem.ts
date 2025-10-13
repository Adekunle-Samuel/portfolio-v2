export interface StackItem {
  _id: string
  _type: 'stackItem'
  name: string
  description: string
  icon?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  iconEmoji?: string
  color?: string
  order: number
  url?: string
}

