<script setup lang="ts">
import PageHero from '@theme/components/PageHero.vue'

defineProps<{ title?: string }>()
</script>

<template>
  <PageHero>
    <template #title>{{ title || 'Vue Partners' }}</template>
    <template #lead>
      <p>
        Vue Partners are Vue-team endorsed agencies that provide first-class
        Vue consulting and development services. If your company is
        interested in being listed as a partner, please
        <a class="link" href="https://airtable.com/shrCQhat57SApJI2l" target="_blank"
          >register your interest here</a
        >.
      </p>
    </template>
  </PageHero>
</template>
