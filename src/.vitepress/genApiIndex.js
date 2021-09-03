/**
 * watch / generate an all-API index temporary json file (ignored by Git)
 */

// @ts-check
const fs = require('fs')
const path = require('path')

let prevData

/**
 * @param {{
 *   text: string,
 *   items: { text: string, link: string }[]
 * }[]} apiGroups
 */
function genIndex(apiGroups) {
  const data = apiGroups.map((group) => ({
    text: group.text,
    items: group.items.map((item) => ({
      ...item,
      headers: parsePageHeaders(item.link)
    }))
  }))

  const stringified = JSON.stringify(data, null, 2)
  if (stringified === prevData) return
  prevData = stringified

  fs.writeFileSync(path.resolve(__dirname, '../api/index.json'), stringified)
}

const headersCache = new Map()

/**
 * @param {string} link
 */
function parsePageHeaders(link) {
  const fullePath = path.join(__dirname, '..', link) + '.md'
  const timestamp = fs.statSync(fullePath).mtimeMs

  const cached = headersCache.get(fullePath)
  if (cached && timestamp === cached.timestamp) {
    return cached.headers
  }

  const src = fs.readFileSync(fullePath, 'utf-8')
  const h2s = src.match(/^## [^\n]+/gm)
  if (h2s) {
    return h2s.map((h) =>
      h
        .slice(2)
        .replace(/<Badge.*/, '')
        .replace(/`([^`]+)`/g, '$1')
        .trim()
    )
  }
  return []
}

let watcher

exports.genApiIndex = async function (apiGroups) {
  genIndex(apiGroups)

  // do not watch for build
  if (process.env.NODE_ENV === 'production') {
    return
  }

  if (watcher) {
    watcher.close()
  }

  // @ts-ignore
  watcher = new (require('cheap-watch'))({
    dir: path.resolve(__dirname, '../api'),
    filter: ({ path }) => path.endsWith('.md'),
    debounce: 50
  })
  await watcher.init()
  watcher.on('+', () => genIndex(apiGroups))
  watcher.on('-', () => genIndex(apiGroups))
}
