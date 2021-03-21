<template>
  <li :title="this.title" :class="{ highlighted }">{{ this.name }}</li>
</template>

<script>
import { getPreferredLanguageCode } from './utils'

const languageNameFor = {
  en: 'English',
  nl: 'Nederlands',
  zh: '中文',
  vi: 'Tiếng Việt',
  pl: 'Polski',
  pt: 'Português',
  ru: 'Русский',
  jp: '日本語',
  fr: 'Français',
  de: 'Deutsch',
  el: 'Ελληνικά',
  es: 'Español',
  hi: 'हिंदी',
  fa: 'فارسی',
  ko: '한국어',
  ro: 'Română',
  uk: 'Українська',
  no: 'Norwegian'
}

export default {
  props: {
    vuerName: String,
    code: String
  },

  data: () => ({
    preferredCode: 'en'
  }),

  mounted () {
    // since getPreferredLanguageCode() depends on window.navigator, it should be placed inside mounted()
    this.preferredCode = getPreferredLanguageCode().split('-')[0]
  },

  computed: {
    isUserPreferredLanguage () {
      return this.code === this.preferredCode
    },

    isEnglish () {
      return this.code === 'en'
    },

    highlighted () {
      return this.isUserPreferredLanguage && !this.isEnglish
    },

    title () {
      if (this.highlighted) {
        return `${this.vuerName} can give technical talks in your preferred language.`
      }

      return this.name
    },

    name () {
      return languageNameFor[this.code]
    }
  }
}
</script>
