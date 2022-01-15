import { ref } from 'vue'

export default {
  setup() {
    const titleClass = ref('title')

    return {
      titleClass
    }
  }
}
