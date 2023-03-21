<script setup lang="ts">
import ThemeHero from './ThemeHero.vue'
import ThemeList from './ThemeList.vue'
import ThemeContact from './ThemeContact.vue'
</script>

<template>
  <div class="ThemePage">
    <ThemeHero>
      <template #title>Теми</template>
      <template #lead>Перегляньте теми, комплекти інтерфейсу користувача та плагіни. Ви можете побачити, як наші партнери створюють реальну програму за допомогою Vue.</template>
    </ThemeHero>

    <ThemeList />

    <ThemeContact>
      Хочете розмістити тут свої теми? <a class="link" href="mailto:evan@vuejs.org?subject=Theme+affiliation">Зв'яжіться з нами!</a>
    </ThemeContact>
  </div>
</template>
