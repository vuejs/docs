<template>
  <div class="newsletter">
    <div class="inner">
      <h3><label for="member_email">Subscribe to our Weekly Newsletter</label></h3>
      <form
        class="newsletter-form"
        id="revue-form"
        name="revue-form"
        target="_blank"
        rel="noopener"
        action="https://www.getrevue.co/profile/vuenewsletter/add_subscriber"
        method="post"
      >
        <input
          class="newsletter-input"
          type="email"
          name="member[email]"
          id="member_email"
          required
          placeholder="Email address"
        >
        <input
          class="button newsletter-button"
          type="submit"
          value="Subscribe"
          name="member[subscribe]"
          id="member_submit"
        >
      </form>
      <p>
        You can read the previous issues and listen to our podcast at <a href="https://news.vuejs.org" target="_blank" rel="noopener">news.vuejs.org</a>.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@theme/styles/_settings.scss";

.newsletter {
  text-align: center;

  .inner {
    padding: 25px 40px 45px;
  }

  form {
    position: relative;
    max-width: 550px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  input {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 150px 10px 20px;
    height: 50px;
    border-radius: 9999px;
    border: 1px solid #ccc;
    font-size: 16px;
    outline: none;

    &:focus {
      border-color: $green;
    }
  }

  .button {
    width: auto;
    position: absolute;
    padding: 4px 20px;
    margin: 0;
    height: calc(100% - 8px);
    right: 4px;
    top: 4px;
    font-size: 1.05em;
    font-weight: 600;
    letter-spacing: 0.1em;
    min-width: 8em;
    display: inline-block;
    color: #fff;
    background-color: $green;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid currentColor;
    appearance: none;
  }
}
</style>
