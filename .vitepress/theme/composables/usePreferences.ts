import { AugmentedHeader } from '.vitepress/headerMdPlugin'
import { useRoute } from 'vitepress'
import { computed, onMounted, onUnmounted, Ref, ref } from 'vue'

import usePlatform from './usePlatform'

const hasStorage = typeof localStorage !== 'undefined'
const get = (key: string, defaultValue = false): boolean =>
  hasStorage
    ? JSON.parse(localStorage.getItem(key) || String(defaultValue))
    : defaultValue

const preferCompositionKey = 'vue-docs-prefer-composition'
export const preferComposition = ref(get(preferCompositionKey))

const preferSFCKey = 'vue-docs-prefer-sfc'
export const preferSFC = ref(get(preferSFCKey, true))

export function filterHeadersByPreference(h: AugmentedHeader) {
  return preferComposition.value ? !h.optionsOnly : !h.compositionOnly
}

export default function usePreferences() {
  const route = useRoute()
  const showPreference = computed(() =>
    /^\/(guide|tutorial|examples)\//.test(route.path)
  )
  const { altKey } = usePlatform()

  const shortcutInfo = computed(() => `Ctrl+${altKey}+A: toggle API preference`)

  const isOpen = ref(
    typeof localStorage !== 'undefined' &&
      !localStorage.getItem(preferCompositionKey)
  )

  const toggleOpen = () => {
    isOpen.value = !isOpen.value
  }

  const toggleCompositionAPI = useToggleFn(
    preferCompositionKey,
    preferComposition,
    'prefer-composition'
  )
  const toggleSFC = useToggleFn(preferSFCKey, preferSFC, 'prefer-sfc')

  function useToggleFn(
    storageKey: string,
    state: Ref<boolean>,
    className: string
  ) {
    if (typeof localStorage === 'undefined') {
      return () => {}
    }
    const classList = document.documentElement.classList
    return (value = !state.value) => {
      if ((state.value = value)) {
        classList.add(className)
      } else {
        classList.remove(className)
      }
      localStorage.setItem(storageKey, String(state.value))
    }
  }

  let closeTimeout: any
  let hasInitiallyBeenOpenByKeyboard = false
  const onPreferenceKeyupChange = (callback: Function) => {
    clearTimeout(closeTimeout)
    if (!isOpen.value) {
      isOpen.value = true // Open preference to see what is changed.
      hasInitiallyBeenOpenByKeyboard = true
      setTimeout(() => {
        // Defer the toggle a bit to be able to see the change
        callback()
      }, 100)
    } else {
      callback()
    }
    if (hasInitiallyBeenOpenByKeyboard) {
      // Close automatically when it was initially opened by shortcut
      closeTimeout = setTimeout(() => {
        // Close after 5 seconds
        isOpen.value = false
        hasInitiallyBeenOpenByKeyboard = false
      }, 5000)
    }
  }

  const preferenceKeyupHandler = (e: KeyboardEvent) => {
    if (e.altKey && e.ctrlKey && showPreference.value) {
      if (e.keyCode === 65) {
        // Ctrl+Alt+A + preference switch available
        onPreferenceKeyupChange(toggleCompositionAPI)
      }
    }
  }

  onMounted(() => {
    document.addEventListener('keyup', preferenceKeyupHandler)
  })
  onUnmounted(() => {
    document.removeEventListener('keyup', preferenceKeyupHandler)
  })

  return {
    isOpen,
    shortcutInfo,
    showPreference,
    toggleOpen,
    toggleCompositionAPI,
    toggleSFC
  }
}
