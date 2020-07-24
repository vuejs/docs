<template>
  <div class="sponsor-group">
    <SponsorImageLink
      v-for="(sponsor, index) of sponsors"
      :key="index"
      :sponsor="sponsor"
    />
  </div>
</template>

<script>
import sponsors from '@theme/data/patreon-sponsors.js'
import SponsorImageLink from './SponsorImageLink'

export default {
  props: { group: { type: String, required: true } },
  components: { SponsorImageLink },
  computed: {
    sponsors () {
      return sponsors[this.group]
    }
  }
}
</script>
