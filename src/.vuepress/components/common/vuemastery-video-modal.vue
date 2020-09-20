<template>
  <div class="overlay" v-show="isOpen">
    <div ref="modal" class="modal" :class="{ open: isOpen }">
      <div
        class="video-space"
        style="padding: 56.25% 0 0 0; position: relative;"
      >
        <iframe
          src="https://player.vimeo.com/video/455611549?dnt=1"
          style="height: 100%; left: 0; position: absolute; top: 0; width: 100%; margin: 0"
          frameborder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
          allow="autoplay"
          ref="videoIframe"
        ></iframe>
      </div>

      <p class="modal-text">
        Video by
        <a
          href="https://www.vuemastery.com"
          target="_blank"
          rel="sponsored noopener"
          title="Vue.js Courses on Vue Mastery"
          >Vue Mastery</a
        >. Watch Vue Mastery’s free
        <a
          href="https://www.vuemastery.com/courses/intro-to-vue-3/intro-to-vue3"
          target="_blank"
          rel="sponsored noopener"
          title="Vue.js Courses on Vue Mastery"
          >Intro to Vue course</a
        >.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    triggerSelector: {
      type: String,
      default: '.vuemastery-trigger'
    }
  },

  data: () => ({
    isOpen: false
  }),

  methods: {
    initVideoModal() {
      const modalButton = document.querySelector(this.triggerSelector)
      const player = new Vimeo.Player(this.$refs.videoIframe)

      modalButton.addEventListener('click', event => {
        event.stopPropagation()
        this.isOpen = true
        document.body.classList.toggle('stop-scroll')
        player.play()
      })

      document.body.addEventListener('click', event => {
        if (
          this.isOpen &&
          event.target !== modalButton &&
          !this.$refs.modal.contains(event.target)
        ) {
          this.isOpen = false
          document.body.classList.remove('stop-scroll')
          player.pause()
        }
      })
    }
  },

  mounted() {
    if (typeof window !== 'undefined') {
      this.initVideoModal()
    }
  }
}
</script>

<style lang="scss">
@import '@theme/styles/_settings.scss';

.modal {
  box-sizing: border-box;
  position: fixed;
  width: 75%;
  height: auto;
  padding: 0.5em;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
}

.modal-text {
  margin-bottom: 0.5em;
  text-align: center;

  > a {
    color: $green;
    font-weight: 600;
  }
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 98;
}

.stop-scroll {
  overflow: hidden;
  height: 100%;
}

@media screen and (max-width: $MQMobileNarrow) {
  .modal {
    width: 98%;
  }
}
</style>
