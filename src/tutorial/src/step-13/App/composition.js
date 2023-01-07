import { ref } from 'vue'
import ChildComp from './ChildComp.vue'

export default {
  components: {
    ChildComp
  },
  setup() {
    const childMsg = ref('Ningún mensaje del hijo aún')

    return {
      childMsg
    }
  }
}
