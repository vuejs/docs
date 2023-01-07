import DemoGrid from './Grid.vue'

export default {
  components: {
    DemoGrid
  },
  data: () => ({
    searchQuery: '',
    gridColumns: ['nombre', 'poder'],
    gridData: [
      { nombre: 'Chuck Norris', poder: Infinity },
      { nombre: 'Bruce Lee', poder: 9000 },
      { nombre: 'Jackie Chan', poder: 7000 },
      { nombre: 'Jet Li', poder: 8000 }
    ]
  })
}
