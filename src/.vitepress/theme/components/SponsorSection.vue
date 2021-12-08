<script setup lang="ts">
import sponsors from '../data/sponsors.json'
import SponsorSectionHero from './SponsorSectionHero.vue'
import SponsorBoard from './SponsorBoard.vue'
</script>

<template>
  <section class="SponsorSection" id="sponsors">
    <SponsorSectionHero>
      <template #lead>
        Sponsors
      </template>
      <template #title>
        Trusted and loved by progressive companies all over the world.
      </template>
    </SponsorSectionHero>

    <section class="section">
      <SponsorBoard :sponsors="sponsors.platinum" />
    </section>
  </section>
</template>

<style scoped>
.SponsorSection {
  margin: 0;
  border-top: 1px solid transparent;
  padding: 64px 0;
  background-color: var(--vt-c-bg-soft);
  transition: background-color 0.5s;
}

.dark .SponsorSection {
  border-top-color: var(--vt-c-divider-light);
  background-color: var(--vt-c-bg);
}
</style>
