<template>
  <div>
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">
      Enlarge text
    </button>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>
