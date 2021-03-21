<template>
  <div>
    <div id="one-time-donations">
      <div class="links">
        <a href="https://www.paypal.me/evanyou" target="_blank" rel="noopener">
          <img src="/images/paypal.png" style="width:100px">
        </a>
        <a href="#btc">
          <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><circle fill="#FFAD02" cx="19" cy="19" r="19"></circle><path d="M24.7 19.68a3.63 3.63 0 0 0 1.47-2.06c.74-2.77-.46-4.87-3.2-5.6l.89-3.33a.23.23 0 0 0-.16-.28l-1.32-.35a.23.23 0 0 0-.28.15l-.89 3.33-1.75-.47.88-3.32a.23.23 0 0 0-.16-.28l-1.31-.35a.23.23 0 0 0-.28.15l-.9 3.33-3.73-1a.23.23 0 0 0-.27.16l-.36 1.33c-.03.12.04.25.16.28l.22.06a1.83 1.83 0 0 1 1.28 2.24l-1.9 7.09a1.83 1.83 0 0 1-2.07 1.33.23.23 0 0 0-.24.12l-.69 1.24a.23.23 0 0 0 0 .2c.02.07.07.12.14.13l3.67.99-.89 3.33c-.03.12.04.24.16.27l1.32.35c.12.03.24-.04.28-.16l.89-3.32 1.76.47-.9 3.33c-.02.12.05.24.16.27l1.32.35c.12.03.25-.04.28-.16l.9-3.32.87.23c2.74.74 4.83-.48 5.57-3.25.35-1.3-.05-2.6-.92-3.48zm-5.96-5.95l2.64.7a1.83 1.83 0 0 1 1.28 2.24 1.83 1.83 0 0 1-2.23 1.3l-2.64-.7.95-3.54zm1.14 9.8l-3.51-.95.95-3.54 3.51.94a1.83 1.83 0 0 1 1.28 2.24 1.83 1.83 0 0 1-2.23 1.3z" fill="#FFF"></path></g></svg>
          BTC
        </a>
        <a href="#bch">
          <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><circle fill="#8DC451" cx="19" cy="19" r="19"></circle><path d="M24.5 16.72c.37-.76.48-1.64.25-2.52-.75-2.76-2.84-3.98-5.58-3.25l-.89-3.32a.23.23 0 0 0-.28-.16l-1.32.35a.23.23 0 0 0-.16.27l.9 3.33-1.76.47-.9-3.32a.23.23 0 0 0-.27-.16l-1.32.35a.23.23 0 0 0-.16.28l.9 3.32-3.74 1a.23.23 0 0 0-.16.29l.35 1.32c.04.12.16.2.28.17l.22-.06c.97-.26 1.97.32 2.23 1.3l1.9 7.08c.25.93-.25 1.87-1.13 2.2a.23.23 0 0 0-.14.21l.02 1.43c0 .07.04.13.1.18.05.04.12.05.19.04l3.67-.99.9 3.33c.03.12.15.19.27.15l1.31-.35c.12-.03.2-.16.16-.28l-.88-3.32 1.75-.47.9 3.33c.03.12.15.19.27.15l1.32-.35c.12-.03.19-.16.16-.28l-.9-3.32.88-.24c2.75-.73 3.95-2.83 3.2-5.6a3.63 3.63 0 0 0-2.54-2.56zm-8.13-2.17l2.63-.7c.97-.26 1.97.32 2.23 1.3.27.97-.3 1.98-1.28 2.24l-2.63.7-.95-3.54zm5.88 7.91l-3.5.94-.96-3.54 3.51-.94c.97-.26 1.97.32 2.24 1.3.26.98-.32 1.98-1.29 2.24z" fill="#FFF"></path></g></svg>
          BCH
        </a>
        <a href="#eth">
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 32 32"><g fill="none" fill-rule="evenodd"><ellipse cx="16" cy="16" fill="#6F7CBA" rx="16" ry="16"></ellipse><path fill="#FFF" d="M10.13 17.76c-.1-.15-.06-.2.09-.12l5.49 3.09c.15.08.4.08.56 0l5.58-3.08c.16-.08.2-.03.1.11L16.2 25.9c-.1.15-.28.15-.38 0l-5.7-8.13zm.04-2.03a.3.3 0 0 1-.13-.42l5.74-9.2c.1-.15.25-.15.34 0l5.77 9.19c.1.14.05.33-.12.41l-5.5 2.78a.73.73 0 0 1-.6 0l-5.5-2.76z"></path></g></svg>
          ETH
        </a>
        <a href="#ltc">
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38"><g fill="none" fill-rule="evenodd"><circle cx="19" cy="19" r="19" fill="#B5B5B5" fill-rule="nonzero"></circle><path fill="#FFF" d="M12.29 28.04l1.29-5.52-1.58.67.63-2.85 1.64-.68L16.52 10h5.23l-1.52 7.14 2.09-.74-.58 2.7-2.05.8-.9 4.34h8.1l-.99 3.8z"></path></g></svg>
          LTC
        </a>
      </div>
    </div>

    <div id="coin-details" v-if="type && coins[type]">
      <p>{{ coins[type].name }} Address:<br>{{ coins[type].address }}</p>
      <img :src="'/images/coin-' + type + '.png'">
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    type: null,
    coins: {
      btc: {
        name: 'Bitcoin',
        address: '14MEpy5a9MwDZa9CUzrfDhTU8dy2KKJ5mU'
      },
      bch: {
        name: 'Bitcoin Cash',
        address: '15gftB3fwumFRWGWFhVzTgc4nhM5w1F2Tu'
      },
      eth: {
        name: 'Ethereum',
        address: '0x3411356C1f0Bf5D859464eD2AC54DD2C222519B7'
      },
      ltc: {
        name: 'Litecoin',
        address: 'LUcHis3B8SFtEeZtuCaZoqsyN9XFAKmbCP'
      }
    }
  }),
  mounted () {
    this.updateType()

    window.addEventListener('hashchange', this.updateType)
  },
  beforeDestroy () {
    window.removeEventListener('hashchange', this.updateType)
  },
  methods: {
    updateType () {
      this.type = window.location.hash.slice(1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.links {
  a, svg {
    display: inline-block;
    vertical-align: middle;
  }

  a {
    margin: 20px;
    color: $textColor;
    text-decoration: none !important;

    &:hover {
      color: $accentColor;
    }
  }

  svg {
    margin-right: 5px;
  }
}

#coin-details {
  text-align: center;
  border-radius: 4px;
  padding: 30px;
  font-weight: bold;

  img {
    width: 200px;
  }

  p {
    padding: 0;
    margin: 0 0 20px;
  }
}
</style>
