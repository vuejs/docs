<template>
  <aside class="ThemeContact">
    <p class="text">
      <slot />
    </p>
  </aside>
</template>

<style scoped>
.ThemeContact {
  padding: 32px 24px;
  border-bottom: 1px solid var(--vt-c-divider-light);
  background-color: var(--vt-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s;
}

.dark .ThemeContact {
  border-bottom-color: var(--vt-c-bg-soft);
}

@media (min-width: 768px) {
  .ThemeContact {
    padding: 48px 32px;
  }
}

.container {
  margin: 0 auto;
  max-width: 960px;
}

.text {
  text-align: center;
  line-height: 24px;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.25s;
}

.text :deep(.link) {
  color: var(--vt-c-brand);
  white-space: nowrap;
  transition: color 0.25s;
}

.text :deep(.link:hover) {
  color: var(--vt-c-brand-dark);
}
</style>
