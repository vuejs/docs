<template>
  <div class="page-hero">
    <h1 class="page-hero__title">
      <slot name="title" />
    </h1>
    <div class="page-hero__lead">
      <slot name="lead" />
    </div>
  </div>
</template>

<style scoped>
.page-hero {
  padding: 48px 24px;
  text-align: center;
  margin: 0 auto;
  max-width: 688px;
}

.page-hero__title,
.page-hero__lead,
.page-hero :deep(.link) {
  transition: color 0.25s;
}

.page-hero__title {
  line-height: 32px;
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 0.3em;
}

.page-hero__lead {
  padding-top: 8px;
  font-size: 16px;
  font-weight: 500;
  color: var(--vt-c-text-2);
}

.page-hero__lead a {
  color: var(--vt-c-brand);
}

.page-hero :deep(.link) {
  color: var(--vt-c-brand);
}

.page-hero :deep(.link:hover) {
  color: var(--vt-c-brand-dark);
}

/* Media Queries */
@media (min-width: 768px) {
  .page-hero {
    padding: 64px 32px;
  }

  .page-hero__title {
    line-height: 40px;
    font-size: 40px;
  }
}
</style>
