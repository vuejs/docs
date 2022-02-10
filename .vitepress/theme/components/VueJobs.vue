<script lang="ts">
// shared data across instances so we load only once
const base = `https://vuejobs.com/api/postings`
let openings = $ref([])
</script>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'
const { frontmatter } = useData()

let vuejobs = $ref<HTMLElement>()
let visible = $ref(false)

onMounted(async () => {
  // only render when entering view
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        visible = true
        observer.disconnect()
      }
    },
    { rootMargin: '0px 0px 300px 0px' }
  )
  observer.observe(vuejobs)
  onUnmounted(() => observer.disconnect())

  // load data
  if (!openings.length) {
    const items = await (await fetch(`${base}`)).json()
    // choose two random items
    if (items && items.length) {
      openings = items.sort(() => 0.5 - Math.random()).slice(0, 2)
    }
  }
})
</script>

<template>
  <div v-if="frontmatter.vuejobs !== false" ref="vuejobs">
    <div class="vuejobs-container" v-if="openings.length">
      <div class="vj-item" v-for="(job, n) in openings" :key="n">
        <a class="vj-job-title" :href="job.link" target="_blank">
          <p>
            {{ job.title }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              class="vt-link-icon"
            >
              <path d="M0 0h24v24H0V0z" fill="none"></path>
              <path
                d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z"
              ></path>
            </svg>
          </p>

          <p class="vj-job-info">
            {{ job.company }}
            <span v-if="job.salary">·</span>
            {{ job.salary }}
            <span>·</span>
            {{ job.location }}
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vuejobs-container {
  background-color: var(--vt-c-bg-soft);
  padding: 5px 15px;
  border-radius: 2px;
}
.vj-item {
  padding: 10px 0 10px 0;
  border-bottom: 1px solid var(--vt-c-divider-light);
  display: flex;
  flex-direction: column;
}
.vj-item:last-child {
  border-bottom: none;
}
.vuejobs-container p,
.vuejobs-container a {
  line-height: 16px;
  transition: color 0.2s ease;
  display: inline-block;
}
.vuejobs-container a:hover {
  color: var(--vt-c-brand);
}
.vj-job-title {
  font-size: 12px;
  color: var(--vt-c-text-1);
}
.vj-job-info {
  font-size: 11px;
  color: var(--vt-c-text-2);
  margin-top: 2px;
  line-height: 12px;
}
</style>
