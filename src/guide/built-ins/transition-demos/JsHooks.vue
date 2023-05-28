<script setup>
import { ref } from 'vue'
import gsap from 'gsap'

const show = ref(true)

function onBeforeEnter(el) {
  gsap.set(el, {
    scaleX: 0.25,
    scaleY: 0.25,
    opacity: 1
  })
}

function onEnter(el, done) {
  gsap.to(el, {
    duration: 1,
    scaleX: 1,
    scaleY: 1,
    ease: 'elastic.inOut(2.5, 1)',
    onComplete: done
  })
}

function onLeave(el, done) {
  gsap.to(el, {
    duration: 0.7,
    scaleX: 1,
    scaleY: 1,
    x: 300,
    ease: 'elastic.inOut(2.5, 1)'
  })
  gsap.to(el, {
    duration: 0.2,
    delay: 0.5,
    opacity: 0,
    onComplete: done
  })
}
</script>

<template>
  <div class="demo">
    <button @click="show = !show">Toggle</button>

    <Transition
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
      :css="false"
    >
      <div class="gsap-box" v-if="show"></div>
    </Transition>
  </div>
</template>

<style>
.gsap-box {
  background: var(--vt-c-green);
  margin-top: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
