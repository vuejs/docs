<template>
  <div class="special-sponsors">
    <h3>{{ heading }}</h3>
    <div class="blocks">
      <SponsorBlock
        v-for="sponsor in sponsors"
        :sponsor="sponsor"
        :key="sponsor.name"
      />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    SponsorBlock: () => import('@theme/components/sponsors/SpecialSponsorBlock.vue')
  },

  props: {
    sponsors: {
      type: Array,
      required: true
    }
  },

  computed: {
    heading () {
      return `Special Sponsor${this.sponsors.length === 1 ? '' : 's'}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@theme/styles/_settings.scss";

.special-sponsors {
  text-align: center;
  padding: 25px 40px;

  .blocks {
    display: flex;
    place-content: center;
    place-items: flex-start;

    @media (max-width: $MQNarrow) {
      flex-direction: column;
      place-items: center;
    }

    a {
      max-width: 30%;

      @media (max-width: $MQNarrow) {
        &+a {
          margin-top: 25px;
        }

        max-width: 100%;
      }
    }
  }
}
</style>
