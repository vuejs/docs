<template>
  <div id="vm-banner" role="banner" class="vuemastery-banner" v-if="isVisible">
    <div class="vuemastery-planet"></div>
    <a
      href="https://www.vuemastery.com/black-friday/"
      target="_blank"
      class="vuemastery-banner--link"
      ><img
        src="/images/vuemastery/logo-vuemastery.svg"
        alt="vuemastery"
        class="vuemastery-banner--logo"
      />
      <div class="vuemastery-banner--wrapper">
        <p class="text">
          <span>Vue Mastery's Black Friday Sale:</span>Save over 50% off a year of Vue courses
        </p>
        <button class="vuemastery-button">Get discount</button>
      </div></a
    >
    <div class="vuemastery-banner--close" @click.stop.prevent="close"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const isVisible = ref(false)
onMounted(() => {
  isVisible.value = !localStorage.getItem('VM_FW_22_OFFER_NOV')
  if (isVisible.value) document.body.classList.add('has-top-banner')
})
function close () {
  isVisible.value = false
  document.body.classList.remove('has-top-banner')
  localStorage.setItem('VM_FW_22_OFFER_NOV', 1)
}
</script>

<style>
.vuemastery-banner {
  background: #071532;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  transition: all 2s cubic-bezier(.34,.06,.01,1);
  cursor: pointer;
  z-index: var(--vp-z-index-banner);
}

.vuemastery-banner:after,
.vuemastery-banner:before {
  content: "";
  position: absolute;
  pointer-events: none;
  transition: all 1s cubic-bezier(.34, .06, .01, 1);
  bottom: 0;
}

.vuemastery-banner:after {
  width: 100%;
  position: absolute;
  transition: all 2s cubic-bezier(.34, .06, .01, 1);
  background-image: url(/images/vuemastery/background.png);
  background-position: 50%;
  background-size: 100% auto;
  top: 0;
}

.vuemastery-banner:before {
  height: 100%;
  width: 100%;
}

@media (max-width:400px) {
  .vuemastery-banner--wrapper .text {
    /* color: red; */
    font-size: 0.6rem;
  }
}

@media (max-width:330px) {
  .vuemastery-banner--wrapper .text {
    /* color: yellow; */
    margin-left:10px;
  }
}

@media (min-width:1001px) {

  .vuemastery-banner:hover:after,
  .vuemastery-banner:hover:before {
    transition: all 2s cubic-bezier(.34, .06, .01, 1);
  }

  .vuemastery-banner:hover:before {
    transform: translateX(50%);
  }

  .vuemastery-banner:hover:after {
    transform: scale(1.2);
  }

  .vuemastery-banner:hover .vuemastery-planet {
    transform: rotate(-35deg) scale(10) translateX(40%);
  }

  .vuemastery-banner:hover .vuemastery-planet:after {
    transform: translateX(-93px) scale(1.3);
    opacity: 0;
  }

  .vuemastery-banner:hover .vuemastery-banner--close:after,
  .vuemastery-banner:hover .vuemastery-banner--close:before {
    transform-origin: 100%;
  }

  .vuemastery-banner:hover .vuemastery-banner--close:hover:after,
  .vuemastery-banner:hover .vuemastery-banner--close:hover:before {
    transition: transform .2s ease-in .5s, transform-origin .2s ease-in;
    transform-origin: 50%;
  }

  .vuemastery-banner:hover .vuemastery-button:after {
    left: 120%;
    transition: left 1.5s cubic-bezier(.19, 1, .22, 1);
  }
}

.vuemastery-banner--link {
  display: flex;
  height: 80px;
  justify-content: center;
  overflow: hidden;
  position: relative;
  z-index: 2;
}

@media (max-width:770px) {
  .vuemastery-banner--link {
    justify-content: start;
    height: 65px;
  }
}

.vuemastery-banner--wrapper {
  display: flex;
  height: 100%;
  align-items: center;
  position: relative;
  color: #fff;
  z-index: 3;
  transition: all 2s cubic-bezier(.34, .06, .01, 1);
}

