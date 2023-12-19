import { shuffle } from 'lodash-es'

const getInitialItems = () => [1, 2, 3, 4, 5]
let id = getInitialItems().length + 1

export default {
  data() {
    return {
      items: getInitialItems()
    }
  },
  methods: {
    insert() {
      const i = Math.round(Math.random() * this.items.length)
      this.items.splice(i, 0, id++)
    },
    reset() {
      this.items = getInitialItems()
      id = getInitialItems().length + 1
    },
    shuffle() {
      this.items = shuffle(this.items)
    },
    remove(item) {
      const i = this.items.indexOf(item)
      if (i > -1) {
        this.items.splice(i, 1)
      }
    }
  }
}
