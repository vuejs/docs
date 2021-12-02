<script setup lang="ts">
import apiIndex from './index.json'
import { ref, computed } from 'vue'

const query = ref('')

const filtered = computed(() => {
  const q = query.value.toLowerCase()
  return apiIndex
    .map((section) => {
      if (section.text.toLowerCase().includes(q)) {
        return section
      }
      const items = section.items
        .map((item) => {
          if (item.text.toLowerCase().includes(q)) {
            return item
          }
          const headers = item.headers.filter((h) => {
            return h.toLowerCase().includes(q)
          })
          return headers.length
            ? { text: item.text, link: item.link, headers }
            : null
        })
        .filter((i) => i)
      return items.length ? { text: section.text, items } : null
    })
    .filter((i) => i)
})

// same as vitepress' slugify logic
function slugify(text) {
  return (
    text
      // Replace special characters
      .replace(/[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g, '-')
      // Remove continuous separators
      .replace(/\-{2,}/g, '-')
      // Remove prefixing and trailing separators
      .replace(/^\-+|\-+$/g, '')
      // ensure it doesn't start with a number (#121)
      .replace(/^(\d)/, '_$1')
      // lowercase
      .toLowerCase()
  )
}
</script>

<template>
  <div id="api-index">
    <div class="header">
      <h1>API Reference</h1>
      <input class="api-filter" placeholder="Filter" v-model="query" />
    </div>

    <div v-for="section of filtered" class="api-section">
      <h2>{{ section.text }}</h2>
      <div class="api-groups">
        <div v-for="item of section.items" class="api-group">
          <h3>{{ item.text }}</h3>
          <ul>
            <li v-for="h of item.headers">
              <a :href="item.link + '.html#' + slugify(h)">{{ h }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="!filtered.length" class="no-match">
      No API matching "{{ query }}" found.
    </div>
  </div>
</template>

<style scoped>
#api-index {
  max-width: 1024px;
  margin: 0px auto;
  padding: 64px 32px;
}

h1,
h2,
h3 {
  font-weight: 600;
  line-height: 1;
}

h1,
h2 {
  letter-spacing: -0.02em;
}

h1 {
  font-size: 38px;
}

h2 {
  font-size: 24px;
  color: var(--vt-c-text-1);
  margin: 36px 0;
  transition: color 0.5s;
  padding-top: 36px;
  border-top: 1px solid var(--vt-c-divider-light);
}

h3 {
  letter-spacing: -0.01em;
  color: var(--vt-c-green);
  font-size: 18px;
  margin-bottom: 1em;
  transition: color 0.5s;
}

.api-section {
  margin-bottom: 64px;
}

.api-groups a {
  font-size: 15px;
  font-weight: 500;
  line-height: 2;
  color: var(--vt-c-text-code);
  transition: color 0.5s;
}

.dark api-groups a {
  font-weight: 400;
}

.api-groups a:hover {
  color: var(--vt-c-green);
  transition: none;
}

.api-group {
  break-inside: avoid;
  margin-bottom: 20px;
  background-color: var(--vt-c-bg-soft);
  border-radius: 8px;
  padding: 28px 32px;
  transition: background-color 0.5s;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.api-filter {
  border: 1px solid var(--vt-c-divider);
  border-radius: 8px;
  padding: 6px 12px;
}

.api-filter:focus {
  border-color: var(--vt-c-green-light);
}

.no-match {
  font-size: 1.2em;
  color: var(--vt-c-text-3);
  text-align: center;
  margin-top: 36px;
  padding-top: 36px;
  border-top: 1px solid var(--vt-c-divider-light);
}

@media (max-width: 768px) {
  #api-index {
    padding: 42px 24px;
  }
  h1 {
    font-size: 32px;
    margin-bottom: 24px;
  }
  h2 {
    font-size: 22px;
    margin: 42px 0 32px;
    padding-top: 32px;
  }
  .api-groups a {
    font-size: 14px;
  }
  .header {
    display: block;
  }
}

@media (min-width: 768px) {
  .api-groups {
    columns: 2;
  }
}

@media (min-width: 1024px) {
  .api-groups {
    columns: 3;
  }
}
</style>
