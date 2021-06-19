<template>
  <section>
    <h2 :id="provider.name">{{ provider.name }}</h2>

    <div class="tip custom-block description" v-html="description"/>

    <div class="themes-grid">
      <ThemeItem v-for="theme in provider.products" :key="theme.url" :theme="theme"/>
    </div>

    <div class="see-more-container">
      <RoundedButton :url="provider.seeMoreUrl">
        See More Themes from {{ provider.name }}
      </RoundedButton>
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
    ThemeItem: () => import('./theme-item.vue'),
    RoundedButton: () => import('@theme/components/ui/RoundedButton.vue')
  },

  computed: {
    description () {
      return (new showdown.Converter()).makeHtml(this.provider.description)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@theme/styles/_settings.scss";

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
}
</style>
