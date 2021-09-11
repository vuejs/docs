import { ref } from 'vue'

const hasStorage = typeof localStorage !== 'undefined'
const get = (key: string) =>
  hasStorage ? JSON.parse(localStorage.getItem(key) || 'false') : false

export const preferCompositionKey = 'vue-docs-prefer-composition'
export const preferComposition = ref(get(preferCompositionKey))

export const preferSFCKey = 'vue-docs-prefer-sfc'
export const preferSFC = ref(get(preferSFCKey))
