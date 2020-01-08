<template>
  <div id="example" class="demo">
    <p>Original message: "{{ message }}"</p>
    <p>Computed reversed message: "{{ reversedMessage }}"</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: 'Hello'
      }
    },
      computed: {
        reversedMessage: function () {
          return this.message.split('').reverse().join('')
        }
      }
  }
</script>