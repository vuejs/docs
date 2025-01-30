import DemoGrid from './Grid.vue'
import { ref } from 'vue'

export default {
  components: {
    DemoGrid
  },
  setup() {
    const searchQuery = ref('')
    const gridColumns = ['nazwa', 'moc']
    const gridData = [
      { nazwa: 'Chuck Norris', moc: Infinity },
      { nazwa: 'Bruce Lee', moc: 9000 },
      { nazwa: 'Jackie Chan', moc: 7000 },
      { nazwa: 'Jet Li', moc: 8000 }
    ]

    return {
      searchQuery,
      gridColumns,
      gridData
    }
  }
}
