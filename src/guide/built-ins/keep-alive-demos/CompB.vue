<script setup>
import { ref } from 'vue'
const msg = ref('')
</script>

<template>
  <p>Aktualny komponent: B</p>
  <span style="margin-right: 20px">Wiadomość: {{ msg }}</span>
  <input v-model="msg">
</template>
