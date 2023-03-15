import { ref } from 'vue'
import ChildComp from './ChildComp.vue'

export default {
  components: {
    ChildComp
  },
  setup() {
    const msg = ref('з батьківського компонента')

    return {
      msg
    }
  }
}
