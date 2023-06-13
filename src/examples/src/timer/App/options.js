export default {
  data() {
    return {
      duration: 15 * 1000,
      elapsed: 0
    }
  },
  created() {
    this.reset()
  },
  unmounted() {
    cancelAnimationFrame(this.handle)
  },
  computed: {
    progressRate() {
      return Math.min(this.elapsed / this.duration, 1)
    }
  },
  methods: {
    update() {
      this.elapsed = performance.now() - this.lastTime
      if (this.elapsed >= this.duration) {
        cancelAnimationFrame(this.handle)
      } else {
        this.handle = requestAnimationFrame(this.update)
      }
    },
    reset() {
      this.elapsed = 0
      this.lastTime = performance.now()
      this.update()
    }
  }
}
