<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { preferComposition, preferCompositionKey } from './preferences'
import { useData } from 'vitepress'

const show = ref(false)
const { page } = useData()

onMounted(() => {
  show.value =
    !page.value.relativePath.startsWith('tutorial/') &&
    localStorage.getItem(preferCompositionKey) === null
})

function dismiss() {
  show.value = false
  localStorage.setItem(
    preferCompositionKey,
    String(preferComposition.value)
  )
}
</script>

<template>
  <Transition name="fly-in">
    <div class="preference-tooltip" v-if="show">
      <p>API style now defaults to Composition API.</p>
      <p>
        Some pages contain different content based on the API style chosen.
        Use this switch to toggle between APIs styles.
      </p>
      <p class="actions">
        <a href="/guide/introduction#api-styles">Learn more</a>
        <button @click="dismiss">Got it</button>
      </p>
      <div class="arrow-top"></div>
      <div class="arrow-top inner"></div>
    </div>
  </Transition>
</template>

<style scoped>
.preference-tooltip {
  font-weight: 500;
  line-height: 1.6;
  position: absolute;
  padding: 12px 20px 12px 36px;
  width: 100%;
  background-color: var(--vt-c-bg-soft);
  top: 7.5em;
  border: 1px solid var(--vt-c-green);
  border-radius: 8px;
  box-shadow: var(--vt-shadow-3);
  z-index: 10;
}

.preference-tooltip:before {
  content: 'ⓘ';
  position: absolute;
  font-weight: 600;
  font-size: 14px;
  top: 9px;
  left: 13px;
}

.dark .preference-tooltip {
  box-shadow: var(--vt-shadow-1);
}

p {
  margin-bottom: 8px;
}

.arrow-top {
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom: 9px solid var(--vt-c-green);
  position: absolute;
  top: -16px;
  left: 130px;
}

.arrow-top.inner {
  border-bottom-color: var(--vt-c-bg-soft);
  top: -14px;
}

.actions {
  text-align: right;
  margin-top: 14px;
  margin-bottom: 0;
}

a {
  color: var(--vt-c-green);
  text-decoration: underline;
  margin-right: 1.5em;
}

button {
  color: var(--vt-c-bg-soft);
  font-weight: 500;
  box-shadow: var(--vt-shadow-2);
  padding: 2px 8px;
  border-radius: 6px;
  background-color: var(--vt-c-green);
}

@media (max-width: 1439px) {
  .arrow-top {
    left: 136px;
  }
}

.fly-in-enter-active {
  transition: all 0.2s ease-out;
}

.fly-in-leave-active {
  transition: all 0.15s ease-in;
}

.fly-in-enter-from,
.fly-in-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
</style>
