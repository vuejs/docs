import Modal from './Modal.vue'
import { ref } from 'vue'

export default {
  components: {
    Modal
  },
  setup() {
    const showModal = ref(false)

    return {
      showModal
    }
  }
}
