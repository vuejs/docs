<script setup>
import { ref, onMounted } from 'vue'
import { data } from './errors.data.ts'
import ErrorsTable from './ErrorsTable.vue'

const highlight = ref()
onMounted(() => {
  highlight.value = location.hash.slice(1)
})
</script>

# Production Error Code Reference {#error-reference}

## Runtime Errors {#runtime-errors}

In production builds, the 3rd argument passed to the following error handler APIs will be a short code instead of the full information string:

- [`app.config.errorHandler`](/api/application#app-config-errorhandler)
- [`onErrorCaptured`](/api/composition-api-lifecycle#onerrorcaptured) (Composition API)
- [`errorCaptured`](/api/options-lifecycle#errorcaptured) (Options API)

The following table maps the codes to their original full information strings.

<ErrorsTable kind="runtime" :errors="data.runtime" :highlight="highlight" />

## Compiler Errors {#compiler-errors}

The following table provides a mapping of the production compiler error codes to their original messages.

<ErrorsTable kind="compiler" :errors="data.compiler" :highlight="highlight" />
