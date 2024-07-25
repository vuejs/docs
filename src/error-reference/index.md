<script setup>
import { ref, onMounted } from 'vue'
import { data } from './errors.data.ts'
import ErrorsTable from './ErrorsTable.vue'

const highlight = ref()
onMounted(() => {
  highlight.value = location.hash.slice(1)
})
</script>

# Odniesienie do kodu błędu produkcyjnego {#error-reference}

## Błędy runtime {#runtime-errors}

W kompilacjach produkcyjnych trzecim argumentem przekazywanym do następujących interfejsów API obsługi błędów będzie krótki kod zamiast pełnego ciągu informacji:

- [`app.config.errorHandler`](/api/application#app-config-errorhandler)
- [`onErrorCaptured`](/api/composition-api-lifecycle#onerrorcaptured) (Composition API)
- [`errorCaptured`](/api/options-lifecycle#errorcaptured) (Options API)

Poniższa tabela mapuje kody do ich oryginalnych pełnych ciągów informacji.

<ErrorsTable kind="runtime" :errors="data.runtime" :highlight="highlight" />

## Błędy kompilatora {#compiler-errors}

Poniższa tabela zawiera mapowanie kodów błędów kompilatora produkcyjnego do ich oryginalnych komunikatów.

<ErrorsTable kind="compiler" :errors="data.compiler" :highlight="highlight" />
