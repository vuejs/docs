<template>
  <div id="example-4" class="demo">
    <input type="radio" id="one" value="One" v-model="picked" />
    <label for="one">One</label>
    <br />
    <input type="radio" id="two" value="Two" v-model="picked" />
    <label for="two">Two</label>
    <br />
    <span>Picked: {{ picked }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picked: ''
    }
  }
}
</script>
