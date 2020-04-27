<template>
  <a target="_blank" rel="noopener sponsored" :href="sponsor.url">
    <img :src="`/images/sponsors/${sponsor.img}`" :alt="`${sponsor.name} logo`" width="160">
    <span class="description">{{ sponsor.description }}</span>
  </a>
</template>

<script>
export default {
  props: {
    sponsor: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@theme/styles/_settings.scss";

a {
  text-align: center;
  color: $medium;
  font-weight: normal;
  padding: 0 10px;
  line-height: 1.6;
}

span {
  display: block;
  margin-top: .8rem;
}
</style>
