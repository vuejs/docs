/**
 * watch / generate an all-API index temporary json file (ignored by Git)
 */

// @ts-check
const fs = require('fs')
const path = require('path')

const watchers = {}
const prevData = {}

/**
 * @param {{
 *   src: string
 *   out: string
 *   genData: () => any
 *   filter?: (path: string) => boolean
 * }} options
 */
exports.watch = async function ({ src, out, genData, filter }) {
  function gen() {
    const data = genData()
    const stringified = JSON.stringify(data, null, 2)
    if (stringified === prevData[out]) return
    prevData[out] = stringified
    fs.writeFileSync(path.resolve(__dirname, `../src/${out}`), stringified)
  }

  gen()

  // do not watch for build
  if (process.env.NODE_ENV === 'production') {
    return
  }

  if (watchers[out]) {
    watchers[out].close()
  }

  // @ts-ignore
  const watcher = (watchers[out] = new (require('cheap-watch'))({
    dir: path.resolve(__dirname, `../src/${src}`),
    filter: ({ path }) => (filter ? filter(path) : true),
    debounce: 50
  }))
  await watcher.init()
  watcher.on('+', gen)
  watcher.on('-', gen)
}
