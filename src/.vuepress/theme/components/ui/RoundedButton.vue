<template>
  <a :href="url">
    <slot>Text</slot>
  </a>
</template>

<script>
export default {
  props: {
    url: {
      required: true,
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@theme/styles/_settings.scss";

a {
  color: $green;
  display: inline-block;
  width: auto;
  border-radius: 9999px;
  transition: all 0.15s ease;
  border: 1px solid $green;
  padding: 12px 24px;
  text-decoration: none !important;

  &:hover {
    background: $green;
    color: #fff;
  }
}
</style>
