<template>
  <main id="search-page">

    <p v-if="!isAlgoliaConfigured">
      This search page is not available at the moment, please use the search box in the top navigation bar.
    </p>

    <template v-else>

      <form class="search-box" @submit="visitFirstResult">

        <input class="search-query" v-model="search" :placeholder="searchPlaceholder">

        <div class="search-footer algolia-autocomplete">

          <p>
            <template v-if="totalResults">
              <strong>{{ totalResults }} results</strong> found in {{ queryTime }}ms
            </template>
          </p>

          <a class="algolia-docsearch-footer--logo" target="_blank" href="https://www.algolia.com/">Search by algolia</a>

        </div>

      </form>

      <template v-if="results.length">

        <div v-for="(result, i) in results" :key="i" class="search-result">
          <a class="title" :href="result.url" v-html="result.title" />
          <p v-if="result.summary" class="summary" v-html="result.summary" />
          <div class="breadcrumbs">
            <span v-for="(breadcrumb, j) in result.breadcrumbs" :key="j" class="breadcrumb" v-html="breadcrumb" />
          </div>
        </div>

      </template>

      <p v-else-if="search">No results found for query "<span v-text="search" />".</p>

      <div ref="infiniteScrollAnchor"></div>

    </template>

  </main>
</template>

<script>
export default {

  data () {
    return {
      algoliaIndex: undefined,
      infiniteScrollObserver: undefined,
      searchPlaceholder: undefined,
      search: '',
      results: [],
      totalResults: 0,
      totalPages: 0,
      lastPage: 0,
      queryTime: 0
    }
  },

  computed: {
    algoliaOptions () {
      return (
        this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
      )
    },

    isAlgoliaConfigured () {
      return this.algoliaOptions && this.algoliaOptions.apiKey && this.algoliaOptions.indexName
    }
  },

  watch: {
    $lang (newValue) {
      this.initializeAlgoliaIndex(this.algoliaOptions, newValue)
    },

    algoliaOptions (newValue) {
      this.initializeAlgoliaIndex(newValue, this.$lang)
    },

    search () {
      this.refreshSearchResults()

      window.history.pushState(
        {},
        'Vue.js Search',
        window.location.origin + window.location.pathname + '?q=' + encodeURIComponent(this.search)
      )
    }
  },

  mounted () {
    this.search = (new URL(location)).searchParams.get('q') || '';

    if (!this.isAlgoliaConfigured)
      return;

    this.searchPlaceholder = this.$site.themeConfig.searchPlaceholder || 'Search Vue.js'
    this.initializeAlgoliaIndex(this.algoliaOptions, this.$lang)
    this.initializeInfiniteScrollObserver()
  },

  destroyed () {
    if (!this.infiniteScrollObserver)
      return;

    this.infiniteScrollObserver.disconnect()
  },

  methods: {
    async initializeAlgoliaIndex (userOptions, lang) {
      const { default: algoliasearch } = await import(/* webpackChunkName: "search-page" */ 'algoliasearch/dist/algoliasearchLite.min.js')
      const client = algoliasearch(this.algoliaOptions.appId, this.algoliaOptions.apiKey);

      this.algoliaIndex = client.initIndex(this.algoliaOptions.indexName);

      this.refreshSearchResults()
    },

    async initializeInfiniteScrollObserver() {
      await import(/* webpackChunkName: "search-page" */ 'intersection-observer/intersection-observer.js')

      this.infiniteScrollObserver = new IntersectionObserver(([{ isIntersecting }]) => {
        if (!isIntersecting || this.totalResults === 0 || this.totalPages === this.lastPage + 1)
          return

        this.lastPage++
        this.updateSearchResults()
      })

      this.infiniteScrollObserver.observe(this.$refs.infiniteScrollAnchor)
    },

    async updateSearchResults() {
      if (!this.search)
        return

      const response = await this.algoliaIndex.search(this.search, { page: this.lastPage })

      this.results.push(...response.hits.map(hit => this.parseSearchHit(hit)))
      this.totalResults = response.nbHits
      this.totalPages = response.nbPages
      this.queryTime = response.processingTimeMS
    },

    refreshSearchResults() {
      this.results = []
      this.totalResults = 0
      this.totalPages = 0
      this.lastPage = 0
      this.queryTime = 0

      this.updateSearchResults()
    },

    visitFirstResult(e) {
      e.preventDefault()

      if (this.results.length === 0)
        return;

      window.location = this.results[0].url
    },

    parseSearchHit(hit) {
      const hierarchy = hit._highlightResult.hierarchy
      const titles = []

      let summary, levelName, level = 0
      while ((levelName = 'lvl' + level++) in hierarchy) {
        titles.push(hierarchy[levelName].value)
      }

      if (hit._snippetResult && hit._snippetResult.content) {
        summary = hit._snippetResult.content.value + '...'
      }

      return {
        title: titles.pop(),
        url: hit.url,
        summary: summary,
        breadcrumbs: titles,
      }
    }
  }
}
</script>

<style lang="scss">
@import "@theme/styles/_settings.scss";

#search-page {

  .search-box {
    width: 100%;
    display: flex;
    flex-direction: column;

    .search-query {
      width: auto;
    }

    .search-footer {
      display: flex;
      height: 35px;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;

      p {
        margin: 0;
        padding: 0;
        font-size: .9rem;
      }

      .algolia-docsearch-footer--logo {
          width: 115px;
        height: 16px;
      }

    }

  }

  .search-result {
    margin-bottom: 15px;

    .title {
      display: block;
    }

    .summary {
      padding: 0;
      margin: 0;
      font-size: .9rem;
    }

    .breadcrumb {
      font-size: .9rem;
      color: $light;

      & + .breadcrumb::before {
        content: "\203A\A0";
        margin-left: 5px;
        color: $light;
      }

    }

    .algolia-docsearch-suggestion--highlight {
      color: darken($green, 20%);
      font-weight: 600;
    }

  }

}
</style>
