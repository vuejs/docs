import { Header } from 'vitepress'
import { ref } from 'vue'

const hasStorage = typeof localStorage !== 'undefined'
const get = (key: string, defaultValue = false): boolean =>
  hasStorage
    ? JSON.parse(localStorage.getItem(key) || String(defaultValue))
    : defaultValue

export const preferCompositionKey = 'vue-docs-prefer-composition'
export const preferComposition = ref(get(preferCompositionKey))

export const preferSFCKey = 'vue-docs-prefer-sfc'
export const preferSFC = ref(get(preferSFCKey, true))

// headers are augmented via the md plugin in ../header.js
type AugmentedHeader = Header & {
  compositionOnly?: boolean
  optionsOnly?: boolean
}

export function filterHeadersByPreference(headers: AugmentedHeader[]) {
  const enableComp = preferComposition.value
  return headers.filter((h) => {
    return enableComp ? !h.optionsOnly : !h.compositionOnly
  })
}
