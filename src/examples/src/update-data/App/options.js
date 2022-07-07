export default {
  data: () => ({
    profile: null
  }),

  created() {
    // fetch on init
    this.fetchData()
  },

  methods: {
    async fetchData() {
      this.profile = await (await fetch('/profile/')).json()
    },
    onSubmit() {
      alert(JSON.stringify(this.profile.value))
    }
  }
}

// This is a fake fetch implementation.
function fetch(uri) {
  const data = {
    firstName: 'Alice',
    lastName: 'Smith',
  };
  return new Promise(resolve => resolve(data));
}
