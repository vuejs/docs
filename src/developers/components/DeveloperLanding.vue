<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import data from '../developers.json'
import { DeveloperProfiles, DeveloperProfile } from './type'
import { useRoute } from 'vitepress'
import { generateUTMUrl } from './utils'
import PageShowcaseListLayout from '@theme/components/PageShowcaseListLayout.vue'
import CardList from '@theme/components/CardList.vue'
import DeveloperHero from './DeveloperHero.vue'
import DeveloperCard from './DeveloperCard.vue'
import DeveloperJoin from './DeveloperJoin.vue'
import partnerConfig from '../partnerConfig'

const route = useRoute()
const hireUsLink = computed(() => generateUTMUrl(partnerConfig.hireUsButtonUrl, route.path))

const allDevelopers = ref<DeveloperProfiles>(data as DeveloperProfiles)

const spotlightedProfile = ref<DeveloperProfile | null>(null)
onMounted(() => {
  spotlightedProfile.value = allDevelopers.value.length
    ? allDevelopers.value[Math.floor(Math.random() * allDevelopers.value.length)]
    : null
})
</script>

<template>
  <PageShowcaseListLayout
    spotlightTitle="Spotlight"
    featuredTitle="Vue.js Certified developers"
  >
    <template #hero>
      <DeveloperHero />
    </template>

    <template #spotlight>
      <DeveloperCard v-if="spotlightedProfile" hero :data="spotlightedProfile" />
    </template>

    <template #actions>
      <a
        v-if="hireUsLink"
        :href="hireUsLink"
        target="_blank"
        class="accent-button"
      >
        Contact {{ partnerConfig.partnerName }} for a tailored fit
      </a>
    </template>

    <template #featured-list>
      <CardList
        v-if="allDevelopers?.length"
        :items="allDevelopers"
        :cardComponent="DeveloperCard"
      />
    </template>

    <template #featured-cta>
      <div class="featured-cta">
        <a
          v-if="hireUsLink"
          :href="hireUsLink"
          target="_blank"
          class="accent-button"
        >
          Contact {{ partnerConfig.partnerName }} for a tailored fit
        </a>
      </div>
    </template>

    <template #join>
      <DeveloperJoin />
    </template>
  </PageShowcaseListLayout>
</template>

<style scoped>
/* Action Selection Styles */
:deep(.featured-actions) {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

/* Card title */
:deep(.section-title) {
  margin-bottom: 32px;
}

/* Page CTA */
.featured-cta {
  margin: 1.5rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media (min-width: 768px) {
  /* Action Selection Styles */
  :deep(.showcase-layout__featured) {
    padding: 48px 48px;
    position: relative;
  }

  :deep(.featured-actions) {
    width: auto;
    display: block;
    position: absolute;
    top: 34px;
    right: 48px;
  }
}
</style>
