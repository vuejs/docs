import { ref } from 'vue'

export default {
  setup() {
    const show = ref(true)

    function toggle() {
      // ...
    }

    return {
      show,
      toggle
    }
  }
}
