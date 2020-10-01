# Handling Edge Cases

> This page assumes you've already read the [Components Basics](component-basics.md). Read that first if you are new to components.

:::tip Note
All the features on this page document the handling of edge cases, meaning unusual situations that sometimes require bending Vue's rules a little. Note however, that they all have disadvantages or situations where they could be dangerous. These are noted in each case, so keep them in mind when deciding to use each feature.
:::

## Controlling Updates

Thanks to Vue's Reactivity system, it always knows when to update (if you use it correctly). There are edge cases, however, when you might want to force an update, despite the fact that no reactive data has changed. Then there are other cases when you might want to prevent unnecessary updates.

### Forcing an Update

If you find yourself needing to force an update in Vue, in 99.99% of cases, you've made a mistake somewhere. For example, you may be relying on state that isn't tracked by Vue's reactivity system, e.g. with `data` property added after component creation.

However, if you've ruled out the above and find yourself in this extremely rare situation of having to manually force an update, you can do so with [`$forceUpdate`](../api/instance-methods.html#forceupdate).

### Cheap Static Components with `v-once`

Rendering plain HTML elements is very fast in Vue, but sometimes you might have a component that contains **a lot** of static content. In these cases, you can ensure that it's only evaluated once and then cached by adding the `v-once` directive to the root element, like this:

``` js
app.component('terms-of-service', {
  template: `
    <div v-once>
      <h1>Terms of Service</h1>
      ... a lot of static content ...
    </div>
  `
})
```

:::tip
Once again, try not to overuse this pattern. While convenient in those rare cases when you have to render a lot of static content, it's simply not necessary unless you actually notice slow rendering - plus, it could cause a lot of confusion later. For example, imagine another developer who's not familiar with `v-once` or simply misses it in the template. They might spend hours trying to figure out why the template isn't updating correctly.
:::
