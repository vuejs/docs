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
      <template #title>Vieni a conoscere il Team</template>
      <template #lead
        >Lo sviluppo di Vue ed il suo ecosistema sono guidati da un team multi-etnico proveniente da ogni parte del mondo, alcuni di loro hanno scelto di essere
        <span class="nowrap">menzionati qui sotto.</span></template
      >

      <template #action>
        <VTLink
          href="https://github.com/vuejs/governance/blob/master/Team-Charter.md"
          >Scopri di più sui teams</VTLink
        >
      </template>
    </TeamHero>

    <TeamList :members="membersCoreData as Member[]">
      <template #title>Membri fondamentali del team</template>
      <template #lead
        >I membri fondamentali sono quelle persone coinvolte attivamente nella
        manutenzione di uno o più progetti principali. Hanno apportato un  
        contributo significativo all'ecosistema di Vue, con un impegno a lungo termine per il successo del progetto e dei suoi utenti.</template
      >
    </TeamList>

    <TeamList :members="membersEmeritiData as Member[]">
      <template #title>Meriti Core Team</template>
      <template #lead
        >Qui rendiamo omaggio a alcuni membri del team principale che non sono più attivi ma che hanno fatto preziosi contributi in passato.</template
      >
    </TeamList>

    <TeamList :members="membersPartnerData as Member[]">
      <template #title>Partner della community</template>
      <template #lead
        >Alcuni membri della comunità di Vue hanno arricchito così tanto il progetto da meritare una menzione speciale. Abbiamo sviluppato un rapporto più intimo con questi partner chiave, spesso coordinandoci con loro sulle prossime funzionalità e notizie.</template
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