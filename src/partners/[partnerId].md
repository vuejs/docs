---
page: true
footer: false
---

<script setup>
import { useData } from 'vitepress'
import Page from './components/PartnerPage.vue'

const { page } = useData()
</script>

<Page :partner="page.params.partnerId" />
