import { defineLoader } from 'vitepress'
import { errorMessages } from '@vue/compiler-core'

function filterEmptyMsg(data: Record<number, string>) {
  return Object.fromEntries(Object.entries(data).filter(([_, msg]) => msg))
}

export default defineLoader({
  load() {
    return {
      compiler: filterEmptyMsg(errorMessages)
    }
  }
})
