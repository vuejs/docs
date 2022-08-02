const STORAGE_KEY = 'vue-todomvc'

const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.completed),
  completed: (todos) => todos.filter((todo) => todo.completed)
}

export default {
  // app initial state
  data: () => ({
    todos: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
    editedTodo: null,
    visibility: 'all'
  }),

  // watch todos change for localStorage persistence
  watch: {
    todos: {
      handler(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
      },
      deep: true
    }
  },

  mounted() {
    window.addEventListener('hashchange', this.onHashChange)
    this.onHashChange()
  },

  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining() {
      return filters.active(this.todos).length
    }
  },

  // methods that implement data logic.
  // note there's no DOM manipulation here at all.
  methods: {
    toggleAll(e) {
      this.todos.forEach((todo) => (todo.completed = e.target.checked))
    },

    addTodo(e) {
      const value = e.target.value.trim()
      if (!value) {
        return
      }
      this.todos.push({
        id: Date.now(),
        title: value,
        completed: false
      })
      e.target.value = ''
    },

    removeTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },

    editTodo(todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },

    doneEdit(todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.removeTodo(todo)
      }
    },

    cancelEdit(todo) {
      this.editedTodo = null
      todo.title = this.beforeEditCache
    },

    removeCompleted() {
      this.todos = filters.active(this.todos)
    },

    onHashChange() {
      var visibility = window.location.hash.replace(/#\/?/, '')
      if (filters[visibility]) {
        this.visibility = visibility
      } else {
        window.location.hash = ''
        this.visibility = 'all'
      }
    }
  }
}
