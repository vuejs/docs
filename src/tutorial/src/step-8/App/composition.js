import { ref } from 'vue'

export default {
  setup() {
    let id = 0

    const newTodo = ref('')
    const hideCompleted = ref(false)
    const todos = ref([
      { id: id++, text: 'Вивчити HTML', done: true },
      { id: id++, text: 'Вивчити JavaScript', done: true },
      { id: id++, text: 'Вивчити Vue', done: false }
    ])

    function addTodo() {
      todos.value.push({ id: id++, text: newTodo.value, done: false })
      newTodo.value = ''
    }

    function removeTodo(todo) {
      todos.value = todos.value.filter((t) => t !== todo)
    }

    return {
      newTodo,
      hideCompleted,
      todos,
      addTodo,
      removeTodo
    }
  }
}
