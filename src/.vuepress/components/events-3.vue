<template>
  <div id="example-3" class="demo">
    <button v-on:click="say('hi')">Say hi</button>
    <button v-on:click="say('what')">Say what</button>
  </div>
</template>

<script>
export default {
  methods: {
    say(message) {
      alert(message)
    }
  }
}
</script>
