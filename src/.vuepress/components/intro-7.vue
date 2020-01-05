<template>
  <div id="app-7" class="demo">
    <ol>
      <todo-item v-for="item in groceryList" v-bind:todo="item" :key="item.id"></todo-item>
    </ol>
  </div>
</template>

<script>
  import Vue from 'vue/dist/vue.js'
  export default {
    data() {
      return {
        groceryList: [
          { id: 0, text: 'Vegetables' },
          { id: 1, text: 'Cheese' },
          { id: 2, text: 'Whatever else humans are supposed to eat' }
        ]
      }
    },
    components: {
      'todo-item': Vue.component('todo-item', {
        props: ['todo'],
        template: '<li>{{ todo.text }}</li>'
      })
    }
  }
</script>