/**
 * watch / generate an all-tutorial data temporary json file (ignored by Git)
 */

// @ts-check
const fs = require('fs')
const path = require('path')
const { watch } = require('./watch')
const { readExample } = require('./genExamplesData')
const { createMarkdownRenderer } = require('vitepress')

exports.genTutorialData = async () => {
  const md = createMarkdownRenderer(process.cwd(), {
    // @ts-ignore
    highlight: await require('@vue/theme/highlight')()
  })

  watch({
    src: 'tutorial/src',
    out: 'tutorial/data.json',
    genData: () => genTutorialSteps(md)
  })
}

/**
 * @param {import('vitepress').MarkdownRenderer} md
 */
function genTutorialSteps(md) {
  const srcDir = path.resolve(__dirname, '../src/tutorial/src')
  const steps = fs.readdirSync(srcDir).sort()
  const data = {}

  for (const name of steps) {
    const step = readExample(path.join(srcDir, name))
    const desc = step['description.md']
    if (desc) {
      step['description.md'] = md.render(desc).html
    }

    data[name] = step
  }
  return data
}
