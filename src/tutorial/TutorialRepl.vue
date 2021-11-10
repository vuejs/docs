<script setup lang="ts">
import { Repl, ReplStore } from '@vue/repl'
import { inject, watchEffect, version, Ref } from 'vue'
import data from './data.json'
import { resolveSFCExample, resolveNoBuildExample } from '../examples/utils'
import '@vue/repl/style.css'

const store = new ReplStore({
  defaultVueRuntimeURL: `https://unpkg.com/vue@${version}/dist/vue.esm-browser.js`
})

const preferComposition = inject('prefer-composition') as Ref<boolean>
const preferSFC = inject('prefer-sfc') as Ref<boolean>

function updateExample() {
  let hash = location.hash.slice(1)
  if (!data.hasOwnProperty(hash)) {
    hash = 'hello-world'
    location.hash = `#${hash}`
  }
  store.setFiles(
    preferSFC.value
      ? resolveSFCExample(data[hash], preferComposition.value)
      : resolveNoBuildExample(data[hash], preferComposition.value),
    preferSFC.value ? 'App.vue' : 'index.html'
  )
}

watchEffect(updateExample)
window.addEventListener('hashchange', updateExample)
</script>

<template>
  <div class="tutorial">
    <div class="instruction">
      <h1>1. Hello World</h1>
      <p>Let's do get something on the screen!</p>
      <p>Next Step &gt;</p>
    </div>
    <Repl :store="store" :showCompileOutput="false" />
  </div>
</template>

<style scoped>
.tutorial {
  --ins-height: min(30vh, 250px);
}

.vue-repl,
.instruction {
  max-width: 1105px;
  border-right: 1px solid var(--vt-c-divider-light);
}

.instruction {
  height: var(--ins-height);
  padding: 24px 32px;
  border-bottom: 1px solid var(--vt-c-divider-light);
  font-size: 15px;
  overflow-y: auto;
}

.instruction h1 {
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 0.5em;
}

.vue-repl {
  height: calc(100vh - var(--vp-nav-height) - var(--ins-height));
}

@media (max-width: 960px) {
  .vue-repl {
    border: none;
    height: calc(100vh - var(--vp-nav-height) - var(--ins-height) - 48px);
  }
}
</style>
