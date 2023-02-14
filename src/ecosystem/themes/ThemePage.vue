<script setup lang="ts">
import ThemeHero from './ThemeHero.vue'
import ThemeList from './ThemeList.vue'
import ThemeContact from './ThemeContact.vue'
</script>

<template>
  <div class="ThemePage">
    <ThemeHero>
      <template #title>থিমগুলি</template>
      <template #lead>থিম, UI কিট এবং প্লাগইনগুলি দেখুন। আপনি দেখতে পাচ্ছেন কিভাবে আমাদের অংশীদারদের দ্বারা Vue-এর সাথে একটি বাস্তব-বিশ্বের অ্যাপ্লিকেশন তৈরি করা হয়েছে।</template>
    </ThemeHero>

    <ThemeList />

    <ThemeContact>
      এখানে আপনার থিম যুক্ত করতে চান? <a class="link" href="mailto:evan@vuejs.org?subject=Theme+affiliation">যোগাযোগ করুন!</a>
    </ThemeContact>
  </div>
</template>
