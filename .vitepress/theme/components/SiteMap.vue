<script setup lang="ts">
import { VTLink } from '@vue/theme'
import { useData } from 'vitepress'

const data = useData()
const nav = data.site.value.themeConfig.nav
const ecosystem = nav.find((i: any) => i.activeMatch?.includes('ecosystem'))
const items = nav
  .filter((i: any) => i !== ecosystem && i.items)
  .concat(ecosystem.items)
</script>

<template>
  <section id="sitemap">
    <div class="container">
      <div class="sitemap-col" v-for="col in items">
        <h4>{{ col.text }}</h4>
        <ul>
          <li v-for="row in col.items">
            <VTLink :href="row.link">{{ row.text }}</VTLink>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style>
#sitemap {
  background: var(--vt-c-bg-soft);
}

#sitemap .container {
  max-width: 900px;
  margin: 0 auto;
  columns: 1;
  padding: 24px 32px;
}

@media (min-width: 768px) {
  #sitemap .container {
    columns: 2;
  }
}

@media (min-width: 1024px) {
  #sitemap .container {
    columns: 3;
  }
}

#sitemap h4 {
  font-weight: 500;
  color: var(--vt-c-text-1);
  margin-bottom: 0.25em;
}

.sitemap-col {
  margin-bottom: 2em;
  break-inside: avoid;
}

#sitemap .vt-link {
  font-size: 0.9em;
  color: var(--vt-c-text-2);
}
</style>
