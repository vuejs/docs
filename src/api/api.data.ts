// api.data.ts
// a file ending with data.(j|t)s will be evaluated in Node.js
import fs from 'fs'
import path from 'path'
import { sidebar } from '../../.vitepress/config'

export interface APIGroup {
  text: string
  items: {
    text: string
    link: string
    headers: string[]
  }[]
}

// declare resolved data type
export declare const data: APIGroup[]

export default {
  // declare files that should trigger HMR
  watch: './*.md',
  // read from fs and generate the data
  load(): APIGroup[] {
    return sidebar['/api/'].map((group) => ({
      text: group.text,
      items: group.items.map((item) => ({
        ...item,
        headers: parsePageHeaders(item.link)
      }))
    }))
  }
}

const headersCache = new Map<
  string,
  {
    headers: string[]
    timestamp: number
  }
>()

function parsePageHeaders(link: string) {
  const fullPath = path.join(__dirname, '../', link) + '.md'
  const timestamp = fs.statSync(fullPath).mtimeMs

  const cached = headersCache.get(fullPath)
  if (cached && timestamp === cached.timestamp) {
    return cached.headers
  }

  const src = fs.readFileSync(fullPath, 'utf-8')
  const h2s = src.match(/^## [^\n]+/gm)
  let headers: string[] = []
  if (h2s) {
    headers = h2s.map((h) =>
      h
        .slice(2)
        .replace(/<sup class=.*/, '')
        .replace(/\\</g, '<')
        .replace(/`([^`]+)`/g, '$1')
        .trim()
    )
  }
  headersCache.set(fullPath, {
    timestamp,
    headers
  })
  return headers
}
