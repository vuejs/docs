<script setup>
import { VTSwitch } from '@vue/theme'

const storageKey = 'vue-docs-api-preference'
const className = 'prefer-composition'

const toggle = typeof localStorage !== 'undefined' ? useAPIToggle() : () => {}

function useAPIToggle() {
  let preferComposition = JSON.parse(localStorage.getItem(storageKey) || 'false')
  const classList = document.documentElement.classList
  return (value = !preferComposition) => {
    if ((preferComposition = value)) {
      classList.add(className)
    } else {
      classList.remove(className)
    }
    localStorage.setItem(storageKey, preferComposition)
  }
}
</script>

<template>
  <p class="api-switch">
    <span class="api-switch-title">
      API<span class="api-switch-pref"> Preference</span>
      <a class="api-switch-link"
        title="About API preference"
        href="/guide/introduction.html#api-styles">?</a>
    </span>
    <div style="float:right">
    <label class="api-switch-label options" @click="toggle(false)"
      >Options</label
    >
    <VTSwitch aria-label="Switch API preference" @click="toggle()" />
    <label class="api-switch-label composition" @click="toggle(true)"
      >Composition</label
    >
  </div>
  </p>
</template>

<style>
h1 + .api-switch {
  margin-top: 64px;
}

.api-switch {
  background-color: var(--vt-c-bg-soft);
  border-radius: 8px;
  padding: 16px 30px;
  transition: background-color 0.5s;
}

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

.api-switch-title {
  color: var(--vt-c-text-2);
}

.api-switch-link {
  display: inline-block;
  margin-left: 6px;
  font-size: 12px;
  width: 17px;
  height: 17px;
  line-height: 15px;
  text-align: center;
  border: 1px solid var(--vt-c-green);
  border-radius: 50%;
}

.api-switch-title,
.api-switch-label,
.api-switch .vt-switch {
  display: inline-block;
  vertical-align: middle;
}

.api-switch .vt-switch {
  margin: 0 12px;
}

.api-switch-title,
.api-switch-label {
  font-weight: 500;
  font-size: 14px;
  transition: opacity 0.5s;
}

.api-switch-label {
  cursor: pointer;
}

.prefer-composition .api-switch-label.options,
.api-switch-label.composition {
  opacity: 0.3;
}

.api-switch-label.options,
.prefer-composition .api-switch-label.composition {
  opacity: 1;
}

@media (max-width: 768px) {
  h1 + .api-switch {
    margin-top: 36px;
  }
  .api-switch {
    padding: 12px 20px;
  }
  .api-switch-title,
  .api-switch-label {
    font-size: 13px;
  }
}

@media (max-width: 420px) {
  .api-switch-pref {
    display: none;
  }
}
</style>
