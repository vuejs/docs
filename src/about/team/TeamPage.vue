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
      <template #title>Знайомтесь із командою</template>
      <template #lead
                >Розвитком Vue та його екосистеми керує міжнародна команда,
                деякі з яких вирішили бути
        <span class="nowrap">представлені нижче.</span></template
      >

      <template #action>
        <VTLink
          href="https://github.com/vuejs/governance/blob/master/Team-Charter.md"
          >Дізнайтеся більше про команди</VTLink
        >
      </template>
    </TeamHero>

    <TeamList :members="membersCoreData as Member[]">
      <template #title>Члени основної команди</template>
      <template #lead
        >Члени основної команди – це ті, хто бере активну участь у
        обслуговування одного або кількох основних проектів. Вони зробили значні
        внески в екосистему Vue, з довгостроковою відданістю
        успіх проекту та його користувачів.</template
      >
    </TeamList>

    <TeamList :members="membersEmeritiData as Member[]">
      <template #title>Основна команда Emeriti</template>
      <template #lead
        >Тут ми вшановуємо деяких неактивних членів основної команди, які зробили це
        цінні внески в минулому.</template
      >
    </TeamList>

    <TeamList :members="membersPartnerData as Member[]">
      <template #title>Партнери спільноти</template>
      <template #lead
        >Деякі члени спільноти Vue настільки збагатили його, що вони
        заслуговують окремої згадки. У нас склалися більш тісні стосунки
        з цими ключовими партнерами, часто координуючи з ними майбутні
        функції та новини.</template
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
