<script setup>
import Cell from './SpreadSheetCell.vue'
import { cells } from './spreadSheetStore.js'

const cols = cells.map((_, i) => String.fromCharCode(65 + i))
</script>

<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th v-for="c in cols">{{ c }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in cells[0].length">
        <th>{{ i - 1 }}</th>
        <td v-for="(c, j) in cols">
          <Cell :r="i - 1" :c="j"></Cell>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
th {
  color: var(--vt-c-text-1);
  background-color: var(--vt-c-bg-mute);
  padding: 0 1em;
}

tr:first-of-type th {
  width: 100px;
}

tr:first-of-type th:first-of-type {
  width: 25px;
}

td {
  border: 1px solid var(--vt-c-bg-mute);
  padding: 0;
}
</style>
