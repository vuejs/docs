---
home: true
heroImage: /logo.png
heroText: Vue.js
tagline: The Progressive<br> JavaScript Framework
actionButtons:
- text: Why Vue.js?
  link: /
  extraClass: modal-button primary
  icon: fa fa-play-circle
- text: Get Started
  link: /guide/introduction
- text: GitHub
  link: https://github.com/vuejs/vue
  extraClass: github grey
  icon: fab fa-github
  target: _blank
features:
- title: Approachable
  details: Already know HTML, CSS and JavaScript? Read the guide and start building things in no time!
- title: Versatile
  details: An incrementally adoptable ecosystem that scales between a library and a full-featured framework.
- title: Performant
  details: |
    20KB min+gzip Runtime<br>
    Blazing Fast Virtual DOM<br>
    Minimal Optimization Efforts
footer: |
  Released under the <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener">MIT License</a><br>
  Copyright © 2014-2020 Evan You
socialIcons:
- type: GitHub
  link: https://github.com/vuejs/vue
- type: Twitter
  link: https://twitter.com/vuejs
- type: Medium
  link: https://medium.com/the-vue-point
---

<div id="video-modal" class="modal">
  <div class="video-space" style="padding: 56.25% 0 0 0; position: relative;">
    <iframe 
      src="https://player.vimeo.com/video/247494684?dnt=1" 
      style="height: 100%; left: 0; position: absolute; top: 0; width: 100%; margin: 0" 
      frameborder="0" 
      webkitallowfullscreen 
      mozallowfullscreen 
      allowfullscreen
    ></iframe>
  </div>

  <p class="modal-text">
    Video by 
    <a 
      href="https://www.vuemastery.com" 
      target="_blank" 
      rel="sponsored noopener" 
      title="Vue.js Courses on Vue Mastery"
    >Vue Mastery</a>. 
    Watch Vue Mastery’s free 
    <a 
      href="https://www.vuemastery.com/courses/intro-to-vue-js/vue-instance/" 
      target="_blank" 
      rel="sponsored noopener" 
      title="Vue.js Courses on Vue Mastery"
    >Intro to Vue course</a>.
  </p>
</div>

<script>
export default {
  methods: {
    initVideoModal () {
      const modalButton = document.querySelector('.modal-button')
      const videoModal = document.querySelector('#video-modal')

      if (!modalButton || !videoModal) {
        return
      }

      const player = new Vimeo.Player(document.querySelector('iframe'))
      const overlay = document.createElement('div')
      overlay.className = 'overlay'
      let isOpen = false

      modalButton.addEventListener('click', event => {
        event.stopPropagation()
        videoModal.classList.toggle('open')
        document.body.classList.toggle('stop-scroll')
        document.body.appendChild(overlay)
        player.play()
        isOpen = true
      })

      document.body.addEventListener('click', event => {
        if (isOpen && event.target !== modalButton && !videoModal.contains(event.target)) {
          videoModal.classList.remove('open')
          document.body.classList.remove('stop-scroll')
          document.body.removeChild(overlay)
          player.unload()
          isOpen = false
        }
      })
    }
  },

  mounted () {
    if (typeof window !== 'undefined') {
      this.initVideoModal()
    }
  }
}
</script>

<style lang="scss">
@import "@theme/styles/_settings.scss";

.modal {
  box-sizing: border-box;
  display: none;
  position: fixed;
  width: 75%;
  height: auto;
  padding: 0.5em;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);

  &.open {
    display: block;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
  }
}

.modal-text {
  margin-bottom: 0.5em;
  text-align: center;
}

.modal-text > a {
  color: $green;
  font-weight: 600;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.2);
  z-index: 98;
}

.stop-scroll {
  overflow: hidden;
  height: 100%;
}

@media screen and (max-width: 400px) {
  .modal {
    width: 98%;
  }
}
</style>