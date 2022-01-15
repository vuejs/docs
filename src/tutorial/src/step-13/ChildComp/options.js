export default {
  emits: ['response'],
  created() {
    this.$emit('response', 'hello from child')
  }
}
