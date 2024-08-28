<script setup lang="ts">
import { computed } from 'vue'
import CallToActionSection from '@theme/components/CallToActionSection.vue'
import partnerConfig from '../partnerConfig.js'
import { generateUTMUrl } from './utils'
import { useRoute } from 'vitepress'

const route = useRoute()

const applyLink = computed(() => generateUTMUrl(partnerConfig.pageJoinSection.applyButton.url, route.path))
</script>

<template>
  <CallToActionSection
    v-if="partnerConfig.pageJoinSection.applyButton.label"
    :title="partnerConfig.pageJoinSection.title"
    :description="partnerConfig.pageJoinSection.description"
    :link="applyLink"
    :linkText="partnerConfig.pageJoinSection.applyButton.label"
  />
</template>
