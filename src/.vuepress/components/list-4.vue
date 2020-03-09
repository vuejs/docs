<template>
  <ul id="v-for-object" class="demo">
    <li v-for="(value, name) in myObject">{{ name }}: {{ value }}</li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      myObject: {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      }
    }
  }
}
</script>
