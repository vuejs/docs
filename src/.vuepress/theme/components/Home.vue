<template>
  <main class="home" aria-labelledby="main-title">
    <header class="hero">
      <div class="inner">
        <div class="left">
          <img v-if="data.heroImage" :src="$withBase(data.heroImage)" :alt="data.heroAlt || 'hero'" />
        </div>

        <div class="right">
          <h1
            v-if="data.heroText !== null"
            id="main-title"
          >{{ data.heroText || $title || 'Vue.js' }}</h1>

          <h2 class="tagline" v-if="tagline" v-html="tagline"></h2>

          <div v-if="data.actionButtons.length" class="actions">
            <HomeActionLink
              v-for="item in data.actionButtons"
              :item="item"
              :extra-class="item.extraClass"
              :key="item.link"
            />
          </div>
        </div>
      </div>
    </header>

    <SpecialSponsors :sponsors="sponsors.special_sponsors" />

    <section v-if="data.features && data.features.length" class="section-features">
      <div class="inner">
        <div v-for="(feature, index) in data.features" :key="index" class="feature">
          <h2>{{ feature.title }}</h2>
          <p v-html="feature.details"></p>
        </div>
      </div>
    </section>

    <Content class="theme-default-content custom" />

    <section class="section-sponsors" :class="{ active: sponsorsActive }" ref="sponsors">
      <div class="inner">
        <PatreonSponsors :sponsors="sponsors" />
        <OpenCollectiveSponsors />
      </div>
    </section>

    <section class="section-newsletter">
      <Newsletter />
    </section>

    <footer class="main-footer">
      <p v-if="data.socialIcons">
        <SocialIcon
          v-for="icon in data.socialIcons"
          :type="icon.type"
          :link="icon.link"
          :key="icon.link"
          extra-class="inverted"
        />
      </p>
      <p class="copyright" v-html="data.footer"></p>
    </footer>
  </main>
</template>

<script>
import sponsors from '@theme/data/patreon-sponsors.js'
import HomeActionLink from '@theme/components/ui/HomeActionLink.vue'
import SocialIcon from '@theme/components/ui/SocialIcon.vue'
import SpecialSponsors from '@theme/components/sponsors/SpecialSponsors.vue'
import PatreonSponsors from '@theme/components/sponsors/PatreonSponsors.vue'
import OpenCollectiveSponsors from '@theme/components/sponsors/OpenCollectiveSponsors.vue'
import Newsletter from '@theme/components/Newsletter.vue'

export default {
  components: {
    HomeActionLink,
    SocialIcon,
    SpecialSponsors,
    PatreonSponsors,
    OpenCollectiveSponsors,
    Newsletter
  },

  data: () => ({
    sponsors,
    sponsorsActive: false
  }),

  computed: {
    data() {
      return this.$page.frontmatter
    },

    tagline() {
      return (
        this.data.tagline ||
        this.$description ||
        'The Progressive JavaScript Framework'
      )
    }
  },

  mounted() {
    window.addEventListener('scroll', this.onPageScroll)
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.onPageScroll)
  },

  methods: {
    onPageScroll() {
      const sponsorTop = this.$refs.sponsors.offsetTop

      this.sponsorsActive = window.pageYOffset > sponsorTop - 100
    }
  }
}
</script>

<style lang="scss">
@import '@theme/styles/_settings.scss';

.home {
  font-family: $fontHome;
}

.hero {
  padding: 100px 40px 30px;

  html.with-beta-banner & {
    padding-top: calc(100px + 3rem);
  }

  .inner {
    max-width: 1260px;
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  .left {
    width: 39%;
    text-align: right;

    img {
      width: 215px;
      height: 215px;
      margin-right: 60px;
    }
  }

  .actions {
    display: flex;
    margin-top: 2.3rem;
  }

  .right {
    width: 61%;

    h1 {
      display: none;
    }

    .tagline {
      font-size: 3.2rem;
      padding: 0;
      margin: 0;
      border-bottom: 0;
      font-weight: 300;
    }
  }

  @media (max-width: $MQNarrow) {
    .inner {
      flex-direction: column;
      text-align: center;
    }

    .left {
      img {
        margin-right: 0;
      }
    }

    .left,
    .right {
      width: 100%;
      text-align: center;
    }

    .right {
      h1 {
        display: block;
      }

      .tagline {
        font-size: 2rem;
      }
    }

    .actions {
      flex-direction: column;
      place-items: center;

      a {
        height: 28px;
        margin-bottom: 10px;
      }
    }
  }
}

.section-features {
  padding: 25px 40px 45px;

  .inner {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;

    @media (max-width: $MQNarrow) {
      flex-direction: column;
    }
  }

  .feature {
    h2 {
      border-bottom: 0;
      color: $green;
      font-weight: 400;
    }

    flex-grow: 1;
    flex-basis: 30%;
    max-width: 30%;

    @media (max-width: $MQNarrow) {
      max-width: 100%;
      width: 100%;

      &::before {
        content: '—';
        color: $green;
      }
    }
  }
}

.section-sponsors {
  background: #f6f6f6;
  text-align: center;
  padding: 35px 40px 45px;

  &.active {
    img {
      filter: none;
      opacity: 1;
    }
  }

  .inner {
    max-width: 700px;
    margin: 0 auto;
  }

  .sponsors + .sponsors {
    margin-top: 5rem;
  }

  a {
    display: inline-block;
    vertical-align: middle;
    margin: 20px 15px 0;
    position: relative;
  }

  img {
    transition: all 0.3s ease;
    filter: grayscale(100%);
    opacity: 0.6;

    &:hover {
      filter: none;
      opacity: 1;
    }
  }
}

footer.main-footer {
  background: #475050;
  text-align: center;
  color: #fff;
  padding: 40px 0;
  font-size: 0.9rem;

  a {
    color: #fff;
  }

  .social-icon {
    margin: 0 5px;
    font-size: 1.2rem;

    i {
      color: #fff;
    }
  }
}
</style>
