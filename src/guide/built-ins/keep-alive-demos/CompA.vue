<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <p>Componente Corrente: A</p>
  <span style="margin-right: 20px">somma: {{ count }}</span>
  <button @click="count++">+</button>
</template>
