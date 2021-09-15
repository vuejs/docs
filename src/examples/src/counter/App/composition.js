import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    return {
      count
    }
  }
}
