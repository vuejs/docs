<script setup>
import { ref, reactive, watch } from 'vue'
import gsap from 'gsap'

const number = ref(0)
const tweened = reactive({
  number: 0
})

watch(
  number,
  (n) => {
    gsap.to(tweened, { duration: 0.5, number: Number(n) || 0 })
  }
)
</script>

<template>
  <div class="demo">
    Type a number: <input v-model.number="number" />
    <p class="big-number">{{ tweened.number.toFixed(0) }}</p>
  </div>
</template>

<style>
.big-number {
  font-weight: bold;
  font-size: 2em;
}
</style>
