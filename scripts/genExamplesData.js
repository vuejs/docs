/**
 * watch / generate an all-example data temporary json file (ignored by Git)
 */

// @ts-check
const fs = require('fs')
const path = require('path')
const { watch } = require('./watch')

exports.genExamplesData = () => {
  watch({
    src: 'examples/src',
    out: 'examples/data.json',
    genData: genExamples
  })
}

function genExamples() {
  const srcDir = path.resolve(__dirname, '../src/examples/src')
  const examples = fs.readdirSync(srcDir)
  const data = {}
  for (const name of examples) {
    data[name] = readExample(path.join(srcDir, name))
  }
  return data
}

function readExample(dir) {
  const filenames = fs.readdirSync(dir)
  const files = {}
  for (const filename of filenames) {
    if (filename === 'import-map.json' || filename === 'description.txt') {
      files[filename] = fs.readFileSync(path.join(dir, filename), 'utf-8')
    } else {
      files[filename] = readComponentDir(path.join(dir, filename))
    }
  }
  return files
}

function readComponentDir(dir) {
  const filenames = fs.readdirSync(dir)
  const files = {}
  for (const filename of filenames) {
    let content = fs.readFileSync(path.join(dir, filename), 'utf-8')
    if (!content.endsWith('\n')) content += '\n'
    files[filename] = content
  }
  return files
}
