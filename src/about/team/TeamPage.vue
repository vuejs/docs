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
      <template #title>Đội ngũ thành viên</template>
      <template #lead
        >Vue và hệ sinh thái của Vue được phát triển bởi một đội ngũ quốc tế, <span class="nowrap">và dưới đây là những thành viên đã đồng ý được liệt kê trong danh sách này.</span>
        </template
      >

      <template #action>
        <VTLink
          href="https://github.com/vuejs/governance/blob/master/Team-Charter.md"
          >Tìm hiểu thêm về đội ngũ phát triển Vue</VTLink
        >
      </template>
    </TeamHero>

    <TeamList :members="membersCoreData as Member[]">
      <template #title>Thành viên chủ chốt</template>
      <template #lead
        >Thành viên chủ chốt là những người thường xuyên hoạt động 
        trong việc duy trì, bảo dưỡng các dự án cốt lõi. Họ đã có những 
        cống hiến quan trọng đối với hệ sinh thái Vue, và sự cam kết dài lâu 
        đối với sự thành công của Vue cũng như người dùng của nó.</template
      >
    </TeamList>

    <TeamList :members="membersEmeritiData as Member[]">
      <template #title>Thành viên danh dự chủ chốt</template>
      <template #lead
        >Tôn vinh những thành viên chủ chốt đã dừng hoạt động, 
        những người đã có những đóng góp giá trị trong quá khứ.</template
      >
    </TeamList>

    <TeamList :members="membersPartnerData as Member[]">
      <template #title>Đối tác cộng đồng</template>
      <template #lead
        >Một số thành viên của cộng đồng Vue đã hoạt động, 
        phát triển cộng đồng rất tích cực. Vậy nên, họ xứng đáng 
        được nhắc đến tại đây. Chúng tôi cũng đã xây dựng một mối quan hệ 
        gần gũi hơn với những thành viên cộng tác này, thường xuyên 
        hợp tác với họ về những tính năng và tin tức mới.</template
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
