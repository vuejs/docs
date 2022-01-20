import { ref } from 'vue'

export default {
  setup() {
    const show = ref(true)

    function toggle() {
      show.value = !show.value
    }

    return {
      show,
      toggle
    }
  }
}
