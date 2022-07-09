<template>
  <table>
    <thead>
      <tr>
        <th>{{ labels.language }}</th>
        <th>{{ labels.github }}</th>
        <th>{{ labels.lastCommit }}</th>
        <th>{{ labels.last90Days }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="({ lang, owner, repo, url, count, date }, index) in merged">
        <td>
          <a v-if="url" :href="url" target="_blank">
            {{ lang }} <OutboundLink />
          </a>
          <template v-else>
            {{ lang }}
          </template>
        </td>
        <td>
          <a :href="`https://github.com/${owner}/${repo}/`" target="_blank">{{ owner }}/{{ repo }} <OutboundLink /></a>
        </td>
        <template v-if="showLoadButton">
          <td v-if="index === 0" colspan="2" :rowspan="merged.length" class="load-cell">
            <button @click="load">{{ labels.loadDetails }}</button>
          </td>
        </template>
        <template v-else>
          <td>{{ date }}</td>
          <td>
            {{ count }}{{ count === 100 ? '+' : '' }}
            <template v-if="typeof count === 'number'">
              {{ labels.commits }}
            </template>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { labels, repos } from './translations-data.js'

const getLastDate = async ({ owner, repo, branch }) => {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/branches/${branch}`)

  const data = await response.json()

  const dateTime = data.commit.commit.committer.date

  return dateTime.split('T')[0]
}

const DATE_90_DAYS_AGO = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toJSON().replace(/\.\d*/, '')

const commitCount = async ({ owner, repo }) => {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?since=${DATE_90_DAYS_AGO}&per_page=100`)

  const data = await response.json()

  return data.length
}

export default {
  name: 'translations',

  data () {
    const dates = {}

    for (const { lang } of repos) {
      dates[lang] = null
    }

    return {
      showLoadButton: true,
      dates,
      counts: { ...dates },
      labels,
      repos
    }
  },

  computed: {
    merged () {
      return this.repos.map(repo => ({
        ...repo,
        date: this.dates[repo.lang],
        count: this.counts[repo.lang]
      }))
    }
  },

  mounted () {
    let stats = null

    try {
      stats = JSON.parse(sessionStorage.getItem('translation-stats'))
    } catch {
    }

    if (!stats) {
      return
    }

    const { date, counts, dates } = stats

    if (!date || date + 3 * 60 * 60 * 1000 < Date.now()) {
      return
    }

    this.dates = dates
    this.counts = counts
    this.showLoadButton = false
  },

  methods: {
    async load () {
      this.showLoadButton = false

      await Promise.all(this.repos.map(this.loadRepo))

      this.saveStats()
    },

    async loadRepo (repo) {
      await this.loadLastCommit(repo)

      return this.loadCommitCount(repo)
    },

    async loadLastCommit (repo) {
      const { lang } = repo

      this.dates[lang] = labels.loading

      let date = '-'

      try {
        date = await getLastDate(repo)
      } catch {
      }

      this.dates[lang] = date
    },

    async loadCommitCount (repo) {
      const { lang } = repo

      const date = this.dates[lang]
      let count = 0

      if (date === '-') {
        count = '-'
      } else if (date > DATE_90_DAYS_AGO) {
        this.counts[lang] = labels.loading

        try {
          count = await commitCount(repo)
        } catch {
          count = '-'
        }
      }

      this.counts[lang] = count
    },

    saveStats () {
      const data = {
        date: Date.now(),
        counts: this.counts,
        dates: this.dates
      }

      // GitHub limits request rates, so we store the stats in sessionStorage
      sessionStorage.setItem('translation-stats', JSON.stringify(data))
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@theme/styles/_settings.scss";

.load-cell {
  background: #f6f8fa;
  text-align: center;

  button {
    padding: 4px 20px;
    height: 50px;
    border-radius: 9999px;
    font-size: 1.05em;
    font-weight: 600;
    letter-spacing: 0.1em;
    min-width: 8em;
    color: #fff;
    background-color: $green;
    box-sizing: border-box;
    border: 1px solid currentColor;
    appearance: none;
    cursor: pointer;
  }
}
</style>
