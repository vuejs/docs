<template>
  <RouterLink
    v-if="isInternal"
    class="nav-link"
    :to="link"
    :exact="exact"
    @focusout.native="focusoutAction"
  >
    <slot />
  </RouterLink>
  <a
    v-else
    :href="link"
    class="nav-link external"
    :target="target"
    :rel="rel"
    @focusout="focusoutAction"
  >
    <slot />
    <OutboundLink v-if="isBlankTarget" />
  </a>
</template>

<script>
import { isExternal, isMailto, isTel, ensureExt } from '../util'

export default {
  props: {
    url: {
      type: String,
      required: true
    },

    extraClass: {
      type: String,
      default: ''
    }
  },

  computed: {
    link() {
      return ensureExt(this.url)
    },

    exact() {
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(
          rootLink => rootLink === this.link
        )
      }

      return this.link === '/'
    },

    isNonHttpURI() {
      return isMailto(this.link) || isTel(this.link)
    },

    isBlankTarget() {
      return this.target === '_blank'
    },

    isInternal() {
      return !isExternal(this.link) && !this.isBlankTarget
    },

    target() {
      if (this.isNonHttpURI) {
        return null
      }

      return isExternal(this.link) ? '_blank' : ''
    },

    rel() {
      if (this.isNonHttpURI) {
        return null
      }

      return this.isBlankTarget ? 'noopener noreferrer' : ''
    }
  },

  methods: {
    focusoutAction() {
      this.$emit('focusout')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@theme/styles/_settings.scss';

a {
  color: $green;
  position: relative;
  place-content: center;
  place-items: center;
  width: fit-content;
  display: flex;
  border-radius: 2rem;
  letter-spacing: 0.05em;
  border: 1px solid $green;
  text-decoration: none;
  margin-right: 10px;
  padding: 0.75rem 0.5rem;
  white-space: nowrap;
  font-weight: bold;
  font-size: 1rem;
  min-width: 175px;

  &.primary {
    background: $green;
    color: #fff;
  }
}
</style>
