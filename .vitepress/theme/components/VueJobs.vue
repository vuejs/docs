<script lang="ts">
// shared data across instances so we load only once
const base = `https://app.vuejobs.com/feed/vuejs/docs?format=json`
let items = $ref([])
</script>

<script setup lang="ts">
import { onMounted, computed } from 'vue'

let vuejobs = $ref<HTMLElement>()

const openings = computed(() => items.sort(() => 0.5 - Math.random()).slice(0, 2))

onMounted(async () => {
  if (!items.length) items = (await (await fetch(`${base}`)).json()).data
})
</script>

<template>
  <div class="vuejobs-wrapper" ref="vuejobs">
    <div class="vj-container">
      <div class="vj-item" v-for="(job, n) in openings" :key="n" style="min-height: 55px;">
        <a class="vj-job-link" :href="job.link" target="_blank">
          <div class="vj-company-logo">
            <img :src="job.organization.avatar" alt="" />
          </div>
          <div style="overflow: hidden;display: flex; flex-direction: column; justify-content: center;">
            <div class="vj-job-title">{{ job.title }}</div>
            <div class="vj-job-info">
              {{ job.organization.name }} <span>· </span>
              <span v-if="['ONLY', 'ALLOWED'].includes(job.remote)">Remote</span>
              <span v-else>{{ job.locations[0] }}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
    <div style="font-size: 12px; margin-top: 5px; text-align: right">
      Jobs by <a
        href="https://vuejobs.com/?utm_source=vuejs&utm_medium=referral&utm_campaign=jobs_widget&utm_content=bottom_link"
        target="_blank" title="Hire Vue.js developers">vuejobs.com</a>
    </div>
  </div>
</template>

<style scoped>
.vuejobs-wrapper {
  margin: 28px 0;
}

.vj-container {
  display: grid;
  gap: 15px;
  height: 76px;
}

.vj-item:nth-child(2) {
  display: none;
}

@media (min-width: 640px) {
  .vj-container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .vj-item:nth-child(2) {
    display: flex;
  }
}

.vj-item {
  background-color: var(--vt-c-bg-soft);
  padding: 15px;
  border-radius: 8px;
  overflow: hidden;
}

.vuejobs-wrapper p,
.vuejobs-wrapper a {
  transition: color 0.2s ease;
}

.vuejobs-wrapper a:hover {
  color: var(--vt-c-brand);
}

.vj-job-link {
  font-size: 12px;
  color: var(--vt-c-text-1);
  display: flex;
  width: 100%;
}

.vj-job-title {
  font-size: 13px;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.vj-job-info {
  font-size: 12px;
  color: var(--vt-c-text-2);
  margin-top: 1px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.vj-company-logo {
  width: 46px;
  height: 46px;
  border-radius: 3px;
  overflow: hidden;
  margin-right: 12px;
  flex-shrink: 0;
}

.vj-company-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
}
</style>
