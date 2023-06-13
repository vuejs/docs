---
page: true
title: Examples
aside: false
footer: false
outline: false
---

<script>
import { defineAsyncComponent } from 'vue'
import ReplLoading from '@theme/components/ReplLoading.vue'

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
