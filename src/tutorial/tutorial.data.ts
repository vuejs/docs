import path from 'path'
import { createMarkdownRenderer } from 'vitepress'
import { readExamples, ExampleData } from '../examples/examples.data'

export declare const data: Record<string, ExampleData>

export default {
  watch: './src/**',
  async load() {
    const md = await createMarkdownRenderer(process.cwd(), {
        theme: 'github-dark',
    }, '/')
    const files = readExamples(path.resolve(__dirname, './src'))
    for (const step in files) {
      const stepFiles = files[step]
      const desc = stepFiles['description.md'] as string
      if (desc) {
        stepFiles['description.md'] = md.render(desc)
      }
    }
    return files
  }
}
