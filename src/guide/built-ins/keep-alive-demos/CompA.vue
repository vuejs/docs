<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <p>Aktualny komponent: A</p>
  <span style="margin-right: 20px">Licznik: {{ count }}</span>
  <button @click="count++">+</button>
</template>
