// shared data across instances so we load only once

import { ref } from 'vue'

declare global {
  const fathom: {
    trackGoal: (id: string, value: number) => any
  }
}

export interface Sponsor {
  url: string
  img: string
  name: string
  description?: string
  priority?: boolean
}

export interface SponsorData {
  special: Sponsor[]
  platinum: Sponsor[]
  platinum_china: Sponsor[]
  gold: Sponsor[]
  silver: Sponsor[]
  bronze: Sponsor[]
}

export const data = ref<SponsorData>()
export const pending = ref<boolean>(false)

export const base = `https://automation.vuejs.org`

export const load = async () => {
  if (!pending.value) {
    pending.value = true
    data.value = await (await fetch(`${base}/data.json`)).json()
  }
}
