---
page: true
title: Tutorial
sidebar: false
aside: false
footer: false
returnToTop: false
---

<script>
import { defineAsyncComponent } from 'vue'
import ReplLoading from '@theme/components/ReplLoading.vue'

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
