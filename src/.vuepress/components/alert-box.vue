<template>
  <div class="demo-alert-box">
    <strong>Error!</strong>
    <slot></slot>
  </div>
</template>

<style scoped>
.demo-alert-box {
  padding: 10px 20px;
  background: #f3beb8;
  border: 1px solid #f09898;
}
</style>
