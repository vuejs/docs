<template>
  <main class="support-vue" aria-labelledby="sponsor-Vue-js-Development">
    <h1 id="sponsor-Vue-js-Development">Sponsor Vue.js Development</h1>
    <p>
    Vue.js is an MIT licensed open source project and completely free to use.
    However, the amount of effort needed to maintain and develop new features for the project is not sustainable without proper financial backing. You can support Vue.js development via the following methods:
    </p>

    <section id="one-time-donations">
      <h2>One-time Donations</h2>

      <p>We accept donations through these channels:</p>

      <Coins />
    </section>

    <section id="recurring-pledges">
      <h2>Recurring Pledges</h2>

      <p>
      Recurring pledges come with exclusive perks, e.g. having your name listed in the Vue GitHub repository, or have your company logo placed on this website.
      </p>

      <ul>
        <li>
          <a href="https://www.patreon.com/evanyou" target="_blank" rel="noopener">Become a backer or sponsor via Patreon</a> (goes directly to support Evan You's full-time work on Vue)
        </li>
        <li>
          <a href="https://opencollective.com/vuejs">Become a backer or sponsor via OpenCollective</a> (goes into a fund with transparent expense models supporting community efforts and events)
        </li>
      </ul>
    </section>

    <section>
      <h2 id="current-premium-sponsors">Current Premium Sponsors</h2>

      <h3 id="special-sponsors">Special Sponsors</h3>
      <p class="platinum">
        <SponsorImageLink
          v-for="(sponsor, index) of sponsors.special_sponsors"
          :key="index"
          :sponsor="sponsor"
        />
      </p>

      <h3 id="platinum">Platinum</h3>
      <p class="platinum">
        <SponsorImageLink
          v-for="(sponsor, index) of sponsors.platinum_sponsors"
          :key="index"
          :sponsor="sponsor"
        />
      </p>

      <h3 id="open-collective-platinum">OpenCollective Platinum</h3>
      <p class="open-collective-sponsors sponsor-section">
        <a
          v-for="i in 10"
          :key="i"
          :href="`https://opencollective.com/vuejs/tiers/platinum-sponsors/${i}/website`"
          target="_blank"
          rel="noopener"
        >
          <img
            :src="`https://opencollective.com/vuejs/tiers/platinum-sponsors/${i}/avatar.svg`"
          >
        </a>
      </p>

      <h3 id="special-sponsors-china">Special Sponsors (China)</h3>
      <p class="platinum">
        <SponsorImageLink
          v-for="(sponsor, index) of sponsors.platinum_sponsors_china"
          :key="index"
          :sponsor="sponsor"
        />
      </p>

      <h3 id="patreon-gold">Patreon Gold</h3>
      <p class="patreon-sponsors sponsor-section">
        <SponsorImageLink
          v-for="(sponsor, index) of sponsors.gold_sponsors"
          :key="index"
          :sponsor="sponsor"
        />
      </p>

      <h3 id="open-collective-gold">OpenCollective Gold</h3>
      <p class="open-collective-sponsors sponsor-section">
        <a
          v-for="i in 10"
          :key="i"
          :href="`https://opencollective.com/vuejs/tiers/gold-sponsors/${i}/website`"
          target="_blank"
          rel="noopener"
        >
          <img
            :src="`https://opencollective.com/vuejs/tiers/gold-sponsors/${i}/avatar.svg`"
          >
        </a>
      </p>

      <h3 id="patreon-silver">Patreon Silver</h3>
      <p class="patreon-sponsors sponsor-section">
        <SponsorImageLink
          v-for="(sponsor, index) of sponsors.silver_sponsors"
          :key="index"
          :sponsor="sponsor"
        />
      </p>

      <h3 id="open-collective-silver">OpenCollective Silver</h3>
      <p class="open-collective-sponsors sponsor-section">
        <a
          v-for="i in 10"
          :key="i"
          :href="`https://opencollective.com/vuejs/tiers/silver-sponsors/${i}/website`"
          target="_blank"
          rel="noopener"
        >
          <img
            :src="`https://opencollective.com/vuejs/tiers/silver-sponsors/${i}/avatar.svg`"
          >
        </a>
      </p>
    </section>

    <p>
      If you run a business and are using Vue in a revenue-generating product, it makes business sense to sponsor Vue development: <b>it ensures the project that your product relies on stays healthy and actively maintained.</b> It can also help your exposure in the Vue community and makes it easier to attract Vue developers.
    </p>

    <p>
      If you are an individual user and have enjoyed the productivity of using Vue, consider donating as a sign of appreciation - like buying me coffee once in a while :)
    </p>
  </main>
</template>

<script>
import sponsors from '@theme/data/patreon-sponsors.js'
import Coins from '@theme/components/support/Coins.vue'
import SponsorImageLink from '@theme/components/support/SponsorImageLink'

export default {
  components: { Coins, SponsorImageLink },
  data: () => ({ sponsors })
}
</script>

<style lang="scss">
@import '@theme/styles/_settings.scss';

html.with-beta-banner {
  padding-top: calc(100px + 3rem);
}

.support-vue {
  padding: 0 40px;
  margin-top: 100px;

  .platinum {
    text-align: center;

    a {
      display: inline-block;
      margin: 20px;
    }

    img {
      width: 250px;
      vertical-align: middle;
    }
  }

  .sponsor-section {
    margin-top: 0;
    margin-bottom: 60px;
  }

  .patreon-sponsors,
  .open-collective-sponsors {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  .patreon-sponsors {
    a {
      display: inline-block;
      margin: 10px 20px;
    }

    img {
      width: 140px;
    }
  }

  .open-collective-sponsors {
    img {
      max-width: 140px;
      max-height: 60px;
    }
  }
}
</style>
