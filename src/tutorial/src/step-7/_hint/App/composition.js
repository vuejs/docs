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
      todos.value.push({ text: newTodo.value })
      newTodo.value = ''
    }

    function removeTodo(todo) {
      todos.value = todos.value.filter((t) => t !== todo)
    }

    return {
      todos,
      addTodo,
      removeTodo
    }
  }
}
