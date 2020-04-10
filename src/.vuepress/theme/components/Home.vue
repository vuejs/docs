<template>
  <main class="home" aria-labelledby="main-title">
    <header class="hero">
      <div style="padding-right: 60px">
        <img
          v-if="data.heroImage"
          :src="$withBase(data.heroImage)"
          :alt="data.heroAlt || 'hero'"
          class="logo"
        />
      </div>
      <div>
        <h1 v-if="data.heroText !== null" id="main-title" style="display: none">
          {{ data.heroText || $title || 'Hello' }}
        </h1>

        <p v-if="data.tagline !== null" class="description">
          {{ data.tagline || $description || 'Welcome to your VuePress site' }}
        </p>

        <a href="#" class="button is-uppercase">Why Vue.js</a>

        <NavLink class="button is-outlined is-uppercase" :item="actionLink" />

        <a href="#" class="button is-uppercase is-gray">GitHub</a>
      </div>
    </header>

    <div v-if="data.features && data.features.length" class="features">
      <div
        v-for="(feature, index) in data.features"
        :key="index"
        class="feature"
      >
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
      </div>
    </div>

    <Content class="theme-default-content custom" />

    <div v-if="data.footer" class="footer">
      {{ data.footer }}
    </div>
  </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'

export default {
  name: 'Home',

  components: { NavLink },

  computed: {
    data() {
      return this.$page.frontmatter
    },

    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  }
}
</script>

<style lang="scss">
@import '../styles/variables.scss';

.button {
  font-family: $font-primary;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
  margin: 1em 0;
  font-size: 1.05em;
  font-weight: 600;
  letter-spacing: 0.1em;
  min-width: 8em;
  text-align: center;

  &.is-gray {
    background-color: #f6f6f6;
    color: #4f5959;
    border-color: #f6f6f6;
  }

  &.is-outlined {
    background-color: #fff;
    color: #42b983;
  }
}

.is-uppercase {
  text-transform: uppercase;
}

.hero {
  display: flex;
  align-items: center;
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

.home {
  padding: $navbarHeight 2rem 0;
  max-width: $homePageWidth;
  margin: 0px auto;
  display: block;
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
  .feature {
    flex-grow: 1;
    flex-basis: 30%;
    max-width: 30%;
    h2 {
      font-size: 1.4rem;
      font-weight: 500;
      border-bottom: none;
      padding-bottom: 0;
      color: lighten($textColor, 10%);
    }
    p {
      color: lighten($textColor, 25%);
    }
  }
  .footer {
    padding: 2.5rem;
    border-top: 1px solid $borderColor;
    text-align: center;
    color: lighten($textColor, 25%);
  }
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
