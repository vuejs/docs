<script setup lang="ts">
import {
  VTIconFacebook,
  VTIconGitHub,
  VTIconGlobe,
  VTIconInstagram,
  VTIconLink,
  VTIconLinkedIn,
  VTIconMail,
  VTIconMapPin,
  VTIconTwitter,
  VTIconYouTube,
  VTLink
} from '@vue/theme'

const props = defineProps({
  partner: { type: Object, required: true }
})

const linkIcons = {
  email: VTIconMail,
  facebook: VTIconFacebook,
  github: VTIconGitHub,
  instagram: VTIconInstagram,
  linkedin: VTIconLinkedIn,
  twitter: VTIconTwitter,
  youtube: VTIconYouTube
}
</script>

<template>
  <article class="PartnerListItem">
    <div class="container">
      <div class="billboard">
        <VTLink class="logo" :href="partner.website.url" no-icon>
          <img class="logo-image" :src="`/images/partners/${partner.logo}`" :alt="partner.name">
        </VTLink>

        <div class="social-links">
          <VTLink
            v-for="link in partner.links"
            :key="link.url"
            class="social-link"
            :href="link.url"
            no-icon
          >
            <component :is="linkIcons[link.type]" class="social-link-icon" />
          </VTLink>
        </div>
      </div>

      <div class="content">
        <h1 class="title">About {{ partner.name }}</h1>
        <p v-for="(lead, index) in partner.description" :key="index" class="description">
          {{ lead }}
        </p>

        <section class="proficiencies">
          <h2 class="title">Proficiencies</h2>

          <ul class="proficiency-list">
            <li
              v-for="proficiency in partner.proficiencies"
              :key="proficiency.name"
              class="proficiency-item"
            >
              <VTLink v-if="proficiency.url" class="proficiency-link" :href="proficiency.url" no-icon>
                {{ proficiency.name }}
              </VTLink>
              <span v-else class="proficiency-text">
                {{ proficiency.name }}
              </span>
            </li>
          </ul>
        </section>

        <section class="data">
          <ul class="data-list">
            <li class="data-item">
              <div class="data-icon">
                <VTIconLink class="data-icon-svg" />
              </div>
              <VTLink class="data-link" :href="partner.website.url" no-icon>
                {{ partner.website.text }}
              </VTLink>
            </li>
            <li class="data-item">
              <div class="data-icon">
                <VTIconMapPin class="data-icon-svg" />
              </div>
              <ul class="data-texts">
                <li v-for="location in partner.locations" :key="location" class="data-text">
                  {{ location }}
                </li>
              </ul>
            </li>
            <li class="data-item">
              <div class="data-icon">
                <VTIconGlobe class="data-icon-svg" />
              </div>
              <ul class="data-texts">
                <li v-for="language in partner.languages" :key="language" class="data-text">
                  {{ language }}
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </article>
</template>

<style scoped>
.PartnerListItem {
  padding: 64px 24px;
  background-color: var(--vt-c-bg-soft);
  transition: background-color 0.5s;
}

@media (min-width: 768px) {
  .PartnerListItem {
    padding: 64px 32px;
  }
}

.container {
  margin: 0 auto;
  max-width: 392px;
}

@media (min-width: 768px) {
  .container {
    display: flex;
    max-width: 768px;
  }
}

.billboard {
  flex-shrink: 0;
  margin: 0 auto;
  width: 192px;
}

.logo {
  display: block;
  border: 1px solid transparent;
  border-radius: 8px;
  width: 192px;
  height: 192px;
  overflow: hidden;
  transition: border-color 0.25s;
}

.logo:hover {
  border-color: var(--vt-c-brand);
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  padding: 8px 16px;
}

.social-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  color: var(--vt-c-text-2);
  transition: color 0.25s;
}

.social-link:hover {
  color: var(--vt-c-text-1);
}

.social-link-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.content {
  padding-top: 24px;
  flex-grow: 1;
}

@media (min-width: 768px) {
  .content {
    padding-top: 4px;
    padding-left: 32px;
  }
}

@media (min-width: 960px) {
  .content {
    padding-left: 64px;
  }
}

.title {
  padding-bottom: 8px;
  font-size: 14px;
  font-weight: 700;
}

.description {
  font-size: 14px;
}

.description + .description {
  padding-top: 12px;
}

.proficiencies {
  padding-top: 24px;
}

.proficiency-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -4px;
}

.proficiency-item {
  padding: 0 4px;
}

.proficiency-item::after {
  margin-left: 8px;
  content: "•";
  color: var(--vt-c-text-3);
  transition: color 0.25s;
}

.proficiency-item:last-child::after {
  display: none;
}

.proficiency-link,
.proficiency-text {
  font-size: 14px;
  font-weight: 500;
  transition: color 0.25s;
}

.proficiency-link       { color: var(--vt-c-brand); }
.proficiency-link:hover { color: var(--vt-c-brand-dark); }
.proficiency-text       { color: var(--vt-c-text-1); }

.data {
  padding-top: 24px;
}

.data-item {
  display: flex;
}

.data-item + .data-item {
  padding-top: 12px;
}

.data-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-right: 12px;
  width: 16px;
  height: 24px;
}

.data-icon-svg {
  width: 16px;
  height: 16px;
  fill: var(--vt-c-text-2);
  transition: fill 0.25s;
}

.data-item {
  font-size: 14px;
  font-weight: 500;
}

.data-link {
  line-height: 24px;
  color: var(--vt-c-brand);
  transition: color 0.25s;
}

.data-link:hover {
  color: var(--vt-c-brand-dark);
}

.data-texts {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -4px;
}

.data-text {
  padding: 0 4px;
  line-height: 24px;
  transition: color 0.25s;
}

.data-text::after {
  margin-left: 8px;
  content: "•";
  color: var(--vt-c-text-3);
  transition: color 0.25s;
}

.data-text:last-child::after {
  display: none;
}
</style>
