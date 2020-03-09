<template>
  <div class="vuer">
    <div class="avatar">
      <img v-if="profile.imageUrl"
        :src="profile.imageUrl"
        :alt="profile.name" width=80 height=80>
      <img v-else-if="profile.github"
        :src="`https://github.com/${profile.github}.png`"
        :alt="profile.name" width=80 height=80>
      <img v-else-if="profile.twitter"
        :src="`https://avatars.io/twitter/${profile.twitter}`"
        :alt="profile.name" width=80 height=80>
    </div>

    <div class="profile">
      <h3 :data-official-title="profile.title">
        {{ profile.name }}
        <sup v-if="profile.title && titleVisible" v-html="profile.title"></sup>
      </h3>
      <dl>
        <template v-if="profile.reposOfficial">
          <dt>Core focus</dt>
          <dd>
            <ul>
              <li v-for="repo in profile.reposOfficial">
                <a :href="generateGithubUrl('vuejs', repo)" target=_blank>{{ repo.name || repo }}</a>
              </li>
            </ul>
          </dd>
        </template>
        <template v-if="profile.github && profile.reposPersonal">
          <dt>Ecosystem</dt>
          <dd>
            <ul>
              <li v-for="repo in profile.reposPersonal">
                <a :href="generateGithubUrl(profile.github, repo)" target=_blank>{{ repo.name || repo }}</a>
              </li>
            </ul>
          </dd>
        </template>
        <template v-if="profile.work">
          <dt>
            <i class="fa fa-briefcase"></i>
            <span class="sr-only">Work</span>
          </dt>
          <dd v-html="workHtml"></dd>
        </template>
        <span v-if="profile.distanceInKm" class="distance">
          <dt>
            <i class="fa fa-map-marker"></i>
            <span class="sr-only">Distance</span>
          </dt>
          <dd>
            About
            <span
              v-if="profile.distanceInKm <= 150"
              :title="`${profile.name} is close enough to commute to your location.`"
              class="highlighted"
            >{{ textDistance }} away</span>
            <template v-else>{{ textDistance }} away</template>
            in {{ profile.city }}
          </dd>
        </span>
        <template v-else-if="profile.city">
          <dt>
            <i class="fa fa-map-marker"></i>
            <span class="sr-only">City</span>
          </dt>
          <dd>
            {{ profile.city }}
          </dd>
        </template>
        <template v-if="profile.languages">
          <dt>
            <i class="fa fa-globe"></i>
            <span class="sr-only">Languages</span>
          </dt>
          <dd class="language-list">
            <ul>
              <li
                is="VuerLanguage"
                v-for="code in profile.languages"
                :key="code"
                :code="code"
                :vuerName="profile.name"
              />
            </ul>
          </dd>
        </template>
        <template v-if="profile.links">
          <dt>
            <i class="fa fa-link"></i>
            <span class="sr-only">Links</span>
          </dt>
          <dd>
            <ul>
              <li v-for="link in profile.links">
                <a :href="link" target=_blank>{{ minimizeLink(link) }}</a>
              </li>
            </ul>
          </dd>
        </template>
        <footer v-if="hasSocialLinks" class="social">
          <a class=github title="GitHub" v-if="profile.github" :href="generateGithubUrl(profile.github)">
            <i class="fa fa-github"></i>
            <span class="sr-only">Github</span>
          </a>
          <a class=twitter title="Twitter" v-if="profile.twitter" :href="`https://twitter.com/${profile.twitter}`">
            <i class="fa fa-twitter"></i>
            <span class="sr-only">Twitter</span>
          </a>
          <a class=codepen title="CodePen" v-if="profile.codepen" :href="`https://codepen.io/${profile.codepen}`">
            <i class="fa fa-codepen"></i>
            <span class="sr-only">CodePen</span>
          </a>
          <a
            class=linkedin
            title="LinkedIn"
            v-if="profile.linkedin"
            :href="`https://www.linkedin.com/in/${profile.linkedin}`"
          >
            <i class="fa fa-linkedin"></i>
            <span class="sr-only">LinkedIn</span>
          </a>
        </footer>
      </dl>
    </div>
  </div>
</template>

<script>
import { minimizeLink, generateGithubUrl, kmToMi, roundDistance } from './utils'

export default {
  components: {
    VuerLanguage: () => import('./vuer-language')
  },

  props: {
    profile: Object,
    titleVisible: Boolean,
    useMiles: Boolean
  },

  computed: {
    workHtml () {
      const work = this.profile.work
      let html = ''

      if (work.orgUrl) {
        html += `<a href="${work.orgUrl}" target="_blank" rel="noopener noreferrer">`

        if (work.org) {
          html += work.org
        } else {
          this.minimizeLink(work.orgUrl)
        }

        html += '</a>'
      } else if (work.org) {
        html += work.org
      }

      if (work.role) {
        if (html.length > 0) {
          html = `${work.role} @ ${html}`
        } else {
          html = work.role
        }
      }

      return html
    },

    textDistance () {
      const distanceInKm = this.profile.distanceInKm || 0

      return this.useMiles ? `${roundDistance(kmToMi(distanceInKm))} miles` : `${roundDistance(distanceInKm)}km`
    },

    hasSocialLinks () {
      return this.profile.github || this.profile.twitter || this.profile.codepen || this.profile.linkedin
    }
  },

  methods: {
    minimizeLink,
    generateGithubUrl
  }
}
</script>

<style lang="scss" scoped>
.vuer {
  display: flex;
  padding: 25px 0;
}

.avatar {
  flex: 0 0 80px;

  img {
    border-radius: 50%;
    object-fit: cover;
  }
}

.profile {
  padding-left: 26px;
  flex: 1;

  h3 {
    margin: 0;
    font-size: 1.3em;
  }

  dl {
    margin: 0.6em 0 0;
  }

  ul, li, dt, dd {
    display: inline;
    padding: 0;
    margin: 0;
    line-height: 1.3;
  }

  dt {
    text-transform: uppercase;
    font-size: 0.84em;
    font-weight: 600;
    min-width: 1.2em;
    margin-right: 0.5em;
    display: inline-block;
  }

  dd::after {
    display: block;
    content: '';
    margin-top: 0.6em;
  }

  li+li::before {
    display: inline-block;
    content: '·';
    margin: 0 0.4em;
  }
}

.social {
  a {
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
    margin-right: 0.4em;

    &.github, &.codepen {
      color: #000;
    }

    &.twitter {
      color: #1da1f3;
    }

    &.linkedin {
      color: #0077b5;
    }

    i {
      vertical-align: text-bottom;
      font-size: 1.3em;
    }
  }
}

.highlighted {
  cursor: help;
  color: #4682b4;

  &::after {
    content: "\f06a";
    font-family: FontAwesome;
    font-size: 0.75em;
    vertical-align: super;
    margin-left: 4px;
    margin-right: 2px;
    position: relative;
  }
}
</style>
