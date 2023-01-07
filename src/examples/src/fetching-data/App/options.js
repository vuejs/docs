const API_URL = `https://api.github.com/repos/vuejs/core/commits?per_page=3&sha=`

export default {
  data: () => ({
    branches: ['main', 'v2-compat'],
    currentBranch: 'main',
    commits: null
  }),

  created() {
    // fetch al iniciar
    this.fetchData()
  },

  watch: {
    // re-fetch cada vez que currentBranch cambie
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
