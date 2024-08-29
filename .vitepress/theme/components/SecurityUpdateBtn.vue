<script setup lang="ts">
</script>

<template>
  <div class="container">
    <a 
      class="security" 
      href="https://www.herodevs.com/support/nes-vue?utm_source=vuejs_org&utm_medium=sidebar_link&utm_campaign=vue2eol"
      target="_blank"
    >
      Get Security Updates for Vue 2
      <svg 
        class="icon"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 512 512"
      >
        <path 
          d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"
        />
      </svg>
    </a>
  </div>
</template>

<style scoped>
  .container {
    margin-top: 20px;
  }
  .container .security {
    font-size: 12px;
    display: inline-block;
    padding: 4px 8px;
    font-weight: 500;
    border-radius: 8px;
    background: linear-gradient(var(--vt-c-bg-mute), var(--vt-c-bg-mute)) padding-box, 
      linear-gradient(45deg, #42d392, #647eff) border-box;
    border: 2px solid transparent;
    color: var(--vt-c-text-code);
    transition: background-color 0.5s, color 0.5s;
  }
  .container .security:hover {
    background: linear-gradient(var(--vt-c-gray-light-4), var(--vt-c-gray-light-4)) padding-box, 
      linear-gradient(45deg, #42d392, #647eff) border-box;
    transition-duration: 0.2s;
  }
  .dark .container .security:hover {
    background: linear-gradient(var(--vt-c-gray-dark-3), var(--vt-c-gray-dark-3)) padding-box, 
      linear-gradient(45deg, #42d392, #647eff) border-box;
  }
  .container .security .icon {
    width: 12px;
    height: 12px;
    margin-left: 4px;
    display: inline;
    position: relative;
    fill: currentColor;
    transition: transform 0.2s;

  }
  .dark .container .security:hover {
    background-color: var(--vt-c-gray-dark-3);
  }
</style>
