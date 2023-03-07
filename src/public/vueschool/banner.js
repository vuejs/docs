window.BitterBrainsBanner = window.BitterBrainsBanner || {
  host: undefined,
  affiliateKey: "vuejs",
  emulateDate: undefined,
  emulateHour: undefined,
  date: "03/07/2023, 08:51 PM Central European Standard Time",
  activePhase: {"name":"FREEWEEKEND23","classes":["bb-campaign-freeweekend-alt"],"title":"FREE WEEKEND 18TH & 19TH OF MARCH","subtitle":"Get Access to ALL Vue School Premium Courses","cta":"Reserve Your Spot","link":"https://vueschool.io/freeweekend23","showCountdownLastHours":null,"ends":"2023-03-19T23:59:59+01:00","showCountdown":null,"overrides":{"vueschool":{"link":"/freeweekend23"},"vuejs":{"classes":["bb-campaign-freeweekend-alt"]}},"remaining":1048127692,"isLastHours":false,"closedKey":"FREEWEEKEND23_CLOSED","countdownRemaining":1048127692},
  type: "top",

  isOpen: false,
  countdownInterval: null,
  isInitiated: false,
  style: null,
  allowList: {
    'masteringnuxt': path => path === '/' || path === '/nuxt2' || path === '/nuxt3',
    'vueschool': path => path === '/' || path.startsWith('/courses') || path.startsWith('/articles') || path.startsWith('/lessons')
  },

  render () {
    const { title, subtitle, cta, link, classes, showCountdown } = this.activePhase
    const countdown = showCountdown ? `<div class="bb-countdown">${this.renderCountdown()}</div>` : ''

    const template = `
      <div class="bb-background"></div>
      <div class="bb-logo"></div>
      <div class="bb-core">
        <div class="bb-slogan">
          <div class="bb-title">${title}</div>
          <div class="bb-subtitle">${subtitle}</div>
        </div>
        ${countdown}
        <div class="bb-button-wrapper">
          <div class="bb-button">${cta}</div>
        </div>
      </div>
      <div id="bb-close" class="bb-close">&times;</div>
    `

    const el = document.createElement('a')
    el.setAttribute('id', 'bb-banner')

    const query = {
      utm_source: this.affiliateKey,
      utm_medium: 'website',
      utm_campaign: 'affiliate',
      utm_content: `${this.type}_banner`,
      banner_type: this.type
    }

    if (!['testing', 'vueschool'].includes(this.affiliateKey)) {
      el.setAttribute('target', '_blank')
      query.friend = this.affiliateKey
    }

    const queryString = new URLSearchParams(query).toString()
    el.setAttribute('href', `${link}?${queryString}`)
    el.classList.add(...classes)
    el.innerHTML = template
    this.addBodyClasses()

    const container = document.getElementById('bb-banner-container') || document.body
    container.appendChild(el)

    addEventListener('popstate', (event) => {
      this.handleNavigation()
    })

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argumentsList) => {
        const output = target.apply(thisArg, argumentsList)
        this.handleNavigation()
        return output
      }
    })
  },
  handleNavigation () {
    this.addBodyClasses()
  },
  addBodyClasses () {
    if (!this.isOpen) return
    const root = document.getElementsByTagName('html')[0]
    root.classList.add('has-bb-banner')

    root.classList.add(`bb-type-${this.type}`)

    if (this.affiliateKey) root.classList.add(`bb-${this.affiliateKey}`)

    const path = window.location.pathname || '/'
    if (!this.allowList[this.affiliateKey] || this.allowList[this.affiliateKey](path)) {
      root.classList.remove('bb-banner-hidden')
    } else {
      root.classList.add('bb-banner-hidden')
    }
  },
  renderCountdown () {
    const { isLastHours, showDaysAsHours } = this.activePhase

    const parts = ['hours', 'minutes', 'seconds']
    if (!isLastHours && !showDaysAsHours) parts.unshift('days')
    return parts.map(part => this.renderCountdownPart(part)).join('')
  },
  renderCountdownPart (part) {
    return `
      <div class="bb-countdown-item">
        <div class="bb-countdown-part">
          <div data-countdown="${part}" class="bb-countdown-number"></div><div class="bb-countdown-text"><span class="bb-countdown-text-initial">${part[0]}</span><span>${part.substring(1)}</span></div>
        </div>
        <div class="bb-countdown-colon">:</div>
      </div>
    `
  },
  getType () {
    const container = document.getElementById('bb-banner-container')
    if (container) return 'inline'

    if (this.type && ['top', 'bottom'].includes(this.type)) return this.type

    return 'top'
  },
  insertStyleTag () {
    const style = document.createElement('style')
    style.textContent = window.BitterBrainsBanner.style
    document.head.appendChild(style)
  },
  close () {
    document.getElementById('bb-banner').remove()
    const root = document.getElementsByTagName('html')[0]
    root.classList.remove('has-bb-banner')
    clearInterval(this.countdownInterval)
    this.isOpen = false
  },
  bindCloseButton () {
    document.getElementById('bb-close').addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      this.close()
      localStorage.setItem(this.activePhase.closedKey, 1)
    })
  },
  startCountdown () {
    if (this.activePhase.countdownRemaining < 0) return
    this.updateCountdown()

    this.countdownInterval = setInterval(() => {
      this.activePhase.countdownRemaining -= 1000
      if (this.activePhase.countdownRemaining > 0) {
        this.updateCountdown()
      } else {
        this.close()
      }
    }, 1000)
  },
  updateCountdown () {
    if (!this.isOpen) return

    const { countdownRemaining, isLastHours, showDaysAsHours } = this.activePhase

    const parts = {
      days: Math.floor(countdownRemaining / (1000 * 60 * 60 * 24)),
      hours: Math.floor(countdownRemaining % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
      minutes: Math.floor(countdownRemaining % (1000 * 60 * 60) / (1000 * 60)),
      seconds: Math.floor(countdownRemaining % (1000 * 60) / 1000)
    }

    if (isLastHours || showDaysAsHours) {
      parts.hours = parts.hours + (parts.days * 24)
      delete parts.days
    }

    Object.entries(parts).forEach(([key, value]) => {
      document.querySelector(`[data-countdown=${key}]`).textContent = value.toString().padStart(2, '0')
    })
  },
  init () {
    if (!this.activePhase || localStorage.getItem(this.activePhase.closedKey) || this.isInitiated) return

    this.isOpen = true
    this.isInitiated = true
    const stateCheck = setInterval(() => {
      if (document.readyState === 'complete') {
        clearInterval(stateCheck)

        this.type = this.getType()

        this.insertStyleTag()
        this.render()
        this.bindCloseButton()
        if (this.activePhase.showCountdown) this.startCountdown()
      }
    }, 100)
  }
}

