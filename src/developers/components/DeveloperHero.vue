<script setup lang="ts">
import { computed } from 'vue'
import PageHero from '@theme/components/PageHero.vue'
import partnerConfig from '../partnerConfig.js'
import { useRoute } from 'vitepress'
import { generateUTMUrl } from './utils'

defineProps<{ title?: string }>()

const route = useRoute()
const hireUsLink = computed(() => generateUTMUrl(partnerConfig.hireUsButtonUrl, route.path))
</script>

<template>
  <PageHero class="page-hero">
    <template #title>{{ title || partnerConfig.pageHeroBanner.title }}</template>
    <template #lead>
      <p class="description">
        {{ partnerConfig.pageHeroBanner.description1 }}
        <br />
        {{ partnerConfig.pageHeroBanner.description2 }}
        <br />
      </p>

      <a
        v-if="hireUsLink"
        :href="hireUsLink"
        target="_blank"
        class="accent-button"
      >
        {{ partnerConfig.pageHeroBanner.hireButton.label }}
      </a>

      <p class="description">{{ partnerConfig.pageHeroBanner.footer }}</p>
    </template>
  </PageHero>
</template>

<style scoped>
.accent-button {
  margin: 40px auto 16px;
}

br {
  display: none;
}

/* Media Queries */
@media (min-width: 768px) {
  .accent-button {
    margin-top: 48px;
  }
}

@media (min-width: 1024px) {
  .page-hero {
    max-width: 846px;
    padding: 64px 0;
  }

  br {
    display: block;
  }
}
</style>
