// api.data.ts
import fs from 'fs'
import path from 'path'
import type { MultiSidebarConfig } from '@vue/theme/src/vitepress/config.ts'
import { sidebar } from '../../.vitepress/config'

// Interface defining the structure of a single header in the API
interface APIHeader {
  anchor: string
  text: string
}

// Interface defining the structure of an API group with text, anchor, and items
export interface APIGroup {
  text: string
  anchor: string
  items: {
    text: string
    link: string
    headers: APIHeader[]
  }[]
}

// Declare the resolved data type for API groups
export declare const data: APIGroup[]

// Utility function to generate a slug from a string (used for anchor links)
function slugify(text: string): string {
  return (
    text
      // Replace special characters and spaces with hyphens
      .replace(/[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g, '-')
      // Remove continuous separators
      .replace(/-{2,}/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '')
      // Ensure it doesn't start with a number (e.g. #121)
      .replace(/^(\d)/, '_$1')
      // Convert to lowercase
      .toLowerCase()
  )
}

// Utility function to parse headers from a markdown file at a given link
function parsePageHeaders(link: string): APIHeader[] {
  const fullPath = path.join(__dirname, '../', link) + '.md' // Resolve the full file path
  const timestamp = fs.statSync(fullPath).mtimeMs // Get the last modified timestamp of the file

  // Check if the file is cached and if its timestamp matches
  const cached = headersCache.get(fullPath)
  if (cached && timestamp === cached.timestamp) {
    return cached.headers // Return cached headers if they're up-to-date
  }

  const src = fs.readFileSync(fullPath, 'utf-8') // Read the markdown file
  const headers = extractHeadersFromMarkdown(src) // Extract headers from the file content

  // Store the extracted headers along with the file's timestamp in the cache
  headersCache.set(fullPath, {
    timestamp,
    headers
  })

  return headers
}

// Helper function to extract all headers (h2) from markdown content
function extractHeadersFromMarkdown(src: string): APIHeader[] {
  const h2s = src.match(/^## [^\n]+/gm) // Match all h2 headers (## header)
  const anchorRE = /\{#([^}]+)\}/ // Regular expression to match the anchor link in header (e.g. {#some-anchor})
  let headers: APIHeader[] = []

  if (h2s) {
    // Process each h2 header and extract text and anchor
    headers = h2s.map((h) => {
      const text = cleanHeaderText(h, anchorRE) // Clean up header text
      const anchor = extractAnchor(h, anchorRE, text) // Extract or generate anchor
      return { text, anchor }
    })
  }

  return headers
}

// Helper function to clean up header text (e.g., remove superscript, code formatting)
function cleanHeaderText(h: string, anchorRE: RegExp): string {
  return h
    .slice(2) // Remove the "##" part of the header
    .replace(/<sup class=.*/, '') // Remove superscript (e.g., <sup> tags)
    .replace(/\\</g, '<') // Decode escaped characters like \<
    .replace(/`([^`]+)`/g, '$1') // Remove inline code formatting (e.g., `code`)
    .replace(anchorRE, '') // Remove anchor tags (e.g., {#anchor})
    .trim() // Trim leading/trailing whitespace
}

// Helper function to extract the anchor link from a header (or generate one if missing)
function extractAnchor(h: string, anchorRE: RegExp, text: string): string {
  const anchorMatch = h.match(anchorRE) // Match anchor if it exists
  return anchorMatch?.[1] ?? slugify(text) // If no anchor, generate one using slugify
}

// Cache for storing headers and their associated timestamps to avoid re-reading files
const headersCache = new Map<
  string,
  {
    headers: APIHeader[]
    timestamp: number
  }
>()

// Main export function for loading the API data
export default {
  // Declare files that should trigger Hot Module Replacement (HMR)
  watch: './*.md',
  
  // Load API data and process sidebar items
  load(): APIGroup[] {
    // Generate the API group data by processing the sidebar configuration
    return (sidebar as MultiSidebarConfig)['/api/'].map((group) => ({
      text: group.text, // Text of the group (e.g., 'API')
      anchor: slugify(group.text), // Generate anchor for the group title
      items: group.items.map((item) => ({
        ...item, // Spread the original item properties
        headers: parsePageHeaders(item.link), // Parse the headers from the item's markdown link
      }))
    }))
  }
}
