<template>
  <main aria-labelledby="sponsor-Vue-js-Development">
    <h1 id="sponsor-Vue-js-Development">Sponsor Vue.js Development</h1>
    <p>
    Vue.js is an MIT licensed open source project and completely free to use.
    However, the amount of effort needed to maintain and develop new features for the project is not sustainable without proper financial backing. You can support Vue.js development via the following methods:
    </p>

    <h2 id="One-time-Donations">One-time Donations</h2>

    <p>We accept donations through these channels:</p>

    <Coins />
  </main>
</template>

<script>
import sponsors from '@theme/data/patreon-sponsors.js'
import Coins from '@theme/components/support/Coins.vue'

export default {
  components: { Coins },
  data: () => ({ sponsors })
}
</script>

<style lang="scss">
@import '@theme/styles/_settings.scss';

html.with-beta-banner {
  padding-top: calc(100px + 3rem);
}
</style>
