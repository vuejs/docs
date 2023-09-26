<script setup>
/**
 * Adding a new banner:
 * 1. uncomment the banner slot in ../index.ts
 * 2. uncomment and update BANNER_ID in ../../inlined-scripts/restorePreferences.ts
 * 3. update --vt-banner-height if necessary
 */
import { ref } from 'vue'
import { VTIconPlus } from '@vue/theme'

let open = ref(true)

const banner = ref({
  cta: 'Help Ukraine Now',
  title:
    'Russia has invaded Ukraine and already killed tens of thousands of civilians, with many more raped or tortured.',
  subtitle: "The death toll keeps climbing. It's a genocide. We need your help.",
  shortText: 'Russia has invaded Ukraine and already killed tens of thousands of civilians. We need your help.',
  link: 'https://stand-with-ukraine.pp.ua/'
})

/**
 * Call this if the banner is dismissible
 */
function dismiss() {
  open.value = false
  document.documentElement.classList.add('banner-dismissed')
  localStorage.setItem(
    `vue-docs-banner-${window.__VUE_BANNER_ID__}`,
    'true'
  )
}
</script>
<!-- -webkit-linear-gradient(315deg, #42d392 25%, #647eff) -->
<template>
  <div class="banner" v-if="open">
    <p class="vt-banner-text">
      <span class="vt-text-primary">VueConf Торонто</span>
      <span class="vt-tagline"> - Приєднуйтесь до головної конференції Vue.js</span>
      | 9-10 листопада 2023 <span class="vt-place"> - Торонто, Канада</span>
      <a
        target="_blank"
        class="vt-primary-action"
        href="https://vuetoronto.com?utm_source=vuejs&utm_content=top_banner"
        >Реєструйся <span class="vt-time-now">Вже</span></a
      >
    </p>
    <button @click="dismiss">
      <VTIconPlus class="close" />
    </button>
    <p class="vt-banner-text vt-coupon">
      <span class="vt-text-primary">Використовуй код</span> VUEJS
      <span class="vt-text-primary">і отримай знижку 15%</span>
    </p>
  </div>
</template>

<style>
html:not(.banner-dismissed) {
  --vt-banner-height: 30px;
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
  background: linear-gradient(
    90deg,
    rgba(66, 184, 131, 1) 0%,
    rgba(39, 179, 137, 1) 19%,
    rgba(100, 126, 255, 1) 100%
  );
}

@media (min-width: 1280px) {
  .banner {
    background: -webkit-linear-gradient(270deg, #005bbb 52%, #ffd500 52%);
  }
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
  padding: 5px;
}

.close {
  width: 20px;
  height: 20px;
  fill: #fff;
  transform: rotate(45deg);
}
/*
@media (max-width: 720px) {
  a > span {
    display: none;
  }
} */
</style>
