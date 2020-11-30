<template>
  <div id="vm-banner" class="vuemastery-banner hide" role="banner">
    <div class="vuemastery-planet"></div>
    <a class="vuemastery-banner--link" href="https://www.vuemastery.com/black-friday-2020" target="_blank">
      <img class="vuemastery-banner--logo" src="/images/vuemastery/logo-vuemastery.svg" alt="vuemastery" />
      <div class="vuemastery-banner--wrapper">
        <p><span>Vue Mastery's Black Friday Sale:</span>Save 50% off a year of Vue courses</p>
        <button class="vuemastery-button">Get discount</button>
      </div>
    </a>
    <div @click.prevent="$emit('close-banner')" class="vuemastery-banner--close"></div>
  </div>
</template>

<script>
export default {

}
</script>
