<script setup>
import { ref, onMounted } from 'vue'
import { data } from './errors.data.ts'
import ErrorsTable from './ErrorsTable.vue'

const highlight = ref()
onMounted(() => {
  highlight.value = location.hash.slice(1)
})
</script>

# Error Reference {#error-reference}

## Compiler Errors {#compiler-errors}

<ErrorsTable kind="compiler" :errors="data.compiler" :highlight="highlight" />
