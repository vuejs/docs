import { ref } from 'vue'
import TreeItem from './TreeItem.vue'

export default {
  components: {
    TreeItem
  },
  setup() {
    const treeData = ref({
      name: 'Mi Árbol',
      children: [
        { name: 'hola' },
        { name: 'mundo' },
        {
          name: 'directorio hijo',
          children: [
            {
              name: 'directorio hijo',
              children: [{ name: 'hola' }, { name: 'mundo' }]
            },
            { name: 'hola' },
            { name: 'mundo' },
            {
              name: 'directorio hijo',
              children: [{ name: 'hola' }, { name: 'mundo' }]
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
