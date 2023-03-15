import { ref } from 'vue'
import ChildComp from './ChildComp.vue'

export default {
  components: {
    ChildComp
  },
  setup() {
    const childMsg = ref('Поки що немає повідомлення від дочірнього компонента')

    return {
      childMsg
    }
  }
}
