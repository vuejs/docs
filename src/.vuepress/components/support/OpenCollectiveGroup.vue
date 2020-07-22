<template>
  <div class="sponsor-group open-collective-sponsors sponsor-section">
    <a
      v-for="i in 10"
      :key="i"
      :href="`${url}/${i}/website`"
      target="_blank"
      rel="noopener"
    >
      <img
        :src="`${url}/${i}/avatar.svg`"
      >
    </a>
  </div>
</template>

<script>
export default {
  props: { group: { type: String, requird: true } },
  computed: {
    url () {
      return `https://opencollective.com/vuejs/tiers/${this.group}-sponsors`
    }
  }
}
</script>
