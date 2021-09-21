<script setup>
import TeamCard from '../.vitepress/components/TeamCard.vue'
import teamData from './team.json'
</script>

# Meet the Team

The development of Vue and its ecosystem is guided by an international team, some of whom have chosen to be featured below.

[See Vue Team Charter to learn more about teams →]()

## Core Team Members

In general, core team members are expected to maintain a consistent presence in the project. e also look for contributions over a longer period of time, so that we know the community can depend on the members long term.

<TeamCard
  v-for="member in teamData"
  :key="member.name"
  :profile="member"
/>

## Team Members

The Vue.js Team consists of members in the community who have provided valuable contributions to the community and are recognized for their efforts and time.
