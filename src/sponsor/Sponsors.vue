<script lang="ts">
let data = $ref<Data>()
const base = `https://sponsors.vuejs.org`
</script>

<script setup lang="ts">
import { onMounted } from 'vue'

interface Sponsor {
  url: string
  img: string
  name: string
}

interface Data {
  special: Sponsor[]
  platinum: Sponsor[]
  platinum_china: Sponsor[]
  gold: Sponsor[]
  silver: Sponsor[]
  bronze: Sponsor[]
}

const { tier } = defineProps<{ tier: keyof Data }>()

onMounted(async () => {
  if (!data) {
    data = await (await fetch(`${base}/data.json`)).json()
  }
})
</script>

<template>
  <div v-if="data" class="sponsor-container" :class="tier">
    <a
      v-for="{ url, img, name } of data[tier]"
      class="sponsor-item"
      :href="url"
      target="_blank"
      rel="sponsored noopener"
    >
      <img loading="lazy" :src="`${base}/images/${img}`" :alt="name" />
    </a>
  </div>
</template>

<style scoped>
.sponsor-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
.sponsor-item {
  padding: 10px;
  margin-bottom: 30px;
}
.special .sponsor-item img {
  max-width: 300px;
  max-height: 150px;
}
.platinum .sponsor-item img,
.platinum_china .sponsor-item img {
  max-width: 200px;
  max-height: 100px;
}
.gold .sponsor-item img {
  max-width: 140px;
  max-height: 70px;
}
.silver .sponsor-item img {
  max-width: 120px;
  max-height: 60px;
}

@media (max-width: 600px) {
  .sponsor-item {
    padding: 6px;
    margin-bottom: 20px;
  }
  .platinum .sponsor-item img,
  .platinum_china .sponsor-item img {
    max-width: 150px;
    max-height: 75px;
  }
  .gold .sponsor-item img,
  .silver .sponsor-item img {
    max-width: 100px;
    max-height: 50px;
  }
}
</style>
