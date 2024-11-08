<script setup lang="ts">
import { computed } from 'vue'
import partnerConfig from '../partnerConfig.js'
import { DeveloperProfile } from './type'
import { generateUTMUrl } from './utils'
import { VTIconChevronLeft, VTIconMapPin } from '@vue/theme'
import DeveloperImage from './DeveloperImage.vue'
import DeveloperCompensations from './DeveloperCompensations.vue'
import DeveloperProficiencies from './DeveloperProficiencies.vue'
import DeveloperProfileDiagram from './DeveloperProfileDiagram.vue'
import DeveloperExperiences from './DeveloperExperiences.vue'
import DeveloperEducation from './DeveloperEducation.vue'
import DeveloperPageFooter from './DeveloperPageFooter.vue'
import { useRoute } from 'vitepress'

const props = defineProps<{
  developer: DeveloperProfile
}>()

const { id, name, location, description, compensations, proficiencies, experiences, education } = props.developer

const profileImage = `/vue/developers/${id}.jpg`

const route = useRoute()
const hireUsLink = computed(() => generateUTMUrl(partnerConfig.hireUsButtonUrl, route.path))
</script>

<template>
  <div class="developer-page">
    <div class="developer-page__back">
      <a href="./index.html">
        <VTIconChevronLeft class="developer-page__icon" />
        All Vue.js certified developers
      </a>
    </div>

    <div class="developer-page__content">
      <div v-if="profileImage" class="developer-page__profile-image">
        <DeveloperImage
          :src="profileImage"
          :alt="name"
          :width="592"
          :height="680"
        />
      </div>

      <div class="developer-page__main">
        <div class="developer-page__main-info">
          <h2 v-if="name" class="developer-page__name">{{ name }}</h2>
          <a v-if="hireUsLink" class="accent-button developer-page__main-action" :href="hireUsLink" target="_blank">
            Get in contact
          </a>

          <p v-if="location" class="developer-page__location">
            <VTIconMapPin class="developer-page__icon" />
            {{ location }}
          </p>

          <div v-if="description" class="developer-page__description">
            <p v-for="(desc, key) in description" :key="`p-desc-${key}`">{{ desc }}</p>
          </div>
        </div>

        <DeveloperCompensations
          v-if="compensations"
          class="developer-page__text-section"
          title="Compensation"
          :compensations="compensations"
          :showDetails="true"
        />

        <DeveloperProficiencies
          v-if="proficiencies"
          class="developer-page__text-section"
          title="Proficiencies"
          :proficiencies="proficiencies"
        />

        <DeveloperProfileDiagram
          v-if="partnerConfig?.profileDiagram"
          :developerId="id"
          diagramType="profile"
          :title="partnerConfig.profileDiagram.title"
          :prependText="partnerConfig.profileDiagram.prependText"
          class="developer-page__text-section"
        />

        <DeveloperProfileDiagram
          v-if="partnerConfig?.scoreDiagram"
          :developerId="id"
          diagramType="score"
          :title="partnerConfig.scoreDiagram.title"
          :prependText="partnerConfig.scoreDiagram.prependText"
          :appendText="partnerConfig.scoreDiagram.appendText"
          class="developer-page__text-section"
        />

        <DeveloperExperiences
          v-if="experiences"
          class="developer-page__text-section"
          title="Selected experience"
          :experiences="experiences"
        />

        <DeveloperEducation
          v-if="education"
          class="developer-page__text-section"
          title="Education"
          :education="education"
        />
      </div>

      <DeveloperPageFooter class="developer-page__footer" />
    </div>
  </div>
</template>

<style scoped>
.developer-page {
  color: var(--vt-c-text-2);
  width: 100%;
  max-width: 1080px;
  padding: 0 28px;
  margin: 0 auto;
}

.developer-page__back {
  display: block;
  font-size: 0.9em;
  font-weight: 600;
  margin: 24px 0 96px;
}

.developer-page__back a {
  color: var(--vt-c-text-3);
  transition: color 0.5s;
}

.developer-page__back a:hover {
  color: var(--vt-c-text-2);
}

.developer-page__icon {
  width: 22px;
  height: 22px;
  display: inline-block;
  fill: var(--vt-c-text-3);
  position: relative;
  top: -1px;
  margin-right: 4px;
}

.developer-page__profile-image {
  grid-area: image;
  width: 100%;
  max-height: 400px;
  overflow: hidden;
  margin-bottom: 24px;
}

.developer-page__profile-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: top;
}

.developer-page__main-info {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto auto;
  gap: 10px;
  align-items: center;
}

.developer-page__text-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  padding: 24px 0;
  border-top: 1px solid var(--vt-c-divider-light);
}

.developer-page__text-section h4,
.developer-page__text-section :deep(h4) {
  color: var(--vt-c-text-1);
  font-size: 18px;
  font-weight: 600;
}

.developer-page__name {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  color: var(--vt-c-text-1);
  font-size: 32px;
  line-height: 100%;
}

.developer-page__location {
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  font-size: 14px;
  margin-bottom: 14px;
}

.developer-page__description {
  grid-column: 1 / 3;
  grid-row: 3 / 4;
  font-size: 16px;
  margin-bottom: 14px;
}

.developer-page__description p {
  margin-bottom: 24px;
}

.developer-page__description p:last-child {
  margin-bottom: 0;
}

.developer-page__main-action {
  grid-column: 1 / 2;
  grid-row: 4 / 5;
  justify-self: flex-start;
  margin-bottom: 40px;
}

.developer-page__location svg {
  width: 20px;
  height: 20px;
  display: inline-block;
  opacity: 0.5;
  position: relative;
  top: -1px;
  left: -2px;
  fill: var(--vt-c-text-2);
}

.accent-button,
:deep(.accent-button) {
  display: block;
  width: fit-content;
  max-width: 100%;
  text-align: center;
  background-color: var(--vt-c-brand);
  color: var(--vt-c-bg);
  padding: 12px 24px;
  font-size: 13.6px;
  line-height: 24px;
  font-weight: 600;
  border-radius: 6px;
  transition: background-color 0.5s, color 0.5s;
}

.accent-button:hover,
:deep(.accent-button):hover {
  background-color: var(--vt-c-brand-dark);
}

@media (min-width: 512px) {
  .developer-page__profile-image {
    max-height: 500px;
  }
}

@media (min-width: 768px) {
  .developer-page {
    padding: 0 28px 64px;
  }

  .developer-page__content {
    display: grid;
    grid-template-columns: 1fr 213px;
    grid-template-rows: auto 1fr;
    align-items: start;
    column-gap: 40px;
  }

  .developer-page__main {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    height: 100%;
  }

  .developer-page__profile-image {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    margin-bottom: 32px;
  }

  .developer-page__footer {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }

  .developer-page__main-info {
    grid-template-columns: 1fr max-content;
    grid-template-rows: auto auto auto;
  }

  .developer-page__main-action {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    justify-self: flex-end;
    margin-bottom: 0;
  }

  .developer-page__description {
    margin-bottom: 40px;
  }

  .developer-page__location {
    margin-bottom: 0;
  }


  .developer-page__text-section {
    padding: 40px 0;
  }
}

@media (min-width: 1440px) {
  .developer-page__content {
    grid-template-columns: 1fr 306px;
    column-gap: 76px;
  }

  .developer-page__name {
    font-size: 40px;
  }
}

@media (max-width: 768px) {
  .developer-page__back {
    margin-bottom: 48px;
  }
}
</style>
