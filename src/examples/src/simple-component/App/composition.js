import { ref } from 'vue'
import TodoItem from './TodoItem.vue'

export default {
  components: {
    TodoItem
  },
  setup() {
    const groceryList = ref([
      { id: 0, text: 'Овочі' },
      { id: 1, text: 'Сир' },
      { id: 2, text: 'Щось інше, що їдять люди' }
    ])

    return {
      groceryList
    }
  }
}
