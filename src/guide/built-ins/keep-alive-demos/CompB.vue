<script setup>
import { ref } from 'vue'
const msg = ref('')
</script>

<template>
  <p>Компонент: B</p>
  <span style="margin-right: 20px">Повідомлення: {{ msg }}</span>
  <input v-model="msg">
</template>
