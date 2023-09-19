<script setup>
/**
 * Adding a new banner:
 * 1. uncomment the banner slot in ../index.ts
 * 2. uncomment and update BANNER_ID in ../../inlined-scripts/restorePreferences.ts
 * 3. update --vt-banner-height if necessary
 */
import { ref } from 'vue'
import { VTIconPlus } from '@vue/theme'

const open = ref(true)

/**
 * Call this if the banner is dismissible
 */
function dismiss() {
  open.value = false
  document.documentElement.classList.add('banner-dismissed')
  localStorage.setItem(`vue-docs-banner-${__VUE_BANNER_ID__}`, 'true')
}
</script>

<template>
  <div class="banner" v-if="open">
    <p class="vt-banner-text">
      <span class="vt-text-primary">VueConf Toronto</span>
      <span class="vt-tagline"> - Join the premier Vue.js conference</span>
      | 9-10 Nov 2023 <span class="vt-place"> - Toronto, Canada</span>
      <a
        target="_blank"
        class="vt-primary-action"
        href="https://vuetoronto.com?utm_source=vuejs&utm_content=top_banner"
        >Register <span class="vt-time-now">Now</span></a
      >
    </p>
    <button @click="dismiss">
      <VTIconPlus class="close" />
    </button>
    <p class="vt-banner-text vt-coupon">
      <span class="vt-text-primary">Use code</span> VUEJS
      <span class="vt-text-primary">to get 15% off</span>
    </p>
  </div>
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
  line-height: var(--vt-banner-height);
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  background-color: var(--vt-c-green);
  background: #11252b;
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner-dismissed .banner {
  display: none;
}

a:hover {
  text-decoration: underline;
}

button {
  position: absolute;
  right: 0;
  top: 0;
  padding: 20px 10px;
}

.close {
  width: 20px;
  height: 20px;
  fill: #fff;
  transform: rotate(45deg);
}

.vt-banner-text {
  color: #fff;
  font-size: 16px;
}

.vt-text-primary {
  color: #75c05e;
}

.vt-primary-action {
  background: #75c05e;
  color: #121c1a;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 14px;
  text-decoration: none;
  margin: 0 20px;
  font-weight: bold;
}
.vt-primary-action:hover {
  text-decoration: none;
  background: #5a9f45;
}

@media (max-width: 1280px) {
  .banner .vt-banner-text {
    font-size: 14px;
  }
  .vt-tagline {
    display: none;
  }
}

@media (max-width: 780px) {
  .vt-tagline {
    display: none;
  }
  .vt-coupon {
    display: none;
  }
  .vt-primary-action {
    margin: 0 10px;
    padding: 7px 10px;
  }
  .vt-time-now {
    display: none;
  }
}

@media (max-width: 560px) {
  .vt-place {
    display: none;
  }
}
</style>
