---
badges:
  - new
---

# Suspense <MigrationBadges :badges="$frontmatter.badges" />

:::warning Experimental
Suspense is an experimental new feature and the API could change at any time. It is documented here so that the community can provide feedback on the current implementation.

It should not be used in production applications.
:::

## Introduction

It is common for components to need to perform some kind of asynchronous request before they can be rendered properly. Components often handle this locally and in many cases that is a perfectly good approach.

The `<suspense>` component provides an alternative, allowing for the waiting to be handled further up the component tree rather than in each individual component.

A common use case involves [async components](/guide/component-dynamic-async.html#async-components):

```vue{2-4,6,17}
<template>
  <suspense>
    <template #default>
      <todo-list />
    </template>
    <template #fallback>
      <div>
        Loading...
      </div>
    </template>
  </suspense>
</template>

<script>
export default {
  components: {
    TodoList: defineAsyncComponent(() => import('./TodoList.vue'))
  }
}
</script>
```

The `<suspense>` component has two slots. Both slots only allow for one immediate child node. The node in the `default` slot is shown if possible. If not, the node in the `fallback` slot will be shown instead.

Importantly, the async component doesn't need to be the immediate child of the `<suspense>`. It can be at any depth within the component tree and doesn't need to appear in the same template as the `<suspense>` itself. The content is only considered resolved once all descendants are ready.

The other way to trigger the `fallback` slot is for a descendant component to return a promise from its `setup` function. This is typically implemented using `async` rather than explicitly returning a promise:

```js{2}
export default {
  async setup() {
    // Be very careful using `await` inside `setup` as
    // most Composition API functions will only work
    // prior to the first `await`
    const data = await loadData()

    // This is implicitly wrapped in a promise because
    // the function is `async`
    return {
      // ...
    }
  }
}
```

## Child Updates

Once a `<suspense>` has resolved the contents of its `default` slot, it can only be triggered again if the `default` root node is replaced. New components nested deeper in the tree are not sufficient to move the `<suspense>` back into a pending state.

If the root node does change it will trigger the `pending` event. However, by default, it won't update the DOM to show the `fallback` content. Instead, it will continue to show the old DOM until the new components are ready. This can be controlled using the `timeout` prop. This value, expressed in milliseconds, tells the `<suspense>` component how long to wait before showing the `fallback`. A value of `0` will show it immediately when the `<suspense>` enters the pending state.

## Events

In addition to the `pending` event, the `<suspense>` component also has `resolve` and `fallback` events. The `resolve` event is emitted when new content has finished resolving in the `default` slot. The `fallback` event is fired when the contents of the `fallback` slot are shown.

The events could be used, for example, to show a loading indicator in front of the old DOM while new components are loading.

## Combining with Other Components

It is common to want to use `<suspense>` in combination with the [`<transition>`](/api/built-in-components.html#transition) and [`<keep-alive>`](/api/built-in-components.html#keep-alive) components. The nesting order of these components is important to get them all working correctly.

In addition, these components are often used in conjunction with the `<router-view>` component from [Vue Router](https://next.router.vuejs.org/).

The following example shows how to nest these components so that they all behave as expected. For simpler combinations you can remove the components that you don't need:

```html
<router-view v-slot="{ Component }">
  <template v-if="Component">
    <transition mode="out-in">
      <keep-alive>
        <suspense>
          <component :is="Component"></component>
          <template #fallback>
            <div>
              Loading...
            </div>
          </template>
        </suspense>
      </keep-alive>
    </transition>
  </template>
</router-view>
```

Vue Router has built-in support for [lazily loading components](https://next.router.vuejs.org/guide/advanced/lazy-loading.html) using dynamic imports. These are distinct from async components and currently they will not trigger `<suspense>`. However, they can still have async components as descendants and those can trigger `<suspense>` in the usual way.
