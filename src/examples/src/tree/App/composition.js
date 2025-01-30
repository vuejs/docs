import { ref } from 'vue'
import TreeItem from './TreeItem.vue'

export default {
  components: {
    TreeItem
  },
  setup() {
    const treeData = ref({
      name: 'Moje Drzewo',
      children: [
        { name: 'witaj' },
        { name: 'świecie' },
        {
          name: 'folder podrzędny',
          children: [
            {
              name: 'folder podrzędny',
              children: [{ name: 'witaj' }, { name: 'świecie' }]
            },
            { name: 'witaj' },
            { name: 'świecie' },
            {
              name: 'folder podrzędny',
              children: [{ name: 'witaj' }, { name: 'świecie' }]
            }
          ]
        }
      ]
    })

    return {
      treeData
    }
  }
}
