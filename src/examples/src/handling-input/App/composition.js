import { ref } from 'vue'

export default {
  setup() {
    const message = ref('Hello World!')

    function reverseMessage() {
      // in JavaScript, we must access/mutate the value of a ref
      // via its .value property.
      // Note we don't need to do so inside templates because
      // refs are automatically "unwrapped" in templates.
      message.value = message.value.split('').reverse().join('')
    }

    return {
      message,
      reverseMessage
    }
  }
}
