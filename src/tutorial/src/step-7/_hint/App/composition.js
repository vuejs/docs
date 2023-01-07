import { ref } from 'vue'

export default {
  setup() {
    // dar a cada tarea (todo) un id único
    let id = 0

    const newTodo = ref('')
    const todos = ref([
      { id: id++, text: 'Aprender HTML' },
      { id: id++, text: 'Aprender JavaScript' },
      { id: id++, text: 'Aprender Vue' }
    ])

    function addTodo() {
      todos.value.push({ id: id++, text: newTodo.value })
      newTodo.value = ''
    }

    function removeTodo(todo) {
      todos.value = todos.value.filter((t) => t !== todo)
    }

    return {
      newTodo,
      todos,
      addTodo,
      removeTodo
    }
  }
}
