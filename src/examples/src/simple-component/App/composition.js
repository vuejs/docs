import { ref } from 'vue'
import TodoItem from './TodoItem.vue'

export default {
  components: {
    TodoItem
  },
  setup() {
    const groceryList = ref([
      { id: 0, text: 'Verdure' },
      { id: 1, text: 'Formaggio' },
      { id: 2, text: 'Qualsiasi altra cosa che gli umani dovrebbero mangiare' }
    ])

    return {
      groceryList
    }
  }
}
