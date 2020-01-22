<template>
  <ul id="example-1" class="demo">
    <li v-for="item in items">
      {{ item.message }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      items: [{ message: 'Foo' }, { message: 'Bar' }]
    }
  }
}
</script>
