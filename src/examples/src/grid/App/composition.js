import DemoGrid from './Grid.vue'
import { ref } from 'vue'

export default {
  components: {
    DemoGrid
  },
  setup() {
    const searchQuery = ref('')
    const gridColumns = ['nome', 'potenza']
    const gridData = [
      { nome: 'Chuck Norris', potenza: Infinity },
      { nome: 'Bruce Lee', potenza: 9000 },
      { nome: 'Jackie Chan', potenza: 7000 },
      { nome: 'Jet Li', potenza: 8000 }
    ]

    return {
      searchQuery,
      gridColumns,
      gridData
    }
  }
}
