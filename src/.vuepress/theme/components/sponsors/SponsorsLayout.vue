<template>
  <div class="sponsors" :class="extraClasses">
    <h3 class="heading">
      <slot name="heading"/>
    </h3>

    <div class="content">
      <slot name="content"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    extraClasses: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
