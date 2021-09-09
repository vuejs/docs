/**
 * watch / generate an all-API index temporary json file (ignored by Git)
 */

// @ts-check
const fs = require('fs')
const path = require('path')
const { watch } = require('./watch')

exports.genApiIndex = (apiGroups) => {
  watch({
    src: 'api',
    out: 'api/index.json',
    genData() {
      return genIndex(apiGroups)
    },
    filter(path) {
      return path.endsWith('.md')
    }
  })
}

/**
 * @param {{
 *   text: string,
 *   items: { text: string, link: string }[]
 * }[]} apiGroups
 */
function genIndex(apiGroups) {
  return apiGroups.map((group) => ({
    text: group.text,
    items: group.items.map((item) => ({
      ...item,
      headers: parsePageHeaders(item.link)
    }))
  }))
}

const headersCache = new Map()

/**
 * @param {string} link
 */
function parsePageHeaders(link) {
  const fullePath = path.join(__dirname, '../src', link) + '.md'
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
