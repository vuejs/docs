import { ref } from 'vue'

export default {
  setup() {
    const message = ref('Hello World!')

    function reverseMessage() {
      message.value = message.value.split('').reverse().join('')
    }

    return {
      message,
      reverseMessage
    }
  }
}
