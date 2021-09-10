import { ref, computed, watchEffect } from 'vue'

const STORAGE_KEY = 'vue-todomvc'

const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.completed),
  completed: (todos) => todos.filter((todo) => todo.completed)
}

export default {
  setup() {
    // state
    const todos = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
    const visibility = ref('all')
    const editedTodo = ref()

    // derived state
    const filteredTodos = computed(() => filters[visibility.value](todos.value))
    const remaining = computed(() => filters.active(todos.value).length)

    // handle routing
    window.addEventListener('hashchange', onHashChange)
    onHashChange()

    // persist state
    watchEffect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
    })

    function toggleAll(e) {
      todos.value.forEach((todo) => (todo.completed = e.target.checked))
    }

    function addTodo(e) {
      const value = e.target.value.trim()
      if (value) {
        todos.value.push({
          id: Date.now(),
          title: value,
          completed: false
        })
        e.target.value = ''
      }
    }

    function removeTodo(todo) {
      todos.value.splice(todos.value.indexOf(todo), 1)
    }

    let beforeEditCache = ''
    function editTodo(todo) {
      beforeEditCache = todo.title
      editedTodo.value = todo
    }

    function cancelEdit(todo) {
      editedTodo.value = null
      todo.title = beforeEditCache
    }

    function doneEdit(todo) {
      if (editedTodo.value) {
        editedTodo.value = null
        todo.title = todo.title.trim()
        if (!todo.title) removeTodo(todo)
      }
    }

    function removeCompleted() {
      todos.value = filters.active(todos.value)
    }

    function onHashChange() {
      const route = window.location.hash.replace(/#\/?/, '')
      if (filters[route]) {
        visibility.value = route
      } else {
        window.location.hash = ''
        visibility.value = 'all'
      }
    }

    return {
      todos,
      visibility,
      editedTodo,
      filteredTodos,
      remaining,
      toggleAll,
      addTodo,
      removeTodo,
      editTodo,
      doneEdit,
      cancelEdit,
      removeCompleted,
    }
  }
}
