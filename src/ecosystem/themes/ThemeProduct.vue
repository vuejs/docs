<script setup lang="ts">
import { VTLink } from '@vue/theme'

defineProps<{
  product: Record<string, any>
}>()
</script>

<template>
  <VTLink class="ThemeProduct" :href="product.url" no-icon>
    <article class="container">
      <figure class="figure">
        <img class="image" :src="product.image" :alt="product.name">
      </figure>

      <div class="data">
        <div class="title">
          <h1 class="name">{{ product.name }}</h1>
          <p class="description">{{ product.description }}</p>
        </div>

        <div class="price">
          <p v-if="product.price > 0" class="value">${{ product.price }}</p>
          <p v-else class="free">FREE</p>
        </div>
      </div>
    </article>
  </VTLink>
</template>

<style scoped>
.ThemeProduct {
  display: block;
}

.ThemeProduct:hover .figure {
  transform: translateY(-4px);
}

.ThemeProduct:hover .name {
  color: var(--vt-c-brand);
}

.figure {
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.25s;
}

.data {
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
}

.title {
  flex-grow: 1;
  padding-right: 8px;
}

.name {
  font-size: 16px;
  font-weight: 500;
  transition: color 0.25s;
}

.description {
  padding-top: 2px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vt-c-text-2);
  transition: color 0.25s;
}

.price {
  text-align: right;
  flex-shrink: 0;
  width: 56px;
}

.value {
  font-size: 16px;
  font-weight: 500;
}

.free {
  display: inline-block;
  border-radius: 4px;
  padding: 0 8px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vt-c-white);
  background-color: var(--vt-c-brand);
  transform: translateY(-2px);
}
</style>
