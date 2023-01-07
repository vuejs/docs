import TodoItem from './TodoItem.vue'

export default {
  components: {
    TodoItem
  },
  data() {
    return {
      groceryList: [
        { id: 0, text: 'Vegetales' },
        { id: 1, text: 'Queso' },
        { id: 2, text: 'Cualquier cosa que los humanos puedan comer' }
      ]
    }
  }
}
