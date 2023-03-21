export default {
  data() {
    return {
      message: 'Привіт, світе!',
      isRed: true,
      color: 'green'
    }
  },
  methods: {
    toggleRed() {
      this.isRed = !this.isRed
    },
    toggleColor() {
      this.color = this.color === 'green' ? 'blue' : 'green'
    }
  }
}
