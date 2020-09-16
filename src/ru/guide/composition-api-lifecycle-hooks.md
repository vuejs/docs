# Lifecycle Hooks

> This guide assumes that you have already read the [Composition API Introduction](composition-api-introduction.md) and [Reactivity Fundamentals](reactivity-fundamentals.md). Read that first if you are new to Composition API.

You can access a component's lifecycle hook by prefixing the lifecycle hook with "on".

The following table contains how the lifecycle hooks are invoked inside of [setup()](composition-api-setup.md):

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

:::tip Совет
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
