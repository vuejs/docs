<script>
export default {
  props: {
    title: String,
    details: String
  }
}
</script>

<template>
  <section class="feature">
    <h2>{{ title }}</h2>
    <p>{{ details }}</p>
  </section>
</template>

<style lang="scss">
@import '../styles/variables.scss';

.feature {
  flex-grow: 1;
  flex-basis: 30%;
  max-width: 30%;
  h2 {
    color: $green;
    font-size: 1.4rem;
    font-weight: 500;
    border-bottom: none;
    padding-bottom: 0;
    text-align: center;
  }
  p {
    color: $gray;
    text-align: center;
    word-spacing: 0.05rem;
    line-height: 1.2;
  }
}
</style>
