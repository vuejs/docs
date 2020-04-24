<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Sidebar>

    <main class="home" aria-labelledby="main-title">
      <header class="hero">
        <div class="hero-inner">
          <div class="hero-logo-container">
            <img
              v-if="data.heroImage"
              :src="$withBase(data.heroImage)"
              :alt="data.heroAlt || 'hero'"
              class="logo"
            />
          </div>
          <div>
            <h1
              v-if="data.heroText !== null"
              id="main-title"
              style="display: none"
            >
              {{ data.heroText || $title || 'Hello' }}
            </h1>

            <p v-if="data.tagline !== null" class="description">
              {{
                data.tagline || $description || 'Welcome to your VuePress site'
              }}
            </p>

            <a href="#" class="button is-primary is-uppercase">Why Vue.js</a>

            <NavLink
              class="button is-primary is-outlined is-uppercase"
              :item="actionLink"
            />

            <a href="#" class="button is-primary is-uppercase is-gray"
              >GitHub</a
            >
          </div>
        </div>
      </header>

      <section v-if="data.features && data.features.length" class="features">
        <Feature
          v-for="(feature, index) in data.features"
          :title="feature.title"
          :details="feature.details"
          :key="index"
        />
      </section>

      <Content class="theme-default-content custom" />

      <TheFooter v-if="data.footer" :text="data.footer" />
    </main>
  </div>
</template>

<script>
import Navbar from '@theme/components/Navbar.vue'
import Feature from '@theme/components/Feature.vue'
import NavLink from '@theme/components/NavLink.vue'
import TheFooter from '@theme/components/TheFooter.vue'

export default {
  name: 'Layout',

  components: {
    Navbar,
    Feature,
    NavLink,
    TheFooter
  },

  data() {
    return {
      isSidebarOpen: false
    }
  },

  computed: {
    data() {
      return this.$page.frontmatter
    },

    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    },

    shouldShowNavbar() {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      )
    },

    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass
      ]
    }
  },

  mounted() {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })
  },

  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
      this.$emit('toggle-sidebar', this.isSidebarOpen)
    },

    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '../styles/variables.scss';
@import '../styles/styles.scss';

.button {
  font-family: $font-primary;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  transition: all 0.15s ease;
  box-sizing: border-box;
  margin: 1em 0;
  font-size: 1.05em;
  font-weight: 600;
  letter-spacing: 0.1em;
  min-width: 8em;
  text-align: center;

  &.is-primary {
    background-color: $green;
    border: 1px solid $green;

    &.is-outlined {
      background-color: #fff;
      color: $green;
    }
  }

  &.is-gray {
    background-color: $light-gray;
    color: $gray;
    border-color: $light-gray;
  }
}

.is-uppercase {
  text-transform: uppercase;
}

.hero {
  padding: 40px 40px 30px;

  &-inner {
    display: flex;
    align-items: center;
    max-width: 1260px;
    margin: 0 auto;
  }

  &-logo-container {
    margin-right: 60px;
  }

  .logo {
    max-width: 100%;
    max-height: 280px;
    display: block;
    margin: 3rem auto 60px;
  }
  .description {
    font-weight: 300;
    margin: 0;
    font-size: 3.2em;
    font-family: $font-primary;
    line-height: 1.3;
  }
  .action-button {
    display: inline-block;
    font-size: 1.2rem;
    color: #fff;
    background-color: $accentColor;
    padding: 0.8rem 1.6rem;
    border-radius: 4px;
    transition: background-color 0.1s ease;
    box-sizing: border-box;
    border-bottom: 1px solid darken($accentColor, 10%);
    &:hover {
      background-color: lighten($accentColor, 10%);
    }
  }
}

.features {
  border-top: 1px solid $borderColor;
  padding: 1.2rem 0;
  margin-top: 2.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: stretch;
  justify-content: space-between;
}

.home {
  max-width: $homePageWidth;
  margin: 0px auto;
  margin-top: $navbarHeight;
  display: block;
}

@media (max-width: $MQMobile) {
  .home {
    .features {
      flex-direction: column;
    }
    .feature {
      max-width: 100%;
      padding: 0 2.5rem;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    .hero {
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }
      h1 {
        font-size: 2rem;
      }
      h1,
      .description,
      .action {
        margin: 1.2rem auto;
      }
      .description {
        font-size: 1.2rem;
      }
      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
      .feature {
        h2 {
          font-size: 1.25rem;
        }
      }
    }
  }
}
</style>
