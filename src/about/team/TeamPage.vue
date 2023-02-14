<script lang="ts">
const shuffleMembers = (members: Member[], pinTheFirstMember = false): void => {
  let offset = pinTheFirstMember ? 1 : 0
  // `i` is between `1` and `length - offset`
  // `j` is between `0` and `length - offset - 1`
  // `offset + i - 1` is between `offset` and `length - 1`
  // `offset + j` is between `offset` and `length - 1`
  let i = members.length - offset
  while (i > 0) {
    const j = Math.floor(Math.random() * i);
    [
      members[offset + i - 1],
      members[offset + j]
    ] = [
      members[offset + j],
      members[offset + i - 1]
    ]
    i--
  }
}
</script>

<script setup lang="ts">
import { VTLink } from '@vue/theme'
import membersCoreData from './members-core.json'
import membersEmeritiData from './members-emeriti.json'
import membersPartnerData from './members-partner.json'
import TeamHero from './TeamHero.vue'
import TeamList from './TeamList.vue'
import type { Member } from './Member'
shuffleMembers(membersCoreData as Member[], true)
shuffleMembers(membersEmeritiData as Member[])
shuffleMembers(membersPartnerData as Member[])
</script>

<template>
  <div class="TeamPage">
    <TeamHero>
      <template #title>আমাদের দল দেখুন </template>
      <template #lead
        >Vue এবং এর বাস্তুতন্ত্রের বিকাশ একটি আন্তর্জাতিক দ্বারা পরিচালিত হয়
         দল, যাদের মধ্যে কিছু হতে বেছে নিয়েছে
        <span class="nowrap">নীচে বৈশিষ্ট্যযুক্ত।</span></template
      >

      <template #action>
        <VTLink
          href="https://github.com/vuejs/governance/blob/master/Team-Charter.md"
          >দল সম্পর্কে আরও জানুন</VTLink
        >
      </template>
    </TeamHero>

    <TeamList :members="membersCoreData as Member[]">
      <template #title>মূল দলের সদস্যরা</template>
      <template #lead
        >মূল দলের সদস্য যারা সক্রিয়ভাবে জড়িত
         এক বা একাধিক মূল প্রকল্পের রক্ষণাবেক্ষণ। তারা তাৎপর্যপূর্ণ করেছে
         Vue ইকোসিস্টেমে অবদান, একটি দীর্ঘমেয়াদী প্রতিশ্রুতি সঙ্গে
         প্রকল্প এবং এর ব্যবহারকারীদের সাফল্য।</template
      >
    </TeamList>

    <TeamList :members="membersEmeritiData as Member[]">
      <template #title>মূল দল থেকে অবসরপ্রাপ্ত</template>
      <template #lead
        >এখানে আমরা কিছু আর সক্রিয় নয় এমন মূল দলের সদস্যদের সম্মান করি যারা তৈরি করেছেন
         অতীতে মূল্যবান অবদান।</template
      >
    </TeamList>

    <TeamList :members="membersPartnerData as Member[]">
      <template #title>সম্প্রদায়ের অংশীদার</template>
      <template #lead
        >Vue সম্প্রদায়ের কিছু সদস্য এটিকে এতটাই সমৃদ্ধ করেছে যে তারা
         বিশেষ উল্লেখের যোগ্য। আমরা আরও ঘনিষ্ঠ সম্পর্ক গড়ে তুলেছি
         এই মূল অংশীদারদের সাথে, প্রায়শই আসন্ন সময়ে তাদের সাথে সমন্বয় করে
         বৈশিষ্ট্য এবং খবর।</template
      >
    </TeamList>
  </div>
</template>

<style scoped>
.TeamPage {
  padding-bottom: 16px;
}

@media (min-width: 768px) {
  .TeamPage {
    padding-bottom: 96px;
  }
}

.TeamList + .TeamList {
  padding-top: 64px;
}
</style>
