import { ref } from 'vue'
import TreeItem from './TreeItem.vue'

export default {
  components: {
    TreeItem
  },
  setup() {
    const treeData = ref({
      name: 'Il mio albero',
      children: [
        { name: 'ciao' },
        { name: 'mondo' },
        {
          name: 'cartella figlio',
          children: [
            {
              name: 'cartella figlio',
              children: [{ name: 'ciao' }, { name: 'mondo' }]
            },
            { name: 'ciao' },
            { name: 'mondo' },
            {
              name: 'cartella figlio',
              children: [{ name: 'ciao' }, { name: 'mondo' }]
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
