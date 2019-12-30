<template>
  <div id="app-2" class="demo">
    <span v-bind:title="message">
      Hover your mouse over me for a few seconds to see my dynamically bound title!
    </span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: 'You loaded this page on ' + new Date().toLocaleString()
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

  span {
    margin-bottom: 0;
    margin-top: 0;
  }
</style>