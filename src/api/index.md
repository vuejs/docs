---
sidebar: false
page: true
---

// TODO render all API items on this page

<script setup>
import { useData } from 'vitepress'

const { site } = useData()
</script>

<div class="vt-doc">
  <h1>API Reference</h1>
  <div class="api-container">
    <div class="api-group" v-for="section of site.themeConfig.sidebar['/api/']">
      <h3>{{ section.text }}</h3>
      <ul>
        <li v-for="item of section.items">
          <a :href="item.link + '.html'">{{ item.text }}</a>
        </li>
      </ul>
    </div>
  </div>
</div>

<style scoped>
.vt-doc {
  padding: 32px;
  max-width: 960px;
  margin: 0 auto;
}

.api-container {
  display: flex;
  flex-wrap: wrap;
}

.api-group {
  background-color: var(--vt-c-bg-soft);
  padding: 28px 36px 12px;
  margin: 0 10px 10px 0;
  border-radius: 8px;
  flex-basis: 100%;
}

.api-group a {
  font-size: 15px;
}

.api-group h3 {
  margin-top: 0;
}


@media (min-width: 640px) {
  .api-group {
    flex-basis: calc(50% - 10px);
  }
}

@media (min-width: 768px) {
  .vt-doc {
    padding-top: 48px;
  }
}

@media (min-width: 960px) {
  .vt-doc {
    padding-top: 64px;
  }
}

@media (min-width: 1280px) {
  .api-group {
    flex-basis: calc(33.3% - 10px);
  }
}
</style>
