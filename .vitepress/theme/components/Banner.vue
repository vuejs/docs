<script setup>
import { computed } from 'vue'

/**
 * Adding a new banner:
 * 1. uncomment the banner slot in ../index.ts
 * 2. uncomment and update BANNER_ID in ../../inlined-scripts/restorePreferences.ts
 * 3. update --vt-banner-height if necessary
 */

let open = $ref(true)

const items = [
  {
    banner: {
      assets: "FREE_WEEKEND",
      cta: "JOIN FOR FREE",
      link: "/free-weekend",
      static: "FREE_WEEKEND",
      subtitle: "Get Access to ALL Vue School premium courses",
      title: "Free Weekend 1st & 2nd of October"
    },
    ends: "2022-09-30T23:59:59+02:00",
    id: "FREE_WEEKEND_LOBBY",
    isExtended: false
  },
  {
    banner: {
      assets: "FREE_WEEKEND",
      cta: "WATCH FOR FREE",
      link: "/free-weekend",
      static: "FREE_WEEKEND_LIVE",
      subtitle: "Get Access to ALL Vue School premium courses",
      title: "Free Weekend <strong>NOW LIVE</strong>"
    },
    ends: "2022-10-02T23:59:59+02:00",
    id: "FREE_WEEKEND_LIVE",
    isExtended: false
  },
  {
    banner: {
      assets: "LEVELUP2022",
      cta: "GET OFFER",
      link: "/sales/levelup2022",
      static: "LEVELUP2022",
      subtitle: "Access 800+ lessons including the Vue.js 3 Masterclass",
      title: "Less than <strong>_HOURS_ hours</strong> to get 45% off at Vue School"
    },
    ends: "2022-10-04T23:59:59+02:00",
    id: "LEVELUP2022",
    isExtended: false
  },
  {
    banner: {
      assets: "LEVELUP2022",
      cta: "GET OFFER",
      link: "/sales/levelup2022",
      static: "LEVELUP2022",
      subtitle: "Extended! Access 800+ lessons including the Vue.js 3 Masterclass",
      title: "Less than <strong>_HOURS_ hours</strong> to get 45% off at Vue School"
    },
    ends: "2022-10-06T23:59:59+02:00",
    id: "LEVELUP2022_EXTENDED",
    isExtended: true
  }
]

const now = new Date()
const phases = computed(() => items.map(phase => ({ ...phase, remaining: new Date(phase.ends) - now })))
const activePhase = computed(() => phases.value.find(phase => phase.remaining > 0))
const title = computed(() => {
  if (!activePhase.value) return null
  const hours = Math.ceil(activePhase.value.remaining / 1000 / 60 / 60)
  return activePhase.value.banner.title.replace('_HOURS_', hours)
})
const activeBanner = computed(() => {
  if (!activePhase.value) return null
  return activePhase.value.banner
})

/**
 * Call this if the banner is dismissible
 */
function dismiss() {
  open = false
  document.documentElement.classList.add('banner-dismissed')
  localStorage.setItem(`vue-docs-banner-${__VUE_BANNER_ID__}`, 'true')
}
</script>

<template>
  <div class="banner" v-if="open"></div>
</template>

<style>
html:not(.banner-dismissed) {
  --vt-banner-height: 60px;
}
</style>

<style scoped>
.banner {
  position: fixed;
  z-index: var(--vp-z-index-banner);
  box-sizing: border-box;
  top: 0;
  left: 0;
  right: 0;
  height: var(--vt-banner-height);
  line-height: 0;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  background-color: var(--vt-c-green);
}

.banner-dismissed .banner {
  display: none;
}
</style>
