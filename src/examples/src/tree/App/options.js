import TreeItem from './TreeItem.vue'

const treeData = {
  name: 'Moje Drzewo',
  children: [
    { name: 'witaj' },
    { name: 'coś' },
    {
      name: 'folder podrzędny',
      children: [
        {
          name: 'folder podrzędny',
          children: [{ name: 'witaj' }, { name: 'coś' }]
        },
        { name: 'witaj' },
        { name: 'coś' },
        {
          name: 'folder podrzędny',
          children: [{ name: 'witaj' }, { name: 'coś' }]
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
