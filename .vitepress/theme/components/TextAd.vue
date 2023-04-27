<script setup lang="ts">
function track() {
  fathom.trackGoal('7QLWSAAZ', 0)
}
</script>

<template>
  <div class="text-ad">
    <span>Ad</span>
    <a
      href="https://docs.aircode.io/chatgpt/"
      target="_blank"
      rel="noopener nofollow"
      @click="track"
      >Build a ChatGPT bot with JavaScript in 5 minutes</a
    >
  </div>
</template>

<style scoped>
.text-ad {
  font-size: 13px;
  margin-bottom: 28px;
  background-color: var(--vt-c-bg-soft);
  padding: 0.75rem;
  position: relative;
  display: flex;
  border-radius: 8px;
}

.text-ad span {
  white-space: nowrap;
  display: inline-block;
  color: var(--vt-c-blue);
  font-size: 12px;
  border: 1px solid var(--vt-c-blue);
  border-radius: 4px;
  padding: 0 4px;
  margin-right: 1rem;
}

.text-ad a {
  color: var(--vt-c-text-2);
}
</style>
