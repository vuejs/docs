<script setup lang="ts">
import SponsorsGroup from './SponsorsGroup.vue'
import { useData } from 'vitepress'
const { frontmatter } = useData()
</script>

<template>
  <a
    class="viteconf-cta-aside"
    href="https://viteconf.org/?utm=vue-sidebar"
    target="_blank"
  >
    <img width="22" height="22" src="/viteconf.svg" />
    <span>
      <p class="extra-info">Building Together</p>
      <p class="heading">ViteConf 24 - Oct 3</p>
      <p class="extra-info">Get your free ticket!</p>
    </span>
  </a>
  <div v-if="frontmatter.sponsors !== false">
    <a class="sponsors-aside-text" href="/sponsor/">Sponsors</a>
    <SponsorsGroup tier="special" />
    <SponsorsGroup tier="platinum" />
  </div>
</template>

<style>
a.sponsors-aside-text {
  color: var(--vt-c-text-3);
  display: block;
  margin: 1em 0 1em;
  font-weight: 700;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.viteconf-cta-aside {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  position: relative;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1rem;
  background-color: var(--vt-c-bg-soft);
  border: 2px solid var(--vt-c-bg-soft);
  transition: border-color 0.5s;
  filter: grayscale(1);
}
.viteconf-cta-aside:hover {
  border: 2px solid #9499ff;
  filter: none;
}
.viteconf-cta-aside img {
  transition: transform 0.5s;
  transform: scale(1.25);
}
.viteconf-cta-aside:hover img {
  transform: scale(1.75);
}

.viteconf-cta-aside .heading {
  color: var(--vt-c-text-1);
}

.viteconf-cta-aside:hover .heading {
  background-image: linear-gradient(
    120deg,
    #b047ff 16%,
    #9499ff,
    #9499ff
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.viteconf-cta-aside .extra-info {
  color: var(--vt-c-text-1);
  opacity: 0;
  font-size: 0.7rem;
  padding-left: 0.1rem;
  transition: opacity 0.5s;
}
.viteconf-cta-aside:hover .extra-info {
  opacity: 0.9;
}
</style>
