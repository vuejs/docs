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