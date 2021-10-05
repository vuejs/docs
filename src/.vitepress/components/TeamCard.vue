<script setup>
import { computed, defineProps } from 'vue'
import { VTIconGitHub, VTIconTwitter } from '@vue/theme'

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
      <p>
        {{ profile.title }}
        <span v-if="profile.company">@ {{ profile.company }}</span>
      </p>
      <address>{{ profile.location.label }}</address>
      <ul>
        <li v-for="language in profile.languageList">
          {{ language }}
        </li>
      </ul>
      <a :href="profile.website.url">{{ profile.website.label }}</a>
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
