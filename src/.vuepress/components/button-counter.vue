<template>
  <button v-on:click="count++">You clicked me {{ count }} times.</button>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<style lang="scss" scoped></style>
