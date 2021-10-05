<script setup>
import { computed, defineProps } from 'vue'

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
      <ul>
        <li
          v-for="(handle, platform) in profile.social"
          :key="`${platform}-${handle}`"
        >
          <a :href="`https://www.${platform}.com/${handle}`">
            {{ platform }}: {{ handle }}
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
</style>
