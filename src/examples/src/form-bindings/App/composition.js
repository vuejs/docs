import { ref } from 'vue'

export default {
  setup() {
    const text = ref('Редагувати мене')
    const checked = ref(true)
    const checkedNames = ref(['Петро'])
    const picked = ref('Один')
    const selected = ref('А')
    const multiSelected = ref(['А'])

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
