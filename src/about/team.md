---
aside: false
---

<script setup>
import { computed } from 'vue'
import TeamCard from '../.vitepress/components/TeamCard.vue'
import coreTeamData from './core-team.json'
import emeritiTeamData from './emeriti.json'
import partnersData from './partners.json'
import shuffle from 'lodash/shuffle'

const coreTeamList = computed(() => {
  return coreTeamData.slice(0, 1).concat(shuffle(coreTeamData.slice(2)))
})
const emeritiTeamList = computed(() => shuffle(emeritiTeamData))
const partnersList = computed(() => shuffle(partnersData))
</script>

# Meet the Team

The development of Vue and its ecosystem is guided by an international team, some of whom have chosen to be featured below.

[See Vue Team Charter to learn more about teams →]()

## Core Team Members

In general, core team members are expected to maintain a consistent presence in the project. e also look for contributions over a longer period of time, so that we know the community can depend on the members long term.

<TeamCard
  v-for="member in coreTeamList"
  :key="member.name"
  :profile="member"
/>

## Team Members

The Vue.js Team consists of members in the community who have provided valuable contributions to the community and are recognized for their efforts and time.

## Core Team Emeriti

Here we honor some no-longer-active core team members who have made valuable contributions in the past.

<TeamCard
  v-for="member in emeritiTeamList"
  :key="member.name"
  :profile="member"
/>

## Community Partners

Some members of the Vue community have so enriched it, that they deserve special mention. We've developed a more intimate relationship with these key partners, often coordinating with them on upcoming features and news.

<TeamCard
  v-for="member in partnersList"
  :key="member.name"
  :profile="member"
/>
