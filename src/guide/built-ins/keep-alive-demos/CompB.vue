<script setup>
let msg = $ref('')
</script>

<template>
  <p>Текущий компонент: B</p>
  <span style="margin-right:20px;">Сообщение: {{ msg }}</span>
  <input v-model="msg">
</template>
