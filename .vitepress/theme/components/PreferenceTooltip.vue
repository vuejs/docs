<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import {
  inBrowser,
  preferComposition,
  preferCompositionKey
} from './preferences'
import { useData, type Header } from 'vitepress'

const show = ref(false)
const { page } = useData()

type Source = 'url-query' | 'url-header' | 'default'
let source: Source | false =
  inBrowser && localStorage.getItem(preferCompositionKey) === null
    ? 'default'
    : false

if (inBrowser) {
  // 1. check if URL contains explicit preference
  const match = location.search.match(/[\?&]api=(\w+)/)
  const preference = match && match[1]
  if (preference === 'composition') {
    setPreference(true, 'url-query')
  } else if (preference === 'options') {
    setPreference(false, 'url-query')
  } else {
    // 2. check if target header only exists for a certain API
    if (location.hash) {
      const h = findHeader(page.value.headers, location.hash)
      if (h && h.optionsOnly) {
        setPreference(false, 'url-header')
      } else if (h && h.compositionOnly) {
        setPreference(true, 'url-header')
      }
    }
  }
}

function findHeader(
  headers: Header[],
  link: string
):
  | (Header & {
      optionsOnly?: boolean
      compositionOnly?: boolean
    })
  | undefined {
  for (const h of headers) {
    if (h.link === link) {
      return h
    }
    if (h.children) {
      const c = findHeader(h.children, link)
      if (c) return c
    }
  }
}

function setPreference(capi: boolean, s: Source) {
  if (capi && !preferComposition.value) {
    source = s
    preferComposition.value = true
    document.documentElement.classList.add('prefer-composition')
  } else if (!capi && preferComposition.value) {
    source = s
    preferComposition.value = false
    document.documentElement.classList.remove('prefer-composition')
  }
}

onMounted(() => {
  if (
    !page.value.relativePath.startsWith('tutorial/') &&
    source !== false
  ) {
    show.value = true
    // dismiss if user switches with the tooltip open
    const stop = watch(preferComposition, () => {
      show.value = false
      stop()
    })
  }
})

function dismiss() {
  show.value = false
  // save if default
  if (source === 'default') {
    localStorage.setItem(
      preferCompositionKey,
      String(preferComposition.value)
    )
  }
}
</script>

<template>
  <Transition name="fly-in">
    <div class="preference-tooltip" v-if="show">
      <template v-if="source === 'default'">
        <p>API style now defaults to Composition API.</p>
        <p>
          Some pages contain different content based on the API style
          chosen. Use this switch to toggle between APIs styles.
        </p>
      </template>
      <template v-if="source && source.startsWith('url')">
        <p>
          Showing content for
          {{ preferComposition ? 'Composition' : 'Options' }} API because
          {{
            source === 'url-query'
              ? 'it is specified by the URL query.'
              : 'the target section is only available for that API.'
          }}
        </p>
        <p>
          This is different from your saved preference and will only affect
          the current browsing session.
        </p>
      </template>
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
  left: 18px;
}

.prefer-composition .arrow-top {
  left: 130px;
}

@media (max-width: 1439px) {
  .arrow-top {
    left: 16px;
  }
  .prefer-composition .arrow-top {
    left: 136px;
  }
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
