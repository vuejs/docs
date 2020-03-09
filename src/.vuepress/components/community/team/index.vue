<template>
  <div>
    <div class="team">
      <h2 id="active-core-team-members">
        Active Core Team Members
        <GetPositionButton
          v-if="!userPosition"
          @positionRetrieved="setUserPosition"
          @positionErrored="setUserPositionError"
        />
      </h2>

      <div v-if="errorGettingLocation" class="danger custom-block">
        <p>Failed to get your location.</p>
      </div>

      <p>
        The development of Vue and its ecosystem is guided by an international team, some of whom have chosen to be featured below.
      </p>

      <div v-if="userPosition" class="tip custom-block">
        <p>The core team have been sorted by their distance from you.</p>
      </div>

      <VuerProfile
        v-for="profile in members"
        :key="profile.name"
        :profile="profile"
        :title-visible="titleVisible"
        :use-miles="useMiles"
      />
    </div>

    <div class="team">
      <h2 id="core-team-emeriti">
        Core Team Emeriti
      </h2>

      <p>
        Here we honor some no-longer-active core team members who have made valuable contributions in the past.
      </p>

      <VuerProfile
        v-for="profile in emeriti"
        :key="profile.name"
        :profile="profile"
        :title-visible="titleVisible"
        :use-miles="useMiles"
      />
    </div>

    <div class="team">
      <h2 id="community-partners">
        Community Partners
        <GetPositionButton
          v-if="!userPosition"
          @positionRetrieved="setUserPosition"
          @positionErrored="setUserPositionError"
        />
      </h2>

      <div v-if="errorGettingLocation" class="danger custom-block">
        <p>Failed to get your location.</p>
      </div>

      <p>
        Some members of the Vue community have so enriched it, that they deserve special mention. We've developed a more intimate relationship with these key partners, often coordinating with them on upcoming features and news.
      </p>

      <div v-if="userPosition" class="tip custom-block">
        <p>The community partners have been sorted by their distance from you.</p>
      </div>

      <VuerProfile
        v-for="profile in partners"
        :key="profile.name"
        :profile="profile"
        :title-visible="titleVisible"
        :use-miles="useMiles"
      />
    </div>
  </div>
</template>

<script>
import { getDistanceFromLatLonInKm } from './utils'
import members from './members'
import emeriti from './emeriti'
import partners from './partners'

const imperialLanguageCodes = ['en-US', 'en-MY', 'en-MM', 'en-BU', 'en-LR', 'my', 'bu']

const cityCoordsFor = {
  'Annecy, France': [45.899247, 6.129384],
  'Alicante, Spain' : [38.346543, -0.483838],
  'Amsterdam, Netherlands': [4.895168, 52.370216],
  'Atlanta, GA, USA': [33.749051, -84.387858],
  'Bangalore, India': [12.971599, 77.594563],
  'Beijing, China': [39.904200, 116.407396],
  'Bordeaux, France': [44.837789, -0.579180],
  'Bucharest, Romania': [44.426767, 26.102538],
  'Chengdu, China': [30.572815, 104.066801],
  'Chongqing, China': [29.431586, 106.912251],
  'Denver, CO, USA': [39.739236, -104.990251],
  'Dublin, Ireland': [53.349918, -6.260174],
  'Dubna, Russia': [56.732020, 37.166897],
  'East Lansing, MI, USA': [42.736979, -84.483865],
  'Fort Worth, TX, USA': [32.755331, -97.325735],
  'Hangzhou, China': [30.274084, 120.155070],
  'Jersey City, NJ, USA': [40.728157, -74.558716],
  'Kingston, Jamaica': [18.017874, -76.809904],
  'Krasnodar, Russia': [45.039267, 38.987221],
  'Lansing, MI, USA': [42.732535, -84.555535],
  'London, UK': [51.507351, -0.127758],
  'Lyon, France': [45.764043, 4.835659],
  'Mannheim, Germany': [49.487459, 8.466039],
  'Moscow, Russia': [55.755826, 37.617300],
  'Munich, Germany': [48.137154, 11.576124],
  'Orlando, FL, USA': [28.538335, -81.379236],
  'Paris, France': [48.856614, 2.352222],
  'Poznań, Poland': [52.4006553, 16.761583],
  'Seoul, South Korea': [37.566535, 126.977969],
  'Shanghai, China': [31.230390, 121.473702],
  'Singapore': [1.352083, 103.819839],
  'Sydney, Australia': [-33.868820, 151.209290],
  'Taquaritinga, Brazil': [-21.430094, -48.515285],
  'Tehran, Iran': [35.689197, 51.388974],
  'Thessaloniki, Greece': [40.640063, 22.944419],
  'Tokyo, Japan': [35.689487, 139.691706],
  'Toronto, Canada': [43.653226, -79.383184],
  'Wrocław, Poland': [51.107885, 17.038538],
  'Boston, MA, USA': [42.360081, -71.058884],
  'Kyiv, Ukraine': [50.450100, 30.523399],
  'Washington, DC, USA': [38.8935755,-77.0846156,12],
  'Kraków, Poland': [50.064650, 19.936579],
  'Oslo, Norway': [59.911491, 10.757933],
  'Kanagawa, Japan': [35.44778, 139.6425]
}

export default {
  components: {
    VuerProfile: () => import('./vuer-profile'),
    GetPositionButton: () => import('./get-position-button')
  },

  data: () => ({
    emeriti,
    geolocationSupported: false,
    errorGettingLocation: false,
    userPosition: null,
    useMiles: false,
    titleVisible: false
  }),

  computed: {
    members () {
      return this.sortByDistance(members)
    },

    partners () {
      return this.sortByDistance(partners)
    }
  },

  methods: {
    setUserPosition (position) {
      this.userPosition = position
      this.errorGettingLocation = false
    },

    setUserPositionError () {
      this.userPosition = null
      this.errorGettingLocation = true
    },

    sortByDistance (vuers) {
      if (!this.userPosition) {
        return vuers
      }

      const vuersWithDistances = vuers.map(vuer => {
        const cityCoords = cityCoordsFor[vuer.city]

        if (cityCoords) {
          return Object.assign({}, vuer, {
            distanceInKm: getDistanceFromLatLonInKm(
              this.userPosition.coords.latitude,
              this.userPosition.coords.longitude,
              cityCoords[0],
              cityCoords[1]
            )
          })
        }

        return Object.assign({}, vuer, {
          distanceInKm: null
        })
      })

      vuersWithDistances.sort((a, b) => {
        if (a.distanceInKm && b.distanceInKm) return a.distanceInKm - b.distanceInKm
        if (a.distanceInKm && !b.distanceInKm) return -1
        if (!a.distanceInKm && b.distanceInKm) return 1
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
      })

      return vuersWithDistances
    }
  },

  mounted () {
    this.useMiles = imperialLanguageCodes.includes(window.navigator.language)
  }
}
</script>

<style lang="scss" scoped>
.vuer+.vuer {
  border-top: 1px dotted #ddd;
}

.get-position-button {
  float: right;
  margin-top: .3em;
}
</style>
