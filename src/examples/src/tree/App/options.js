import TreeItem from './TreeItem.vue'

const treeData = {
  name: 'Mi Árbol',
  children: [
    { name: 'hola' },
    { name: 'wat' },
    {
      name: 'directorio hijo',
      children: [
        {
          name: 'directorio hijo',
          children: [{ name: 'hola' }, { name: 'wat' }]
        },
        { name: 'hola' },
        { name: 'wat' },
        {
          name: 'directorio hijo',
          children: [{ name: 'hola' }, { name: 'wat' }]
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
