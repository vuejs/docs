<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <p>Current component: A</p>
  <span style="margin-right: 20px">Count: {{ count }}</span>
  <button @click="count++">+</button>
</template>
