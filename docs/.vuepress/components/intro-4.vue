<template>
  <div id="app-4" class="demo">
    <ol>
      <li v-for="todo in todos">
        {{ todo.text }}
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        todos: [
          { text: 'Learn JavaScript' },
          { text: 'Learn Vue' },
          { text: 'Build something awesome' }
        ]
      }
    },
  }
</script>

<style scoped>
  .demo {
    border: 1px solid #eee;
    border-radius: 2px;
    padding: 25px 35px;
    margin-top: 1em;
    margin-bottom: 40px;
    user-select: none;
    overflow-x: auto;
  }
</style>