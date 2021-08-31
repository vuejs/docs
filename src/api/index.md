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
  <div class="vt-box-container">
    <div class="vt-box api-group" v-for="section of site.themeConfig.sidebar['/api/']">
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

.api-group {
  margin-bottom: 20px;
}

.api-group a {
  font-size: 15px;
}

.api-group h3 {
  margin-top: 0;
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
</style>
