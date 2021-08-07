<script>
import partners from './partners.js'
import PartnerItem from './partner-item.vue'

export default {
  components: {
    PartnerItem
  },

  data: () => ({
    partners
  })
}
</script>

<template>
  <main class="partners">
    <div class="partners-intro">
      <h1>Vue Partners</h1>
      <p>
        Vue Partners are premium shops that provide first-class Vue consulting
        and development. If your company is interested in being listed as a
        partner, please
        <a href="https://airtable.com/shrCQhat57SApJI2l"
          >register your interest here</a
        >.
      </p>
    </div>
    <ul class="partner-list">
      <partner-item
        v-for="partner in partners"
        :key="partner.name"
        :partner="partner"
      />
    </ul>
  </main>
</template>

<style scoped>
.partners-intro {
  max-width: 768px;
  margin: 66px auto 56px;
  text-align: center;
}

.partner-list {
  display: grid;
  grid-row-gap: 16px;
  padding: 0;
}
</style>
