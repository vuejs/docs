<template>
  <a
    v-if="isVisible"
    id="vs"
    href="https://vueschool.io/free-weekend?friend=vuejs"
    target="_blank"
    rel="noreferrer"
  >
    <div class="vs-logo">
      <img src="/images/vueschool/vs-iso.svg" class="logo-small">
      <img src="/images/vueschool/vs-logo.svg" class="logo-big">
    </div>
    <div class="vs-core">
      <div class="vs-slogan">
        <div class="vs-slogan-subtitle">
          VUE 3 MASTERCLASS - FREE WEEKEND
        </div>
        <div class="vs-slogan-title">
          Register at <strong>vueschool.io/free-weekend</strong>
        </div>
      </div>
      <div class="vs-button">
        Free Access
      </div>
    </div>
    <div id="vs-close" class="vs-close" @click.stop.prevent="close">
      <img src="/images/vueschool/vs-close.svg" alt="Close">
    </div>
  </a>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  isVisible.value = !localStorage.getItem('VS_FW_22')
  if (isVisible.value) document.body.classList.add('has-top-banner')
})

function close () {
  isVisible.value = false
  document.body.classList.remove('has-top-banner')
  localStorage.setItem('VS_FW_22', 1)
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;600&display=swap');

#vs {
  align-items: center;
  background-color: #000c19;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  font-family: 'Archivo', Roboto, Oxygen, Fira Sans, Helvetica Neue, sans-serif;
  justify-content: center;
  position: fixed;
  padding: 0 10px;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100;
  height: 5rem;
  line-height: 1;
  background-image: url(/images/vueschool/vs-fw-bg.svg);
  background-size: cover;
  background-repeat: no-repeat;
}

#vs:hover {
  text-decoration: none;
}

#vs .vs-logo {
  position: absolute;
  left: 20px;
  top: 20px;
}

#vs .vs-logo .logo-small {
  display: none;
}

#vs .vs-logo .logo-big {
  display: none;
}

#vs:hover .vs-core .vs-button {
  background: linear-gradient(261deg, #e61463 100%, #db5248 3%);
  border-color: #e61463;
}

#vs .vs-core .vs-slogan {
  color: #fff;
  margin-left: 8px;
  text-align: center;
}

#vs .vs-core {
  align-items: center;
  display: flex;
  justify-content: center;
}

#vs .vs-core .vs-slogan .vs-slogan-subtitle {
  font-size: 14px;
  color: #47b785;
  font-weight: bold;
}

#vs .vs-core .vs-slogan .vs-slogan-title {
  margin-top: 6px;
  font-size: 16px;
}

#vs .vs-core .vs-slogan .vs-slogan-title strong {
  color: #48a0ff;
  font-weight: 400;
}

#vs .vs-core .vs-button {
  color: #fff;
  padding: 7px 10px;
  font-weight: 600;
  white-space: nowrap;
  margin-right: 18px;
  margin-left: 16px;
  object-fit: contain;
  border-radius: 30px;
  border-style: solid;
  border-width: 2px;
  background-image: linear-gradient(255deg, #d457d0 98%, #ed81eb 2%), linear-gradient(to bottom, #b349b0, #db61d9);
  text-transform: uppercase;
  border-color: #B349B0;
  display: none;
}

#vs .vs-close {
  right: 6px;
  position: absolute;
}

#vs .vs-close:hover {
  color: #56d8ff;
}

.has-top-banner {
  --vt-banner-height: 104px;
}

.has-top-banner .banner {
  height: 24px;
  line-height: 24px;
  top: 80px;
}

@media (min-width: 680px) {
  #vs .vs-core .vs-slogan {
    margin-left: 24px;
  }

  #vs .vs-core .vs-slogan .vs-slogan-subtitle {
    font-size: 18px;
  }

  #vs .vs-core .vs-slogan .vs-slogan-title {
    font-size: 18px;
  }

  #vs .vs-core .vs-button {
    display: inline-block;
    margin-right: 0;
    padding: 8px 24px;
    margin-left: 22px;
  }

  #vs .vs-close {
    padding: 10px;
    right: 20px;
  }
}

@media (min-width: 768px) {
  #vs .vs-logo .logo-small {
    display: inline-block;
  }
}

@media (min-width: 1024px) {
  #vs .vs-logo .logo-small {
    display: none;
  }

  #vs .vs-logo .logo-big {
    display: inline-block;
  }

  #vs .vs-core .vs-button {
    margin-left: 69px;
  }
}
</style>
