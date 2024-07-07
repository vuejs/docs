<script setup lang="ts">
import ThemeHero from './ThemeHero.vue'
import ThemeList from './ThemeList.vue'
import ThemeContact from './ThemeContact.vue'
</script>

<template>
  <div class="ThemePage">
    <ThemeHero>
      <template #title>Motywy</template>
      <template #lead>Sprawdź motywy, zestawy UI i wtyczki. Możesz zobaczyć, jak nasi partnerzy budują rzeczywiste aplikacje przy użyciu Vue.</template>
    </ThemeHero>

    <ThemeList />

    <ThemeContact>
      Chcesz zaprezentować tutaj swoje motywy? <a class="link" href="mailto:evan@vuejs.org?subject=Theme+affiliation">Skontaktuj się z nami!</a>
    </ThemeContact>
  </div>
</template>
