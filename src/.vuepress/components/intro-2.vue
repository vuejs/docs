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