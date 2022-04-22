export interface Partner {
  name: string
  logo: string
  intro: string
  description: string[]
  proficiencies: string[]
  region: string[]
  location: string[]
  website: {
    text: string
    url: string
  }
  contact: string
  hiring?: string
  platinum?: boolean
}
