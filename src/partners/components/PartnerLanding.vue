<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PartnerHero from './PartnerHero.vue'
import PartnerCard from './PartnerCard.vue'
import PartnerList from './PartnerList.vue'
import PartnerJoin from './PartnerJoin.vue'
import PageShowcaseListLayout from '@theme/components/PageShowcaseListLayout.vue'
import data from '../partners.json'
import { Partner } from './type'

const spotlighted = ref<Partner | null>(null)

onMounted(() => {
  const plat = (data as Partner[]).filter((d) => d.platinum)
  spotlighted.value = plat[Math.floor(Math.random() * plat.length)]
})
</script>

<template>
  <PageShowcaseListLayout
    spotlightTitle="Partner Spotlight"
    featuredTitle="Featured Partners"
    browseLinkText="Browse All Partners"
    browseLinkUrl="./all.html"
  >
    <template #hero>
      <PartnerHero />
    </template>

    <template #spotlight>
      <PartnerCard v-if="spotlighted" hero :data="spotlighted" />
    </template>

    <template #featured-list>
      <PartnerList :filter="(p) => p.platinum" showLinkToAll />
    </template>

    <template #join>
      <PartnerJoin />
    </template>
  </PageShowcaseListLayout>
</template>
