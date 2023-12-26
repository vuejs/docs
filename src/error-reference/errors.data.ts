import { defineLoader } from 'vitepress'
import { errorMessages } from 'vue/compiler-sfc'
// @ts-expect-error internal api
import { ErrorTypeStrings } from 'vue'

function filterEmptyMsg(data: Record<number, string>) {
  return Object.fromEntries(Object.entries(data).filter(([_, msg]) => msg))
}

export default defineLoader({
  load() {
    return {
      compiler: filterEmptyMsg(errorMessages),
      runtime: filterEmptyMsg(ErrorTypeStrings)
    }
  }
})
