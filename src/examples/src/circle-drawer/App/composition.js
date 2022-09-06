import { ref, shallowReactive, toRaw } from 'vue'

export default {
  setup() {
    const history = shallowReactive([[]])
    const index = ref(0)
    const circles = ref([])
    const selected = ref()
    const adjusting = ref(false)

    function onClick({ clientX: x, clientY: y }) {
      if (adjusting.value) {
        adjusting.value = false
        selected.value = null
        push()
        return
      }

      selected.value = [...circles.value].reverse().find(({ cx, cy, r }) => {
        const dx = cx - x
        const dy = cy - y
        return Math.sqrt(dx * dx + dy * dy) <= r
      })

      if (!selected.value) {
        circles.value.push({
          cx: x,
          cy: y,
          r: 50
        })
        push()
      }
    }

    function adjust(circle) {
      selected.value = circle
      adjusting.value = true
    }

    function push() {
      history.length = ++index.value
      history.push(clone(circles.value))
      console.log(toRaw(history))
    }

    function undo() {
      circles.value = clone(history[--index.value])
    }

    function redo() {
      circles.value = clone(history[++index.value])
    }

    function clone(circles) {
      return circles.map((c) => ({ ...c }))
    }

    return {
      history,
      index,
      circles,
      selected,
      adjusting,
      onClick,
      adjust,
      undo,
      redo
    }
  }
}
