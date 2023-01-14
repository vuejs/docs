import { reactive } from 'vue'

const COLS = 3
const ROWS = 3

export const cells = reactive(
  Array.from(Array(COLS).keys()).map((i) =>
    Array.from(Array(ROWS).keys()).map((i) => '')
  )
)

// initial state for demo
cells[0][0] = '1'
cells[0][1] = '2'
cells[0][2] = '= A0 + A1'

// adapted from https://codesandbox.io/s/jotai-7guis-task7-cells-mzoit?file=/src/atoms.ts
// by @dai-shi
export function evalCell(exp) {
  if (!exp.startsWith('=')) {
    return exp
  }

  // = A1 + B2 ---> get(0,1) + get(1,2)
  exp = exp
    .slice(1)
    .replace(
      /\b([A-Z])(\d{1,2})\b/g,
      (_, c, r) => `get(${c.charCodeAt(0) - 65},${r})`
    )

  try {
    return new Function('get', `return ${exp}`)(getCellValue)
  } catch (e) {
    return `#ERROR ${e}`
  }
}

function getCellValue(c, r) {
  const val = evalCell(cells[c][r])
  const num = Number(val)
  return Number.isFinite(num) ? num : val
}
