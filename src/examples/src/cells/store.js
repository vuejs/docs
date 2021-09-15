import { reactive } from 'vue'

export const cells = reactive(
  Array.from(Array(26).keys()).map((i) =>
    Array.from(Array(100).keys()).map((i) => '')
  )
)

// https://codesandbox.io/s/jotai-7guis-task7-cells-mzoit?file=/src/atoms.ts
export function evalCell(exp) {
  if (!exp.startsWith('=')) {
    return exp
  }
  try {
    const fn = Function(
      'get',
      `
      return ${exp
        .slice(1)
        .replace(/\b([A-Z])(\d{1,2})\b/g, (_, c, r) => `get('${c}', ${r})`)};
      `
    )
    return fn((c, r) => {
      c = c.charCodeAt(0) - 65
      const val = evalCell(cells[c][r])
      const num = Number(val)
      return Number.isFinite(num) ? num : val
    })
  } catch (e) {
    return `#ERROR ${e}`
  }
}
