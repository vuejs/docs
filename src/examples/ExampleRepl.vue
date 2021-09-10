<script setup lang="ts">
import { Repl, ReplStore } from '@vue/repl'
import '@vue/repl/style.css'
import data from './data.json'
import { inject, watch } from 'vue'

const store = new ReplStore()

const preferComposition = inject('prefer-composition')
const preferSFC = inject('prefer-sfc')

function updateExample() {
  const hash = location.hash.slice(1)
  if (data.hasOwnProperty(hash)) {
    store.setFiles(
      data[hash][preferComposition.value ? 'composition' : 'options']
    )
  } else if (!hash) {
    location.hash = '#markdown'
  }
}

window.addEventListener('hashchange', updateExample)
watch(preferComposition, updateExample)
updateExample()
</script>

<template>
  <Repl :store="store" :showCompileOutput="false" />
</template>

<style scoped>
.vue-repl {
  max-width: 1105px;
  border-right: 1px solid var(--vt-c-divider-light);
  height: calc(100vh - var(--vp-nav-height));
}

@media (max-width: 960px) {
  .vue-repl {
    border: none;
    height: calc(100vh - var(--vp-nav-height) - 48px);
  }
}
</style>
