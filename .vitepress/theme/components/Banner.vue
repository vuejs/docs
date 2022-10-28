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
  cta: 'Get Your Remote Spot',
  title:
    'Join the Vue community ONLINE at <strong>VueConf Toronto</strong> from 1-3 November 2022!',
  subtitle: 'Use the code VUEJS to get 25% off on tickets!',
  shortText: 'Join in-person <br> 1-3 November 2022, Toronto, Canada',
  link: 'https://vuetoronto.com/tickets'
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
        <div class="vt-logo">
          <svg
            width="64"
            height="50"
            viewBox="0 0 200 141"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="200" height="141" fill="#11252B" />
            <path
              d="M40.5071 64.8745L50.3002 37.9717H43.2441L37.2998 55.3665L31.3555 37.9717H24L33.7931 64.8745H40.5071Z"
              fill="white"
            />
            <path
              d="M69.5306 45.1575H62.8165V57.1191C62.4744 58.4774 61.3198 59.3099 60.0796 59.3099C58.369 59.3099 57.5992 58.1269 57.5992 56.4619V45.1575H50.928V58.0831C50.928 62.4646 53.4511 65.3126 57.6848 65.3126C59.8658 65.3126 61.7902 64.3925 62.8165 63.1657V64.8745H69.5306V45.1575Z"
              fill="white"
            />
            <path
              d="M84.6949 57.9954C84.3101 59.3537 83.2409 59.9671 81.8725 59.9671C79.9481 59.9671 78.7507 58.6965 78.5368 56.3304H90.9813V54.6216C90.9813 48.7503 87.6457 44.7193 81.7442 44.7193C76.1848 44.7193 72.0794 48.9256 72.0794 55.016C72.0794 61.1502 75.971 65.3126 81.8725 65.3126C86.8759 65.3126 90.2116 62.5523 90.8958 57.9954H84.6949ZM81.7442 50.0648C83.412 50.0648 84.3956 51.2916 84.4811 52.9128H78.6651C79.0928 51.0726 80.1619 50.0648 81.7442 50.0648Z"
              fill="white"
            />
            <path
              d="M92.6722 51.4231C92.6722 59.5728 97.9322 65.3126 105.288 65.3126C111.831 65.3126 115.68 61.3254 116.62 55.8047H109.778C109.094 57.8202 107.683 59.1346 105.288 59.1346C101.653 59.1346 99.6001 55.8047 99.6001 51.4231C99.6001 46.9977 101.653 43.7115 105.288 43.7115C107.683 43.7115 109.094 45.026 109.778 46.9977H116.62C115.68 41.5208 111.831 37.5335 105.288 37.5335C97.9322 37.5335 92.6722 43.2734 92.6722 51.4231Z"
              fill="white"
            />
            <path
              d="M137.982 55.016C137.982 48.9256 134.005 44.7193 128.146 44.7193C122.33 44.7193 118.31 48.9256 118.31 55.016C118.31 61.1063 122.33 65.3126 128.146 65.3126C134.005 65.3126 137.982 61.1063 137.982 55.016ZM131.396 55.016C131.396 57.7325 130.242 59.6166 128.146 59.6166C126.093 59.6166 124.939 57.7325 124.939 55.016C124.939 52.2994 126.093 50.3715 128.146 50.3715C130.242 50.3715 131.396 52.2994 131.396 55.016Z"
              fill="white"
            />
            <path
              d="M140.594 64.8745H147.308V52.9566C147.65 51.5984 148.762 50.8097 150.087 50.8097C151.798 50.8097 152.61 51.9927 152.61 53.6139V64.8745H159.282V51.9489C159.282 47.5673 156.759 44.7193 152.482 44.7193C150.258 44.7193 148.377 45.6394 147.308 46.8663V45.1575H140.594V64.8745Z"
              fill="white"
            />
            <path
              d="M175 36.5258C174.187 36.2191 173.161 36 171.878 36C167.174 36 164.394 38.9795 164.394 43.7115V45.1575H161.529V50.503H164.394V64.8745H171.023V50.503H174.743V45.1575H171.023V44.1059C171.023 42.5285 171.921 41.7398 173.418 41.7398C174.016 41.7398 174.53 41.8713 175 42.1342V36.5258Z"
              fill="white"
            />
            <path
              d="M26.3378 78.7056H34.4203V99.5618H41.3054V78.7056H49.4307V72.6591H26.3378V78.7056Z"
              fill="white"
            />
            <path
              d="M68.0997 89.7033C68.0997 83.613 64.1226 79.4067 58.2639 79.4067C52.4479 79.4067 48.428 83.613 48.428 89.7033C48.428 95.7937 52.4479 100 58.2639 100C64.1226 100 68.0997 95.7937 68.0997 89.7033ZM61.514 89.7033C61.514 92.4199 60.3593 94.304 58.2639 94.304C56.2112 94.304 55.0565 92.4199 55.0565 89.7033C55.0565 86.9868 56.2112 85.0589 58.2639 85.0589C60.3593 85.0589 61.514 86.9868 61.514 89.7033Z"
              fill="white"
            />
            <path
              d="M83.6263 79.7572C83.3269 79.5819 82.6427 79.4067 81.7874 79.4067C79.863 79.4067 78.3662 80.283 77.4254 81.5974V79.8448H70.7114V99.5618H77.4254V87.9945C77.7675 86.5924 79.0077 85.7599 80.8466 85.7599C81.9157 85.7599 82.8137 85.9352 83.6263 86.3733V79.7572Z"
              fill="white"
            />
            <path
              d="M104.725 89.7033C104.725 83.613 100.748 79.4067 94.8894 79.4067C89.0734 79.4067 85.0535 83.613 85.0535 89.7033C85.0535 95.7937 89.0734 100 94.8894 100C100.748 100 104.725 95.7937 104.725 89.7033ZM98.1395 89.7033C98.1395 92.4199 96.9849 94.304 94.8894 94.304C92.8367 94.304 91.682 92.4199 91.682 89.7033C91.682 86.9868 92.8367 85.0589 94.8894 85.0589C96.9849 85.0589 98.1395 86.9868 98.1395 89.7033Z"
              fill="white"
            />
            <path
              d="M107.337 99.5618H114.051V87.644C114.393 86.2857 115.505 85.497 116.831 85.497C118.541 85.497 119.354 86.6801 119.354 88.3012V99.5618H126.025V86.6362C126.025 82.2547 123.502 79.4067 119.225 79.4067C117.002 79.4067 115.12 80.3268 114.051 81.5536V79.8448H107.337V99.5618Z"
              fill="white"
            />
            <path
              d="M130.924 92.7704C130.924 97.7654 133.49 99.9562 138.023 99.9562C139.52 99.9562 140.974 99.6933 141.743 99.3428V93.5153C141.145 93.7782 140.332 93.9535 139.605 93.9535C138.279 93.9535 137.552 93.2962 137.552 91.7627V85.1903H141.572V79.8448H137.552V74.4117H130.924V79.8448H128.101V85.1903H130.924V92.7704Z"
              fill="white"
            />
            <path
              d="M163.401 89.7033C163.401 83.613 159.424 79.4067 153.565 79.4067C147.749 79.4067 143.73 83.613 143.73 89.7033C143.73 95.7937 147.749 100 153.565 100C159.424 100 163.401 95.7937 163.401 89.7033ZM156.815 89.7033C156.815 92.4199 155.661 94.304 153.565 94.304C151.513 94.304 150.358 92.4199 150.358 89.7033C150.358 86.9868 151.513 85.0589 153.565 85.0589C155.661 85.0589 156.815 86.9868 156.815 89.7033Z"
              fill="white"
            />
          </svg>
        </div>
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
            stroke="#fff"
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
  background: #e5c60b;
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
  line-height: 14px;
}
#vt-top .vt-core .vt-button {
  background: #ffe502;
  border-radius: 3px;
  color: #000;
  padding: 8px 6px;
  text-align: center;
  font-size: 10px;
  white-space: nowrap;
}
#vt-top .vt-close {
  right: 0;
  position: absolute;
  padding: 10px;
  color: white;
}
#vt-top .vt-close svg {
  height: 24px;
  width: 24px;
}
#vt-top .vt-close:hover {
  color: #56d8ff;
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
  }
  #vt-top .vt-core .vt-button {
    font-size: 13px;
    padding: 12px 16px;
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
  background: -webkit-linear-gradient(315deg, #96c93c 25%, #03b19a);
}
.banner-dismissed .banner {
  display: none;
}
</style>
