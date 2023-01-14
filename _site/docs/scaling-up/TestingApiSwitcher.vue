<script setup lang="ts">
import { ref } from 'vue'
const activeId = ref('vtu-api')

const testingLangs = [
  {
    label: 'Vue Test Utils',
    className: 'vtu-api'
  },
  {
    label: 'Cypress',
    className: 'cypress-api'
  },
  {
    label: 'Testing Library',
    className: 'testing-library-api'
  }
]
</script>

<template>
  <div class="testing-code-examples" :class="`prefers-${activeId}`">
    <div class="tabs">
      <div
        v-for="lang in testingLangs"
        :key="lang.className"
        class="tab"
        :class="{ active: lang.className === activeId }"
        @click="activeId = lang.className"
      >{{ lang.label }}</div>
    </div>
    <div class="code-example">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* TODO: Replace with a VTCodeGroup when available */
/* Layout */
.code-examples {
  display: flex;
  flex-direction: column;
}

.code-example :slotted([class*='language']) {
  margin-top: 0;
  border-top-left-radius: 0;
}

/* Tab Styles */
.tabs {
  display: flex;
}

.tab {
  color: white;
  background: #292d3ef0;
  border-bottom-color: rgba(255, 255, 255, 0.3);
  padding: 6px 24px;
  border-width: 2px;
  border-style: solid;
  border-top: transparent;
  border-right: transparent;
  border-left: transparent;
  cursor: pointer;
  transition: border 0.2s, background-color 0.2s;
}

.tab.active {
  background: #292d3e;
  border-bottom: 2px solid var(--vt-c-brand);
}

.tab:first-child {
  border-top-left-radius: 8px;
}

.tab:last-child {
  border-top-right-radius: 8px;
}

/* When the sm media query hits, make sure the
  tabs line up with the negative margins of the
  code blocks. Should also remove the border radius.
*/
@media screen and (max-width: 639px) {
  .tabs {
    margin: 0 -24px;
  }

  .tab, .tab:first-child, .tab:last-child {
    flex-grow: 1;
    text-align: center;
    border-radius: 0;
  }
}

:global(.dark .testing-code-examples .tab:not(.active)) {
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  background: #2f2f2f;
  color: inherit;
}

:global(.dark .testing-code-examples .tab.active) {
  background: var(--vt-c-black-soft);
}

/* Show/Hide logic for codeblocks */
:slotted([class$='api']) {
  display: none;
}

.prefers-cypress-api :slotted(.cypress-api),
.prefers-testing-library-api :slotted(.testing-library-api),
.prefers-vtu-api :slotted(.vtu-api) {
  display: block;
}
</style>
