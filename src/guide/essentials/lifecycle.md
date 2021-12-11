# Lifecycle Hooks

Each Vue component instance goes through a series of initialization steps when it's created - for example, it needs to set up data observation, compile the template, mount the instance to the DOM, and update the DOM when data changes. Along the way, it also runs functions called lifecycle hooks, giving users the opportunity to add their own code at specific stages.

## Registering Lifecycle Hooks

For example, the <span class="composition-api">`onMounted`</span><span class="options-api">`mounted`</span> hook can be used to run code after the component has finished the initial rendering and created the DOM nodes:

<div class="composition-api">

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`the component is now mounted.`)
})
</script>
```

</div>
<div class="options-api">

```js
export default {
  mounted() {
    console.log(`the component is now mounted.`)
  }
}
```

</div>

There are also other hooks which will be called at different stages of the instance's lifecycle, with the most commonly used being <span class="composition-api">[`onMounted`](/api/composition-api-lifecycle.html#onmounted), [`onUpdated`](/api/composition-api-lifecycle.html#onupdated), and [`onUnmounted`](/api/composition-api-lifecycle.html#onunmounted).</span><span class="options-api">[`mounted`](/api/options-lifecycle.html#mounted), [`updated`](/api/options-lifecycle.html#updated), and [`unmounted`](/api/options-lifecycle.html#unmounted). All lifecycle hooks are called with their `this` context pointing to the current active instance invoking it.</span>

<div class="composition-api">

When calling `onMounted`, Vue automatically associates the registered callback function with the current active component instance. This requires these hooks to be registered **synchronously** during component setup. For example, do not do this:

```js
setTimeout(() => {
  onMounted(() => {
    // this won't work.
  })
}, 100)
```

</div>

## Lifecycle Diagram

Below is a diagram for the instance lifecycle. You don't need to fully understand everything going on right now, but as you learn and build more, it will be a useful reference.

![Component lifecycle diagram](/images/lifecycle.svg)

Consult the <span class="composition-api">[Lifecycle Hooks API reference](/api/composition-api-lifecycle.html)</span><span class="options-api">[Lifecycle Hooks API reference](/api/options-lifecycle.html)</span> for details on all lifecycle hooks and their respective use cases.
