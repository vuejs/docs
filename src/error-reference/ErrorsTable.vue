<script setup lang="ts">
defineProps<{
  kind: string
  errors: Record<any, string>
  highlight?: any
}>()
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Code</th>
        <th>Message</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(msg, code) of errors"
        :class="{ highlight: highlight === `${kind}-${code}` }"
      >
        <td :id="`${kind}-${code}`" v-text="code" />
        <td v-text="msg" />
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.highlight {
  color: var(--vt-c-yellow-darker);
  font-weight: bold;
}
</style>
