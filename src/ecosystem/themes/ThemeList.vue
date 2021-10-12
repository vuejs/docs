<script setup lang="ts">
import themes from './themes.json'
import ThemeListItem from './ThemeListItem.vue'
</script>

<template>
  <div class="ThemeList">
    <div class="container">
      <div v-for="provider in themes" :key="provider.name" class="item">
        <ThemeListItem :provider="provider" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ThemeList {
  padding: 0 24px 96px;
}

@media (min-width: 768px) {
  .ThemeList {
    padding: 0 32px 96px;
  }
}

.container {
  margin: 0 auto;
  max-width: 960px;
}

.item + .item {
  padding-top: 48px;
}

@media (min-width: 768px) {
  .item + .item {
    padding-top: 64px;
  }
}
</style>
