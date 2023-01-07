// dar a cada tarea (todo) un id único
let id = 0

export default {
  data() {
    return {
      newTodo: '',
      todos: [
        { id: id++, text: 'Aprender HTML' },
        { id: id++, text: 'Aprender JavaScript' },
        { id: id++, text: 'Aprender Vue' }
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
