<template>
  <div class="SponsorSectionHero">
    <div class="container">
      <p class="lead">
        <slot name="lead" />
      </p>

      <div class="main">
        <h2 class="title">
          <slot name="title" />
        </h2>

        <div class="action">
          <a class="action-link" href="/sponsor/">
            Become a Sponsor
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.SponsorSectionHero {
  padding: 0 24px;
}

@media (min-width: 768px) {
  .SponsorSectionHero {
    padding: 0 32px;
  }
}

.container {
  margin: 0 auto;
  max-width: 960px;
}

@media (min-width: 640px) {
  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.lead {
  font-size: 16px;
  font-weight: 500;
  color: var(--vt-c-brand);
}

.title {
  padding-top: 4px;
  max-width: 420px;
  line-height: 28px;
  font-size: 20px;
  font-weight: 500;
}

.action {
  padding-top: 16px;
  transform: translateX(-4px);
}

@media (min-width: 640px) {
  .action {
    padding-top: 0;
    transform: translateX(0);
  }
}

.action-link {
  display: inline-block;
  border: 1px solid var(--vt-c-brand);
  border-radius: 20px;
  padding: 7px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vt-c-brand);
  transition: border-color 0.25s, color 0.25s;
}

.action-link:hover {
  border-color: var(--vt-c-brand-dark);
  color: var(--vt-c-brand-dark);
}
</style>
