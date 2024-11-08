<script setup lang="ts">
import { computed } from 'vue'
import PageHero from '@theme/components/PageHero.vue'
import partnerConfig from '../partnerConfig.js'
import { useRoute } from 'vitepress'
import { generateUTMUrl } from './utils'

defineProps<{ title?: string }>()

const route = useRoute()
const applyLink = computed(() => generateUTMUrl(partnerConfig.pageHeroBanner.applyButton.url, route.path))
</script>

<template>
  <PageHero>
    <template #title>{{ title || partnerConfig.pageHeroBanner.title }}</template>
    <template #lead>
      {{ partnerConfig.pageHeroBanner.description }}
      <br />
      <a v-if="applyLink" class="link" :href="applyLink"
         target="_blank">{{ partnerConfig.pageHeroBanner.applyButton.label }}</a>.
    </template>
  </PageHero>
</template>
