---
aside: false
page: true
returnToTop: false
---

<script>
import { defineAsyncComponent } from 'vue'
import ReplLoading from '../.vitepress/theme/components/ReplLoading.vue'

export default {
  components: {
    TutorialRepl: defineAsyncComponent({
      loader: () => import('./TutorialRepl.vue'),
      loadingComponent: ReplLoading
    })
  }
}
</script>

<ClientOnly>
  <TutorialRepl />
</ClientOnly>
