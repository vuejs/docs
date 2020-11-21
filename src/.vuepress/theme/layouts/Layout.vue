<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <VueMasteryBanner v-if="isBannerOpen" @close-banner="closeBanner" ref='vueMasteryBanner'/>
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

    <Home v-if="$page.frontmatter.home" />

    <Page v-else :sidebar-items="sidebarItems">
      <template #top>
        <slot name="page-top" />
      </template>
      <template #bottom>
        <slot name="page-bottom" />
      </template>
    </Page>
  </div>
</template>

<script>
import Home from '@theme/components/Home.vue'
import Navbar from '@theme/components/Navbar.vue'
import Page from '@theme/components/Page.vue'
import Sidebar from '@theme/components/Sidebar.vue'
import VueMasteryBanner from '@theme/components/sponsors/VueMasteryBanner.vue'
import { resolveSidebarItems } from '../util'

export default {
  name: 'Layout',

  components: {
    Home,
    Page,
    Sidebar,
    Navbar,
    VueMasteryBanner
  },

  data () {
    return {
      isSidebarOpen: false,
      isBannerOpen:  true,
      isMenuFixed: false,
      nameStorage: 'vuemastery-black-firday-2020-banner',
      menuPosition: 0
    }
  },

  computed: {
    shouldShowNavbar () {
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

    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      )
    },

    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },

    pageClasses () {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar,
          'vuemastery-menu-fixed': this.isMenuFixed,
          'vuemastery-promo': this.isBannerOpen
        },
        userPageClass
      ]
    }
  },

  mounted () {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })

    // Load component according to user preferences
    if (!localStorage.getItem(this.nameStorage)) {
      this.initBanner()
    } else {
      this.isBannerOpen = false
    }
  },

  methods: {
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
      this.$emit('toggle-sidebar', this.isSidebarOpen)
    },

    // side swipe
    onTouchStart (e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },

    onTouchEnd (e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    },

    //  Vue Mastery Banner
    initBanner() {
      // Add event listeners
      this.toggleBannerEvents(true)
      // Add class to the body to push fixed elements
      this.isBannerOpen = true
      // Get the menu position
      this.getMenuPosition()
      // Check current page offset position
      this.isMenuFixed = this.isUnderBanner()
    },

    closeBanner (e) {
      // Remove events
      this.toggleBannerEvents(false)
      // Hide the banner
      this.isBannerOpen = false
      // Save action in the local storage
      localStorage.setItem(this.nameStorage, true)
    },

    getMenuPosition() {
      this.menuPosition = this.$refs.vueMasteryBanner.$el.clientHeight
    },

    isUnderBanner() {
      return window.pageYOffset > this.menuPosition
    },

    fixMenuAfterBanner() {
      if (this.isUnderBanner()) {
        if (!this.isMenuFixed) {
          // The menu will be fixed
          this.isMenuFixed = true
        }
      } else if (this.isMenuFixed) {
        // The menu stay under the banner
        this.isMenuFixed = false
      }
    },

    toggleBannerEvents(on) {
      // Add or remove event listerners attached to the DOM
      let method = on ? "addEventListener" : "removeEventListener"
      window[method]("resize", this.getMenuPosition)
      window[method]("scroll", this.fixMenuAfterBanner)
    }
  }
}
</script>
