<script setup lang="ts">
import { Repl, useStore, useVueImportMap } from '@vue/repl'
import CodeMirror from '@vue/repl/codemirror-editor'
import { data } from './examples.data'
import { inject, watchEffect, Ref, onMounted, ref, onUnmounted } from 'vue'
import {
  resolveSFCExample,
  resolveNoBuildExample,
  onHashChange
} from './utils'

const { vueVersion, defaultVersion, importMap } = useVueImportMap({
  runtimeDev: () =>
    `https://unpkg.com/vue@${
      vueVersion.value || defaultVersion
    }/dist/vue.esm-browser.js`
})
const store = useStore({
  vueVersion,
  builtinImportMap: importMap
})

const preferComposition = inject('prefer-composition') as Ref<boolean>
const preferSFC = inject('prefer-sfc') as Ref<boolean>

watchEffect(updateExample, {
  onTrigger(e) {
    console.log(e)
    debugger
  }
})
onHashChange(updateExample)

/**
 * We perform some runtime logic to transform source files into different
 * API / format combinations:
 * - Options vs. Composition
 * - plain HTML vs. SFCs
 */
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

const heightProvider = ref<HTMLDivElement>()
onMounted(() => {
  const set = () => {
    heightProvider.value!.style.setProperty(
      '--vh',
      window.innerHeight + 'px'
    )
  }
  set()
  window.addEventListener('resize', set)

  onUnmounted(() => {
    window.removeEventListener('resize', set)
  })
})
</script>

<template>
  <div ref="heightProvider">
    <Repl
      :editor="CodeMirror"
      :store="store"
      :showImportMap="!preferSFC"
      :showCompileOutput="false"
      :clearConsole="false"
    />
  </div>
</template>

<style>
.vue-repl {
  max-width: 1105px;
  border-right: 1px solid var(--vt-c-divider-light);
  height: calc(
    var(--vh, 0px) - var(--vt-nav-height) - var(--vt-banner-height, 0px)
  );
}

@media (max-width: 960px) {
  .vue-repl {
    border: none;
    height: calc(
      var(--vh, 0px) - var(--vt-nav-height) - var(--vt-banner-height, 0px) -
        48px
    );
  }
}
</style>
