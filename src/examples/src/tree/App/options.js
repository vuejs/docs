import TreeItem from './TreeItem.vue'

const treeData = {
  name: 'Il mio albero',
  children: [
    { name: 'ciao' },
    { name: 'wat' },
    {
      name: 'cartella figlio',
      children: [
        {
          name: 'cartella figlio',
          children: [{ name: 'ciao' }, { name: 'wat' }]
        },
        { name: 'ciao' },
        { name: 'wat' },
        {
          name: 'cartella figlio',
          children: [{ name: 'ciao' }, { name: 'wat' }]
        }
      ]
    }
  ]
}

export default {
  components: {
    TreeItem
  },
  data() {
    return {
      treeData
    }
  }
}
