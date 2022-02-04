import { ref } from 'vue'

export default {
  setup() {
    const awesome = ref(true)

    function toggle() {
      awesome.value = !awesome.value
    }

    return {
      awesome,
      toggle
    }
  }
}
