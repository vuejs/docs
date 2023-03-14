export default {
  emits: ['response'],
  setup(props, { emit }) {
    emit('response', 'привіт від дочірнього компонента')
    return {}
  }
}
