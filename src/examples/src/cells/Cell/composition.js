import { ref } from 'vue'
import { cells, evalCell } from './store.js'

export default {
  props: {
    c: Number,
    r: Number
  },
  setup(props) {
    const editing = ref(false)

    function update(e) {
      editing.value = false
      cells[props.c][props.r] = e.target.value.trim()
    }

    return {
      cells,
      editing,
      evalCell,
      update
    }
  }
}
