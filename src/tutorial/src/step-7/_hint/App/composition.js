import { ref } from 'vue'

export default {
  setup() {
    // надай кожному завданню унікальний id
    let id = 0

    const newTodo = ref('')
    const todos = ref([
      { id: id++, text: 'Вивчити HTML' },
      { id: id++, text: 'Вивчити JavaScript' },
      { id: id++, text: 'Вивчити Vue' }
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
