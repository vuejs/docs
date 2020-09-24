<template>
  <p
    class="codepen"
    data-theme-id="39028"
    data-preview="true"
    data-editable="true"
    :data-height="height"
    :data-default-tab="tab"
    :data-user="user"
    :data-slug-hash="slug"
    :data-pen-title="title"
    :style="`height: ${height}px`">
    <span>See the Pen <a :href="href">{{ title }}</a>
    by {{ name ? name : user }} (<a :href="`https://codepen.io/${user}`">@{{user}}</a>)
    on <a href="https://codepen.io">CodePen</a>.</span>
  </p>
</template>

<script>
export default {
  props: {
    team: {
      type: Boolean,
      default: true,
    },

    user: {
      type: String,
      default: 'Vue',
    },

    name: {
      type: String,
      default: null,
    },

    title: {
      type: String,
      default: null,
    },

    slug: {
      type: String,
      default: null,
    },

    tab: {
      type: String,
      default: 'result',
    },

    height: {
      type: Number,
      default: 300,
    },
  },
  mounted() {
    const codepenScript = document.createElement('script')
    codepenScript.setAttribute('src', 'https://static.codepen.io/assets/embed/ei.js')
    codepenScript.async = true
    this.$el.appendChild(codepenScript)
  },
  computed: {
    href() {
      return `https://codepen.io/${this.team ? 'team' : ''}${this.user}/pen/${this.slug}`
    }
  },
}
</script>

<style lang="scss">
.codepen {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid;
  margin: 1em 0;
  padding: 1em;
}
</style>
