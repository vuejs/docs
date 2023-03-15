<script lang="ts">
import { ref } from 'vue'

// shared data across instances so we load only once
const base = 'https://app.vuejobs.com/feed/vuejs/docs?format=json'

const items = ref<Jobs[]>([])

type Jobs = {
  organization: Organization
  title: string
  link: string
  locations: string[]
  remote: false | 'ALLOWED' | 'ONLY'
}

type Organization = {
  name: string
  avatar: string
}
</script>

<script setup lang="ts">
import { onMounted, computed } from 'vue'

const openings = computed(() =>
  items.value.sort(() => 0.5 - Math.random()).slice(0, 2)
)

onMounted(async () => {
  if (!items.value.length) {
    items.value = (await (await fetch(`${base}`)).json()).data
  }
})
</script>

<template>
  <div class="vuejobs-wrapper">
    <div class="vj-container">
      <a
        class="vj-item"
        v-for="(job, n) in openings"
        :key="n"
        :href="job.link"
        target="_blank"
      >
        <div class="vj-company-logo">
          <img
            :src="job.organization.avatar"
            :alt="`Logo for ${job.organization.name}`"
          />
        </div>
        <div
          style="
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
          "
        >
          <div class="vj-job-title">{{ job.title }}</div>
          <div class="vj-job-info">
            {{ job.organization.name }} <span>· </span>
            <span>{{ job.remote ? 'Remote' : job.locations[0] }}</span>
          </div>
        </div>
      </a>
    </div>
    <div class="vj-link">
      Jobs by
      <a
        href="https://vuejobs.com/?utm_source=vuejs&utm_medium=referral&utm_campaign=jobs_widget&utm_content=bottom_link"
        target="_blank"
        title="Hire Vue.js developers"
        >vuejobs.com</a
      >
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
  padding: 14px;
  border-radius: 8px;
  overflow: hidden;
  font-size: 12px;
  color: var(--vt-c-text-1);
  display: flex;
  width: 100%;
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
  line-height: 14px;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.vj-job-info {
  font-size: 11px;
  color: var(--vt-c-text-2);
  margin-top: 4px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 1;
}

.vj-company-logo {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 10px;
  flex-shrink: 0;
}

.vj-company-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center center;
}

.vj-link {
  font-size: 10px;
  line-height: 1;
  margin-top: 10px;
  text-align: right;
}
</style>
