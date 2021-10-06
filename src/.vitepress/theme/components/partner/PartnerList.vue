<script setup lang="ts">
import partners from './partners.json'
import PartnerListItem from './PartnerListItem.vue'
</script>

<template>
  <div class="PartnerList">
    <div v-for="partner in partners" :key="partner.name" class="item">
      <PartnerListItem :partner="partner" />
    </div>
  </div>
</template>

<style scoped>
.item + .item {
  padding-top: 16px;
}
</style>
