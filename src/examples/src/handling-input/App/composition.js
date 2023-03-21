import { ref } from 'vue'

export default {
  setup() {
    const message = ref('Привіт світ!')

    function reverseMessage() {
      // Доступ/зміна значення реквізиту через
      // його властивість .value.
      message.value = message.value.split('').reverse().join('')
    }

    function notify() {
      alert('навігацію було припинено.')
    }

    return {
      message,
      reverseMessage,
      notify
    }
  }
}
