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
    <img :src="`../../about/images/${imageFileName}`" :alt="imageAlt" />
    <p>{{ imageFileName }}</p>
    <h3>{{ profile.name }}</h3>
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
    <pre>{{ profile }}</pre>
  </div>
</template>

<style></style>
