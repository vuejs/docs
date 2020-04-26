<template>
  <SponsorsLayout extra-classes="sponsors__open-collective">
    <template #heading>Open Collective Sponsors</template>

    <template #content>
      <h4>Platinum</h4>
      <a
        :href="`https://opencollective.com/vuejs/tiers/platinum-sponsors/${i}/website`"
        rel="sponsored noopener"
        target="_blank"
        v-for="(_, i) in new Array(featuredCount.platinum)"
        :key="i"
      >
        <img
          :src="`https://opencollective.com/vuejs/tiers/platinum-sponsors/${i}/avatar.svg`"
          alt="Vue.JS platinum sponsor"
        >
      </a>

      <h4>Gold</h4>
      <a
        :href="`https://opencollective.com/vuejs/tiers/gold-sponsors/${i}/website`"
        rel="sponsored noopener"
        target="_blank"
        v-for="(_, i) in new Array(featuredCount.gold)"
        :key="i"
      >
        <img
          :src="`https://opencollective.com/vuejs/tiers/gold-sponsors/${i}/avatar.svg`"
          alt="Vue.JS gold sponsor"
        >
      </a>
    </template>
  </SponsorsLayout>
</template>

<script>
import SponsorsLayout from './SponsorsLayout.vue'

export default {
  components: {
    SponsorsLayout
  },

  data: () => ({
    featuredCount: {
      platium: 3,
      gold: 10
    }
  })
}
</script>

<style lang="scss" scoped>
img {
  width: auto;
  max-width: 100px !important;
  max-height: 60px !important;
}
</style>
