---
page: true
aside: false
footer: false
returnToTop: false
---

<script>
import { defineAsyncComponent } from 'vue'
import ReplLoading from '../.vitepress/theme/components/ReplLoading.vue'

export default {
  components: {
    ExampleRepl: defineAsyncComponent({
      loader: () => import('./ExampleRepl.vue'),
      loadingComponent: ReplLoading
    })
  }
}
</script>

<ClientOnly>
  <ExampleRepl />
</ClientOnly>
