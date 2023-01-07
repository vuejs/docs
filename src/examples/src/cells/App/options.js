import Cell from './Cell.vue'
import { cells } from './store.js'

export default {
  components: {
    Cell
  },
  data() {
    return {
      cols: cells.map((_, i) => String.fromCharCode(65 + i)),
      cells
    }
  }
}
