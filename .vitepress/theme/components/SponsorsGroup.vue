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

const { tier, placement = 'aside' } = defineProps<{
  tier: keyof Data
  placement?: 'aside' | 'page' | 'landing'
}>()

onMounted(async () => {
  if (!data) {
    data = await (await fetch(`${base}/data.json`)).json()
  }
})
</script>

<template>
  <div v-if="data" class="sponsor-container" :class="[tier, placement]">
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

/* aside mode (on content pages) */
.sponsor-container.aside {
  justify-content: space-between;
}
.aside .sponsor-item {
  margin: 1px;
  background-color: var(--vt-c-bg-soft);
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 4px;
  transition: background-color .2s ease;
}
.aside .sponsor-item img {
  transition: filter .2s ease;
}
.dark .aside .sponsor-item img {
  filter: grayscale(1) invert(1);
}
.dark .aside .sponsor-item:hover {
  background-color: var(--vt-c-white-soft);
}
.dark .aside .sponsor-item:hover img {
  filter: none;
}
.aside .special .sponsor-item {
  width: 100%;
  height: 60px;
}
.aside .special .sponsor-item img {
  width: 120px;
}

.aside .platinum .sponsor-item {
  width: 110px;
  height: 50px;
}
.aside .platinum .sponsor-item img,
.aside .platinum_china .sponsor-item img {
  max-width: 88px;
}

/* narrow, aside will be hidden under this state so it's mutually exclusive */
@media (max-width: 720px) {
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
