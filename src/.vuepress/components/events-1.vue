<template>
  <div id="example-1" class="demo">
    <button v-on:click="counter += 1">Add 1</button>
    <p>The button above has been clicked {{ counter }} times.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 1
    }
  }
}
</script>
