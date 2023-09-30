import { ref } from 'vue'

export default {
  setup() {
    const message = ref('Ciao Mondo!')

    function reverseMessage() {
      // Accedi/muta il valore del ref tramite
      // la sua proprietà .value.
      message.value = message.value.split('').reverse().join('')
    }

    function notify() {
      alert('la navigazione è stata bloccata.')
    }

    return {
      message,
      reverseMessage,
      notify
    }
  }
}
