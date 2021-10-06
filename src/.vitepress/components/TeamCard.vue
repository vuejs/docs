<script setup>
import { computed, defineProps } from 'vue'
import { VTIconGitHub, VTIconTwitter } from '@vue/theme'
import IconCode from './IconCode.vue'
import IconGlobe from './IconGlobe.vue'
import IconLink from './IconLink.vue'
import IconLocation from './IconLocation.vue'

const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
})

const imageFileName = computed(() => {
  return props.profile.name.toLowerCase().split(' ').join('-') + '.jpeg'
})

const imageAlt = computed(() => {
  return `${props.profile.name}'s Profile Picture`
})
</script>

<template>
  <div class="team-card">
    <img
      :src="`../../about/images/${imageFileName}`"
      :alt="imageAlt"
      class="member-profile-image"
    />
    <section>
      <h3 class="member-name">{{ profile.name }}</h3>
      <p class="member-headline">
        {{ profile.title }}
        <span v-if="profile.company">@ {{ profile.company }}</span>
      </p>
      <div class="member-details">
        <section
          v-if="profile.projectList.length > 0"
          class="member-detail-section"
        >
          <IconCode class="member-detail-icon" />
          <h4 class="sr-only">Projects</h4>
          <ul class="member-language-list">
            <li
              v-for="project in profile.projectList"
              :key="`${profile.name}-project-${project}`"
              class="member-language"
            >
              <a :href="project.url">{{ project.label }}</a>
            </li>
          </ul>
        </section>
        <section v-if="profile.location.label" class="member-detail-section">
          <IconLocation class="member-detail-icon" />
          <h4 class="sr-only">Location</h4>
          <address class="member-location">
            {{ profile.location.label }}
          </address>
        </section>
        <section
          v-if="profile.languageList.length > 0"
          class="member-detail-section"
        >
          <IconGlobe class="member-detail-icon" />
          <h4 class="sr-only">Languages</h4>
          <ul class="member-language-list">
            <li
              v-for="language in profile.languageList"
              :key="`${profile.name}-language-${language}`"
              class="member-language"
            >
              {{ language }}
            </li>
          </ul>
        </section>
        <section v-if="profile.website.url" class="member-detail-section">
          <IconLink class="member-detail-icon" />
          <h4 class="sr-only">Website</h4>
          <a :href="profile.website.url">{{ profile.website.label }}</a>
        </section>
      </div>
      <ul class="member-social-list">
        <li
          v-for="(handle, platform) in profile.social"
          :key="`${platform}-${handle}`"
          class="member-social-item"
        >
          <a :href="`https://www.${platform}.com/${handle}`">
            <VTIconGitHub
              v-if="platform === 'github'"
              class="member-social-icon"
            />
            <VTIconTwitter
              v-else-if="platform === 'twitter'"
              class="member-social-icon"
            />
            <span v-else> {{ platform }}: {{ handle }} </span>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.team-card {
  --grid-column: 32px;
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-column-gap: var(--grid-column);
  margin-bottom: calc(var(--grid-column) / 2);
  padding: var(--grid-column);
  border-radius: 8px;
  background-color: #f8f8f8;
}

.team-card .member-name {
  margin: 0;
}

.member-details {
  display: grid;
  grid-row-gap: 4px;
  margin: 16px 0 20px;
  font-weight: 500;
}

.member-detail-icon {
  margin-right: 10px;
}

.member-detail-section {
  display: flex;
  align-items: center;
}

.member-headline {
  margin-bottom: 0;
}

.member-language {
  margin-right: 34px;
}

.member-language:first-child:before {
  display: none;
}

.member-language-list {
  margin: 0;
  padding: 0;
  display: flex;
}

.member-location {
  font-style: normal;
}

.member-profile-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.member-social-icon {
  width: 24px;
  height: 24px;
  fill: rgba(60, 60, 60, 0.6);
  margin-right: 14px;
}

.member-social-item:before {
  /* Override list bullet which exists in
  .vt-doc ul > li:before */
  display: none;
}

.member-social-list {
  padding: 0;
  display: flex;
}
</style>
