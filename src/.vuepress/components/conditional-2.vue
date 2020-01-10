<template>
  <div id="no-key-example" class="demo">
    <div>
      <template v-if="loginType === 'username'">
        <label>Username</label>
        <input placeholder="Enter your username" key="username-input" />
      </template>
      <template v-else>
        <label>Email</label>
        <input placeholder="Enter your email address" key="email-input" />
      </template>
    </div>
    <button @click="toggleLoginType">Toggle login type</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginType: 'username'
    }
  },
  methods: {
    toggleLoginType() {
      this.loginType = this.loginType === 'username' ? 'email' : 'username'
    }
  }
}
</script>

<style lang="scss" scoped></style>
