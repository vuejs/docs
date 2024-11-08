<script setup lang="ts">
import { DeveloperCompensations } from './type'

defineProps<{
  compensations?: DeveloperCompensations
  showDetails?: boolean
  title?: string
}>()
</script>

<template>
  <div>
    <h4 v-if="title">{{ title }}</h4>
    <div>
      <div v-if="compensations" class="developer-compensations__list">
        <div v-for="(compensation, key) in compensations" :key="`compensation-${key}`">
          {{ compensation }}
        </div>
      </div>
      <div v-if="showDetails" class="developer-compensations__details">
        <p>No other costs.</p>
        <p>One month trial period, thereafter, one month notice period.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.developer-compensations__list {
  display: flex;
  flex-direction: column;
}

.developer-compensations__details {
  margin-top: 32px;
}
</style>
