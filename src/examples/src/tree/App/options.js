import TreeItem from './TreeItem.vue'

const treeData = {
  name: 'Моє дерево',
  children: [
    { name: 'привіт' },
    { name: 'світ' },
    {
      name: 'дочірня папка',
      children: [
        {
          name: 'дочірня папка',
          children: [{ name: 'привіт' }, { name: 'світ' }]
        },
        { name: 'привіт' },
        { name: 'світ' },
        {
          name: 'дочірня папка',
          children: [{ name: 'привіт' }, { name: 'світ' }]
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
