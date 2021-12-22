import { ref } from 'vue'

export default {
  name: 'App',
  setup() {
    const colorsNumber = ref(3)
    const gameStarted = ref(false)

    return { colorsNumber, gameStarted }
  }
}
