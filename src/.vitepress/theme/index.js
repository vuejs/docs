import { VPTheme, VTBadge } from '@vue/theme'
import APISwitch from './components/APISwitch.vue'
import './styles/inline-demo.css'
import './styles/options-boxes.css'

export default {
  ...VPTheme,
  enhanceApp({ app }) {
    app.component('APISwitch', APISwitch)
    app.component('Badge', VTBadge)
  }
}
