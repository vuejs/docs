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
      <span class="vt-main">Vueconf 2026</span>
      <span class="vt-tagline"> · Join us for all things <span class="vt-main" style="font-weight: 900;">   Vue + AI </span></span>
      <span class="vt-place"> · VUE2026 FOR 20% OFF!</span>
      <span class="vt-date"> · May 19-21 2026</span>
      <a target="_blank" class="vt-primary-action"
         href="https://vueconf.us//?utm_source=vuejs&utm_content=top_banner">
        Register
      </a>
    </p>
    <button @click="dismiss">
      <VTIconPlus class="close" />
    </button>
<!--    <div class="logo"></div>-->
<!--    <div class="glow glow&#45;&#45;blue"></div>-->
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
  color: white;
  background: #262626;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.glow.glow--purple {
  position: absolute;
  bottom: -15%;
  left: -75%;
  width: 80%;
  aspect-ratio: 1.5;
  pointer-events: none;
  border-radius: 100%;
  background: linear-gradient(270deg, #7a23a1, #715ebde6 60% 80%, #bd34fe00);
  filter: blur(15vw);
  transform: none;
  opacity: .6
}

.glow.glow--blue {
  position: absolute;
  bottom: -15%;
  right: -40%;
  width: 80%;
  aspect-ratio: 1.5;
  pointer-events: none;
  border-radius: 100%;
  background: linear-gradient(180deg, #61d9ff, #0000);
  filter: blur(15vw);
  transform: none;
  opacity: .3
}

@media (min-width: 768px) {
  .glow.glow--blue {
    top: -15%;
    right: -40%;
    width: 80%;
  }

  .glow.glow--purple {
    bottom: -15%;
    left: -40%;
    width: 80%;
  }
}

@media (min-width: 1025px) {
  .glow.glow--blue {
    top: -15%;
    right: -40%;
    width: 80%;
  }

  .glow.glow--purple {
    bottom: -15%;
    left: -40%;
    width: 80%;
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

.vt-main {
  color: #42b983;
  background-clip: text;
}

.vt-primary-action {
  background: #42b983;
  color: #fff;
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 14px;
  text-decoration: none;
  margin: 0 20px;
  font-weight: bold;
  transition: all;
  transition-duration: 200ms;
}

.vt-primary-action:hover {
  text-decoration: none;
  transform: translate3d(0, -2px, 0);
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
    padding: 5px 8px;
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
