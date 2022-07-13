<template>
<div id="vm-banner" class="vuemastery-banner" role="banner" v-if="isVisible">
  <a
    id="vs"
    href="https://www.vuemastery.com/free-weekend"
    target="_blank"
    rel="noreferrer"
    role="banner"
  >
    <div class="vuemastery-banner--wrapper">
      <img class="vuemastery-banner--logo" src="/images/vuemastery/logo-vuemastery.svg" alt="vuemastery" />
      <p>Access the highest quality library of Vue courses free<span>July 22-24 only</span></p>
        <button class="vuemastery-button">Secure a spot</button>
    </div>
    <div id="vm-close" class="vuemastery-banner--close" @click.stop.prevent="close"></div>
  </a>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  const now = new Date()
  const end = new Date('2022-07-25T00:00:00+02:00')
  isVisible.value = !localStorage.getItem('VM_FW_22_OFFER') && (now < end)
  if (isVisible.value) document.body.classList.add('has-top-banner')
})

function close () {
  isVisible.value = false
  document.body.classList.remove('has-top-banner')
  localStorage.setItem('VM_FW_22_OFFER', 1)
}
</script>

<style>
.vuemastery-banner {
  background: url("../images/vuemastery/background-vuemastery.svg") center center no-repeat;
  background-size: 100% auto;
  overflow: hidden;
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  transition: all 0.3s ease-out 0.1s;
}
.vuemastery-banner:before {
  content: '';
  background: url("../images/vuemastery/background-bubbles-vuemastery.svg") left center no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: all 0.3s ease-out 0.1s;
  transform: scale(1.1);
}
.vuemastery-banner:after {
  content: '';
  background: url("../images/vuemastery/lock-vuemastery.svg") right center no-repeat;
  background-size: auto 100%;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}
.vuemastery-banner:hover {
  background-size: 150% auto;
}
.vuemastery-banner:hover:before {
  transform: scale(1);
}
.vuemastery-banner:hover:after {
  background-image: url("../images/vuemastery/unlock-vuemastery.svg");
}
.vuemastery-banner a {
  display: flex;
  height: 80px;
  justify-content: center;
}
.vuemastery-banner--wrapper {
  display: flex;
  height: 100%;
  align-items: center;
  width: 100%;
  justify-content: center;
  position: relative;
}
.vuemastery-banner--wrapper:before {
  content: '';
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 0;
  transition: width 0.3s ease-out;
}
.vuemastery-banner--wrapper:hover + .vuemastery-banner--close:before,
.vuemastery-banner--wrapper:hover + .vuemastery-banner--close:after {
  transform-origin: 100%;
}
.vuemastery-banner--wrapper p {
  margin: -3px 50px 0 20px;
  font-size: 1rem;
  color: #fff;
  position: relative;
  transition-delay: 0.15s;
}
.vuemastery-banner--wrapper span {
  font-weight: 600;
  display: block;
  color: #beff74;
  background: -webkit-linear-gradient(#41e281, #beff74);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.vuemastery-banner--logo {
  height: 102%;
  margin-top: -1px;
  margin-left: -200px;
  position: relative;
  z-index: 2;
}
.vuemastery-banner--close {
  position: absolute;
  top: 20px;
  right: 25px;
  height: 40px;
  width: 40px;
  -webkit-tap-highlight-color: transparent;
  border-radius: 50%;
  cursor: pointer;
}
.vuemastery-banner--close:before,
.vuemastery-banner--close:after {
  content: '';
  position: absolute;
  top: 19px;
  left: 14px;
  width: 25px;
  height: 2px;
  background-color: #fff;
  transform-origin: 50%;
  transform: rotate(-45deg);
  transition: all 0.2s ease-out;
}
.vuemastery-banner--close:after {
  transform: rotate(45deg);
}
.vuemastery-button {
  display: inline-flex;
  background: linear-gradient(to top right, #3d2c61, #835ec2);
  height: 38px;
  margin: 0.5em 0;
  line-height: 38px;
  padding: 0 30px;
  color: #fff;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  outline: 0;
  text-transform: uppercase;
  border: none;
  border-radius: 36px;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.vuemastery-button:before,
.vuemastery-button:after {
  background: linear-gradient(to top right, transparent, #fff);
  content: "";
  height: 150px;
  left: -175px;
  opacity: 0.1;
  position: absolute;
  top: -50px;
  transform: rotate(35deg);
  width: 100px;
}
.vuemastery-weekend-promo #mobile-bar,
.vuemastery-weekend-promo #mobile-bar.top {
  position: relative;
  background-color: #fff;
}
.vuemastery-weekend-promo.docs:not(.vuemastery-menu-fixed) {
  padding-top: 0;
}
.vuemastery-weekend-promo.docs:not(.vuemastery-menu-fixed) #header {
  position: relative;
  width: auto;
}
.vuemastery-weekend-promo.vuemastery-menu-fixed #mobile-bar {
  position: fixed;
}
@media screen and (min-width: 901px) {
  .vuemastery-weekend-promo.docs:not(.vuemastery-menu-fixed) #main.fix-sidebar .sidebar {
    position: absolute;
    top: 141px;
  }
  .vuemastery-weekend-promo.docs:not(.vuemastery-menu-fixed) #sidebar-sponsors-platinum-right {
    position: absolute;
    top: 170px;
  }
  .vuemastery-weekend-promo.vuemastery-menu-fixed.docs .vuemastery-banner {
    margin-bottom: 0;
  }
  .vuemastery-banner--wrapper span {
    font-size: 1.17rem;
  }
}
@media screen and (max-width: 1200px) {
  .vuemastery-banner,
  .vuemastery-banner:hover {
    background-size: cover;
  }
  .vuemastery-banner:before {
    transform: scale(1);
  }
  .vuemastery-banner:hover:before {
    transform: scale(1);
  }
}
@media screen and (max-width: 1100px) {
  .vuemastery-button {
    display: none;
  }
}
@media screen and (max-width: 900px) {
  .vuemastery-weekend-promo.vuemastery-menu-fixed .vuemastery-banner {
    margin-bottom: 40px;
  }
  .vuemastery-banner:after {
    background-position: right -6rem center;
  }
}
@media screen and (max-width: 700px) {
  .vuemastery-banner a {
    overflow: hidden;
  }
  .vuemastery-banner .vuemastery-banner--logo {
    margin-left: 0;
    justify-content: flex-start;
  }
  .vuemastery-banner p,
  .vuemastery-banner span {
    line-height: 18px;
    color: #fff;
  }
  .vuemastery-banner p {
    max-width: 230px;
  }
  .vuemastery-banner .vuemastery-banner--close {
    right: 0px;
  }
  .vuemastery-banner .vuemastery-banner--close:before,
  .vuemastery-banner .vuemastery-banner--close:after {
    top: 19px;
    left: 14px;
    width: 15px;
    height: 2px;
  }
  .vuemastery-banner:after {
    display: none;
  }
}
@media screen and (max-width: 465px) {

  .vuemastery-banner p {
    max-width: 185px;
  }
  .vuemastery-banner:after {
    background-position: right -3rem center;
  }
}
@media screen and (max-width: 400px) {
  .vuemastery-banner p {
    font-size: 0.6rem;
    margin: -3px 28px 0 0px;
    max-width: 140px;
  }
}
@media print {
  .vuemastery-banner {
    display: none;
  }
}


.has-top-banner {
  --vt-banner-height: 80px;
}

.has-top-banner .banner {
  height: 24px;
  line-height: 24px;
  top: 80px;
}
</style>
