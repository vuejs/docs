import { ref, watchEffect } from 'vue'

const API_URL = `https://api.github.com/repos/vuejs/vue-next/commits?per_page=3&sha=`
const branches = ['master', 'v2-compat']

export default {
  setup() {
    const currentBranch = ref('master')
    const commits = ref(null)

    watchEffect(async () => {
      // this effect will run immediately and then
      // re-run whenver currentBranch.value changes
      const url = `${API_URL}${currentBranch.value}`
      commits.value = await (await fetch(url)).json()
    })

    function truncate(v) {
      const newline = v.indexOf('\n')
      return newline > 0 ? v.slice(0, newline) : v
    }

    function formatDate(v) {
      return v.replace(/T|Z/g, ' ')
    }

    return {
      branches,
      currentBranch,
      commits,
      truncate,
      formatDate
    }
  }
}
