<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  title?: string
  developerId: number
  diagramType: 'profile' | 'score'
  prependText?: string
  appendText?: string
}>()

const svgContent = ref('')

onMounted(async () => {
  const url = `/images/developers/${props.developerId}-${props.diagramType}.svg`
  const response = await fetch(url)
  if (response.ok) {
    svgContent.value = await response.text()
  }
})
</script>

<template>
  <div v-if="svgContent" class="developer-diagram">
    <h4 v-if="title" class="developer-diagram__title"> {{ title }} </h4>
    <p v-if="prependText" class="developer-diagram__prepend-text">{{ prependText }}</p>
    <div v-html="svgContent" class="developer-diagram__svg-wrapper"></div>
    <p v-if="appendText" class="developer-diagram__append-text">{{ appendText }}</p>
  </div>
</template>

<style scoped>
.developer-diagram__svg-wrapper {
  max-width: 500px;
  min-width: 200px;
  height: auto;
  width: 100%;
}

.developer-diagram__svg-wrapper svg {
  height: auto;
  width: 100%;
}
</style>
