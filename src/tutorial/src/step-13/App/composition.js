import { ref } from 'vue'
import ChildComp from './ChildComp.vue'

export default {
  components: {
    ChildComp
  },
  setup() {
    const childMsg = ref('Ancora nessun messaggio dal figlio')

    return {
      childMsg
    }
  }
}
