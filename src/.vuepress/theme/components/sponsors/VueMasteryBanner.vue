<template>
<div id="vm-banner" class="vuemastery-banner hide" role="banner">
  <a href="https://www.vuemastery.com/free-weekend-december-2021" target="_blank">
    <div class="vuemastery-banner--wrapper">
      <img class="vuemastery-banner--logo" src="/images/vuemastery/logo-vuemastery.svg" alt="vuemastery" />
      <p>Access the ultimate collection of Vue courses free. <span>Dec 17-20</span></p>
      <button class="vuemastery-button">Reserve your spot</button>
    </div>
    <div id="vm-close" class="vuemastery-banner--close" @click.prevent="$emit('close-banner')"></div>
  </a>
</div>
</template>

<script>
export default {

}
</script>
