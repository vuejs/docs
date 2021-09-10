const API_URL = `https://api.github.com/repos/vuejs/vue-next/commits?per_page=3&sha=`

export default {
  data: () => ({
    branches: ['master', 'v2-compat'],
    currentBranch: 'master',
    commits: null
  }),

  created() {
    this.fetchData()
  },

  watch: {
    currentBranch: 'fetchData'
  },

  methods: {
    async fetchData() {
      this.commits = await (
        await fetch(`${API_URL}${this.currentBranch}`)
      ).json()
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
