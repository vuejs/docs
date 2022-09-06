<script setup>
/**
 * Adding a new banner:
 * 1. uncomment the banner slot in ../index.ts
 * 2. uncomment and update BANNER_ID in ../../inlined-scripts/restorePreferences.ts
 * 3. update --vt-banner-height if necessary
 */

let open = $ref(true)

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
  <div class="banner banner-vuejsconf" v-if="open">
    <a href="https://conf.vuejs.de/?utm_source=vuejs&utm_medium=referral&utm_campaign=banner-placement&utm_content=banner"
      target="_blank">
      <picture>
        <source media="(min-width:1200px)" srcset="/images/vuejsde-conf/vuejsdeconf_banner_large_general.png" />
        <source media="(min-width:920px)" srcset="/images/vuejsde-conf/vuejsdeconf_banner_medium_general.png" />
        <img src="/images/vuejsde-conf/vuejsdeconf_banner_small_general.png" alt="" />
      </picture>
    </a>
    <div class="close-btn" @click.stop.prevent="dismiss">
      <img src="/images/vuejsde-conf/close.svg" alt="Close" />
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

a {
  text-decoration: underline;
}

.banner-vuejsconf {
  background: linear-gradient(90deg, #fff 50%, var(--vt-c-green) 50%);
}

.banner-vuejsconf a {
  display: inline-block;
  margin: 0 auto;
}

.banner-vuejsconf .close-btn {
  top: 26%;
  right: 10px;
  z-index: 99;
  position: absolute;
  border-radius: 50%;
  background-color: var(--vt-c-brand-dark);
  padding: 8px;
}
</style>
