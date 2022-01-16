import confetti from 'js-confetti'

export default {
  mounted() {
    this.showConfetti()
  },
  methods: {
    showConfetti() {
      new confetti().addConfetti()
    }
  }
}
