import { h } from 'vue'
import { VPTheme, VTBadge } from '@vue/theme'
import PreferenceSwitch from './components/PreferenceSwitch.vue'
import {
  preferComposition,
  preferSFC,
  filterHeadersByPreference
} from './components/preferences'
import './styles/utilities.css'
import './styles/inline-demo.css'
import './styles/options-boxes.css'

export default Object.assign({}, VPTheme, {
  Layout: () => {
    return h(VPTheme.Layout, null, {
      'sidebar-top': () => h(PreferenceSwitch)
    })
  },
  enhanceApp({ app }) {
    app.component('Badge', VTBadge)
    app.provide('prefer-composition', preferComposition)
    app.provide('prefer-sfc', preferSFC)
    app.provide('filter-headers', filterHeadersByPreference)
  }
})
