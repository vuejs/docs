import { ref } from 'vue'

export default {
  setup() {
    const newTodo = ref('')
    const todos = ref([
      { text: 'Learn HTML' },
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' }
    ])

    function addTodo() {
      // ...
      newTodo.value = ''
    }

    function removeTodo(todo) {
      // ...
    }

    return {
      todos,
      addTodo,
      removeTodo
    }
  }
}
