<script setup>
import { computed, defineProps } from 'vue'
import { VTIconGitHub, VTIconLinkedIn, VTIconTwitter } from '@vue/theme'
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

const imageAlt = computed(() => {
  return `${props.profile.name}'s Profile Picture`
})
</script>

<template>
  <div class="team-card">
    <img
      v-if="profile.social && profile.social.github"
      :src="`https://www.github.com/${profile.social.github}.png`"
      :alt="imageAlt"
      class="member-profile-image"
    />
    <img
      v-else
      :src="profile.avatarPic"
      :alt="imageAlt"
      class="member-profile-image"
    />
    <section>
      <h3 v-if="profile.name" class="member-name">{{ profile.name }}</h3>
      <p v-if="profile.title" class="member-headline">
        {{ profile.title }}
        <span v-if="profile.company">@ {{ profile.company }}</span>
      </p>
      <div class="member-details">
        <section
          v-if="profile.projectList && profile.projectList.length > 0"
          class="member-detail-section"
        >
          <IconCode class="member-detail-icon" />
          <h4 class="sr-only">Projects</h4>
          <ul class="member-detail-list">
            <li
              v-for="project in profile.projectList"
              :key="`${profile.name}-project-${project}`"
              class="member-detail-item"
            >
              <a :href="project.url">{{ project.label }}</a>
            </li>
          </ul>
        </section>
        <section v-if="profile.city" class="member-detail-section">
          <IconLocation class="member-detail-icon" />
          <h4 class="sr-only">Location</h4>
          <address class="member-location">
            {{ profile.city }}
          </address>
        </section>
        <section
          v-if="profile.languageList && profile.languageList.length > 0"
          class="member-detail-section"
        >
          <IconGlobe class="member-detail-icon" />
          <h4 class="sr-only">Languages</h4>
          <ul class="member-detail-list">
            <li
              v-for="language in profile.languageList"
              :key="`${profile.name}-language-${language}`"
              class="member-detail-item"
            >
              {{ language }}
            </li>
          </ul>
        </section>
        <section
          v-if="profile.website && profile.website.url"
          class="member-detail-section"
        >
          <IconLink class="member-detail-icon" />
          <h4 class="sr-only">Website</h4>
          <a :href="profile.website.url">{{ profile.website.label }}</a>
        </section>
      </div>
      <ul v-if="profile.social" class="member-social-list">
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
            <VTIconLinkedIn
              v-else-if="platform === 'linkedin'"
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
  --card-bg-color: #f8f8f8;
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-column-gap: var(--grid-column);
  margin-bottom: calc(var(--grid-column) / 2);
  padding: var(--grid-column);
  border-radius: 8px;
  background-color: var(--card-bg-color);
}

.dark .team-card {
  --card-bg-color: #222;
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

.dark .member-detail-icon {
  fill: var(--vt-c-text-1);
}

.member-detail-item {
  margin-right: 34px;
}

.member-detail-item:first-child:before {
  display: none;
}

.member-detail-list {
  margin: 0;
  padding: 0;
  display: flex;
}

.member-detail-section {
  display: flex;
  align-items: center;
}

.member-headline {
  margin-bottom: 0;
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
  fill: #3c3c3c;
  margin-right: 14px;
}

.dark .member-social-icon {
  fill: var(--vt-c-text-1);
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
