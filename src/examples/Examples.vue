<script setup>
import { Repl, ReplStore } from '@vue/repl'
import '@vue/repl/style.css'
import data from './data.json'

const store = new ReplStore()

// TODO make dynamic
const preference = 'composition'

window.addEventListener('hashchange', () => {
  const newHash = location.hash.slice(1)
  store.setFiles(data[newHash][preference])
})
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
