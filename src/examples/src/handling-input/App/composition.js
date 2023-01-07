import { ref } from 'vue'

export default {
  setup() {
    const message = ref('¡Hola Mundo!')

    function reverseMessage() {
      // Acceder/mutar el valor de una ref
      // a través de su propiedad .value.
      message.value = message.value.split('').reverse().join('')
    }

    function notify() {
      alert('se impidió la navegación.')
    }

    return {
      message,
      reverseMessage,
      notify
    }
  }
}
