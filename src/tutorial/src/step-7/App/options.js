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
      // ...
      this.newTodo = ''
    },
    removeTodo(todo) {
      // ...
    }
  }
}
