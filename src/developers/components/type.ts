export interface DeveloperExperienceDescription {
  isGrouped: boolean
  content: string | string[]
}
export interface DeveloperExperience {
  id: number
  role: string
  company: string
  startDate: string
  endDate: string
  period: string
  description: DeveloperExperienceDescription[]
  skills: string[]
}

export interface DeveloperEducation {
  id: number
  degree: string
  school: string
  startDate: string
  endDate: string
}

export interface DeveloperCompensations {
  partTime: string
  monthly: string
}

export interface DeveloperProfile {
  id: number
  slug: string
  name: string
  alias: string
  description: string[]
  proficiencies: string[]
  compensations: DeveloperCompensations
  location: string
  region: string
  experiences?: DeveloperExperience[]
  education?: DeveloperEducation[]
}

export interface DeveloperProfiles extends Array<DeveloperProfile> {
}
