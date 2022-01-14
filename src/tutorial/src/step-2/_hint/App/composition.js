import { ref } from 'vue'

export default {
  setup() {
    const msg = ref('Hello World!')

    return {
      msg
    }
  }
}
