<template>
  <footer class="page-edit">
    <div class="container">
      <p>
        Deployed on
        <a href="https://url.netlify.com/HJ8X2mxP8">Netlify</a>.
        <template v-if="editLink">
          <br />
          <span class="edit-link">
          Caught a mistake or want to contribute to the documentation?
            <a
              :href="editLink"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ editLinkText }}
              <OutboundLink />
            </a>
          </span>
        </template>
        <template v-if="lastUpdated" class="last-updated">
          <br />
          <span class="prefix">{{ lastUpdatedText }}:</span>
          <span class="time">{{ lastUpdated }}</span>
        </template>
      </p>
    </div>
  </footer>
</template>

<script>
import isNil from 'lodash/isNil'
import { endingSlashRE, outboundRE } from '../util'

export default {
  name: 'PageEdit',

  computed: {
    lastUpdated() {
      return this.$page.lastUpdated
    },

    lastUpdatedText() {
      if (typeof this.$themeLocaleConfig.lastUpdated === 'string') {
        return this.$themeLocaleConfig.lastUpdated
      }
      if (typeof this.$site.themeConfig.lastUpdated === 'string') {
        return this.$site.themeConfig.lastUpdated
      }
      return 'Last Updated'
    },

    editLink() {
      const showEditLink = isNil(this.$page.frontmatter.editLink)
        ? this.$site.themeConfig.editLinks
        : this.$page.frontmatter.editLink

      const {
        repo,
        docsDir = '',
        docsBranch = 'master',
        docsRepo = repo
      } = this.$site.themeConfig

      if (showEditLink && docsRepo && this.$page.relativePath) {
        return this.createEditLink(
          repo,
          docsRepo,
          docsDir,
          docsBranch,
          this.$page.relativePath
        )
      }
      return null
    },

    editLinkText() {
      return (
        this.$themeLocaleConfig.editLinkText ||
        this.$site.themeConfig.editLinkText ||
        `Edit this page`
      )
    }
  },

  methods: {
    createEditLink(repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo) ? docsRepo : repo
        return (
          base.replace(endingSlashRE, '') +
          `/src` +
          `/${docsBranch}/` +
          (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '') +
          path +
          `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        )
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`
      return (
        base.replace(endingSlashRE, '') +
        `/edit` +
        `/${docsBranch}/` +
        (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '') +
        path
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@theme/styles/_settings.scss';

/*
  This entire style block is MVP style wise and will likely
  be changed with the new atomic theme. Changes are welcome!
 */
.edit-link {
  margin-bottom: 0.5rem;
}

.page-edit {
  padding: 0 1.5rem;
  max-width: 740px;
  margin: 0 auto;
  font-size: 0.95em;
  color: $light;
  text-align: center;

  p {
    margin: 0.8rem auto;
  }

  .container {
    border: 1px solid #eaecef;
    border-radius: 5px;
    padding: 0 1.5rem;
  }
}
</style>
