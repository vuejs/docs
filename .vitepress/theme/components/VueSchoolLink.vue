<template>
  <div dir='rtl' class="vueschool">
    <a
      :href="`${href}?friend=vuejs`"
      target="_blank"
      rel="sponsored noopener"
      :title="title"
    >
      <slot>یک ویدیو از یک درس رایگان در Vue School ببینید</slot>
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
.vueschool {
  margin: 28px 0;
  background-color: var(--vt-c-bg-soft);
  padding: 1em 1.25em;
  border-radius: 2px;
  position: relative;
  display: flex;
  border-radius: 8px;
}
.vueschool a {
  color: var(--c-text);
  position: relative;
  padding-right: 36px;
}
.vueschool a:before {
  content: '';
  position: absolute;
  display: block;
  width: 30px;
  height: 30px;
  top: calc(50% - 15px);
  right: -4px;
  border-radius: 50%;
  background-color: #73abfe;
}
.vueschool a:after {
  content: '';
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  top: calc(50% - 5px);
  right: 6px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 8px solid #fff;
}
</style>
