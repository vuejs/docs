<template>
  <div id="example-6" class="demo">
    <select v-model="selected" multiple style="width: 50px;">
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <br />
    <span>Selected: {{ selected }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: []
    }
  }
}
</script>
