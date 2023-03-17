<script setup lang="ts">
import { ref, watch } from 'vue'

const VIDEO_SOURCE = 'https://player.vimeo.com/video/647441538?autoplay=1'
const showWhyVue = ref(false)

watch(
  () => showWhyVue,
  (value) => {
    value
      ? (document.documentElement.style.overflow = 'hidden')
      : (document.documentElement.style.overflow = 'auto')
  }
)
</script>

<template>
  <a
    id="vuemastery-action"
    class="why-vue"
    @click="showWhyVue = true"
    href="javascript:;"
  >
    <svg
      class="icon-play"
      aria-labelledby="simpleicons-play-icon"
      role="img"
      viewBox="0 0 100 125"
      fill="#FFFFFF"
    >
      <title id="simpleicons-play-icon" lang="en">Play icon</title>
      <path
        d="M50,3.8C24.5,3.8,3.8,24.5,3.8,50S24.5,96.2,50,96.2S96.2,75.5,96.2,50S75.5,3.8,50,3.8z M71.2,53.3l-30.8,18  c-0.6,0.4-1.3,0.5-1.9,0.5c-0.6,0-1.3-0.1-1.9-0.5c-1.2-0.6-1.9-1.9-1.9-3.3V32c0-1.4,0.8-2.7,1.9-3.3c1.2-0.6,2.7-0.6,3.8,0  l30.8,18c1.2,0.6,1.9,1.9,1.9,3.3S72.3,52.7,71.2,53.3z"
      ></path>
    </svg>
    Why Vue
  </a>
  <Teleport v-if="showWhyVue" to="body">
    <div
      @click="showWhyVue = false"
      class="vuemastery-modal-mask"
    >
      <div class="vuemastery-modal-wrapper">
        <div class="vuemastery-modal-container">
          <div class="vuemastery-modal-content">
            <div class="vuemastery-video-space">
              <iframe
                :src="VIDEO_SOURCE"
                style="
                  height: 100%;
                  left: 0;
                  position: absolute;
                  top: 0;
                  width: 100%;
                  border-radius: 6px;
                "
                frameborder="0"
                webkitallowfullscreen
                mozallowfullscreen
                allowfullscreen
                allow="autoplay"
              ></iframe>
            </div>
          </div>

          <div class="vuemastery-modal-footer">
            <p class="vuemastery-modal-footer-text">
              Video by
              <a
                href="https://www.vuemastery.com"
                target="_blank"
                rel="sponsored noopener"
                title="Vue.js Courses on Vue Mastery"
              >
                Vue Mastery.</a
              > Watch Vue Mastery’s free
              <a
                href="https://www.vuemastery.com/courses/intro-to-vue-3/intro-to-vue3"
                target="_blank"
                rel="sponsored noopener"
                title="Vue.js Courses on Vue Mastery"
              >
                Intro to Vue course.</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
#vuemastery-action {
  font-size: 16px;
  display: inline-block;
  border-radius: 8px;
  transition: background-color 0.5s, color 0.5s;
  position: relative;
  font-weight: 600;
  background-color: var(--vt-c-green);
  color: #fff;
  margin-right: 18px;
  padding: 8px 1em 8px 3em;
}

.dark #vuemastery-action {
  color: var(--vt-c-indigo);
}

#vuemastery-action:hover {
  background-color: var(--vt-c-green-dark);
  transition-duration: 0.2s;
}

.dark #vuemastery-action:hover {
  background-color: var(--vt-c-green-light);
}

.icon-play {
  display: inline;
  position: absolute;
  left: 15px;
  top: 8px;
  margin-left: 2px;
  fill: currentColor;
  width: 1.5em;
}

.vuemastery-modal-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 30;
  transition: opacity 0.3s ease;
}

.vuemastery-modal-wrapper {
  display: block;
  box-sizing: border-box;
  border-radius: 8px;
  position: fixed;
  width: 75%;
  height: auto;
  padding: 0.5em;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgb(0 0 0 / 20%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 40;
}

.dark .vuemastery-modal-wrapper {
  background-color: var(--vt-c-bg-soft);
}

.vuemastery-modal-content {
  margin-bottom: 10px;
}

.vuemastery-video-space {
  position: relative;
  padding: 56.25% 0 0 0;
}

.vuemastery-modal-footer-text {
  color: var(--vt-c-text-2);
  margin-bottom: 0.5em;
  text-align: center;
  word-spacing: 0.05em;
  font-size: 12px;
}

.vuemastery-modal-footer-text a {
  color: #42b983;
  font-weight: 600;
}

.dark .vuemastery-modal-footer-text {
  color: var(--vt-c-text-2);
  font-weight: 600;
}

@media (max-width: 576px) {
  #vuemastery-action {
    display: block;
    margin: 0px auto;
    width: 150px;
  }
}
</style>
