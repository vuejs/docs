<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>

<template>
  <div class="demo">
    <button @click="show = !show">Toggle Slide + Fade</button>
    <Transition name="slide-fade">
      <p style="margin-top: 20px" v-if="show">hello</p>
    </Transition>
  </div>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
