import DemoGrid from './Grid.vue'

export default {
  components: {
    DemoGrid
  },
  data: () => ({
    searchQuery: '',
    gridColumns: ['імя', 'сила'],
    gridData: [
      { 'імя': 'Чак Норріс', 'сила': Infinity },
      { 'імя': 'Брюс Лі', 'сила': 9000 },
      { 'імя': 'Джекі Чан', 'сила': 7000 },
      { 'імя': 'Джет Лі', 'сила': 8000 }
    ]
  })
}
