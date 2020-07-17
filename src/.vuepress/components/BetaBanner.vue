<script>
export default {}
</script>

<template>
  <aside class="beta-banner">
    <p>
      ⚠️ Beta Version: Docs are in development and subject to change.
    </p>
  </aside>
</template>

<style lang="scss" scoped>
@import '../theme/styles/mixins.scss';

.beta-banner {
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fffedb;
  box-sizing: border-box;
  border-bottom: 1px solid #eaecef;
  text-align: center;
  padding: 10px 20px;
  box-sizing: border-box;

  p {
    margin: 0;
    line-height: 1.4;
    font-size: 0.7rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @include breakpoint(700px) {
      font-size: 0.8rem;
    }
  }
}
</style>
