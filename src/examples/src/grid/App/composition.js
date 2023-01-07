import DemoGrid from './Grid.vue'
import { ref } from 'vue'

export default {
  components: {
    DemoGrid
  },
  setup() {
    const searchQuery = ref('')
    const gridColumns = ['nombre', 'poder']
    const gridData = [
      { nombre: 'Chuck Norris', poder: Infinity },
      { nombre: 'Bruce Lee', poder: 9000 },
      { nombre: 'Jackie Chan', poder: 7000 },
      { nombre: 'Jet Li', poder: 8000 }
    ]

    return {
      searchQuery,
      gridColumns,
      gridData
    }
  }
}
