<script setup lang="ts">
import { onMounted } from 'vue'
import SiteMap from './SiteMap.vue'
// import NewsLetter from './NewsLetter.vue'
import { load, data, base } from './sponsors'
import SponsorsGroup from './SponsorsGroup.vue'
import VueMasteryModal from './VueMasteryModal.vue'

onMounted(async () => {
  await load()
})
</script>

<template>
  <section id="hero">
    <h1 class="tagline">
      একটি 
      <span class="accent">প্রগতিশীল</span>
      <br />জাভাস্ক্রিপ্ট ফ্রেমওয়ার্ক
    </h1>
    <p class="description">
      কাস্টম ওয়েব ইন্টারফেস তৈরির জন্য একটি সাশ্রয়ী মূল্যের, উৎপাদনশীল এবং সর্বজনীন কাঠামো।
    </p>
    <p class="actions">
      <VueMasteryModal />
      <a class="get-started" href="/guide/introduction.html">
        শুরু করুন
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
        >
          <path
            d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"
          />
        </svg>
      </a>
      <a class="setup" href="/guide/quick-start.html">ইনস্টল</a>
    </p>
  </section>

  <section id="special-sponsor">
    <span class="lead">বিশেষ স্পন্সর</span>
    <template v-if="data && data.special">
      <template v-for="{ url, img, name, description } of data.special">
        <a :href="url" target="_blank" rel="sponsored noopener">
          <picture v-if="img.endsWith('png')">
            <source
              type="image/avif"
              :srcset="`${base}/images/${img.replace(/\.png$/, '.avif')}`"
            />
            <img :src="`${base}/images/${img}`" :alt="name" />
          </picture>
          <img
            width="168"
            height="42"
            v-else
            :src="`${base}/images/${img}`"
            :alt="name"
          />
        </a>
        <span>{{ description }}</span>
      </template>
    </template>
  </section>

  <section id="highlights" class="vt-box-container">
    <div class="vt-box">
      <h2>সহজগম্য</h2>
      <p>
        বিশ্ব-মানের ডকুমেন্টেশন সহ স্ট্যান্ডার্ড HTML, CSS এবং JavaScript with intuitive API এর উপরে তৈরি।
      </p>
    </div>
    <div class="vt-box">
      <h2>উৎপাদনশীল</h2>
      <p>
        সত্যিকারের প্রতিক্রিয়াশীল, কম্পাইলার-অপ্টিমাইজড রেন্ডারিং সিস্টেম যার জন্য খুব কমই ম্যানুয়াল অপ্টিমাইজেশনের প্রয়োজন হয়।
      </p>
    </div>
    <div class="vt-box">
      <h2>সর্বজনীন</h2>
      <p>
        একটি সমৃদ্ধ, ক্রমবর্ধমানভাবে গ্রহণযোগ্য ইকোসিস্টেম যা একটি লাইব্রেরি এবং একটি সম্পূর্ণ বৈশিষ্ট্যযুক্ত কাঠামোর মধ্যে মাপকাঠি।
      </p>
    </div>
  </section>

  <section id="sponsors">
    <h2>প্লাটিনাম স্পনসর</h2>
    <SponsorsGroup tier="platinum" placement="landing" />
    <h2>গোল্ড স্পনসর</h2>
    <SponsorsGroup tier="gold" placement="landing" />
  </section>

  <SiteMap />
  <!-- <NewsLetter /> -->
</template>

<style scoped>
section {
  padding: 42px 32px;
}

#hero {
  padding: 96px 32px;
  text-align: center;
}

.tagline {
  font-size: 76px;
  line-height: 1.25;
  font-weight: 900;
  letter-spacing: -1.5px;
  max-width: 960px;
  margin: 0px auto;
}

html:not(.dark) .accent,
.dark .tagline {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  max-width: 960px;
  line-height: 1.5;
  color: var(--vt-c-text-2);
  transition: color 0.5s;
  font-size: 22px;
  margin: 24px auto 40px;
}

.actions a {
  font-size: 16px;
  display: inline-block;
  background-color: var(--vt-c-bg-mute);
  padding: 8px 18px;
  font-weight: 500;
  border-radius: 8px;
  transition: background-color 0.5s, color 0.5s;
}

.actions .get-started {
  margin-right: 18px;
}

.actions .icon {
  display: inline;
  position: relative;
  top: -1px;
  margin-left: 2px;
  fill: currentColor;
  transition: transform 0.2s;
}

.actions .get-started:hover {
  transition-duration: 0.2s;
}

.actions .get-started:hover .icon {
  transform: translateX(2px);
}

.actions .get-started,
.actions .setup {
  color: var(--vt-c-text-code);
}

.actions .get-started:hover,
.actions .setup:hover {
  background-color: var(--vt-c-gray-light-4);
  transition-duration: 0.2s;
}

.dark .actions .get-started:hover,
.dark .actions .setup:hover {
  background-color: var(--vt-c-gray-dark-3);
}

#special-sponsor {
  border-top: 1px solid var(--vt-c-divider-light);
  border-bottom: 1px solid var(--vt-c-divider-light);
  padding: 12px 24px;
  display: flex;
  align-items: center;
}

#special-sponsor span {
  color: var(--vt-c-text-2);
  font-weight: 500;
  font-size: 13px;
  vertical-align: middle;
  flex: 1;
}

#special-sponsor span:first-child {
  text-align: right;
}

#special-sponsor a {
  display: flex;
  justify-content: center;
  padding: 0 24px;
}

#special-sponsor img {
  height: 42px;
  margin: -6px 0;
}

.dark #special-sponsor img {
  filter: grayscale(1) invert(1);
}

#highlights {
  max-width: 960px;
  margin: 0px auto;
  color: var(--vt-c-text-2);
}

#highlights h2 {
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.4px;
  color: var(--vt-c-text-1);
  transition: color 0.5s;
  margin-bottom: 0.75em;
}

#highlights p {
  font-weight: 400;
  font-size: 15px;
}

#highlights .vt-box {
  background-color: transparent;
}

#sponsors {
  max-width: 900px;
  margin: 0px auto;
}

#sponsors h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 1em;
}

#sponsors .sponsor-container {
  margin-bottom: 3em;
}

@media (max-width: 960px) {
  .tagline {
    font-size: 64px;
    letter-spacing: -0.5px;
  }
  .description {
    font-size: 18px;
    margin-bottom: 48px;
  }
}

@media (max-width: 768px) {
  .tagline {
    font-size: 48px;
    letter-spacing: -0.5px;
  }
}

@media (max-width: 576px) {
  #hero {
    padding: 56px 32px;
  }
  .description {
    font-size: 16px;
    margin: 18px 0 30px;
  }
  #special-sponsor {
    flex-direction: column;
  }
  #special-sponsor img {
    height: 36px;
    margin: 8px 0;
  }
  #special-sponsor span {
    text-align: center !important;
  }
  #highlights h3 {
    margin-bottom: 0.6em;
  }
  #highlights .vt-box {
    padding: 20px 36px;
  }
  .actions a {
    margin: 18px 0;
  }
}

@media (max-width: 370px) {
  .tagline {
    font-size: 36px;
  }
}
</style>
