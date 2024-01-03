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
    <a
      class="banner__container"
      target="_blank"
      href="https://www.herodevs.com/support/nes-vue?utm_source=vuejs-org&utm_medium=banner&utm_campaign=post-eol"
    >
      <img
        id="herodevs_left_logo"
        style="width: 15%; max-width: 175px"
        src="/images/partners/herodevs-white-letters.svg"
        alt="HeroDevs logo"
      />
      <div class="banner__middle">
        <div class="title white_text uppercase">
          Vue 2 is officially end-of-life
        </div>
        <div class="separator"></div>
        <div class="subtitle white_text">
          Need to stay compliant? Explore Vue's official LTS partner
          HeroDevs
        </div>
        <div class="cta_button_container">
          <button class="cta_button">Learn more</button>
        </div>
      </div>
      <img
        id="herodevs_right_logo"
        src="/images/partners/herodevs-white-letters.svg"
        alt="HeroDevs logo"
      />

      <button id="dismiss_button" @click.stop.prevent="dismiss">
        <VTIconPlus class="close" />
      </button>
    </a>
  </div>
</template>

<style>
html:not(.banner-dismissed) {
  --vt-banner-height: 72px;
}
</style>

<style scoped>
.banner {
  --title_text_size: 13px;
  --white_text_size: 10px;
  --banner_container_gap: 0;

  position: fixed;
  z-index: var(--vp-z-index-banner);
  box-sizing: border-box;
  padding: 12px;
  top: 0;
  left: 0;
  right: 0;
  height: var(--vt-banner-height);
  line-height: var(--vt-banner-height);
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(90deg, #f926e1 0.22%, #2ab5fb 99.76%);
}
.banner__container {
  cursor: pointer;
  text-decoration: none;
  display: flex;
  height: 46px;
  padding: 0;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  gap: var(--banner_container_gap);
}

.banner__container .banner__middle {
  display: grid;
  width: 100%;
  max-height: 100%;
  grid-template-columns: [text-col] 1fr [button-col] 0.2fr [end];
  grid-template-rows: [title] 0.95fr [subtitle] 0.95fr [end];
  gap: 8px;
}

.banner__middle .title {
  display: flex;
  justify-content: center;
  align-items: end;
  letter-spacing: 2px;
  grid-column-start: text-col;
  grid-column-end: button-col;
  grid-row-start: title;
  grid-row-end: subtitle;
  font-size: var(--title_text_size);
  font-style: normal;
  font-weight: 800;
  line-height: var(--title_text_size); /* 100% */
  min-width: 307px;
}

.banner__middle .subtitle {
  grid-row: subtitle;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: var(--white_text_size);
  font-style: normal;
  font-weight: 700;
  line-height: var(--white_text_size);
}
.uppercase {
  text-transform: uppercase;
}
.gradient_text {
  text-decoration: none;
  background: linear-gradient(90deg, #f926e1 0.22%, #2ab5fb 99.76%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.white_text {
  color: var(--vt-c-white, #fff);
}

.separator {
  display: none;
  width: 0;
  height: 32px;
  border-left: 2px solid rgba(255, 255, 255, 0.09);
}
.cta_button_container {
  grid-column: button-col;
  grid-row: title / end;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cta_button {
  width: 106px;
  min-width: 88px;
  height: 40px;
  border-radius: 100px;
  color: var(--vt-c-dark, #0d0d0d);
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px; /* 200% */
  border-radius: 100px;
  background: var(--vt-c-white, #fff);
  transition: box-shadow 350ms ease-in-out;
}

.banner__container:hover {
  .cta_button {
    box-shadow: 0px 0px 12px 5px #2ab5fb;
  }
}

.banner-dismissed .banner {
  display: none;
}

button#dismiss_button {
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

#herodevs_left_logo,
#herodevs_right_logo {
  display: none;
}

@media (min-width: 320px) {
  .banner {
    --title_text_size: 14px;
    --white_text_size: 10px;
    --banner_container_gap: 0;
  }
}
@media (min-width: 480px) {
  .banner {
    --title_text_size: 15px;
    --white_text_size: 12px;
    --banner_container_gap: 0;
  }
}
@media (min-width: 600px) {
  .banner {
    --title_text_size: 18px;
    --white_text_size: 14px;
    --banner_container_gap: 0;
  }
  .banner {
    --banner_container_gap: 0;
  }
  .cta_button {
    width: 124px;
  }
}
@media (min-width: 801px) {
  .banner {
    --title_text_size: 22px;
    --white_text_size: 14px;
    --banner_container_gap: 0;
  }
  .banner__container {
    padding: 0 72px;
  }
}
@media (min-width: 910px) {
  /* .banner {
    --white_text_size: 16px;
  } */
  #herodevs_left_logo {
    display: block;
  }
}
@media (min-width: 1025px) {
  .banner {
    --banner_container_gap: 20px;
  }
}
@media (min-width: 1281px) {
  #herodevs_right_logo {
    display: block;
    margin-left: 0;
  }
  .banner {
    --title_text_size: 24px;
    --white_text_size: 14px;
    --banner_container_gap: 80px;
  }
}

@media (min-width: 1380px) {
  .banner {
    --title_text_size: 26px;
    --white_text_size: 18px;
  }
  .banner__container .banner__middle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
  .separator {
    display: block;
  }
}
</style>
