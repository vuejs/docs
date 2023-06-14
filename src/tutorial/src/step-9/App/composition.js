import { ref } from 'vue'

export default {
  setup() {
    const pElementRef = ref(null)

    return {
      pElementRef
    }
  }
}
