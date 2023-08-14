<script setup>
import { ref } from 'vue'
const msg = ref('')
</script>

<template>
  <p>Componente Corrente: B</p>
  <span style="margin-right: 20px">Il Messaggio è: {{ msg }}</span>
  <input v-model="msg">
</template>
