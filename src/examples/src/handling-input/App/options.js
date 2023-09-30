export default {
  data() {
    return {
      message: 'Ciao Mondo!'
    }
  },
  methods: {
    reverseMessage() {
      this.message = this.message.split('').reverse().join('')
    },
    notify() {
      alert('la navigazione è stata bloccata.')
    }
  }
}
