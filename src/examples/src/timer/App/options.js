export default {
  data() {
    return {
      duration: 15 * 1000,
      elapsed: 0
    }
  },
  created() {
    let lastTime = performance.now()
    const update = () => {
      const time = performance.now()
      this.elapsed += Math.min(time - lastTime, this.duration - this.elapsed)
      lastTime = time
      this.handle = requestAnimationFrame(update)
    }
    update()
  },
  unmounted() {
    cancelAnimationFrame(this.handle)
  }
}
