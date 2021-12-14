import fs from 'fs'
import path from 'path'
import { sidebar } from '../.vitepress/config'

export interface APIGroup {
  text: string
  items: {
    text: string
    link: string
    headers: string[]
  }[]
}

export declare const data: APIGroup[]

export default {
  watch: './*.md',
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
  const fullePath = path.join(__dirname, '../', link) + '.md'
  const timestamp = fs.statSync(fullePath).mtimeMs

  const cached = headersCache.get(fullePath)
  if (cached && timestamp === cached.timestamp) {
    return cached.headers
  }

  const src = fs.readFileSync(fullePath, 'utf-8')
  const h2s = src.match(/^## [^\n]+/gm)
  let headers: string[] = []
  if (h2s) {
    headers = h2s.map((h) =>
      h
        .slice(2)
        .replace(/<Badge.*/, '')
        .replace(/`([^`]+)`/g, '$1')
        .trim()
    )
  }
  headersCache.set(fullePath, {
    timestamp,
    headers
  })
  return headers
}
