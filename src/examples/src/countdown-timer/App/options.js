export default {
  data() {
    return {
      duration: 15 * 1000,
      left: this.duration
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
      return Math.min(this.left / this.duration, 1)
    }
  },
  methods: {
    update() {
      this.left = Math.max(0, this.startDate - new Date())
      if (this.left <= 0) {
        cancelAnimationFrame(this.handle)
      } else {
        this.handle = requestAnimationFrame(this.update)
      }
    },
    reset() {
      this.left = this.duration
      this.startDate = new Date().setMilliseconds(this.duration)
      this.update()
    }
  }
}
