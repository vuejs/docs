const API_URL = `https://api.github.com/repos/vuejs/vue-next/commits?per_page=3&sha=`

export default {
  data: () => ({
    branches: ['master', 'v2-compat'],
    currentBranch: 'master',
    commits: null
  }),

  created() {
    // fetch on init
    this.fetchData()
  },

  watch: {
    // re-fetch whenever currentBranch changes
    currentBranch: 'fetchData'
  },

  methods: {
    async fetchData() {
      const url = `${API_URL}${this.currentBranch}`
      this.commits = await (await fetch(url)).json()
    },
    truncate(v) {
      const newline = v.indexOf('\n')
      return newline > 0 ? v.slice(0, newline) : v
    },
    formatDate(v) {
      return v.replace(/T|Z/g, ' ')
    }
  }
}
