<script setup lang="ts">
import { VTSwitch, VTIconChevronDown, VTIconChevronUp } from '@vue/theme'
import { useRoute } from 'vitepress'
import { ref, computed, Ref } from 'vue'
import {
  preferCompositionKey,
  preferComposition,
  preferSFCKey,
  preferSFC
} from './preferences'

const route = useRoute()
const show = computed(() => /^\/(guide|tutorial|examples)\//.test(route.path))
const isOpen = ref(false)

const toggleOpen = () => (isOpen.value = !isOpen.value)
const toggleCompositionAPI = useToggleFn(
  preferCompositionKey,
  preferComposition,
  'prefer-composition'
)
const toggleSFC = useToggleFn(preferSFCKey, preferSFC, 'prefer-sfc')

function useToggleFn(
  storageKey: string,
  state: Ref<boolean>,
  className: string
) {
  if (typeof localStorage === 'undefined') {
    return () => {}
  }
  const classList = document.documentElement.classList
  return (value = !state.value) => {
    if ((state.value = value)) {
      classList.add(className)
    } else {
      classList.remove(className)
    }
    localStorage.setItem(storageKey, String(state.value))
  }
}
</script>

<template>
  <div v-if="show" class="preference-switch">
    <button
      class="toggle"
      role="switch"
      aria-controls="preference-switches"
      :aria-expanded="isOpen"
      @click="toggleOpen"
    >
      <span>API Preference</span>
      <VTIconChevronUp v-if="isOpen" class="vt-link-icon" />
      <VTIconChevronDown v-else class="vt-link-icon" />
    </button>
    <div id="preference-switches" :hidden="!isOpen" :aria-hidden="!isOpen">
      <div class="switch-container">
        <label class="options-label" @click="toggleCompositionAPI(false)"
          >Options</label
        >
        <VTSwitch
          class="api-switch"
          aria-label="Switch API"
          @click="toggleCompositionAPI()"
        />
        <label class="composition-label" @click="toggleCompositionAPI(true)"
          >Composition</label
        >
        <a
          class="switch-link"
          title="About API preference"
          href="/guide/introduction.html#api-styles"
          >?</a
        >
      </div>
      <div class="switch-container">
        <label class="no-sfc-label" @click="toggleSFC(false)">No SFC</label>
        <VTSwitch
          class="sfc-switch"
          aria-label="Switch Single File Component"
          @click="toggleSFC()"
        />
        <label class="sfc-label" @click="toggleSFC(true)">SFC</label>
        <a
          class="switch-link"
          title="About SFC"
          href="/guide/scaling-up/sfc.html"
          >?</a
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.preference-switch {
  font-size: 12px;
  border-bottom: 1px solid var(--vt-c-divider-light);
  transition: border-color 0.5s;
  margin-bottom: 20px;
}

.toggle {
  color: var(--vt-c-text-2);
  transition: color 0.5s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2px;
  width: 100%;
  font-weight: 600;
}

.toggle:hover {
  color: var(--vt-c-text-1);
}

.vt-link-icon {
  position: relative;
  top: 2px;
}

#preference-switches {
  padding: 12px 15px;
  background-color: var(--vt-c-bg-soft);
  transition: background-color 0.5s;
  margin: 6px 0 12px;
  border-radius: 8px;
  font-weight: 600;
}

.switch-container {
  display: flex;
  align-items: center;
}

.switch-container:first-child {
  margin-bottom: 12px;
}

.vt-switch {
  margin-right: 12px;
}

.switch-container label {
  transition: color 0.5s;
  cursor: pointer;
}

.switch-container label:first-child {
  width: 56px;
}

.switch-link {
  margin-left: 8px;
  font-size: 11px;
  width: 14px;
  height: 14px;
  line-height: 13px;
  text-align: center;
  color: var(--vt-c-green);
  border: 1px solid var(--vt-c-green);
  border-radius: 50%;
}
</style>

<style>
.composition-api {
  display: none;
}

.prefer-composition .options-api {
  display: none;
}

.prefer-composition .composition-api {
  display: block;
}

.prefer-composition .api-switch .vt-switch-check {
  transform: translateX(18px);
}

.composition-label,
.sfc-label,
.prefer-composition .options-label,
.prefer-sfc .no-sfc-label {
  color: var(--vt-c-text-3);
}

.prefer-composition .composition-label,
.prefer-sfc .sfc-label {
  color: var(--vt-c-text-1);
}

.prefer-sfc .sfc-switch .vt-switch-check {
  transform: translateX(18px);
}
</style>
