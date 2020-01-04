<template>
  <div id="app-3" class="demo">
    <span v-if="seen">Now you see me</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        seen: true
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