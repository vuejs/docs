<template>
  <RouterLink
    v-if="isInternal"
    class="nav-link"
    :to="link"
    :exact="exact"
    @focusout.native="focusoutAction"
  >
    {{ item.text }}
  </RouterLink>
  <a
    v-else
    :href="link"
    class="nav-link external"
    :target="target"
    :rel="rel"
    @focusout="focusoutAction"
  >
    {{ item.text }}
    <OutboundLink v-if="isBlankTarget" />
  </a>
</template>

<script>
import Vue from 'vue'
import { isExternal, isMailto, isTel, ensureExt } from '../util'

const pageLocation = Vue.observable({ path: '/' })

let initPath = () => {
  initPath = () => {}

  const updatePath = () => {
    pageLocation.path = location.pathname
  }

  updatePath()

  // There is no event for detecting navigation but these cover most cases
  for (const event of ['focusin', 'scroll', 'mouseover', 'keydown']) {
    window.addEventListener(event, updatePath)
  }
}

export default {
  name: 'NavLink',

  props: {
    item: {
      required: true
    }
  },

  computed: {
    link () {
      let link = ensureExt(this.item.link)

      if (this.item.isTranslation) {
        link = link.replace(/\/$/, '') + pageLocation.path
      }

      return link
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
      if (this.isNonHttpURI || this.item.isTranslation) {
        return null
      }
      if (this.item.rel) {
        return this.item.rel
      }
      return this.isBlankTarget ? 'noopener noreferrer' : ''
    }
  },

  methods: {
    focusoutAction () {
      this.$emit('focusout')
    }
  },

  mounted () {
    initPath()
  }
}
</script>
