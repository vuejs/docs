---
sidebar: false
ads: false
editLink: false
sponsors: false
---

<script setup>
import SponsorsGroup from '@theme/components/SponsorsGroup.vue'
import { load, data } from '@theme/components/sponsors'
import { onMounted } from 'vue'

onMounted(load)
</script>

# Become a Vue.js Sponsor {#become-a-vue-js-sponsor}

Vue.js is an MIT licensed open source project and completely free to use.
The tremendous amount of effort needed to maintain such a large ecosystem and develop new features for the project is only made sustainable thanks to the generous financial backing of our sponsors.

## How to Sponsor {#how-to-sponsor}

Sponsorships can be done via [GitHub Sponsors](https://github.com/sponsors/yyx990803) or [OpenCollective](https://opencollective.com/vuejs). Invoices can be obtained via GitHub's payment system. Both monthly-recurring sponsorships and one-time donations are accepted. Recurring sponsorships are entitled to logo placements as specified in [Sponsorship Tiers](#tier-benefits).

If you have questions regarding tiers, payment logistics, or sponsor exposure data, please reach out to [sponsor@vuejs.org](mailto:sponsor@vuejs.org?subject=Vue.js%20sponsorship%20inquiry).

## Sponsoring Vue as a Business {#sponsoring-vue-as-a-business}

Sponsoring Vue gives you great exposure to over **2 million** Vue developers around the world through our website and GitHub project READMEs. This not only directly generates leads, but also improves your brand recognition as a business that cares about Open Source. This is an intangible but extremely important asset for companies building products for developers, as it improves your conversion rate.

If you are using Vue to build a revenue-generating product, it makes business sense to sponsor Vue's development: **it ensures the project that your product relies on stays healthy and actively maintained.** The exposure and positive brand image in the Vue community also makes it easier to attract and recruit Vue developers.

If you are building a product where your target customers are developers, you will gain high quality traffic through the sponsorship exposure, since all our visitors are developers. The sponsorship also builds brand recognition and improves conversion.

## Sponsoring Vue as an Individual {#sponsoring-vue-as-an-individual}

If you are an individual user and have enjoyed the productivity of using Vue, consider donating as a sign of appreciation - like buying us coffee once in a while. Many of our team members accept sponsorships and donations via GitHub Sponsors. Look for the "Sponsor" button on each team member's profile on our [team page](/about/team).

You can also try to convince your employer to sponsor Vue as a business. This may not be easy, but business sponsorships typically make a much larger impact on the sustainability of OSS projects than individual donations, so you will help us much more if you succeed.

## Tier Benefits {#tier-benefits}

- **Global Special Sponsor**:
  - Limited to **one** sponsor globally. <span v-if="!data?.special">Currently vacant. [Get in touch](mailto:sponsor@vuejs.org?subject=Vue.js%20special%20sponsor%20inquiry)!</span><span v-else>(Currently filled)</span>
  - (Exclusive) **Above the fold** logo placement on the front page of [vuejs.org](/).
  - (Exclusive) Special shoutout and regular retweets of major product launches via [Vue's official X account](https://twitter.com/vuejs) (320k followers).
  - Most prominent logo placement in all locations from tiers below.
- **Platinum (USD$2,000/mo)**:
  - Prominent logo placement on the front page of [vuejs.org](/).
  - Prominent logo placement in sidebar of all content pages.
  - Prominent logo placement in the README of [`vuejs/core`](https://github.com/vuejs/core) and [`vuejs/vue`](https://github.com/vuejs/core).
- **Gold (USD$500/mo)**:
  - Large logo placement on the front page of [vuejs.org](/).
  - Large logo placement in the README of `vuejs/core` and `vuejs/vue`.
- **Silver (USD$250/mo)**:
  - Medium logo placement in the `BACKERS.md` file of `vuejs/core` and `vuejs/vue`.
- **Bronze (USD$100/mo)**:
  - Small logo placement in the `BACKERS.md` file of `vuejs/core` and `vuejs/vue`.
- **Generous Backer (USD$50/mo)**:
  - Name listed in the `BACKERS.md` file of `vuejs/core` and `vuejs/vue`, above other individual backers.
- **Individual Backer (USD$5/mo)**:
  - Name listed in the `BACKERS.md` file of `vuejs/core` and `vuejs/vue`.

## Current Sponsors {#current-sponsors}

### Special Global Sponsor {#special-global-sponsor}

<SponsorsGroup tier="special" placement="page" />

### Platinum {#platinum}

<SponsorsGroup tier="platinum" placement="page" />

### Platinum (China) {#platinum-china}

<SponsorsGroup tier="platinum_china" placement="page" />

### Gold {#gold}

<SponsorsGroup tier="gold" placement="page" />

### Silver {#silver}

<SponsorsGroup tier="silver" placement="page" />
