import DemoGrid from './Grid.vue'

export default {
  components: {
    DemoGrid
  },
  data: () => ({
    searchQuery: '',
    gridColumns: ['nome', 'potenza'],
    gridData: [
      { nome: 'Chuck Norris', potenza: Infinity },
      { nome: 'Bruce Lee', potenza: 9000 },
      { nome: 'Jackie Chan', potenza: 7000 },
      { nome: 'Jet Li', potenza: 8000 }
    ]
  })
}
