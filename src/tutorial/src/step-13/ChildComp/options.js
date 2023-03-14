export default {
  emits: ['response'],
  created() {
    this.$emit('response', 'привіт від дочірнього компонента')
  }
}
