import confetti from 'js-confetti'

export default {
  setup() {
    function showConfetti() {
      new confetti().addConfetti()
    }

    showConfetti()

    return {
      showConfetti
    }
  }
}
