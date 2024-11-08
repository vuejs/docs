<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  link?: string
  linkText?: string
  showDivider?: boolean
}>(), {
  showDivider: true
})
</script>

<template>
  <section class="cta-section">
    <div v-if="showDivider" class="cta-divider"></div>
    <div class="cta-content">
      <h2 v-if="title" class="cta-title">{{ title }}</h2>
      <p v-if="description" class="cta-description">{{ description }}</p>
      <a v-if="link" :href="link" target="_blank" class="cta-link">{{ linkText }}</a>
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  text-align: center;
  max-width: 688px;
  margin: 0 auto;
}

.cta-divider {
  width: 100px;
  margin: 0 auto;
  border-top: 1px solid var(--vt-c-divider-light);
}

.cta-content {
  padding: 28px 28px 96px;
}

.cta-title {
  font-size: 34px;
  font-weight: 600;
  letter-spacing: -0.5px;
  line-height: 1.2;
  margin: 0.5em 0 1em;
}

.cta-description {
  color: var(--vt-c-text-2);
}

.cta-link {
  margin-top: 2em;
  display: inline-block;
  padding: 12px 24px;
  background-color: var(--vt-c-bg-mute);
  color: var(--vt-c-text-code);
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.5s, color 0.5s;
}

.cta-link:hover {
  background-color: var(--vt-c-gray-light-4);
}

.dark .cta-link:hover {
  background-color: var(--vt-c-gray-dark-3);
}
</style>
