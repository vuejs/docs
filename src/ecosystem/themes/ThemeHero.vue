<template>
  <div class="ThemeHero">
    <div class="container">
      <h1 class="title">
        <slot name="title" />
      </h1>
      <p class="lead">
        <slot name="lead" />
      </p>
    </div>
  </div>
</template>

<style scoped>
.ThemeHero {
  padding: 48px 24px;
}

@media (min-width: 768px) {
  .ThemeHero {
    padding: 64px 32px 48px;
  }
}

.container {
  margin: 0 auto;
  max-width: 960px;
}

.title,
.lead {
  transition: color 0.25s;
}

.title {
  line-height: 32px;
  font-size: 32px;
  font-weight: 500;
}

@media (min-width: 768px) {
  .title {
    line-height: 40px;
    font-size: 40px;
  }
}

.lead {
  padding-top: 8px;
  font-size: 16px;
  font-weight: 500;
  max-width: 512px;
  color: var(--vt-c-text-2);
}
</style>
