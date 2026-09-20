import './styles/index.css'
import { h, App } from 'vue'
import { VPTheme } from '@vue/theme'
import PreferenceSwitch from './components/PreferenceSwitch.vue'
import SecurityUpdateBtn from './components/SecurityUpdateBtn.vue'
import {
  inBrowser,
  preferCompositionKey,
  preferComposition,
  setPreference,
  preferSFC,
  filterHeadersByPreference
} from './components/preferences'
import SponsorsAside from './components/SponsorsAside.vue'
import VueSchoolLink from './components/VueSchoolLink.vue'
import ScrimbaLink from './components/ScrimbaLink.vue'
// import Banner from './components/Banner.vue'
// import TextAd from './components/TextAd.vue'

import 'vitepress/dist/client/theme-default/styles/components/vp-code-group.css'
import 'virtual:group-icons.css'

if (inBrowser) {
  window.addEventListener('keydown', (event) => {
    const target = event.target
    const isEditable =
      target instanceof HTMLElement &&
      (target.isContentEditable ||
        ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName))

    if (
      !event.repeat &&
      event.altKey &&
      event.shiftKey &&
      !event.ctrlKey &&
      !event.metaKey &&
      event.key.toLowerCase() === 'a' &&
      !isEditable
    ) {
      event.preventDefault()
      setPreference(
        preferCompositionKey,
        preferComposition,
        'prefer-composition'
      )
    }
  })
}

export default Object.assign({}, VPTheme, {
  Layout: () => {
    // @ts-ignore
    return h(VPTheme.Layout, null, {
      // banner: () => h(Banner),
      'sidebar-top': () => h(PreferenceSwitch),
      'sidebar-bottom': () => h(SecurityUpdateBtn),
      'aside-mid': () => h(SponsorsAside)
    })
  },
  enhanceApp({ app }: { app: App }) {
    app.provide('prefer-composition', preferComposition)
    app.provide('prefer-sfc', preferSFC)
    app.provide('filter-headers', filterHeadersByPreference)
    app.component('VueSchoolLink', VueSchoolLink)
    app.component('ScrimbaLink', ScrimbaLink)
    // app.component('TextAd', TextAd)
  }
})
