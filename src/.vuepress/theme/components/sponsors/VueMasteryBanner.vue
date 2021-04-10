<template>
<div id="vm-banner" class="vuemastery-banner hide" role="banner">
  <a href="https://www.vuemastery.com/free-weekend" target="_blank">
    <div class="vuemastery-banner--wrapper">
      <img class="vuemastery-banner--logo" src="/images/vuemastery/logo-vuemastery.svg" alt="vuemastery" />
      <p><span>Watch all Vue Mastery courses</span>Free all weekend on April 23-25</p>
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
