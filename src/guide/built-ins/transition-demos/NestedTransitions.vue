<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>

<template>
  <div class="demo">
    <button @click="show = !show" style="margin-bottom: 20px">Toggle</button>
    <Transition duration="550" name="nested">
      <div v-if="show" class="transition-demo-outer">
        <div class="transition-demo-inner">Hello</div>
      </div>
    </Transition>
  </div>
</template>

<style>
.transition-demo-outer,
.transition-demo-inner {
  background: #eee;
  padding: 30px;
  min-height: 100px;
}

.transition-demo-inner {
  background: #ccc;
  color: rgb(33, 53, 71);
}

.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}
/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

/* we can also transition nested elements using nested selectors */
.nested-enter-active .transition-demo-inner,
.nested-leave-active .transition-demo-inner {
  transition: all 0.3s ease-in-out;
}
/* delay enter of nested element */
.nested-enter-active .transition-demo-inner {
  transition-delay: 0.25s;
}

.nested-enter-from .transition-demo-inner,
.nested-leave-to .transition-demo-inner {
  transform: translateX(30px);
  /*
  	Hack around a Chrome 96 bug in handling nested opacity transitions.
    This is not needed in other browsers or Chrome 99+ where the bug
    has been fixed.
  */
  opacity: 0.001;
}
</style>
