import { onBeforeUnmount } from 'vue'

export type ExampleData = {
  [key: string]: string | Record<string, string>
} & {
  'import-map.json'?: string
  _hint?: ExampleData
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

function toKebabTags(str: string): string {
  return str
    .replace(/(<\/?)([A-Z]\w+)(\s|>)/g, (_, open, tagName, end) => {
      return (
        open + tagName.replace(/\B([A-Z])/g, '-$1').toLowerCase() + end
      )
    })
    .replace(/<([\w-]+)([^/]*?)\s?\/>/g, (_, tagName, attrs) => {
      return `<${tagName}${attrs}></${tagName}>`
    })
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

  const emitsStartIndex = src.indexOf(`\n  emits:`)
  if (emitsStartIndex > -1) {
    const emitsEndIndex = src.indexOf(`]`, emitsStartIndex) + 1
    const emitsDef =
      src
        .slice(emitsStartIndex, emitsEndIndex)
        .trim()
        .replace(/,$/, '')
        .replace(/^emits: /, `const emit = defineEmits(`) + ')'
    setupCode = (emitsDef + '\n\n' + setupCode).trim()
  }

  const res = src.slice(0, exportDefaultIndex) + setupCode
  return (setupCode ? res : res.trim()) + '\n'
}

function forEachComponent(
  raw: ExampleData,
  files: Record<string, string>,
  cb: (filename: string, file: Record<string, string>) => void
) {
  for (const filename in raw) {
    const content = raw[filename]
    if (
      filename === 'description.txt' ||
      filename === 'description.md' ||
      filename === '_hint'
    ) {
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

function injectCreateApp(src: string): string {
  const importVueRE = /import {(.*?)} from 'vue'/
  if (importVueRE.test(src)) {
    src = src.replace(importVueRE, `import { createApp,$1} from 'vue'`)
  } else {
    const newline = src.startsWith(`import`) ? `\n` : `\n\n`
    src = `import { createApp } from 'vue'${newline}${src}`
  }
  return src.replace(
    /export default ({[^]*\n})/,
    "createApp($1).mount('#app')"
  )
}

export function resolveSFCExample(
  raw: ExampleData,
  preferComposition: boolean
) {
  const files: Record<string, string> = {}
  forEachComponent(
    raw,
    files,
    (filename, { template, composition, options, style }) => {
      const desc = raw['description.txt'] as string
      let sfcContent =
        desc && filename === 'App' ? `<!--\n${desc.trim()}\n-->\n\n` : ``
      if (preferComposition && composition) {
        sfcContent += `<script setup>\n${toScriptSetup(
          composition,
          template
        )}<\/script>\n\n`
      }
      if (!preferComposition && options) {
        sfcContent += `<script>\n${options}<\/script>\n\n`
      }
      sfcContent += `<template>\n${indent(template)}</template>`
      if (style) {
        sfcContent += `\n\n<style>\n${style}</style>`
      }
      files[filename + '.vue'] = sfcContent
    }
  )
  return files
}

export function resolveNoBuildExample(
  raw: ExampleData,
  preferComposition: boolean
) {
  const files: Record<string, string> = {}

  const desc = raw['description.txt'] as string
  let html = desc ? `<!--\n${desc.trim()}\n-->\n\n` : ``
  let css = ''

  // set it first for ordering
  files['index.html'] = html
  forEachComponent(
    raw,
    files,
    (filename, { template, composition, options, style }) => {
      let js = (preferComposition ? composition : options) || ''
      // rewrite imports to *.vue
      js = js.replace(
        /import (.*) from '(.*)\.vue'/g,
        "import $1 from '$2.js'"
      )

      const _template = indent(toKebabTags(template).trim())
      if (style) css += style

      if (filename === 'App') {
        if (js) {
          html += `<script type="module">\n${injectCreateApp(
            js
          )}<\/script>\n\n`
        }
        html += `<div id="app">\n${_template}\n</div>`
      } else {
        // html += `\n\n<template id="${filename}">\n${_template}</template>`
        if (js) {
          js = js.replace(
            /export default \{([^]*)\n\}/,
            `export default {$1,\n  template: \`\n${_template}\n  \`\n}`
          )
        } else {
          js = `export default {\n  template: \`\n${_template}\n  \`\n}`
        }
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

export function onHashChange(cb: () => void) {
  if (typeof document === 'undefined') return
  const { pathname } = window.location
  function handler() {
    if (window.location.pathname === pathname) {
      cb()
    }
  }
  window.addEventListener('hashchange', handler)
  onBeforeUnmount(() => {
    window.removeEventListener('hashchange', handler)
  })
}
