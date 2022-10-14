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
      <template #title>Poznaj zespół</template>
      <template #lead
        >Rozwój Vue i jego ekosystemu jest kierowany przez międzynarodowy
        zespół, z których część postanowiła
        <span class="nowrap">zaprezentować się poniżej.</span></template
      >

      <template #action>
        <VTLink
          href="https://github.com/vuejs/governance/blob/master/Team-Charter.md"
          >Dowiedz się więcej o zespołach</VTLink
        >
      </template>
    </TeamHero>

    <TeamList :members="membersCoreData as Member[]">
      <template #title>Core Team Members</template>
      <template #lead
        >Członkowie głownego zespołu to osoby, które są aktywnie
        zaangażowane w utrzymanie jednego lub więcej projektów core.
        Wnieśli oni znaczący wkład do ekosystemu Vue, wykazując długotrwałe
        zaangażowanie w sukces projektu i jego użytkowników.
      </template>
    </TeamList>

    <TeamList :members="membersEmeritiData as Member[]">
      <template #title>Core Team Emeriti</template>
      <template #lead
        >W tym miejscu honorujemy niektórych nieaktywnych już członków
        głównego zespołu, którzy wnieśli cenny wkład w
        przeszłości.</template
      >
    </TeamList>

    <TeamList :members="membersPartnerData as Member[]">
      <template #title>Community Partners</template>
      <template #lead
        >Niektórzy członkowie społeczności Vue tak go wzbogacili, że
        zasługują na szczególną wzmiankę. Nawiązaliśmy bliższe relacje z
        tymi kluczowymi partnerami, często koordynując z nimi nadchodzące
        funkcje i wiadomości.</template
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
