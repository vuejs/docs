<script setup lang="ts">
import { computed, onMounted, ref, shallowRef } from 'vue'

const props = withDefaults(
  defineProps<{
    items: Array<any>
    filter?: (item: any) => boolean
    cardComponent: any
    showLinkToAll?: boolean
    shuffleItems?: boolean
    browseLinkText?: string
    browseLinkUrl?: string
    splitBy?: string
  }>(),
  {
    showLinkToAll: false,
    shuffleItems: false,
    splitBy: 'platinum'
  }
)

const isMounted = ref(false)
const items = shallowRef([...props.items])

const filteredItems = computed(() =>
  props.filter ? items.value.filter(props.filter) : items.value
)

onMounted(() => {
  isMounted.value = true
  items.value = processItems([...items.value], props.splitBy, props.shuffleItems)
})

function processItems(items: Array<any>, splitBy: string, shouldShuffle: boolean) {
  const splitItems = items.filter(item => item[splitBy])
  const otherItems = items.filter(item => !item[splitBy])

  if (shouldShuffle) {
    shuffleArray(splitItems)
    shuffleArray(otherItems)
  }

  return [...splitItems, ...otherItems]
}

function shuffleArray(array: Array<any>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // don't remove semicolon
    [array[i], array[j]] = [array[j], array[i]]
  }
}
</script>

<template>
  <div v-show="isMounted" class="card-list">
    <!-- to skip SSG since the partners are shuffled -->
    <ClientOnly>
      <component
        :is="cardComponent"
        v-for="item in filteredItems"
        :key="item.id || item.name"
        :data="item"
      />
    </ClientOnly>

    <a
      v-if="showLinkToAll && filteredItems.length % 2"
      :href="browseLinkUrl"
      class="browse-all-link"
    >
      {{ browseLinkText }}
    </a>
  </div>
</template>

<style scoped>
.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.browse-all-link {
  display: block;
  width: 48.5%;
  margin-bottom: 36px;
  padding-top: 240px;
  font-size: 1.2em;
  text-align: center;
  color: var(--vt-c-text-2);
  border: 1px solid var(--vt-c-divider-light);
  border-radius: 4px;
  transition: color 0.5s ease;
}

.browse-all-link:hover {
  color: var(--vt-c-text-1);
}

@media (max-width: 768px) {
  .browse-all-link {
    display: none;
  }
}
</style>
