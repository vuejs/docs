import { ref } from 'vue'

export default {
  setup() {
    const message = ref('Hello World!')

    return {
      message
    }
  }
}
