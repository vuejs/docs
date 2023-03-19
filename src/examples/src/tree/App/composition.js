import { ref } from 'vue'
import TreeItem from './TreeItem.vue'

export default {
  components: {
    TreeItem
  },
  setup() {
    const treeData = ref({
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
    })

    return {
      treeData
    }
  }
}