.vuemastery-banner--wrapper p {
  margin: -3px 50px 0 20px;
  font-size: 1.17rem;
  font-weight: 600;
  white-space: nowrap;
  position: relative;
  line-height: 1.7;
}

.vuemastery-banner--wrapper span {
  font-size: 1rem;
  display: block;
}

@media (max-width:770px) {
  .vuemastery-banner--wrapper {
    flex-direction: column;
    width: calc(100% - 172px);
  }

  .vuemastery-banner--wrapper p,
  .vuemastery-banner--wrapper span {
    margin: .5rem 0 0;
    font-size: .8rem;
    color: #fff;
  }
}

@media (max-width:770px) {
  .vuemastery-banner--wrapper span {
    display: none;
  }
}

@media (max-width:330px) {
  .vuemastery-banner--wrapper p {
    font-size: .6rem;
    margin: -3px 28px 0 0;
  }
}

.vuemastery-banner--logo {
  height: 102%;
  margin-top: -1px;
  margin-left: -90px;
  position: relative;
  z-index: 2;
  transition: all 2s cubic-bezier(.34, .06, .01, 1);
}

@media (max-width:770px) {
  .vuemastery-banner--logo {
    margin-left: -40px;
    transform: rotateY(190deg);
    height: 105%;
  }
}

.vuemastery-banner--close {
  height: 100%;
  width: 75px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
}

.vuemastery-banner--close:after,
.vuemastery-banner--close:before {
  content: "";
  width: 25px;
  height: 2px;
  position: absolute;
  top: 39px;
  right: 25px;
  background-color: #fff;
  transform-origin: 50%;
  transform: rotate(-45deg);
  transition: all .2s ease-out;
}

.vuemastery-banner--close:after {
  transform: rotate(45deg);
}

.vuemastery-banner--close:hover:after,
.vuemastery-banner--close:hover:before {
  transform: rotate(180deg);
}

@media (max-width:770px) {

  .vuemastery-banner--close:after,
  .vuemastery-banner--close:before {
    width: 15px;
    top: 19px;
    right: 14px;
  }
}

.vuemastery-promo .navbar {
  position: relative;
}

.vuemastery-promo .sidebar {
  position: absolute;
  top: 7.60625rem;
}

.vuemastery-planet {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  transform-origin: bottom right;
  transition: all 2s cubic-bezier(.34, .06, .01, 1);
}

@media (max-width:770px) {
  .vuemastery-planet {
    transform: translateX(70px);
  }
}

.vuemastery-planet:after,
.vuemastery-planet:before {
  content: "";
  position: absolute;
  pointer-events: none;
  bottom: 0;
  width: 100%;
  top: 0;
  right: 0;
  background-image: url(/images/vuemastery/black-hole.png);
  background-attachment: fixed;
  background-size: auto 200px;
  background-position: top -52px right -24px;
  background-repeat: no-repeat;
}

@media (max-width:770px) {
  .vuemastery-planet:before {
    background-size: auto 200px;
    background-position: top -81px right -82px;
  }
}

.vuemastery-planet:after {
  background-image: url(/images/vuemastery/planets.png);
  transition: all 3s cubic-bezier(.34, .06, .01, 1);
  background-position: left -80px top -80px;
  background-size: auto 180px;
}

@media (max-width:770px) {
  .vuemastery-planet:after {
    display: none;
  }
}

@media print {
  .vuemastery-banner {
    display: none;
  }
}

.vuemastery-button {
  display: inline-flex;
  background: linear-gradient(to top right, #3d2c61, #835ec2);
  height: 38px;
  margin: .5em 0;
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
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}

.vuemastery-button:after,
.vuemastery-button:before {
  background: linear-gradient(to top right, transparent, #fff);
  content: "";
  height: 150px;
  left: -175px;
  opacity: .1;
  position: absolute;
  top: -50px;
  transform: rotate(35deg);
  width: 100px;
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