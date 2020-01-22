<template>
  <div id="app-7" class="demo">
    <ol>
      <li v-for="item in groceryList" :key="item.id">{{ item.text }}</li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groceryList: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' }
      ]
    }
  }
}
</script>
