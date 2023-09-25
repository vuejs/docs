import { defineLoader } from 'vitepress'
import { errorMessages } from '@vue/compiler-core'

export default defineLoader({
  load() {
    return { errorMessages }
  }
})
