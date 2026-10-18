import './styles/index.css'
import { h, App } from 'vue'
import { VPTheme } from '@vue/theme'
import { inBrowser } from 'vitepress'
import PreferenceSwitch from './components/PreferenceSwitch.vue'
import SecurityUpdateBtn from './components/SecurityUpdateBtn.vue'
import {
  preferComposition,
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

// Official Vue logo files and brand assets
const BRAND_ASSETS_URL = 'https://github.com/vuejs/art'

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

    if (inBrowser) {
      // Right-clicking the nav logo leads to the official brand assets
      // instead of the native "Save image" menu (vuejs/docs#3406)
      document.addEventListener('contextmenu', (e) => {
        if ((e.target as Element | null)?.closest?.('.VPNavBarTitle')) {
          e.preventDefault()
          window.location.href = BRAND_ASSETS_URL
        }
      })
    }
  }
})
