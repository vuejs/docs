<script setup lang="ts">
import { ref } from 'vue'
import PartnerHero from './PartnerHero.vue'
import PartnerList from './PartnerList.vue'
import PartnerJoin from './PartnerJoin.vue'
import { Partner } from './type'
import { VTIconSearch } from '@vue/theme'

const query = ref('')

function filter(p: Partner): boolean {
  return (
    includes(p.name, query.value) ||
    p.region.some((r) => includes(r, query.value))
  )
}

function includes(a: string, b: string) {
  return a.toLowerCase().includes(b.toLowerCase())
}
</script>

<template>
  <PartnerHero title="Browser All Partners" />
  <div class="container">
    <VTIconSearch class="icon" />
    <input
      placeholder="Search partners by name or region"
      v-model="query"
    />
    <PartnerList :filter="filter" />
  </div>
  <PartnerJoin />
</template>

<style scoped>
input {
  width: 100%;
  padding: 8px 12px 8px 32px;
  border-bottom: 1px solid var(--vt-c-divider-light);
  margin-bottom: 2em;
}

.container {
  max-width: 960px;
  margin: 1em auto 2em;
  padding: 0 28px;
  position: relative;
}

.icon {
  width: 18px;
  height: 18px;
  fill: var(--vt-c-text-3);
  position: absolute;
  top: 12px;
  left: 32px;
}
</style>
