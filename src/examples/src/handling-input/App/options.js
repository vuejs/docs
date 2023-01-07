export default {
  data() {
    return {
      message: '¡Hola Mundo!'
    }
  },
  methods: {
    reverseMessage() {
      this.message = this.message.split('').reverse().join('')
    },
    notify() {
      alert('se impidió la navegación.')
    }
  }
}
