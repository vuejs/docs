<template>
  <a :href="url" :title="type">
    <i class="fa" :class="extraClass"/>
    <span class="sr-only">{{ type }}</span>
  </a>
</template>

<script>
const SOCIAL_ICON_CLASS_MAP = {
  Email: 'fa-envelope',
  GitHub: 'fa-github',
  Twitter: 'fa-twitter-square',
  LinkedIn: 'fa-linkedin-square',
  YouTube: 'fa-youtube-square',
  Facebook: 'fa-facebook-square',
  Instagram: 'fa-instagram',
  CodePen: 'fa-codepen'
}

export default {
  props: {
    url: {
      type: String,
      required: true
    },

    type: {
      type: String,
      required: true,
      validator: value => Object.keys(SOCIAL_ICON_CLASS_MAP).includes(value)
    }
  },

  computed: {
    extraClass () {
      return SOCIAL_ICON_CLASS_MAP[this.type]
    }
  }
}
</script>

<style lang="scss" scoped>
.fa {
  &-github, &-codepen, &-envelope {
    color: #000;
  }

  &-twitter, &-twitter-square {
    color: #1da1f3;
  }

  &-linkedin, &-linkedin-square {
    color: #0077b5;
  }

  &-facebook, &-facebook-square {
    color: #3b5998;
  }

  &-youtube, &-youtube-play, &-youtube-square {
    color: #f00;
  }

  &-instagram {
    color: #c13584;
  }
}
</style>
