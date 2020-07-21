<template>
  <a
    :href="sponsor.url"
    target="_blank"
    rel="noopener"
  >
    <img
      :src="`/images/sponsors/${sponsor.img}`"
      :style="imageStyles"
    />
  </a>
</template>

<script>
export default {
  props: {
    sponsor: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageStyles () {
      const styles = []
      if (this.sponsor.big_width) styles.push(`width:${sponsor.big_width};`)
      if (this.sponsor.big_height) styles.push(`height:${sponsor.big_height};`)
      return styles
    }
  }
}
</script>
