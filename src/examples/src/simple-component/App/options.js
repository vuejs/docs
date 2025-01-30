import TodoItem from './TodoItem.vue'

export default {
  components: {
    TodoItem
  },
  data() {
    return {
      groceryList: [
        { id: 0, text: 'Warzywa' },
        { id: 1, text: 'Ser' },
        { id: 2, text: 'Cokolwiek innego co powinni jeść ludzie' }
      ]
    }
  }
}
