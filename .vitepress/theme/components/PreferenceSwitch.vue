<script setup lang="ts">
import { VTSwitch, VTIconChevronDown } from '@vue/theme'
import { useRoute } from 'vitepress'
import { inject, Ref } from 'vue'
import {
  preferCompositionKey,
  preferComposition,
  preferSFCKey,
  preferSFC
} from './preferences'

const route = useRoute()
const show = $computed(() =>
  /^\/(guide|tutorial|examples)\//.test(route.path)
)
const showSFC = $computed(() => !/^\/guide/.test(route.path))

let isOpen = $ref(true)

const toggleOpen = () => {
  isOpen = !isOpen
}

const removeOutline = (e: Event) => {
  ;(e.target as HTMLElement).classList.add('no-outline')
}

const restoreOutline = (e: Event) => {
  ;(e.target as HTMLElement).classList.remove('no-outline')
}

const toggleCompositionAPI = useToggleFn(
  preferCompositionKey,
  preferComposition,
  'prefer-composition'
)
const toggleSFC = useToggleFn(preferSFCKey, preferSFC, 'prefer-sfc')
const closeSideBar = inject('close-sidebar') as () => void

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
      aria-label="preference switches toggle"
      aria-controls="preference-switches"
      :aria-expanded="isOpen"
      @click="toggleOpen"
      @mousedown="removeOutline"
      @blur="restoreOutline"
    >
      <span>API Preference</span>
      <VTIconChevronDown class="vt-link-icon" :class="{ open: isOpen }" />
    </button>
    <div id="preference-switches" :hidden="!isOpen" :aria-hidden="!isOpen">
      <div class="switch-container">
        <label class="options-label" @click="toggleCompositionAPI(false)"
          >Options</label
        >
        <VTSwitch
          class="api-switch"
          aria-label="prefer composition api"
          :aria-checked="preferComposition"
          @click="toggleCompositionAPI()"
        />
        <label
          class="composition-label"
          @click="toggleCompositionAPI(true)"
          >Composition</label
        >
        <a
          class="switch-link"
          title="About API preference"
          href="/guide/introduction.html#api-styles"
          @click="closeSideBar"
          >?</a
        >
      </div>
      <div class="switch-container" v-if="showSFC">
        <label class="no-sfc-label" @click="toggleSFC(false)">HTML</label>
        <VTSwitch
          class="sfc-switch"
          aria-label="prefer single file component"
          :aria-checked="preferSFC"
          @click="toggleSFC()"
        />
        <label class="sfc-label" @click="toggleSFC(true)">SFC</label>
        <a
          class="switch-link"
          title="About SFC"
          href="/guide/scaling-up/sfc.html"
          @click="closeSideBar"
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
  transition: border-color 0.5s, background-color 0.5s ease;
  margin-bottom: 20px;
  position: sticky;
  top: -0.5px;
  background-color: var(--vt-c-bg);
  padding-top: 10px;
  z-index: 10;
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

.no-outline {
  outline: 0;
}

.vt-link-icon {
  position: relative;
  top: 1px;
}

.vt-link-icon.open {
  transform: rotate(180deg);
}

#preference-switches {
  padding: 12px 16px;
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

.switch-container:nth-child(2) {
  margin-top: 10px;
}

.vt-switch {
  margin-right: 5px;
  transform: scale(0.8);
}

.switch-container label {
  transition: color 0.5s;
  cursor: pointer;
}

.switch-container label:first-child {
  width: 50px;
}

.switch-link {
  margin-left: 8px;
  font-size: 11px;
  min-width: 14px;
  height: 14px;
  line-height: 13px;
  text-align: center;
  color: var(--vt-c-green);
  border: 1px solid var(--vt-c-green);
  border-radius: 50%;
}

@media (max-width: 1439px) {
  #preference-switches {
    font-size: 11px;
    padding: 8px 4px;
  }
  
  .vt-switch {
    margin: auto;
  }
  
  .switch-link {
    margin-left: auto;
  }
  .switch-container label:first-child {
    width: 46px;
  }
}
</style>

<style>
.composition-api,
.sfc {
  display: none;
}

.prefer-composition .options-api,
.prefer-sfc .html {
  display: none;
}

.prefer-composition .composition-api,
.prefer-sfc .sfc {
  display: initial;
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

.tip .options-api,
.tip .composition-api {
  color: var(--vt-c-text-code);
  /* transition: color 0.5s; */
  font-weight: 600;
}
</style>
