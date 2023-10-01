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

## Runtime Errors {#runtime-errors}

<ErrorsTable kind="runtime" :errors="data.runtime" :highlight="highlight" />

## Compiler Errors {#compiler-errors}

<ErrorsTable kind="compiler" :errors="data.compiler" :highlight="highlight" />
