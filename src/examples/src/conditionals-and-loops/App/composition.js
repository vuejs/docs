import { ref } from 'vue'

export default {
  setup() {
    const show = ref(true)
    const list = ref([1, 2, 3])

    return {
      show,
      list
    }
  }
}
