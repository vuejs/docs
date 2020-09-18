# Lifecycle Hooks

> This guide assumes that you have already read the [Composition API Introduction](composition-api-introduction.html) and [Reactivity Fundamentals](reactivity-fundamentals.html). Read that first if you are new to Composition API.

[Watch a free video about Lifecycle Hooks on Vue Mastery](https://www.vuemastery.com/courses/vue-3-essentials/lifecycle-hooks)

You can access a component's lifecycle hook by prefixing the lifecycle hook with "on".

The following table contains how the lifecycle hooks are invoked inside of [setup()](composition-api-setup.html):

| Options API       | Hook inside inside `setup` |
| ----------------- | -------------------------- |
| `beforeCreate`    | Not needed\*               |
| `created`         | Not needed\*               |
| `beforeMount`     | `onBeforeMount`            |
| `mounted`         | `onMounted`                |
| `beforeUpdate`    | `onBeforeUpdate`           |
| `updated`         | `onUpdated`                |
| `beforeUnmount`   | `onBeforeUnmount`          |
| `unmounted`       | `onUnmounted`              |
| `errorCaptured`   | `onErrorCaptured`          |
| `renderTracked`   | `onRenderTracked`          |
| `renderTriggered` | `onRenderTriggered`        |

:::tip
Because `setup` is run around the `beforeCreate` and `created` lifecycle hooks, you do not need to explicitly define them. In other words, any code that would be written inside those hooks should be written directly in the `setup` function.
:::

These functions accept a callback that will be executed when the hook is called by the component:

```js
// MyBook.vue

export default {
  setup() {
    // mounted
    onMounted(() => {
      console.log('Component is mounted!')
    })
  }
}
```
