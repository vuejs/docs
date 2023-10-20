import { ref, onUnmounted, computed } from 'vue'

export default {
  setup() {
    const duration = ref(15 * 1000)
    const left = ref(duration.value)

    let startDate, handle

    const update = () => {
      left.value = Math.max(0, startDate - new Date())
      if (left.value <= 0) {
        cancelAnimationFrame(handle)
      } else {
        handle = requestAnimationFrame(update)
      }
    }

    const reset = () => {
      left.value = duration.value
      startDate = new Date().setMilliseconds(duration.value)
      update()
    }

    const progressRate = computed(() =>
      Math.min(left.value / duration.value, 1)
    )

    reset()

    onUnmounted(() => {
      cancelAnimationFrame(handle)
    })

    return {
      duration,
      left,
      progressRate,
      reset
    }
  }
}
