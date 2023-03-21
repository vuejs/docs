export default {
  data() {
    return {
      message: 'Привіт світ!'
    }
  },
  methods: {
    reverseMessage() {
      this.message = this.message.split('').reverse().join('')
    },
    notify() {
      alert('навігацію було припинено.')
    }
  }
}
