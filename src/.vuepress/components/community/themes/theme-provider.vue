<template>
  <section>
    <h2 :id="provider.name">{{ provider.name }}</h2>

    <div class="tip custom-block description" v-html="description"/>

    <div class="themes-grid">
      <ThemeItem v-for="theme in provider.products" :key="theme.url" :theme="theme"/>
    </div>

    <div class="see-more-container">
      <a :href="provider.seeMoreUrl" class="see-more-button">
        See More Themes from {{ provider.name }}
      </a>
    </div>
  </section>
</template>

<script>
import showdown from 'showdown'

export default {
  props: {
    provider: {
      type: Object,
      required: true
    }
  },

  components: {
    ThemeItem: () => import('./theme-item')
  },

  computed: {
    description: function () {
      return (new showdown.Converter()).makeHtml(this.provider.description)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/_settings";

.themes-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media screen and (max-width: 1300px) {
    justify-content: center;
  }
}

.description {
  margin: 1.5em 0;
}

.see-more {
  &-container {
    text-align: center;
    width: 100%;
  }

  &-button {
    color: $green;
    display: inline-block;
    width: auto;
    border-radius: 2em;
    transition: all 0.15s ease;
    border: 1px solid $green;
    padding: 12px 24px;
    text-decoration: none !important;

    &:hover {
      background: $green;
      color: #fff;
    }
  }
}
</style>
