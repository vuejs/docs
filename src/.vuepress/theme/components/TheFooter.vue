<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <footer class="footer">
    {{ text }}
  </footer>
</template>

<style lang="scss">
@import '../styles/variables.scss';

.footer {
  background-color: #475050;
  padding: 2.5rem;
  border-top: 1px solid $borderColor;
  text-align: center;
  padding: 40px 0;
  color: #fff;
  text-align: center;
  word-spacing: 0.05rem;
}
</style>
