<script setup lang="ts">
import { Repl, ReplStore } from '@vue/repl'
import '@vue/repl/style.css'
import data from './data.json'
import { inject, watch, version, Ref } from 'vue'

const store = new ReplStore({
  defaultVueRuntimeURL: `https://unpkg.com/vue@${version}/dist/vue.esm-browser.js`
})

const preferComposition = inject('prefer-composition') as Ref<boolean>
const preferSFC = inject('prefer-sfc') as Ref<boolean>

window.addEventListener('hashchange', updateExample)
watch(preferComposition, updateExample)
updateExample()

function updateExample() {
  const hash = location.hash.slice(1)
  if (data.hasOwnProperty(hash)) {
    store.setFiles(
      preferSFC.value
        ? resolveSFCExample(data[hash])
        : resolveNoBuildExample(data[hash])
    )
  } else if (!hash) {
    location.hash = '#markdown'
  }
}

type ExampleData = {
  [key: string]: Record<string, string>
} & {
  'import-map.json': string
}

function resolveSFCExample(raw: ExampleData) {
  const files: Record<string, string> = {}
  for (const filename in raw) {
    if (filename === 'description.txt') {
      continue
    } else if (filename === 'import-map.json') {
      files[filename] = raw[filename]
    } else {
      const {
        'template.html': template,
        'composition.js': composition,
        'options.js': options,
        'style.css': style
      } = raw[filename]

      let sfcContent =
        filename === 'App' ? `<!--\n${raw['description.txt']}\n-->\n\n` : ``
      if (preferComposition.value) {
        sfcContent += `<script setup>\n${toScriptSetup(composition)}<\/script>`
      } else {
        sfcContent += `<script>\n${options}<\/script>`
      }
      sfcContent += `\n\n<template>\n${indent(template)}</template>`
      if (style) {
        sfcContent += `\n\n<style>\n${style}</style>`
      }
      files[filename + '.vue'] = sfcContent
    }
  }
  return files
}

function resolveNoBuildExample(raw: ExampleData) {
  const files: Record<string, string> = {}
  for (const filename in raw) {
    if (filename === 'import-map.json') {
      files[filename] = raw[filename]
    } else {
      const {
        'template.html': template,
        'composition.js': composition,
        'options.js': options,
        'style.css': style
      } = raw[filename]

      let htmlContent = ''
      if (preferComposition.value) {
      } else {
      }
    }
  }
  return files
}

function toScriptSetup(src: string): string {
  const exportDefaultIndex = src.indexOf('export default')
  const lastReturnIndex = src.lastIndexOf('return {')

  let setupCode = deindent(
    src
      .slice(exportDefaultIndex, lastReturnIndex)
      .replace(/export default[^]+?setup\([^)]*\)\s*{/, '')
      .trim()
  )

  const propsStartIndex = src.indexOf(`\n  props:`)
  if (propsStartIndex > -1) {
    const propsEndIndex = src.indexOf(`\n  }`, propsStartIndex) + 4
    const propsDef = deindent(
      src
        .slice(propsStartIndex, propsEndIndex)
        .trim()
        .replace(/,$/, '')
        .replace(/^props: /, 'const props = defineProps(') + ')',
      1
    )
    setupCode = propsDef + '\n\n' + setupCode
  }

  return src.slice(0, exportDefaultIndex) + setupCode + '\n'
}

function indent(str: string): string {
  return str
    .split('\n')
    .map((l) => (l.trim() ? `  ${l}` : l))
    .join('\n')
}

function deindent(str: string, tabsize = 2): string {
  return str
    .split('\n')
    .map((l) => l.replace(tabsize === 1 ? /^\s{2}/ : /^\s{4}/, ''))
    .join('\n')
}
</script>

<template>
  <Repl :store="store" :showCompileOutput="false" :clearConsole="false" />
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
