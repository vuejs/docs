import { ref } from 'vue'

export default {
  setup() {
    const text = ref('Edit me')
    const checked = ref(true)
    const checkedNames = ref(['Jack'])
    const picked = ref('One')
    const selected = ref('A')
    const multiSelected = ref(['A'])

    return {
      text,
      checked,
      checkedNames,
      picked,
      selected,
      multiSelected
    }
  }
}
