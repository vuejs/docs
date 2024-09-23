<script setup lang="ts">
const props = defineProps<{
  spotlightTitle?: string
  featuredTitle?: string
  browseLinkText?: string
  browseLinkUrl?: string
}>()
</script>

<template>
  <div class="showcase-layout">
    <!-- Hero Section -->
    <slot name="hero"></slot>

    <!-- Spotlight Section -->
    <div class="showcase-layout__spotlight">
      <div class="spotlight-content">
        <h2 v-if="props.spotlightTitle" class="section-title">{{ props.spotlightTitle }}</h2>
        <slot name="spotlight"></slot>
      </div>
    </div>

    <!-- Featured Section -->
    <div class="showcase-layout__featured">
      <!-- Optional Actions Section -->
      <div v-if="$slots.actions" class="featured-actions">
        <slot name="actions"></slot>
      </div>
      <h2 v-if="props.featuredTitle" class="section-title">{{ props.featuredTitle }}</h2>
      <slot name="featured-list"></slot>
      <slot name="featured-cta">
        <div v-if="browseLinkUrl" class="browse-more">
          <a class="accent-button" :href="props.browseLinkUrl">{{ props.browseLinkText }}</a>
        </div>
      </slot>
    </div>

    <!-- Join Section -->
    <slot name="join"></slot>
  </div>
</template>

<style scoped>
.showcase-layout {
  padding-bottom: 16px;
}

.showcase-layout__spotlight {
  background-color: var(--vt-c-bg-soft);
}

.spotlight-content {
  padding: 36px 48px;
  max-width: 1280px;
  margin: 0 auto;
}

.section-title {
  font-size: 1.1em;
  font-weight: 600;
  margin-bottom: 1.5em;
  color: var(--vt-c-text-2);
}

.showcase-layout__featured {
  padding: 36px 48px;
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
}

.featured-actions {
  width: 100%;
  margin-bottom: 1.5em;
}

.browse-more {
  margin: 1.5rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.accent-button,
:deep(.accent-button) {
  display: block;
  width: fit-content;
  min-width: 240px;
  text-align: center;
  background-color: var(--vt-c-brand);
  color: var(--vt-c-bg);
  padding: 12px 24px;
  font-weight: 600;
  border-radius: 6px;
  transition: background-color 0.5s, color 0.5s;
  text-decoration: none;
}

.accent-button:hover,
:deep(.accent-button):hover {
  background-color: var(--vt-c-brand-dark);
}

/* Media Queries */
@media (max-width: 768px) {
  .spotlight-content,
  .showcase-layout__featured {
    padding: 36px 28px;
  }
}
</style>
