<script setup lang="ts">
import { DeveloperEducation } from './type'

defineProps<{
  education?: DeveloperEducation[]
  title?: string
}>()
</script>

<template>
  <div>
    <h4 v-if="title">{{ title }}</h4>
    <div v-if="education?.length" class="developer-education__list">
      <div class="developer-education__item" v-for="ed in education" :key="ed.id">
        <h5 class="developer-education__degree">{{ ed.degree }}</h5>
        <i class="developer-education__details">{{ ed.school }} · {{ ed.startDate }} - {{ ed.endDate }}</i>
      </div>
    </div>
  </div>
</template>

<style scoped>
.developer-education__list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  align-self: stretch;
}

.developer-education__degree {
  color: var(--vt-c-text-code);
  font-weight: 600;
}
</style>
