import TodoItem from './TodoItem.vue'

export default {
  components: {
    TodoItem
  },
  data() {
    return {
      groceryList: [
        { id: 0, text: 'Овочі' },
        { id: 1, text: 'Сир' },
        { id: 2, text: 'Щось інше, що їдять люди' }
      ]
    }
  }
}
