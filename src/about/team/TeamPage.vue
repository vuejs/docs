<script lang="ts">
const shuffleMembers = (
  members: Member[],
  pinTheFirstMember = false
): void => {
  let offset = pinTheFirstMember ? 1 : 0
  // `i` is between `1` and `length - offset`
  // `j` is between `0` and `length - offset - 1`
  // `offset + i - 1` is between `offset` and `length - 1`
  // `offset + j` is between `offset` and `length - 1`
  let i = members.length - offset
  while (i > 0) {
    const j = Math.floor(Math.random() * i)
    ;[members[offset + i - 1], members[offset + j]] = [
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
      <template #title>Conoce el Equipo</template>
      <template #lead
        >El desarrollo de Vue y su ecosistema está guiado por un
        <br />equipo internacional, algunos de los cuales han elegido
        <span class="nowrap">aparecer a continuación.</span></template
      >

      <template #action>
        <VTLink
          href="https://github.com/vuejs/governance/blob/master/Team-Charter.md"
          >Más información sobre los equipos</VTLink
        >
      </template>
    </TeamHero>

    <TeamList :members="membersCoreData as Member[]">
      <template #title>Miembros del Equipo Central</template>
      <template #lead
        >Los miembros del equipo central son aquellos que participan
        activamente en el mantenimiento de uno o más proyectos centrales.
        Han hecho contribuciones significativas al ecosistema Vue, con un
        compromiso a largo plazo con el éxito del proyecto y sus
        usuarios.</template
      >
    </TeamList>

    <TeamList :members="membersEmeritiData as Member[]">
      <template #title>Equipo Central Emérito</template>
      <template #lead
        >Aquí honramos a algunos miembros del equipo central que ya no
        están activos quienes han realizado contribuciones valiosas en el
        pasado.</template
      >
    </TeamList>

    <TeamList :members="membersPartnerData as Member[]">
      <template #title>Socios de la Comunidad</template>
      <template #lead
        >Algunos miembros de la comunidad de Vue lo han enriquecido tanto
        que merecen una mención especial. Hemos desarrollado una relación
        más íntima con estos socios clave, a menudo coordinando con ellos
        las características y noticias venideras.</template
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
