<template>
<div id="vm-banner" class="vuemastery-banner hide" role="banner">
  <a href="https://www.vuemastery.com/free-weekend" target="_blank">
    <div class="vuemastery-banner--wrapper">
      <img class="vuemastery-banner--logo" src="/images/vuemastery/logo-vuemastery.svg" alt="vuemastery" />
      <p><span>Save 35% off</span> a year of Vue courses</p>
      <button class="vuemastery-button">Get access</button>
    </div>
    <div id="vm-close" class="vuemastery-banner--close" @click.prevent="$emit('close-banner')"></div>
  </a>
</div>
</template>

<script>
export default {

}
</script>
