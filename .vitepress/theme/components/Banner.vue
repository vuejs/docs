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
  <div class="banner banner-vuejsconf" v-if="open">
    <a href="https://conf.vuejs.de/?utm_source=vuejs&utm_medium=referral&utm_campaign=banner-placement&utm_content=banner"
      target="_blank">
      <picture>
        <source media="(min-width:1200px)" srcset="/vuejsde-conf/vuejsdeconf_banner_large.png" />
        <source media="(min-width:920px)" srcset="/vuejsde-conf/vuejsdeconf_banner_medium.png" />
        <img src="/vuejsde-conf/vuejsdeconf_banner_small.png" alt="" />
      </picture>
    </a>
    <div class="close-btn" @click.stop.prevent="dismiss">
      <VTIconPlus class="close" />
    </div>
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

.banner-vuejsconf {
  background: linear-gradient(90deg, #fff 50%, #43b883 50%);
}

.banner-vuejsconf a {
  display: inline-block;
  margin: 0 auto;
}

.banner-vuejsconf .close-btn {
  top: 10px;
  right: 10px;
  z-index: 99;
  position: absolute;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
}
</style>
