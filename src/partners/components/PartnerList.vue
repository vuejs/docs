<script setup lang="ts">
import partnersRaw from '../partners.json'
import { ref, shallowRef, computed, onMounted } from 'vue'
import PartnerCard from './PartnerCard.vue'
import { Partner } from './type'

const props = defineProps<{
  filter?: (p: Partner) => boolean | undefined
  showLinkToAll?: boolean
}>()

const mounted = ref(false)
const partners = shallowRef(partnersRaw as Partner[])

const filtered = computed(() =>
  props.filter ? partners.value.filter(props.filter) : partners.value
)

onMounted(() => {
  mounted.value = true
  const platinum = partners.value.filter((p) => p.platinum)
  shuffle(platinum)
  const normal = partners.value.filter((p) => !p.platinum)
  shuffle(normal)
  partners.value = [...platinum, ...normal]
})

function shuffle(array: Array<any>) {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex

  // while there remain elements to shuffle...
  while (currentIndex !== 0) {
    // pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    // and swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}
</script>

<template>
  <div class="PartnerList" v-show="mounted">
    <!-- to skip SSG since the partners are shuffled -->
    <ClientOnly>
      <PartnerCard v-for="p in filtered" :key="p.name" :data="p" />
    </ClientOnly>
    <a
      class="browse-all"
      href="./all.html"
      v-if="showLinkToAll && filtered.length % 2"
    >
      Browse and Search<br />All Partners
    </a>
  </div>
</template>

<style scoped>
.PartnerList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.browse-all {
  color: var(--vt-c-text-2);
  transition: color 0.5s ease;
  font-size: 1.2em;
  text-align: center;
  padding-top: 240px;
  display: block;
  border-radius: 4px;
  border: 1px solid var(--vt-c-divider-light);
  width: 48.5%;
  margin-bottom: 36px;
}

.browse-all:hover {
  color: var(--vt-c-text-1);
}

@media (max-width: 768px) {
  .browse-all {
    display: none;
  }
}
</style>
