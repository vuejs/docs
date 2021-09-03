---
sidebar: false
page: true
---

<script setup>
import apiIndex from './index.json'

// same as vitepress' slugify logic
function slugify(text) {
  return text
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
}
</script>

<div id="api-index">
  <h1>API Reference</h1>

  <div v-for="section of apiIndex" class="api-section">
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
</div>

<style scoped>
@import '../.vitepress/theme/styles/api-index.css'
</style>
