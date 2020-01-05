<template>
  <div id="app-6" class="demo">
    <p>{{ message }}</p>
    <input v-model="message">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: 'Hello Vue!'
      }
    },
  }
</script>