<script setup lang="ts">
import ThemeHero from './ThemeHero.vue'
import ThemeList from './ThemeList.vue'
import ThemeContact from './ThemeContact.vue'
</script>

<template>
  <div class="ThemePage">
    <ThemeHero>
      <template #title>Temas</template>
      <template #lead
        >Consulta los temas, los kits de UI y los plugins. Puedes ver cómo
        nuestros socios construyen una aplicación del mundo real con
        Vue.</template
      >
    </ThemeHero>

    <ThemeList />

    <ThemeContact>
      ¿Quieres presentar tus temas aquí?
      <a
        class="link"
        href="mailto:evan@vuejs.org?subject=Theme+affiliation"
        >¡Contáctanos!</a
      >
    </ThemeContact>
  </div>
</template>
