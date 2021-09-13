<script setup lang="ts">
import { Repl, ReplStore } from '@vue/repl'
import '@vue/repl/style.css'
import data from './data.json'
import { inject, watchEffect, version, Ref } from 'vue'

const store = new ReplStore({
  defaultVueRuntimeURL: `https://unpkg.com/vue@${version}/dist/vue.esm-browser.js`
})

const preferComposition = inject('prefer-composition') as Ref<boolean>
const preferSFC = inject('prefer-sfc') as Ref<boolean>

watchEffect(updateExample)
window.addEventListener('hashchange', updateExample)

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
      ? resolveSFCExample(data[hash])
      : resolveNoBuildExample(data[hash]),
    preferSFC.value ? 'App.vue' : 'index.html'
  )
}

type ExampleData = {
  [key: string]: Record<string, string>
} & {
  'import-map.json': string
}

function resolveSFCExample(raw: ExampleData) {
  const files: Record<string, string> = {}
  forEachComponent(
    raw,
    files,
    (filename, { template, composition, options, style }) => {
      let sfcContent =
        filename === 'App' ? `<!--\n${raw['description.txt']}\n-->\n\n` : ``
      if (preferComposition.value) {
        sfcContent += `<script setup>\n${toScriptSetup(
          composition,
          template
        )}<\/script>`
      } else {
        sfcContent += `<script>\n${options}<\/script>`
      }
      sfcContent += `\n\n<template>\n${indent(template)}</template>`
      if (style) {
        sfcContent += `\n\n<style>\n${style}</style>`
      }
      files[filename + '.vue'] = sfcContent
    }
  )
  return files
}

function resolveNoBuildExample(raw: ExampleData) {
  const files: Record<string, string> = {}

  let html = `<!--\n${raw['description.txt']}\n-->\n\n`
  let css = ''

  // set it first for ordering
  files['index.html'] = html
  forEachComponent(
    raw,
    files,
    (filename, { template, composition, options, style }) => {
      let js = preferComposition.value ? composition : options
      // rewrite imports to *.vue
      js = js.replace(/import (.*) from '(.*)\.vue'/g, "import $1 from '$2.js'")

      const _template = indent(toKebabTags(template))
      if (style) css += style

      if (filename === 'App') {
        html += `<script type="module">\n${injectCreateApp(js)}<\/script>`
        html += `\n\n<div id="app">\n${_template}</div>`
      } else {
        html += `\n\n<template id="${filename}">\n${_template}</template>`
        js = js.replace(
          `export default {\n  `,
          `export default {\n  template: '#${filename}',\n  `
        )
        files[filename + '.js'] = js
      }
    }
  )
  files['index.html'] = html
  if (css) {
    files['style.css'] = css
  }
  return files
}

function forEachComponent(
  raw: ExampleData,
  files: Record<string, string>,
  cb: (filename: string, file: Record<string, string>) => void
) {
  for (const filename in raw) {
    const content = raw[filename]
    if (filename === 'description.txt') {
      continue
    } else if (typeof content === 'string') {
      files[filename] = content
    } else {
      const {
        'template.html': template,
        'composition.js': composition,
        'options.js': options,
        'style.css': style
      } = content
      cb(filename, { template, composition, options, style })
    }
  }
}

function toScriptSetup(src: string, template: string): string {
  const exportDefaultIndex = src.indexOf('export default')
  const lastReturnIndex = src.lastIndexOf('return {')

  let setupCode =
    lastReturnIndex > -1
      ? deindent(
          src
            .slice(exportDefaultIndex, lastReturnIndex)
            .replace(/export default[^]+?setup\([^)]*\)\s*{/, '')
            .trim()
        )
      : ''

  const propsStartIndex = src.indexOf(`\n  props:`)
  if (propsStartIndex > -1) {
    const propsEndIndex = src.indexOf(`\n  }`, propsStartIndex) + 4
    const propsVar =
      /\bprops\b/.test(template) || /\bprops\b/.test(src)
        ? `const props = `
        : ``
    const propsDef = deindent(
      src
        .slice(propsStartIndex, propsEndIndex)
        .trim()
        .replace(/,$/, '')
        .replace(/^props: /, `${propsVar}defineProps(`) + ')',
      1
    )
    setupCode = (propsDef + '\n\n' + setupCode).trim()
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

function injectCreateApp(src: string): string {
  const importVueRE = /import {(.*?)} from 'vue'/
  if (importVueRE.test(src)) {
    src = src.replace(importVueRE, `import { createApp,$1} from 'vue'`)
  } else {
    const newline = src.startsWith(`import`) ? `\n` : `\n\n`
    src = `import { createApp } from 'vue'${newline}${src}`
  }
  return src.replace(/export default ({[^]*\n})/, "createApp($1).mount('#app')")
}

function toKebabTags(str: string): string {
  return str.replace(/(<\/?)([A-Z]\w+)(\s|>)/g, (_, open, tagName, end) => {
    return open + tagName.replace(/\B([A-Z])/g, '-$1').toLowerCase() + end
  })
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
