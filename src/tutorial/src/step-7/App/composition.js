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
      // ...
      newTodo.value = ''
    }

    function removeTodo(todo) {
      // ...
    }

    return {
      newTodo,
      todos,
      addTodo,
      removeTodo
    }
  }
}
