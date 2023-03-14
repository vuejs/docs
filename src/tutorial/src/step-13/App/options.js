import ChildComp from './ChildComp.vue'

export default {
  components: {
    ChildComp
  },
  data() {
    return {
      childMsg: 'Поки що немає повідомлення від дочірнього компонента'
    }
  }
}
