<template>
  <div id="app-5" class="demo">
    <p>{{ message }}</p>
    <button v-on:click="reverseMessage">Reverse Message</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: 'Hello Vue.js!'
      }
    },
    methods: {
      reverseMessage: function () {
        this.message = this.message.split('').reverse().join('')
      }
    }
  }
</script>