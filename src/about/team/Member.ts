export interface Member {
  name: string
  avatarPic?: string
  title: string
  company?: string
  companyLink?: string
  projects: Link[]
  location: string
  languages: string[]
  website?: Link
  socials: Socials
}

export interface Link {
  label: string
  url: string
}

export interface Socials {
  github: string
  twitter?: string
  codepen?: string
}
