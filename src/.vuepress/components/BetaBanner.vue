<script>
export default {}
</script>

<template>
  <aside class="beta-banner">
    <p>
      ⚠️ Beta Version: Docs are still under development and are subject to
      change.
    </p>
  </aside>
</template>

<style lang="scss" scoped>
.beta-banner {
  position: fixed;
  z-index: 20;
  top: 3.6rem;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fffedb;
  box-sizing: border-box;
  border-bottom: 1px solid #eaecef;
  font-weight: bold;
  text-align: center;
  padding: 10px 20px;
  box-sizing: border-box;

  p {
    margin: 0;
    line-height: 1.4;
  }
}
</style>
