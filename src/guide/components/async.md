# Async Components

In large applications, we may need to divide the app into smaller chunks and only load a component from the server when it's needed. To make that possible, Vue has a [`defineAsyncComponent`](/api/general.html#defineasynccomponent) method:

```js
const { defineAsyncComponent } = Vue

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...load component from server
    resolve(/* loaded component */)
  })
})
// ... use `AsyncComp` like a normal component
```

As you can see, this method accepts a loader function that returns a Promise. The Promise's `resolve` callback should be called when you have retrieved your component definition from the server. You can also call `reject(reason)` to indicate the load has failed.

[ES module dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports) also returns a Promise, so most of the time we will use it in combination with `defineAsyncComponent`. Bundlers like Vite and webpack also support the syntax, so we can use it to import Vue SFCs:

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

The resulting `AsyncComp` is a wrapper component that only calls the loader function when it is actually rendered on the page. In addition, it will pass along any props to the inner component, so you can use the async wrapper to seamlessly replace the original component while achieving lazy loading.

<div class="options-api">

You can also use `defineAsyncComponent` when [registering a component locally](/guide/components/registration.html#local-registration):

```js
import { defineAsyncComponent } from 'vue'

export default {
  // ...
  components: {
    AsyncComponent: defineAsyncComponent(() =>
      import('./components/AsyncComponent.vue')
    )
  }
}
```

</div>

## Loading State

## Error Handling

## Using with Suspense

Async components can be used with the `<Suspense>` built-in component. The interaction between `<Suspense>` and async components are documented in the [dedicated chapter for `<Suspense>`](/guide/built-ins/suspense.html).
