import { ref } from 'vue'
import TodoItem from './TodoItem.vue'

export default {
  components: {
    TodoItem
  },
  setup() {
    const groceryList = ref([
      { id: 0, text: 'Warzywa' },
      { id: 1, text: 'Ser' },
      { id: 2, text: 'Cokolwiek innego co powinni jeść ludzie' }
    ])

    return {
      groceryList
    }
  }
}
