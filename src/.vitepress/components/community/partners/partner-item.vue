<script>
export default {
  props: {
    partner: Object
  },

  computed: {
    languages() {
      return [].concat(this.partner.languages)
    },

    mailHref() {
      return `mailto:${this.partner.email}?subject=Hire ${this.partner.name}`
    },

    logo() {
      if (/(https:\/\/|\/).*/.test(this.partner.logo)) {
        return this.partner.logo
      }

      return `/images/partners/${this.partner.logo}`
    }
  }
}
</script>

<template>
  <div class="partner-item-wrapper">
    <section class="partner-item">
      <div class="column">
        <div class="partner-item-logo">
          <a :href="partner.urlLink">
            <img
              :alt="`${partner.name}'s logo`"
              :src="logo"
              width="125"
              height="auto"
            />
          </a>
        </div>
        <dd class="social">
          <p v-if="partner.email" type="Email" :link="mailHref">
            {{ partner.email }}
          </p>
          <p
            v-for="link in partner.socialLinks"
            :key="link.name"
            :type="link.name"
            :link="link.url"
          >
            <a :href="link.url">{{ link.name }}</a>
          </p>
        </dd>
      </div>
      <div class="column">
        <div class="profile">
          <h3 class="partner-item-heading">About {{ partner.name }}</h3>
          <p class="description">{{ partner.description }}</p>
          <dt title="Proficiencies">
            <i class="fa fa-briefcase"></i>
            <h3 class="partner-item-heading">Proficiencies</h3>
          </dt>
          <dd class="proficiency-list">
            <ul>
              <li
                v-for="proficiency in partner.proficiencies"
                :key="proficiency.name"
              >
                <a v-if="proficiency.url" :href="proficiency.url">
                  {{ proficiency.name }}
                </a>
                <template v-else>{{ proficiency.name }}</template>
              </li>
            </ul>
          </dd>
          <dl>
            <dt>
              <i class="fa fa-link"></i>
              <span class="sr-only">Link</span>
            </dt>
            <dd>
              <a :href="partner.urlLink">{{ partner.urlText }}</a>
            </dd>
            <dt>
              <i class="fa fa-map-marker"></i>
              <span class="sr-only">Location</span>
            </dt>
            <dd>{{ partner.location }}</dd>
            <dt>
              <i class="fa fa-globe"></i>
              <span class="sr-only">Languages</span>
            </dt>
            <dd class="language-list">
              <ul>
                <li v-for="language in languages" :key="language">
                  {{ language }}
                </li>
              </ul>
            </dd>
          </dl>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.partner-item {
  max-width: 768px;
  display: grid;
  grid-template-columns: 192px 1fr;
  grid-column-gap: 64px;
}

.partner-item-logo {
  width: 192px;
  height: 192px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.partner-item-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 64px 0;
  background-color: #f8f8f8;
}

.partner-item-heading {
  margin-top: 0;
  font-weight: bold;
}
</style>
