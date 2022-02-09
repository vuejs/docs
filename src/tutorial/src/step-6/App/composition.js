import { ref } from 'vue'

export default {
  setup() {
    const awesome = ref(true)

    function toggle() {
      // ...
    }

    return {
      awesome,
      toggle
    }
  }
}
