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
  margin: 64px 0 36px;
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

@media (max-width: 768px) {
  #api-index {
    padding: 42px 24px;
  }
  h1 {
    font-size: 32px;
  }
  h2 {
    font-size: 22px;
    margin: 42px 0 32px;
    padding-top: 32px;
  }
  .api-groups a {
    font-size: 14px;
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
