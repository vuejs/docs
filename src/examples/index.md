---
aside: false
page: true
---

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    Examples: defineAsyncComponent(() => import('./Examples.vue'))
  }
}
</script>

<ClientOnly>
  <Examples />
</ClientOnly>
