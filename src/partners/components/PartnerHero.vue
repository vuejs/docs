<script setup lang="ts">
const { title = 'Socios de Vue' } = defineProps<{ title?: string }>()
</script>

<template>
  <div class="PartnerHero">
    <h1 class="title">{{ title }}</h1>
    <p class="lead">
      Los socios de Vue son agencias avaladas por el equipo de Vue que
      proveen servicios de consultoría y desarrollo de Vue de primera
      clase. Si tu empresa está interesada en figurar como socio, por favor
      <a href="https://airtable.com/shrCQhat57SApJI2l" target="_blank"
        >registra tu interés aquí</a
      >.
    </p>
  </div>
</template>

<style scoped>
.PartnerHero {
  padding: 48px 24px;
  text-align: center;
  margin: 0 auto;
  max-width: 688px;
}

@media (min-width: 768px) {
  .PartnerHero {
    padding: 64px 32px;
  }
}

.title,
.lead,
.PartnerHero :deep(.link) {
  transition: color 0.25s;
}

.title {
  line-height: 32px;
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 0.3em;
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

.lead a {
  color: var(--vt-c-brand);
}

.PartnerHero :deep(.link) {
  color: var(--vt-c-brand);
}

.PartnerHero :deep(.link:hover) {
  color: var(--vt-c-brand-dark);
}
</style>
