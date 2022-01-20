import { ref } from 'vue'

export default {
  setup() {
    const todoId = ref(1)
    const todoData = ref(null)

    async function fetchData() {
      todoData.value = null
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
      )
      todoData.value = await res.json()
    }

    fetchData()

    return {
      todoId,
      todoData
    }
  }
}
