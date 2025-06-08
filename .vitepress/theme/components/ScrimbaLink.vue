<template>
  <div class="scrimba">
    <a
      :href="href"
      target="_blank"
      rel="sponsored noopener"
      :title="title"
    >
      <slot>Watch a free interactive tutorial on Scrimba</slot>
    </a>
  </div>
</template>
<script>
export default {
  props: {
    href: { type: String, required: true },
    title: { type: String, required: true }
  }
}
</script>
<style scoped>
.scrimba {
  margin: 28px 0;
  background-color: var(--vt-c-bg-soft);
  padding: 1em 1.25em;
  border-radius: 2px;
  position: relative;
  display: flex;
  border-radius: 8px;
}
.scrimba a {
  color: var(--c-text);
  position: relative;
  padding-left: 36px;
}
.scrimba a:before {
  content: '';
  position: absolute;
  display: block;
  width: 30px;
  height: 30px;
  top: calc(50% - 15px);
  left: -4px;
  border-radius: 50%;
  background-color: #73abfe;
}
.scrimba a:after {
  content: '';
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  top: calc(50% - 5px);
  left: 8px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 8px solid #fff;
}
</style> 