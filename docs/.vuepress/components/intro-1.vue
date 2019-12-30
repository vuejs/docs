<template>
  <div id="app" class="demo">
    {{ message }}
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

<style scoped>
  .demo {
    border: 1px solid #eee;
    border-radius: 2px;
    padding: 25px 35px;
    margin-top: 1em;
    margin-bottom: 40px;
    user-select: none;
    overflow-x: auto;
  }
</style>