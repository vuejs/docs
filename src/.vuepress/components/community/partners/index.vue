<template>
  <main>
    <PartnerItem v-for="partner in partners" :key="partner.name" :partner="partner"/>
  </main>
</template>

<script>
import partners from './partners'

export default {
  components: {
    PartnerItem: () => import('./partner-item')
  },

  data: () => ({
    partners
  })
}
</script>
