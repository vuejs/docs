import { ref } from 'vue'

export default {
  setup() {
    const message = ref('Hello World!')

    function reverseMessage() {
      // Access/mutate the value of a ref via
      // its .value property.
      message.value = message.value.split('').reverse().join('')
    }

    function notify() {
      alert('navigation was prevented.')
    }

    return {
      message,
      reverseMessage,
      notify
    }
  }
}
