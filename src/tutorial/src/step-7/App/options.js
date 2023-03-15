// надай кожному завданню унікальний id
let id = 0

export default {
  data() {
    return {
      newTodo: '',
      todos: [
        { id: id++, text: 'Вивчити HTML' },
        { id: id++, text: 'Вивчити JavaScript' },
        { id: id++, text: 'Вивчити Vue' }
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
