import { ref } from 'vue'
import ChildComp from './ChildComp.vue'

export default {
  components: {
    ChildComp
  },
  setup() {
    const greeting = ref('Hola desde el padre')

    return {
      greeting
    }
  }
}
