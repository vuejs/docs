import { ref, onUnmounted } from 'vue'

export default {
  setup() {
    const duration = ref(15 * 1000)
    const elapsed = ref(0)

    let lastTime = performance.now()
    let handle
    const update = () => {
      const time = performance.now()
      elapsed.value += Math.min(time - lastTime, duration.value - elapsed.value)
      lastTime = time
      handle = requestAnimationFrame(update)
    }

    update()
    onUnmounted(() => {
      cancelAnimationFrame(handle)
    })

    return {
      duration,
      elapsed
    }
  }
}
