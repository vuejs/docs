<template>
  <div>
    <div class="team">
      <h2 id="active-core-team-members">
        Active Core Team Members
        <button
          v-if="geolocationSupported && !userPosition"
          @click="getUserPosition"
          :disabled="isSorting"
          class="sort-by-distance-button"
        >
          <i
            v-if="isSorting"
            class="fa fa-refresh rotating-clockwise"
          ></i>
          <template v-else>
            <i class="fa fa-map-marker"></i>
            <span>find near me</span>
          </template>
        </button>
      </h2>

      <p v-if="errorGettingLocation" class="tip">
        Failed to get your location.
      </p>

      <p>
        The development of Vue and its ecosystem is guided by an international team, some of whom have chosen to be featured below.
      </p>

      <p v-if="userPosition" class="success">
        The core team has been sorted by their distance from you.
      </p>

      <vuer-profile
        v-for="profile in members"
        :key="profile.name"
        :profile="profile"
        :title-visible="titleVisible"
      ></vuer-profile>
    </div>

    <div class="team">
      <h2 id="core-team-emeriti">
        Core Team Emeriti
      </h2>

      <p>
        Here we honor some no-longer-active core team members who have made valuable contributions in the past.
      </p>

      <vuer-profile
        v-for="profile in emeriti"
        :key="profile.name"
        :profile="profile"
        :title-visible="titleVisible"
      ></vuer-profile>
    </div>

    <div class="team">
      <h2 id="community-partners">
        Community Partners
        <button
          v-if="geolocationSupported && !userPosition"
          @click="getUserPosition"
          :disabled="isSorting"
          class="sort-by-distance-button"
        >
          <i
            v-if="isSorting"
            class="fa fa-refresh rotating-clockwise"
          ></i>
          <template v-else>
            <i class="fa fa-map-marker"></i>
            <span>find near me</span>
          </template>
        </button>
      </h2>

      <p v-if="errorGettingLocation" class="tip">
        Failed to get your location.
      </p>

      <p>
        Some members of the Vue community have so enriched it, that they deserve special mention. We've developed a more intimate relationship with these key partners, often coordinating with them on upcoming features and news.
      </p>

      <p v-if="userPosition" class="success">
        The community partners have been sorted by their distance from you.
      </p>

      <vuer-profile
        v-for="profile in partners"
        :key="profile.name"
        :profile="profile"
        :title-visible="titleVisible"
      ></vuer-profile>
    </div>
  </div>
</template>

<script>
import members from './members'
import emeriti from './emeriti'
import partners from './partners'

export default {
  components: {
    VuerProfile: () => import('./vuer-profile')
  },

  data: () => ({
    members,
    emeriti,
    partners,
    geolocationSupported: false,
    isSorting: false,
    errorGettingLocation: false,
    userPosition: null,
    useMiles: false,
    titleVisible: false
  }),

  mounted () {
    if ('geolocation' in window.navigator) {
      this.geolocationSupported = true

      const imperialLanguageCodes = ['en-US', 'en-MY', 'en-MM', 'en-BU', 'en-LR', 'my', 'bu']
      this.useMiles = imperialLanguageCodes.includes(browser.navigator.language)
    }
  }
}
</script>

<style lang="stylus" scoped>
.vuer+.vuer
  border-top: 1px dotted #ddd
</style>
