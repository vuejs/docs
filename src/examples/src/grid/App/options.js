import DemoGrid from './Grid.vue'

export default {
  components: {
    DemoGrid
  },
  data: () => ({
    searchQuery: '',
    gridColumns: ['nazwa', 'moc'],
    gridData: [
      { nazwa: 'Chuck Norris', moc: Infinity },
      { nazwa: 'Bruce Lee', moc: 9000 },
      { nazwa: 'Jackie Chan', moc: 7000 },
      { nazwa: 'Jet Li', moc: 8000 }
    ]
  })
}
