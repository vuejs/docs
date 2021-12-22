import { ref } from 'vue'

export default {
  name: 'App',
  setup() {
    const colorsNumber = ref(3)

    return { colorsNumber }
  }
}
