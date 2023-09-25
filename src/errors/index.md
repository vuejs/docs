<script setup>
import { data } from '../../.vitepress/errors.data.ts'
const hash = location.hash.slice(1)
</script>

# Error Reference {#error-reference}

<table>
  <thead>
    <tr>
      <th>Code</th>
      <th>Message</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(msg, code) of data.errorMessages" :class="{ highlight: hash === String(code) }">
      <td :id="code" v-text="code" />
      <td v-text="msg" />
    </tr>
  </tbody>
</table>

<style scoped>
.highlight {
  color: var(--vt-c-yellow-darker);
  font-weight: bold;
}
</style>
