<script setup lang="ts">
import { VTLink } from '@vue/theme'
import membersCoreData from './members-core.json'
import membersEmeritiData from './members-emeriti.json'
import membersPartnerData from './members-partner.json'
import TeamHero from './TeamHero.vue'
import TeamList from './TeamList.vue'

const membersCore = membersCoreData
const membersEmeriti = membersEmeritiData
const membersPartner = membersPartnerData
</script>

<template>
  <div class="TeamPage">
    <TeamHero>
      <template #title>Meet the Team</template>
      <template #lead>The development of Vue and its ecosystem is guided by an international team, some of whom have chosen to be <span class="nowrap">featured below.</span></template>

      <template #action>
        <VTLink href="https://github.com/vuejs/governance/blob/master/Team-Charter.md">Learn more about teams</VTLink>
      </template>
    </TeamHero>

    <TeamList :members="membersCore">
      <template #title>Core Team Members</template>
      <template #lead>In general, core team members are expected to maintain a consistent presence in the project. e also look for contributions over a longer period of time, so that we know the community can depend on the members long term.</template>
    </TeamList>

    <TeamList :members="membersEmeriti">
      <template #title>Core Team Emeriti</template>
      <template #lead>Here we honor some no-longer-active core team members who have made valuable contributions in the past.</template>
    </TeamList>

    <TeamList :members="membersPartner">
      <template #title>Community Partners</template>
      <template #lead>Some members of the Vue community have so enriched it, that they deserve special mention. We've developed a more intimate relationship with these key partners, often coordinating with them on upcoming features and news.</template>
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
