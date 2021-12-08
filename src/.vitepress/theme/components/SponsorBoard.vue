<script setup lang="ts">
import { Sponsor } from '../data/Sponsor'

defineProps<{
  sponsors: Sponsor[]
}>()
</script>

<template>
  <div class="SponsorBoard">
    <div v-for="sponsor in sponsors" :key="sponsor.name" class="item">
      <a class="link" :href="sponsor.url" target="_blank">
        <img class="image" :src="`/images/sponsors/${sponsor.img}`" :alt="sponsor.name">
      </a>
    </div>
  </div>
</template>

<style scoped>
</style>
