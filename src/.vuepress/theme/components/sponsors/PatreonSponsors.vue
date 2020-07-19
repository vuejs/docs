<template>
  <SponsorsLayout extra-classes="sponsors__patreon">
    <template #heading>Patreon Sponsors</template>

    <template #content>
      <div class="platinum">
        <a
          :href="sponsor.url"
          target="_blank"
          rel="sponsored noopener"
          v-for="sponsor in sponsors.platinum_sponsors"
          :key="sponsor.name"
        >
          <img :src="`/images/sponsors/${sponsor.img}`" width="160" :alt="sponsor.name">
        </a>
      </div>
      <div class="gold">
        <a
          :href="sponsor.url"
          target="_blank"
          rel="sponsored noopener"
          v-for="sponsor in sponsors.gold_sponsors"
          :key="sponsor.name"
        >
          <img :src="`/images/sponsors/${sponsor.img}`" width="120" :alt="sponsor.name">
        </a>
      </div>

      <RoundedButton url="https://vuejs.org/support-vuejs/">Become a Sponsor!</RoundedButton>
    </template>
  </SponsorsLayout>
</template>

<script>
import SponsorsLayout from '@theme/components/sponsors/SponsorsLayout.vue'
import RoundedButton from '@theme/components/ui/RoundedButton.vue'

export default {
  components: {
    SponsorsLayout,
    RoundedButton
  },

  props: {
    sponsors: {
      type: Object,
      required: true
    }
  }
}
</script>
