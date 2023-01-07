import Cell from './Cell.vue'
import { cells } from './store.js'

export default {
  components: {
    Cell
  },
  setup() {
    const cols = cells.map((_, i) => String.fromCharCode(65 + i))
    return {
      cols,
      cells
    }
  }
}
