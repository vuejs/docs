<script setup lang="ts">
import { Repl, ReplStore } from '@vue/repl'
import { inject, watch, version, Ref, ref, computed } from 'vue'
import data from './data.json'
import { resolveSFCExample, resolveNoBuildExample } from '../examples/utils'
import '@vue/repl/style.css'

const store = new ReplStore({
  defaultVueRuntimeURL: `https://unpkg.com/vue@${version}/dist/vue.esm-browser.js`
})

const preferComposition = inject('prefer-composition') as Ref<boolean>
const preferSFC = inject('prefer-sfc') as Ref<boolean>
const componentData = ref('') as Ref<string>
const nextStep = ref('') as Ref<string>
const currentState = ref(null) as Ref<object>

const buttonText = computed(() => (currentState.value ? 'Reset' : 'Show me!'))

function calculateNextStep(hash) {
  const nextLessonIndex = +hash.slice(-1) + 1
  if (data.hasOwnProperty(`step-${nextLessonIndex}`)) {
    nextStep.value = `step-${nextLessonIndex}`
  } else {
    nextStep.value = ''
  }
}

function updateExample() {
  console.log('Update example triggered')
  let hash = location.hash.slice(1)
  if (!data.hasOwnProperty(hash)) {
    hash = 'step-1'
    location.hash = `#${hash}`
  }
  componentData.value = data[hash]?.App

  calculateNextStep(hash)

  const content = currentState.value ? data[nextStep.value] : data[hash]

  store.setFiles(
    preferSFC.value
      ? resolveSFCExample(content, preferComposition.value)
      : resolveNoBuildExample(content, preferComposition.value),
    preferSFC.value ? 'App.vue' : 'index.html'
  )
}

function toggleResult() {
  if (currentState.value) {
    store.setFiles(currentState.value)
    currentState.value = null
  } else {
    currentState.value = store.getFiles()
    updateExample()
  }
}

watch([preferComposition, preferSFC], () => {
  currentState.value = null
  updateExample()
})
window.addEventListener('hashchange', () => {
  currentState.value = null
  updateExample()
})

updateExample()
</script>

<template>
  <section class="tutorial">
    <article class="instruction">
      <h1>{{ componentData.title }}</h1>
      <div v-html="componentData.description"></div>
      <footer class="footer">
        <button @click="toggleResult">{{ buttonText }}</button>
        <a v-if="nextStep" :href="`#${nextStep}`">Next Step &gt;</a>
      </footer>
    </article>
    <Repl :store="store" :showCompileOutput="false" :clearConsole="false" />
  </section>
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

footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #7e7e7e;
  margin-top: 2em;
  padding-top: 1em;
}

footer button,
a {
  color: var(--vt-c-green-light);
}

@media (max-width: 960px) {
  .vue-repl {
    border: none;
    height: calc(100vh - var(--vp-nav-height) - var(--ins-height) - 48px);
  }
}
</style>
