<template>
  <div class="demo">
    <p>Counter: {{ counter }}</p>
    <button @click="clearInterval">Stop timer</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
      interval: null
    }
  },
  methods: {
    clearInterval() {
      clearInterval(this.interval)
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.counter++
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}
</style>
