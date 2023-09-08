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
      <template #title>Lernen Sie das Team kennen</template>
      <template #lead>
        Die Entwicklung von Vue und seinem Ökosystem wird von einem
        internationalen Team geleitet, von dem einige
        <span class="nowrap">im Folgenden vorgestellt</span> werden sollen.
      </template>

      <template #action>
        <VTLink
          href="https://github.com/vuejs/governance/blob/master/Team-Charter.md"
        >
          Erfahren Sie mehr über Teams
        </VTLink>
      </template>
    </TeamHero>

    <TeamList :members="membersCoreData as Member[]">
      <template #title>Mitglieder des Kernteams</template>
      <template #lead
        >Mitglieder des Kernteams sind diejenigen, die sich aktiv an der an
        der Betreuung eines oder mehrerer Kernprojekte beteiligt sind. Sie
        haben Beiträge zum Vue-Ökosystem geleistet, mit einem langfristigen
        dem Erfolg des Projekts und seiner Benutzer verpflichtet.
      </template>
    </TeamList>

    <TeamList :members="membersEmeritiData as Member[]">
      <template #title>Ehemalige Mitglieder des Kernteams</template>
      <template #lead>
        Hier ehren wir einige nicht mehr aktive Mitglieder des Kernteams,
        die die in der Vergangenheit wertvolle Beiträge geleistet haben.
      </template>
    </TeamList>

    <TeamList :members="membersPartnerData as Member[]">
      <template #title>Community Partner</template>
      <template #lead>
        Einige Mitglieder der Vue-Community haben sie so bereichert, dass
        sie eine besondere Erwähnung verdienen. Wir haben eine engere
        Beziehung Beziehung zu diesen wichtigen Partnern entwickelt und
        stimmen uns oft mit ihnen über kommende Funktionen und Neuigkeiten.
      </template>
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
