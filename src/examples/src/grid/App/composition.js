import DemoGrid from './Grid.vue'
import { ref } from 'vue'

export default {
  components: {
    DemoGrid
  },
  setup() {
    const searchQuery = ref('')
    const gridColumns = ['імя', 'сила']
    const gridData = [
      { 'імя': 'Чак Норріс', 'сила': Infinity },
      { 'імя': 'Брюс Лі', 'сила': 9000 },
      { 'імя': 'Джекі Чан', 'сила': 7000 },
      { 'імя': 'Джет Лі', 'сила': 8000 }
    ]

    return {
      searchQuery,
      gridColumns,
      gridData
    }
  }
}
