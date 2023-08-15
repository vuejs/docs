<script setup>
import { ref } from 'vue'
import { cells, evalCell } from './spreadSheetStore.js'

const props = defineProps({
  c: Number,
  r: Number
})

const editing = ref(false)

function update(e) {
  editing.value = false
  cells[props.c][props.r] = e.target.value.trim()
}
</script>

<template>
  <div class="cell" :title="cells[c][r]" @click="editing = true">
    <input
      v-if="editing"
      :value="cells[c][r]"
      @change="update"
      @blur="update"
      @vue:mounted="({ el }) => el.focus()"
    />
    <span v-else>{{ evalCell(cells[c][r]) }}</span>
  </div>
</template>

<style scoped>
.cell, .cell input {
  height: 1.5em;
  line-height: 1.5;
  font-size: 15px;
  color: var(--vt-c-text-1);
}

.cell span {
  padding: 0 6px;
}

.cell input {
  width: 100%;
  box-sizing: border-box;
  padding: 0 4px;
}

.cell input:focus {
  border: 2px solid var(--vt-c-divider);
  color: var(--vt-c-text-1);
}
</style>
