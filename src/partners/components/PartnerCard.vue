<script setup lang="ts">
import { Partner } from './type'
import { normalizeName, getHero, getLogo, track } from './utils'
import Location from './PartnerLocation.vue'

const { data, hero, page } = defineProps<{
  data: Partner
  hero?: boolean
  page?: boolean
}>()

const {
  name,
  intro,
  region,
  logo,
  hero: heroImg,
  proficiencies,
  flipLogo,
  website
} = data
</script>

<template>
  <component
    :is="page ? 'div' : 'a'"
    class="partner-card"
    :class="{ hero, page, flipLogo }"
    :href="'/partners/' + normalizeName(name) + '.html'"
  >
    <div class="info">
      <a :href="website.url" target="_blank" @click="track">
        <img
          class="logo dark"
          v-if="hero && flipLogo"
          :src="getLogo(logo, flipLogo)"
        />
        <img class="logo" v-if="hero" :src="getLogo(logo)" />
        <h3 v-else>{{ name }}</h3>
      </a>

      <p class="region"><Location /> {{ region.join(', ') }}</p>

      <p>{{ intro }}</p>

      <h4 v-if="hero">Proficiencies</h4>
      <p v-if="hero">
        <span class="proficiency" v-for="p in proficiencies">{{ p }}</span>
      </p>
    </div>
    <img class="big" :src="getHero(heroImg, name)" :alt="name + ' hero'" />
  </component>
</template>

<style scoped>
.partner-card {
  background-color: var(--vt-c-bg);
  padding: 24px 28px;
  border-radius: 4px;
  box-shadow: 0 12px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  width: 48.5%;
  margin-bottom: 36px;
  font-size: 15px;
  transition: background-color 0.5s, box-shadow 0.25s ease,
    border-color 0.25s ease;
}

.partner-card.hero {
  font-size: 16px;
  flex-direction: row;
  width: 100%;
}

.partner-card.page {
  padding: 0;
}

h3 {
  font-size: 1.3em;
  font-weight: 700;
  letter-spacing: -0.1px;
  margin-bottom: 1em;
}

.logo {
  margin-bottom: 1em;
  max-width: 240px;
  max-height: 120px;
}

.logo.dark,
.dark .flipLogo .logo:not(.dark) {
  display: none;
}

.dark .logo.dark {
  display: inline-block;
}

.partner-card:not(.hero) .big {
  margin-top: auto;
}

.partner-card.hero .info {
  margin-right: 2em;
}
.partner-card.hero .big {
  display: inline-block;
  margin-left: auto;
  max-width: 60%;
  max-height: 360px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .partner-card {
    width: 100%;
  }
  .partner-card.hero {
    flex-direction: column;
  }
  .logo {
    max-width: 200px;
  }
  .partner-card.hero .big {
    width: 100%;
    max-width: 100%;
  }
}

.partner-card:hover {
  box-shadow: 0 12px 12px rgba(0, 0, 0, 0.1);
}

.partner-card:hover h3 {
  color: var(--vt-c-green);
}

.partner-card h3 {
  transition: color 0.25s ease;
}

.dark .partner-card,
.partner-card.page {
  box-shadow: none !important;
}

.dark .partner-card:not(.hero) {
  border: 1px solid var(--vt-c-divider-light);
}

.dark .partner-card:not(.hero):hover {
  border-color: #555;
}

.partner-card h3 {
  font-size: 1.5em;
  font-weight: 700;
  letter-spacing: -0.1px;
  margin-bottom: 0.4em;
}

.partner-card p {
  margin-bottom: 1.6em;
}

.region {
  color: var(--vt-c-text-2);
  font-size: 0.9em;
}

.region svg {
  display: inline-block;
  opacity: 0.5;
  position: relative;
  top: -1px;
  left: -2px;
}

h4 {
  font-size: 1.2em;
  font-weight: 600;
  margin-bottom: 0.6em;
}

.proficiency {
  display: inline-block;
  color: var(--vt-c-text-code);
  font-weight: 600;
  font-size: 0.85em;
  margin: 2px;
  background-color: var(--vt-c-bg-mute);
  padding: 4px 10px;
  border-radius: 6px;
}
</style>
