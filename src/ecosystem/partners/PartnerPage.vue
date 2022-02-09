<script setup lang="ts">
import { VTLink } from '@vue/theme'
import PartnerHero from './PartnerHero.vue'
import PartnerList from './PartnerList.vue'
</script>

<template>
  <div class="PartnerPage">
    <PartnerHero>
      <template #title>Vue Partners</template>
      <template #lead>Vue Partners are premium shops that provide first-class Vue consulting and development. If your company is interested in being listed as a partner, please <VTLink href="https://airtable.com/shrCQhat57SApJI2l" no-icon>register your interest here</VTLink>.</template>
    </PartnerHero>

    <PartnerList />
  </div>
</template>

<style scoped>
.PartnerPage {
  padding-bottom: 16px;
}
</style>
