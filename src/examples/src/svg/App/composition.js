import PolyGraph from './PolyGraph.vue'
import { ref, reactive } from 'vue'

export default {
  components: {
    PolyGraph
  },
  setup() {
    const newLabel = ref('')
    const stats = reactive([
      { label: 'A', value: 100 },
      { label: 'B', value: 100 },
      { label: 'C', value: 100 },
      { label: 'D', value: 100 },
      { label: 'E', value: 100 },
      { label: 'F', value: 100 }
    ])

    function add(e) {
      e.preventDefault()
      if (!newLabel.value) return
      stats.push({
        label: newLabel.value,
        value: 100
      })
      newLabel.value = ''
    }

    function remove(stat) {
      if (stats.length > 3) {
        stats.splice(stats.indexOf(stat), 1)
      } else {
        alert("Can't delete more!")
      }
    }

    return {
      newLabel,
      stats,
      add,
      remove
    }
  }
}
