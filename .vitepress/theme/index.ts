import './styles/index.css'
import { h, App } from 'vue'
import { VPTheme } from '@vue/theme'
import {
  preferComposition,
  preferSFC,
  filterHeadersByPreference
} from './composables/usePreferences'
import SponsorsAside from './components/SponsorsAside.vue'
import VueSchoolLink from './components/VueSchoolLink.vue'
import VueJobs from './components/VueJobs.vue'
import PreferenceSwitch from './components/PreferenceSwitch.vue'

export default Object.assign({}, VPTheme, {
  Layout: () => {
    // @ts-ignore
    return h(VPTheme.Layout, null, {
      'sidebar-top': () => h(PreferenceSwitch),
      'aside-mid': () => h(SponsorsAside),
      'aside-bottom': () => h(VueJobs)
    })
  },
  enhanceApp({ app }: { app: App }) {
    app.provide('prefer-composition', preferComposition)
    app.provide('prefer-sfc', preferSFC)
    app.provide('filter-headers', filterHeadersByPreference)
    app.component('VueSchoolLink', VueSchoolLink)
  }
})
