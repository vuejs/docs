import { ref, reactive, computed, watch } from 'vue'

export default {
  setup() {
    const names = reactive(['Emil, Hans', 'Mustermann, Max', 'Tisch, Roman'])
    const selected = ref('')
    const prefix = ref('')
    const first = ref('')
    const last = ref('')

    const filteredNames = computed(() =>
      names.filter((n) =>
        n.toLowerCase().startsWith(prefix.value.toLowerCase())
      )
    )

    watch(selected, (name) => {
      [last.value, first.value] = name.split(', ')
    })

    function create() {
      if (hasValidInput()) {
        const fullName = `${last.value}, ${first.value}`
        if (!names.includes(fullName)) {
          names.push(fullName)
          first.value = last.value = ''
        }
      }
    }

    function update() {
      if (hasValidInput() && selected.value) {
        const i = names.indexOf(selected.value)
        names[i] = selected.value = `${last.value}, ${first.value}`
      }
    }

    function del() {
      if (selected.value) {
        const i = names.indexOf(selected.value)
        names.splice(i, 1)
        selected.value = first.value = last.value = ''
      }
    }

    function hasValidInput() {
      return first.value.trim() && last.value.trim()
    }

    return {
      filteredNames,
      selected,
      prefix,
      first,
      last,
      create,
      update,
      del
    }
  }
}
