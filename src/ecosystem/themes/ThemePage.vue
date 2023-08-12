<script setup lang="ts">
import ThemeHero from './ThemeHero.vue'
import ThemeList from './ThemeList.vue'
import ThemeContact from './ThemeContact.vue'
</script>

<template>
  <div class="ThemePage">
    <ThemeHero>
      <template #title>Temi</template>
      <template #lead>Dai un'occhiata ai temi, UI kit e plugin. Puoi vedere come i nostri partner hanno costruito una vera applicazione utilizzando Vue.</template>
    </ThemeHero>

    <ThemeList />

    <ThemeContact>
      Vuoi mettere in evidenza qui i tuoi temi? <a class="link" href="mailto:evan@vuejs.org?subject=Theme+affiliation">Contattaci!</a>
    </ThemeContact>
  </div>
</template>
