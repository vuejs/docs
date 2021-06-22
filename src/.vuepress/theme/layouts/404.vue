<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <h1>404</h1>

      <blockquote>
        <p>Whoops! This page doesn't exist.</p>
      </blockquote>

      <p v-show="isTranslation">
        New pages are added to the documentation all the time. This page might not be included in all of the translations yet.
      </p>

      <RouterLink to="/">
        Take me home.
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { repos } from '../../components/guide/contributing/translations-data.js'

export default {
  data () {
    return {
      isTranslation: false
    }
  },

  mounted () {
    const toOrigin = url => (String(url).match(/https?:\/\/[^/]+/) || [])[0]
    const referrer = toOrigin(document.referrer)

    // Did we get here from a translation?
    if (referrer && referrer !== location.origin && repos.some(({ url }) => toOrigin(url) === referrer)) {
      this.isTranslation = true
    }
  }
}
</script>
