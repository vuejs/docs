<script setup>
let msg = $ref('')
</script>

<template>
  <p>Компонент: B</p>
  <span style="margin-right: 20px">Повідомлення: {{ msg }}</span>
  <input v-model="msg">
</template>
