<script setup lang="ts">
import partnersRaw from '../partners.json'
import PartnerCard from './PartnerCard.vue'
import { Partner } from './type'
import CardList from '@theme/components/CardList.vue'

const props = defineProps<{
  filter?: (p: Partner) => boolean | undefined
  showLinkToAll?: boolean
}>()

</script>

<template>
  <CardList
    :items="partnersRaw"
    :filter="props.filter"
    :cardComponent="PartnerCard"
    :showLinkToAll="props.showLinkToAll"
    browseLinkText="Browse More Developers"
    browseLinkUrl="./all.html"
    shuffleItems
  />
</template>
