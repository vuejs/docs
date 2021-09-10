import { h } from 'vue'
import { VPTheme, VTBadge } from '@vue/theme'
import PreferenceSwitch from './components/PreferenceSwitch.vue'
import './styles/inline-demo.css'
import './styles/options-boxes.css'

export default {
  ...VPTheme,
  Layout: () => {
    return h(VPTheme.Layout, null, {
      'sidebar-top': () => h(PreferenceSwitch)
    })
  },
  enhanceApp({ app }) {
    app.component('Badge', VTBadge)
  }
}
