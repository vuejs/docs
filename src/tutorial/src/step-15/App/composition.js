import JSConfetti from 'js-confetti'

const confetti = new JSConfetti()

export default {
  setup() {
    function showConfetti() {
      confetti.addConfetti()
    }

    showConfetti()

    return {
      showConfetti
    }
  }
}
