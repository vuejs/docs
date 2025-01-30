import { ref } from 'vue'

export default {
  setup() {
    const message = ref('Witaj świecie!')

    function reverseMessage() {
      // Dostęp/mutacja wartości ref-a poprzez
      // jego właściwość .value
      message.value = message.value.split('').reverse().join('')
    }

    function notify() {
      alert('nawigacja została zablokowana.')
    }

    return {
      message,
      reverseMessage,
      notify
    }
  }
}
