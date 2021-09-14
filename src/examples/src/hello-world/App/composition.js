import { ref } from 'vue'

export default {
  setup() {
    // A "ref" is a reactive data source that stores a value.
    // Technically, we don't need to wrap the string with ref()
    // in order to display it, but we will see in the next
    // example why it is needed if we ever intend to change
    // the value.
    const message = ref('Hello World!')

    return {
      message
    }
  }
}
