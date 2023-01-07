export default {
  emits: ['response'],
  setup(props, { emit }) {
    emit('response', 'hola desde el hijo')
    return {}
  }
}
