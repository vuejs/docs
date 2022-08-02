import { ref } from 'vue'
import TreeItem from './TreeItem.vue'

export default {
  components: {
    TreeItem
  },
  setup() {
    const treeData = ref({
      name: 'My Tree',
      children: [
        { name: 'hello' },
        { name: 'world' },
        {
          name: 'child folder',
          children: [
            {
              name: 'child folder',
              children: [{ name: 'hello' }, { name: 'world' }]
            },
            { name: 'hello' },
            { name: 'world' },
            {
              name: 'child folder',
              children: [{ name: 'hello' }, { name: 'world' }]
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
