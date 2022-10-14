<script setup lang="ts">
import { Repl, ReplStore } from '@vue/repl'
import { inject, watch, version, Ref, ref, computed, nextTick } from 'vue'
import { data } from './tutorial.data'
import {
  resolveSFCExample,
  resolveNoBuildExample,
  onHashChange
} from '../examples/utils'
import '@vue/repl/style.css'
import PreferenceSwitch from '@theme/components/PreferenceSwitch.vue'
import {
  VTFlyout,
  VTIconChevronLeft,
  VTIconChevronRight,
  VTLink
} from '@vue/theme'

const store = new ReplStore({
  defaultVueRuntimeURL: `https://unpkg.com/vue@${version}/dist/vue.esm-browser.js`
})

const instruction = ref<HTMLElement>()

const preferComposition = inject('prefer-composition') as Ref<boolean>
const preferSFC = inject('prefer-sfc') as Ref<boolean>

const currentStep = ref('')
const keys = Object.keys(data).sort((a, b) => {
  return Number(a.replace(/^step-/, '')) - Number(b.replace(/^step-/, ''))
})
const totalSteps = keys.length

const titleRE = /<h1.*?>(.+?)<a class="header-anchor/
const allSteps = keys.map((key, i) => {
  const desc = data[key]['description.md'] as string
  return {
    text: `${i + 1}. ${desc.match(titleRE)![1]}`,
    link: `#${key}`
  }
})

const currentDescription = computed(() => {
  return data[currentStep.value]?.['description.md']
})

const currentStepIndex = computed(() => {
  return keys.indexOf(currentStep.value) + 1
})

const prevStep = computed(() => {
  const match = currentStep.value.match(/\d+/)
  const prev = match && `step-${+match[0] - 1}`
  if (prev && data.hasOwnProperty(prev)) {
    return prev
  }
})

const nextStep = computed(() => {
  const match = currentStep.value.match(/\d+/)
  const next = match && `step-${+match[0] + 1}`
  if (next && data.hasOwnProperty(next)) {
    return next
  }
})

const showingHint = ref(false)

function updateExample(scroll = false) {
  let hash = location.hash.slice(1)
  if (!data.hasOwnProperty(hash)) {
    hash = 'step-1'
    location.replace(`/tutorial/#${hash}`)
  }
  currentStep.value = hash

  const content = showingHint.value ? data[hash]._hint! : data[hash]

  store.setFiles(
    preferSFC.value
      ? resolveSFCExample(content, preferComposition.value)
      : resolveNoBuildExample(content, preferComposition.value),
    preferSFC.value ? 'App.vue' : 'index.html'
  )

  if (scroll) {
    nextTick(() => {
      instruction.value!.scrollTop = 0
    })
  }
}

function toggleResult() {
  showingHint.value = !showingHint.value
  updateExample()
}

watch([preferComposition, preferSFC], () => updateExample())

onHashChange(() => {
  showingHint.value = false
  updateExample(true)
})

updateExample()
</script>

<template>
  <section class="tutorial">
    <article class="instruction" ref="instruction">
      <PreferenceSwitch />
      <VTFlyout :button="`${currentStepIndex} / ${totalSteps}`">
        <VTLink
          v-for="(step, i) of allSteps"
          class="vt-menu-link"
          :class="{ active: i + 1 === currentStepIndex }"
          :href="step.link"
          >{{ step.text }}</VTLink
        >
      </VTFlyout>
      <div class="vt-doc" v-html="currentDescription"></div>
      <div class="hint" v-if="data[currentStep]?._hint">
        <button @click="toggleResult">
          {{ showingHint ? 'Reset' : 'Show me!' }}
        </button>
      </div>
      <footer>
        <a v-if="prevStep" :href="`#${prevStep}`"
          ><VTIconChevronLeft class="vt-link-icon" style="margin: 0" />
          Prev</a
        >
        <a class="next-step" v-if="nextStep" :href="`#${nextStep}`"
          >Next <VTIconChevronRight class="vt-link-icon"
        /></a>
      </footer>
    </article>
    <Repl
      layout="vertical"
      :store="store"
      :showCompileOutput="false"
      :clearConsole="false"
      :showImportMap="false"
      @keyup="showingHint = false"
    />
  </section>
</template>

<style scoped>
.tutorial {
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  --height: calc(
    100vh - var(--vt-nav-height) - var(--vt-banner-height, 0px)
  );
}

.preference-switch {
  position: relative;
}

.instruction {
  width: 45%;
  height: var(--height);
  padding: 0 32px 24px;
  border-right: 1px solid var(--vt-c-divider-light);
  font-size: 15px;
  overflow-y: auto;
  position: relative;
  --vt-nav-height: 40px;
}

.vue-repl {
  width: 55%;
  height: var(--height);
}

.vt-flyout {
  z-index: 9;
  position: absolute;
  right: 20px;
}

.vt-menu-link.active {
  font-weight: 500;
  color: var(--vt-c-brand);
}

footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--vt-c-divider);
  margin-top: 1.5em;
  padding-top: 1em;
}

footer a {
  font-weight: 500;
  color: var(--vt-c-brand);
}

.next-step {
  margin-left: auto;
}

.vt-doc :deep(h1) {
  font-size: 1.4em;
  margin: 1em 0;
}

.vt-doc :deep(h2) {
  font-size: 1.1em;
  margin: 1.2em 0 0.5em;
  padding: 0;
  border-top: none;
}

.vt-doc :deep(.header-anchor) {
  display: none;
}

.vt-doc :deep(summary) {
  cursor: pointer;
}

.hint {
  padding-top: 1em;
}

button {
  background-color: var(--vt-c-brand);
  color: var(--vt-c-bg);
  padding: 4px 12px 3px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
}

@media (min-width: 1377px) {
  .vue-repl {
    border-right: 1px solid var(--vt-c-divider-light);
  }
}

@media (min-width: 1441px) {
  .tutorial {
    padding-right: 32px;
  }
}

:deep(.narrow) {
  display: none;
}

@media (max-width: 720px) {
  .tutorial {
    display: block;
  }
  .instruction {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--vt-c-divider-light);
    height: 30vh;
    padding: 0 24px 24px;
  }
  .vue-repl {
    width: 100%;
    height: calc(
      70vh - var(--vt-nav-height) - var(--vt-banner-height, 0px)
    );
  }
  :deep(.wide) {
    display: none;
  }
  :deep(.narrow) {
    display: inline;
  }
}
</style>
