<script setup lang="ts">
import partners from '../partners.json'
import { computed } from 'vue'
import PartnerCard from './PartnerCard.vue'
import { Partner } from './type'

const { filter } = defineProps<{
  filter?: (p: Partner) => boolean | undefined
}>()

const filtered = computed(() =>
  filter ? (partners as Partner[]).filter(filter) : (partners as Partner[])
)
</script>

<template>
  <div class="PartnerList">
    <PartnerCard v-for="p in filtered" :key="p.name" :data="p" />
  </div>
</template>

<style scoped>
.PartnerList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
