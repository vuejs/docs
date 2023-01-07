function clone(circles) {
  return circles.map((c) => ({ ...c }))
}

export default {
  data() {
    return {
      history: [[]],
      index: 0,
      circles: [],
      selected: null,
      adjusting: false
    }
  },
  methods: {
    onClick({ clientX: x, clientY: y }) {
      if (this.adjusting) {
        this.adjusting = false
        this.selected = null
        this.push()
        return
      }

      this.selected = [...this.circles].reverse().find(({ cx, cy, r }) => {
        const dx = cx - x
        const dy = cy - y
        return Math.sqrt(dx * dx + dy * dy) <= r
      })

      if (!this.selected) {
        this.circles.push({
          cx: x,
          cy: y,
          r: 50
        })
        this.push()
      }
    },

    adjust(circle) {
      this.selected = circle
      this.adjusting = true
    },

    push() {
      this.history.length = ++this.index
      this.history.push(clone(this.circles))
    },

    undo() {
      this.circles = clone(this.history[--this.index])
    },

    redo() {
      this.circles = clone(this.history[++this.index])
    }
  }
}
