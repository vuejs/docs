import { shuffle as _shuffle } from 'lodash-es'
import { ref } from 'vue'

export default {
  setup() {
    const getInitialItems = () => [1, 2, 3, 4, 5]
    const items = ref(getInitialItems())
    let id = items.value.length + 1

    function insert() {
      const i = Math.round(Math.random() * items.value.length)
      items.value.splice(i, 0, id++)
    }

    function reset() {
      items.value = getInitialItems()
      id = items.value.length + 1
    }

    function shuffle() {
      items.value = _shuffle(items.value)
    }

    function remove(item) {
      const i = items.value.indexOf(item)
      if (i > -1) {
        items.value.splice(i, 1)
      }
    }

    return {
      items,
      insert,
      reset,
      shuffle,
      remove
    }
  }
}
