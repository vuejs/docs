import marked from 'marked'
import { debounce } from 'lodash-es'
import { ref, computed } from 'vue'

export default {
  setup() {
    const input = ref('# hello')

    const output = computed(() => {
      return marked(input.value, { sanitize: true })
    })

    const update = debounce((e) => {
      input.value = e.target.value
    }, 100)

    return {
      input,
      output,
      update
    }
  }
}
