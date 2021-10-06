<script setup lang="ts">

</script>

<template>
  <div class="PartnerHero">
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
.PartnerHero {
  padding: 48px 24px;
  text-align: center;
}

@media (min-width: 768px) {
  .PartnerHero {
    padding: 64px 32px;
  }
}

.container {
  margin: 0 auto;
  max-width: 540px;
}

.title,
.lead,
.PartnerHero >>> .link {
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
  color: var(--vt-c-text-2);
}

.PartnerHero >>> .link       { color: var(--vt-c-brand); }
.PartnerHero >>> .link:hover { color: var(--vt-c-brand-dark); }
</style>
