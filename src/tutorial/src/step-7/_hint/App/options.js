export default {
  data() {
    return {
      newTodo: '',
      todos: [
        { text: 'Learn HTML' },
        { text: 'Learn JavaScript' },
        { text: 'Learn Vue' }
      ]
    }
  },
  methods: {
    addTodo() {
      this.todos.push({ text: this.newTodo })
      this.newTodo = ''
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo)
    }
  }
}
