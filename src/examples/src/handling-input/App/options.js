export default {
  data() {
    return {
      message: 'Witaj świecie!'
    }
  },
  methods: {
    reverseMessage() {
      this.message = this.message.split('').reverse().join('')
    },
    notify() {
      alert('nawigacja została zablokowana.')
    }
  }
}
