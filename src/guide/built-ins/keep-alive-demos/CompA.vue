<script setup>
let count = $ref(0)
</script>

<template>
  <p>Компонент: A</p>
  <span style="margin-right: 20px">Рахунок: {{ count }}</span>
  <button @click="count++">+</button>
</template>
