<template>
  <button
    v-if="geolocationSupported"
    @click="requestPosition"
    :disabled="requesting"
    class="get-position-button"
  >
    <i v-if="requesting" class="fa fa-refresh rotating-clockwise"></i>
    <template v-else>
      <i class="fa fa-map-marker"></i>
      <span>
        <slot>Find near me</slot>
      </span>
    </template>
  </button>
</template>

<script>
export default {
  data: () => ({
    geolocationSupported: false,
    requesting: false
  }),

  mounted () {
    if ('geolocation' in window.navigator) {
      this.geolocationSupported = true
    }
  },

  methods: {
    requestPosition () {
      this.requesting = true

      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.requesting = false
          this.$emit('positionRetrieved', position)
        },
        error => {
          this.requesting = false
          this.$emit('positionErrored')
        },
        {
          enableHighAccuracy: true
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  display: inline-block;
  padding: 0.4em 0.7em 0.45em;
  font-weight: bold;
  font-size: 0.5em;
  text-transform: uppercase;
  line-height: 1;
  border: none;
  background: #304455;
  color: #fff;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
}
</style>