window.BitterBrainsBanner.style = `
#bb-banner {
  height: 72px;
  text-decoration: none;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Roboto, Arial, sans-serif;
  background: #000;
  overflow: hidden;
  line-height: 18px;
}

#bb-banner * {
  font-family: Roboto, Arial, sans-serif;
}

#bb-banner .bb-logo {
  width: 30px;
  height: 19px;
  left: 16px;
  position: absolute;
  background-size: contain;
  background-repeat: no-repeat;
}

#bb-banner .bb-close {
  font-family: sans-serif;
  color: white;
  position: absolute;
  top: 29px;
  right: 12px;
  line-height: 0;
  font-size: 24px;
  height: 14px;
  width: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#bb-banner .bb-background {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  position: absolute;
  z-index: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

#bb-banner .bb-core {
  display: flex;
  align-items: center;
  text-align: center;
  gap: 6px;
  position: relative;
  z-index: 10;
  flex-direction: column;
}

#bb-banner .bb-core .bb-slogan {
  width: 240px;
}

#bb-banner .bb-core .bb-title {
  font-size: 14px;
  font-weight: bold;
  color: #00dc82;
}

#bb-banner .bb-core .bb-subtitle {
  color: #FFF;
  font-size: 12px;
}

#bb-banner .bb-core .bb-button-wrapper .bb-button {
  border-radius: 6px;
  font-weight: bold;
  color: #000;
  background: white;
  font-size: 14px;
  padding: 14px 8px;
  white-space: nowrap;
}

#bb-banner .bb-core .bb-countdown {
  align-items: center;
  gap: 4px;
  line-height: 1;
  display: flex;
  font-weight: bold;
  font-size: 12px;
  color: #00dc82;
}

#bb-banner .bb-core .bb-countdown .bb-countdown-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

#bb-banner .bb-core .bb-countdown .bb-countdown-item .bb-countdown-part > div {
  display: inline;
}

#bb-banner .bb-core .bb-countdown .bb-countdown-item:last-child .bb-countdown-colon {
  display: none;
}

#bb-banner .bb-core .bb-countdown .bb-countdown-item .bb-countdown-part .bb-countdown-text .bb-countdown-text-initial~span {
  display: none;
}

@media (min-width: 768px) {
  #bb-banner .bb-close {
    right: 24px;
  }

  #bb-banner .bb-core {
    gap: 12px;
    flex-direction: row;
  }

  #bb-banner .bb-core .bb-slogan {
    width: auto;
  }

  #bb-banner .bb-core .bb-title {
    margin-top: 4px;
    font-size: 18px;
  }

  #bb-banner .bb-core .bb-subtitle {
    margin-top: 4px;
    font-size: 16px;
  }

  #bb-banner .bb-core .bb-button-wrapper {
    display: block;
  }

  #bb-banner .bb-core .bb-button-wrapper .bb-button {
    font-size: 18px;
  }

  #bb-banner .bb-core .bb-countdown {
    font-weight: normal;
    font-size: inherit;
  }

  #bb-banner .bb-core .bb-countdown .bb-countdown-item .bb-countdown-part {
    border-radius: 2px;
    padding: 4px 0;
    text-align: center;
    width: 42px;
    background: rgba(255, 255, 255, 0.1);
  }

  #bb-banner .bb-core .bb-countdown .bb-countdown-item .bb-countdown-part > div {
    display: block;
  }

  #bb-banner .bb-core .bb-countdown .bb-countdown-item .bb-countdown-part .bb-countdown-number {
    font-size: 28px;
    font-weight: 500;
    line-height: 28px;
  }

  #bb-banner .bb-core .bb-countdown .bb-countdown-item .bb-countdown-part .bb-countdown-text {
    font-size: 8px;
    text-transform: uppercase;
  }

  #bb-banner .bb-core .bb-countdown .bb-countdown-item .bb-countdown-part .bb-countdown-text .bb-countdown-text-initial~span {
    display: inline;
  }

  #bb-banner .bb-core .bb-countdown .bb-countdown-item .bb-countdown-colon {
    font-weight: bold;
  }
}

@media (min-width: 1280px) {
  #bb-banner .bb-logo {
    width: 152px;
    left: 24px;
  }

  #bb-banner .bb-core {
    gap: 32px;
  }
}

html.has-bb-banner.bb-banner-hidden #bb-banner {
  display: none;
}

/*
BANNER TYPES
*********************************************************/

/* Banner rendered in container element */

html.has-bb-banner #bb-banner-container #bb-banner {
  position: relative;
}

html.has-bb-banner #bb-banner-container #bb-banner .bb-close {
  display: none;
}

/* Banner Fixed Top */

html.has-bb-banner.bb-type-top {
  margin-top: 72px;
}

html.has-bb-banner.bb-type-top.bb-banner-hidden {
  margin-top: 0;
}

html.has-bb-banner.bb-type-top #bb-banner {
  position: fixed;
  top: 0;
  z-index: 60;
  left: 0;
  right: 0;
}

/* Banner Fixed Bottom */

html.has-bb-banner.bb-type-bottom #bb-banner {
  position: fixed;
  bottom: 10px;
  z-index: 60;
  left: 10px;
  right: 10px;
}
/* Free Weekend */

#bb-banner.bb-campaign-freeweekend-alt {
  background: linear-gradient(180deg, #365A85 4.14%, #3D7760 109.03%);
}

#bb-banner.bb-campaign-freeweekend-alt .bb-core .bb-button-wrapper {
  display: none;
}

#bb-banner.bb-campaign-freeweekend-alt .bb-core .bb-slogan {
  width: auto;
}

#bb-banner.bb-campaign-freeweekend-alt .bb-core .bb-button-wrapper .bb-button {
  background: #61C88A;
  color: #1A1A1A;
  padding: 13px 17px;
  background: #61C88A;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 32px;
  font-size: 12px;
  text-transform: uppercase;
}

#bb-banner.bb-campaign-freeweekend-alt:hover .bb-core .bb-button-wrapper .bb-button {
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.5);
}

#bb-banner.bb-campaign-freeweekend-alt .bb-core .bb-title {
  font-size: 14px;
  font-weight: normal;
  color: #FFF;
  text-transform: uppercase;
  font-weight: bold;
}

#bb-banner.bb-campaign-freeweekend-alt .bb-core .bb-subtitle {
  color: #96C8C9;
  font-size: 12px;
  margin-top: 0;
}

#bb-banner.bb-campaign-freeweekend-alt .bb-logo {
  background-image: url("https://vueschool.io/images/mark-vueschool.svg");
  width: 35px;
  height: 35px;
}

#bb-banner.bb-campaign-freeweekend-alt .bb-background {
  background-size: cover;
  background-image: url("https://vueschool.io/images/banners/assets/FREEWEEKEND23/bg-mobile-alt2.png");
}

@media (min-width: 768px) {
  #bb-banner.bb-campaign-freeweekend-alt .bb-core {
    margin-right: -75px;
  }

  #bb-banner.bb-campaign-freeweekend-alt .bb-core .bb-button-wrapper {
    display: inline-block;
  }

  #bb-banner.bb-campaign-freeweekend-alt .bb-background {
    background-image: url("https://vueschool.io/images/banners/assets/FREEWEEKEND23/bg-tablet-alt2.png");
  }

  #bb-banner.bb-campaign-freeweekend-alt .bb-logo {
    background-image: url("https://vueschool.io/images/logo-vueschool-variant.svg");
    width: 126px;
    height: 40px;
  }
}

@media (min-width: 1280px) {
  #bb-banner.bb-campaign-freeweekend-alt .bb-core {
    gap: 16px;
    margin: auto;
  }

  #bb-banner.bb-campaign-freeweekend-alt .bb-background {
    background-image: url("https://vueschool.io/images/banners/assets/FREEWEEKEND23/bg-desktop-alt2.png");
  }
}

html.has-bb-banner.bb-vueschool #bb-banner.bb-campaign-freeweekend-alt .bb-logo {
  display: none;
}
/* Vue Js Org Vite Press */

html.has-bb-banner {
  scroll-padding-top: 134px;
  overflow: auto;
}

html.has-bb-banner .VPSidebar,
html.has-bb-banner .VPContentDoc.has-sidebar.has-aside .aside-container {
  top: 127px;
}

@media (min-width: 960px) {
  html.has-bb-banner .VPNav {
    top: 72px;
  }
}

`

try {
  window.BitterBrainsBanner.init()
} catch (e) {
  console.warn('Error when trying to render top banner')
}
