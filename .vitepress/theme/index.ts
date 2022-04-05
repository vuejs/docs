import './styles/index.css'
import { h, App } from 'vue'
import { VPTheme } from '@vue/theme'
import Banner from './components/Banner.vue'
import PreferenceSwitch from './components/PreferenceSwitch.vue'
import VueSchoolLink from './components/VueSchoolLink.vue'
import VueSchoolBanner from './components/VueSchoolBanner.vue'
import {
  preferComposition,
  preferSFC,
  filterHeadersByPreference
} from './components/preferences'
import SponsorsAside from './components/SponsorsAside.vue'
import VueJobs from './components/VueJobs.vue'

export default Object.assign({}, VPTheme, {
  Layout: () => {
    // @ts-ignore
    return h(VPTheme.Layout, null, {
      banner: () => h('div', {}, [
        h(VueSchoolBanner),
        h(Banner)
      ]),
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
