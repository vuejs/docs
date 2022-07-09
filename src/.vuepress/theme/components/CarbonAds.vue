<template>
  <div class="carbon-ads"></div>
</template>

<script>
export default {
  name: 'CarbonAds',
  props: {
    code: {
      type: String,
      required: true
    },
    placement: {
      type: String,
      required: true
    }
  },

  mounted() {
    const s = document.createElement('script')
    s.id = '_carbonads_js'
    s.src = `//cdn.carbonads.com/carbon.js?serve=${this.code}&placement=${this.placement}`
    this.$el.appendChild(s)
  }
}
</script>

<style>
.carbon-ads {
  min-height: 102px;
  font-size: 0.75rem;

  width: 125px;
  position: fixed;
  z-index: 1;
  bottom: 14px;
  right: 14px;
  padding: 10px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.8);
}

@media screen and (max-width: 1376px) {
  .carbon-ads {
    position: relative;
    bottom: auto;
    right: auto;

    float: right;
    margin: 71px 12px 0 15px;
    padding: 0 0 10px 10px;
    z-index: 5;
  }
}

.carbon-ads a {
  color: #444;
  font-weight: normal;
  display: inline;
}

.carbon-ads .carbon-img img {
  display: block;
  width: 125px;
}

.carbon-ads .carbon-poweredby {
  color: #999;
  display: block;
  margin-top: 0.5em;
}

@media (max-width: 719px) {
  .carbon-ads .carbon-img img {
    width: 100px;
    height: 77px;
  }
}
</style>
