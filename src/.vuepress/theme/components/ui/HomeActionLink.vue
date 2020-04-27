<template>
  <RouterLink
    v-if="isInternal"
    class="nav-link"
    :class="combinedClasses"
    :to="link"
    :exact="exact"
    @focusout.native="focusoutAction"
  >
    <i
      v-if="item.icon"
      class="icon"
      :class="item.icon"
    ></i>
    {{ item.text }}
  </RouterLink>
  <a
    v-else
    :href="link"
    class="nav-link external"
    :class="combinedClasses"
    :target="target"
    :rel="rel"
    @focusout="focusoutAction"
  >
    <i
      v-if="item.icon"
      class="icon"
      :class="item.icon"
    ></i>
    {{ item.text }}
    <OutboundLink v-if="isBlankTarget" />
  </a>
</template>

<script>
import { isExternal, isMailto, isTel, ensureExt } from '@parent-theme/util'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },

    extraClass: {
      type: String,
      default: ''
    }
  },

  computed: {
    link () {
      return ensureExt(this.item.link)
    },

    exact () {
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(rootLink => rootLink === this.link)
      }

      return this.link === '/'
    },

    isNonHttpURI () {
      return isMailto(this.link) || isTel(this.link)
    },

    isBlankTarget () {
      return this.target === '_blank'
    },

    isInternal () {
      return !isExternal(this.link) && !this.isBlankTarget
    },

    target () {
      if (this.isNonHttpURI) {
        return null
      }

      if (this.item.target) {
        return this.item.target
      }

      return isExternal(this.link) ? '_blank' : ''
    },

    rel () {
      if (this.isNonHttpURI) {
        return null
      }

      if (this.item.rel) {
        return this.item.rel
      }

      return this.isBlankTarget ? 'noopener noreferrer' : ''
    },

    combinedClasses () {
      return `${this.extraClass} ${ this.item.icon ? 'has-icon' : '' }`
    }
  },

  methods: {
    focusoutAction () {
      this.$emit('focusout')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@theme/styles/_settings.scss";

a {
  color: $green;
  position: relative;
  place-content: center;
  place-items: center;
  width: fit-content;
  display: flex;
  border-radius: 9999px;
  letter-spacing: 0.05em;
  border: 1px solid $green;
  text-decoration: none;
  text-transform: uppercase;
  margin-right: 10px;
  padding: 7px 28px;
  white-space: nowrap;

  &.has-icon {
    padding-left: 7px;
  }

  i.icon {
    font-size: 2rem;
    margin-right: 14px;
  }

  &.primary {
    background: $green;
    color: #fff;
  }

  &.grey {
    background-color: #f6f6f6;
    color: #4f5959;
    border-color: #f6f6f6;

    i.icon {
      opacity: .7; // wash out a bit to reduce contrast
    }
  }

  .icon.outbound {
    display: none;
  }
}
</style>
