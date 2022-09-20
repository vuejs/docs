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
  localStorage.setItem(`vue-docs-banner-${window.__VUE_BANNER_ID__}`, 'true')
}
</script>

<template>
  <div class="banner" v-if="open">
    <a
      id="vs"
      href="https://vueschool.io/free-weekend?friend=vuejs&utm_source=vuejs&utm_medium=website&utm_campaign=affiliate&utm_content=top_banner"
      target="_blank"
      rel="noreferrer">
      <div
        class="vs-background-wrapper">
        <div class="vs-logo">
          <img src="/images/vueschool/vs-iso.svg" class="logo-small">
          <img src="/images/vueschool/vs-logo.svg" class="logo-big">
        </div>
        <div class="vs-core">
          <div class="vs-slogan-wrapper">
            <div class="vs-slogan">
              Free Weekend 1st & 2nd of October
            </div>
            <div class="vs-subline">
              Get Access to ALL Vue School premium courses
            </div>
          </div>
          <div class="vs-button-wrapper">
            <div class="vs-button">
              Join for Free
            </div>
          </div>
        </div>
        <div
          id="vs-close"
          class="vs-close"
          @click.stop.prevent="dismiss">
          <img src="/images/vueschool/close.svg" alt="Close">
        </div>
      </div>
    </a>
  </div>
</template>

<style>
html:not(.banner-dismissed) {
  --vt-banner-height: 72px;
}

#vs {
  background-color: #0A1124;
  box-sizing: border-box;
  color: #fff;
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100;
  height: 72px;
  background: linear-gradient(to left, #161a35, #283065);
  line-height: 1;
}

#vs .vs-background-wrapper {
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 0 10px;
  height: 100%;
  width: 100%;
  background-image: url(/images/vueschool/bg-mobile.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top right;
}

#vs:hover {
  text-decoration: none;
}

#vs:hover .vs-core .vs-button {
  background-image: linear-gradient(to bottom, #5ccc45, #419E2D), linear-gradient(to bottom, #388f26, #50b83b);
}

#vs .vs-logo {
  position: absolute;
  left: 10px;
}

#vs .vs-logo .logo-big {
  display: none;
}

#vs .vs-core {
  display: flex;
  align-items: center;
  width: 288px;
}

#vs .vs-core .vs-slogan-wrapper {
  text-align: center;
  width: 170px;
  margin: 0 auto;
}

#vs .vs-core .vs-slogan {
  color: #fff;
  font-weight: bold;
  font-size: 10px;
}

#vs .vs-core .vs-subline {
  color: #c6cdf7;
  font-size: 10px;
  margin-top: 4px;
}

#vs .vs-core .vs-button-wrapper {
  padding: 2px;
  background-image: linear-gradient(to bottom, #388f26, #50b83b);
  border-radius: 60px;
  overflow: hidden;
}

#vs .vs-core .vs-button {
  border-radius: 60px;
  color: #FFF;
  padding: 8px 6px;
  background-image: linear-gradient(to bottom, #5ccc45, #368c24), linear-gradient(to bottom, #388f26, #50b83b);
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  font-size: 10px;
  letter-spacing: 0.3px;
  white-space: nowrap;
}

#vs .vs-close {
  right: 0;
  position: absolute;
  padding: 10px;
}

#vs .vs-close:hover {
  color: #56d8ff;
}

@media (min-width: 680px) {
  #vs .vs-background-wrapper {
    background-image: url(/images/vueschool/bg-tablet.svg);
  }

  #vs .vs-logo {
    left: 20px;
  }

  #vs .vs-logo .logo-small {
    display: none;
  }

  #vs .vs-logo .logo-big {
    display: inline-block;
    width: 90px;
  }

  #vs .vs-core {
    width: auto;
    margin-right: -60px;
  }

  #vs .vs-core .vs-slogan-wrapper {
    margin: 0 12px 0 0;
    width: auto;
  }

  #vs .vs-core .vs-slogan {
    font-size: 16px;
  }

  #vs .vs-core .vs-subline {
    font-size: 15px;
    text-align: left;
  }

  #vs .vs-core .vs-button {
    font-size: 13px;
    padding: 8px 15px;
  }

  #vs .vs-close {
    right: 20px;
  }
}

@media (min-width: 900px) {
  #vs .vs-background-wrapper {
    background-image: url(/images/vueschool/bg-desktop.svg);
    background-position: top right -300px;
  }

  #vs .vs-logo .logo-big {
    display: inline-block;
    width: auto;
  }

  #vs .vs-core {
    margin-right: 0;
  }
}

@media (min-width: 1280px) {
  #vs .vs-background-wrapper {
    background-position: top right;
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
  background-color: var(--vt-c-green);
}

.banner-dismissed .banner {
  display: none;
}
</style>
