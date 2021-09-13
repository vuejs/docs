import AxisLabel from './AxisLabel.vue'
import { computed } from 'vue'
import { valueToPoint } from './util.js'

export default {
  components: {
    AxisLabel
  },
  props: {
    stats: Array
  },
  setup(props) {
    const points = computed(() => {
      const total = props.stats.length
      return props.stats
        .map((stat, i) => {
          const { x, y } = valueToPoint(stat.value, i, total)
          return `${x},${y}`
        })
        .join(' ')
    })

    return {
      points
    }
  }
}
