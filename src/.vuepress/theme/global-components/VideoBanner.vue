<script>
export default {
  name: 'VideoBanner',
  props: {
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <a
    :href="url"
    :title="title"
    class="video-banner"
    target="_blank"
    rel="sponsored noopener"
  >
    <slot />
  </a>
</template>

<style lang="scss" scoped>
.video-banner {
  box-sizing: border-box;
  width: 100%;
  position: relative;
  display: block;
  background-color: #e7ecf3;
  margin-top: 1rem;
  padding: 1rem 0;
  padding-left: 3.25rem;
  border-radius: 2px;
  color: #486491;
  font-weight: bold;

  &::after {
    content: '';
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    top: 21px;
    left: 25px;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 8px solid #fff;
  }

  &::before {
    content: '';
    position: absolute;
    display: block;
    width: 30px;
    height: 30px;
    top: 11px;
    left: 13px;
    border-radius: 50%;
    background-color: #73abfe;
  }
}
</style>
