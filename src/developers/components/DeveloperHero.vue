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
        {{ partnerConfig.pageHeroBanner.applyButton.label }}
      </a>

      <span class="footer-text">{{ partnerConfig.pageHeroBanner.footer }}</span>
    </template>
  </PageHero>
</template>

<style scoped>
.page-hero {
  max-width: 100%;
}

:deep(.page-hero__title) {
  font-weight: 400;
  font-size: 32px;
  margin-bottom: 0;
}

:deep(.page-hero__lead) {
  padding-top: 0;
}

.accent-button {
  margin: 40px auto 16px;
}

.description {
  margin-top: 24px;
  font-weight: 400;
}

.footer-text {
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: 700;
}

/* Media Queries */
@media (min-width: 768px) {
  .page-hero {
    padding: 48px 128px;
  }

  .accent-button {
    margin-top: 48px;
  }
}

@media (min-width: 1024px) {
  .page-hero {
    max-width: 846px;
    padding: 96px 0;
  }

  .description {
    margin-top: 32px;
  }
}
</style>
