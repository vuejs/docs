import AxisLabel from './AxisLabel.vue'
import { valueToPoint } from './util.js'

export default {
  components: {
    AxisLabel
  },
  props: {
    stats: Array
  },
  computed: {
    // una computed property calcolata per i punti del poligono
    points() {
      const total = this.stats.length
      return this.stats
        .map((stat, i) => {
          const { x, y } = valueToPoint(stat.value, i, total)
          return `${x},${y}`
        })
        .join(' ')
    }
  }
}
