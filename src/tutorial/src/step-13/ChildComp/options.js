export default {
  emits: ['response'],
  created() {
    this.$emit('response', 'hola desde el hijo')
  }
}
