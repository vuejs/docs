<script setup>
import { ref } from 'vue'
/**
 * Adding a new banner:
 * 1. uncomment the banner slot in ../index.ts
 * 2. uncomment and update BANNER_ID in ../../inlined-scripts/restorePreferences.ts
 * 3. update --vt-banner-height if necessary
 */
let open = $ref(true)
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
  open = false
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
    <a
      id="vt-top"
      :href="`${banner.link}?utm_source=vuejs&utm_content=top_banner`"
      target="_blank"
      :class="banner.assets"
    >
      <div class="vt-background-wrapper">
        <div class="vt-core">
          <div class="vt-slogan-wrapper">
            <div class="vt-short" v-html="banner.shortText" />
            <div class="vt-slogan" v-html="banner.title" />
            <div class="vt-subline" v-html="banner.subtitle" />
          </div>
          <div class="vt-button-wrapper">
            <div class="vt-button">
              {{ banner.cta }}
            </div>
          </div>
        </div>
        <div class="vt-close" @click.prevent.stop="dismiss">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </a>
  </div>
</template>

<style>
html:not(.banner-dismissed) {
  --vt-banner-height: 72px;
}
#vt-top {
  display: block;
  box-sizing: border-box;
  height: 72px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  line-height: 1;
}
#vt-top .vt-background-wrapper {
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 0 10px;
  height: 100%;
  width: 100%;
}
#vt-top:hover {
  text-decoration: none;
}
#vt-top:hover .vt-core .vt-button {
  opacity: 0.75;
}
#vt-top .vt-logo {
  position: absolute;
  left: 10px;
  width: 42px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
#vt-top .vt-core {
  display: flex;
  align-items: center;
  width: 260px;
}
#vt-top .vt-core .vt-slogan-wrapper {
  text-align: center;
  width: 174px;
  margin: 0 auto;
}
#vt-top .vt-core .vt-slogan {
  display: none;
}
#vt-top .vt-core .vt-subline {
  display: none;
}
#vt-top .vt-core .vt-short {
  display: block;
  color: black;
  line-height: 14px;
}
#vt-top .vt-core .vt-button {
  background: -webkit-linear-gradient(270deg, #005bbb 50%, #ffd500 50%);
  border-radius: 3px;
  color: #000;
  padding: 8px 6px;
  text-align: center;
  font-size: 10px;
}
#vt-top .vt-core .vt-button:first-line {
  color: #fff;
}
#vt-top .vt-close {
  right: 0;
  position: absolute;
  padding: 10px;
  color: black;
}
#vt-top .vt-close svg {
  height: 24px;
  width: 24px;
}
#vt-top .vt-close:hover {
  opacity: 0.7;
}
@media (min-width: 680px) {
  #vt-top .vt-core {
    width: auto;
  }
  #vt-top .vt-core .vt-slogan-wrapper {
    margin: 0 20px 0 0;
    width: 450px;
  }
  #vt-top .vt-core .vt-short {
    display: none;
  }
  #vt-top .vt-core .vt-button {
    background: #ffffff;
    color: #000;
    white-space: nowrap;
  }
  #vt-top:hover .vt-core .vt-button {
    opacity: 1;
    background: #f2f2f2;
  }
  #vt-top .vt-core .vt-button:first-line {
    color: #000;
  }
  #vt-top:hover .vt-core .vt-button {
    background: #f2f2f2;
  }
  #vt-top .vt-core .vt-slogan {
    display: block;
    font-size: 17px;
  }
  #vt-top .vt-core .vt-slogan strong {
    color: #ffe401;
  }
  #vt-top .vt-core .vt-subline {
    display: block;
    font-size: 12px;
    margin-top: 5px;
    opacity: 80%;
    color: #000;
  }
  #vt-top .vt-core .vt-button {
    font-size: 13px;
    padding: 12px 16px;
  }
  #vt-top .vt-close {
    color: white;
  }
}
@media (min-width: 1280px) {
  #vt-top .vt-logo {
    left: 20px;
    width: 104px;
  }
  #vt-top .vt-core {
    margin-right: 0;
  }
  #vt-top .vt-core .vt-slogan-wrapper {
    width: auto;
  }
  #vt-top .vt-core .vt-subline {
    margin-top: 15px;
    font-size: 14px;
  }
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
  background: #fff;
}
@media (min-width: 680px) {
  .banner {
    background: -webkit-linear-gradient(270deg, #005bbb 75%, #ffd500 75%);
  }
}

@media (min-width: 1280px) {
  .banner {
    background: -webkit-linear-gradient(270deg, #005bbb 52%, #ffd500 52%);
  }
}
.banner-dismissed .banner {
  display: none;
}
</style>
