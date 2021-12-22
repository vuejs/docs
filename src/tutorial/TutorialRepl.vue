<script setup lang="ts">
import { Repl, ReplStore } from '@vue/repl'
import { inject, watch, version, Ref, ref, computed } from 'vue'
import { data } from './tutorial.data'
import {
  resolveSFCExample,
  resolveNoBuildExample,
  onHashChange
} from '../examples/utils'
import '@vue/repl/style.css'

const store = new ReplStore({
  defaultVueRuntimeURL: `https://unpkg.com/vue@${version}/dist/vue.esm-browser.js`
})

const preferComposition = inject('prefer-composition') as Ref<boolean>
const preferSFC = inject('prefer-sfc') as Ref<boolean>

const currentStep = ref('')

const currentDescription = computed(() => {
  return data[currentStep.value]?.['description.md']
})

const nextStep = computed(() => {
  const nextMatch = currentStep.value.match(/\d+/)
  const next = nextMatch && `step-${+nextMatch[0] + 1}`
  if (next && data.hasOwnProperty(next)) {
    return next
  }
})

const userEditedState = ref<Record<string, string> | null>(null)
const buttonText = computed(() =>
  userEditedState.value ? 'Reset' : 'Show me!'
)

function updateExample() {
  let hash = location.hash.slice(1)
  if (!data.hasOwnProperty(hash)) {
    hash = 'step-1'
    location.hash = `#${hash}`
  }
  currentStep.value = hash

  const content =
    userEditedState.value && nextStep.value ? data[nextStep.value] : data[hash]

  store.setFiles(
    preferSFC.value
      ? resolveSFCExample(content, preferComposition.value)
      : resolveNoBuildExample(content, preferComposition.value),
    preferSFC.value ? 'App.vue' : 'index.html'
  )
}

function toggleResult() {
  if (userEditedState.value) {
    store.setFiles(userEditedState.value)
    userEditedState.value = null
  } else {
    userEditedState.value = store.getFiles()
    updateExample()
  }
}

watch([preferComposition, preferSFC], () => {
  userEditedState.value = null
  updateExample()
})

onHashChange(() => {
  userEditedState.value = null
  updateExample()
})

updateExample()
</script>

<template>
  <section class="tutorial">
    <article class="instruction">
      <div class="vt-doc" v-html="currentDescription"></div>
      <footer class="footer">
        <button @click="toggleResult">{{ buttonText }}</button>
        <a v-if="nextStep" :href="`#${nextStep}`">Next Step &gt;</a>
      </footer>
    </article>
    <Repl
      :store="store"
      :showCompileOutput="false"
      :clearConsole="false"
      :showImportMap="false"
    />
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

.vt-doc :deep(h1) {
  font-size: 1.5em;
  margin-bottom: 1em;
}
</style>
