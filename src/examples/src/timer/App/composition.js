import { ref, onUnmounted, computed } from 'vue'
export default {
  setup() {
    const duration = ref(15 * 1000)
    const elapsed = ref(0)

    let lastTime
    let handle

    const update = () => {
      elapsed.value = performance.now() - lastTime
      if (elapsed.value >= duration.value) {
        cancelAnimationFrame(handle)
      } else {
        handle = requestAnimationFrame(update)
      }
    }

    const reset = () => {
      elapsed.value = 0
      lastTime = performance.now()
      update()
    }

    const progressRate = computed(() =>
      Math.min(elapsed.value / duration.value, 1)
    )

    reset()

    onUnmounted(() => {
      cancelAnimationFrame(handle)
    })
    return {
      duration,
      elapsed,
      progressRate,
      reset
    }
  }
}
