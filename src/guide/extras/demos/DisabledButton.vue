<script setup>
import { ref } from 'vue'

const notActivated = ref(false)

function warnNotActivated() {
  notActivated.value = true
  setTimeout(() => {
    notActivated.value = false
  }, 1500)
}
</script>

<template>
  <div class="demo">
    <div :class="{ shake: notActivated }">
      <button @click="warnNotActivated">Click me</button>
      <span v-if="notActivated" style="margin-left: 20px"
        >This feature is disabled!</span
      >
    </div>
  </div>
</template>

<style>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
