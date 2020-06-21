# Dynamic & Async Components

> This page assumes you've already read the [Components Basics](components.md). Read that first if you are new to components.

## Dynamic Components with `keep-alive`

Earlier, we used the `is` attribute to switch between components in a tabbed interface:

```vue-html
<component v-bind:is="currentTabComponent"></component>
```

When switching between these components though, you'll sometimes want to maintain their state or avoid re-rendering for performance reasons. For example, when expanding our tabbed interface a little:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="jOPjZOe" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Dynamic components: without keep-alive">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/jOPjZOe">
  Dynamic components: without keep-alive</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

You'll notice that if you select a post, switch to the _Archive_ tab, then switch back to _Posts_, it's no longer showing the post you selected. That's because each time you switch to a new tab, Vue creates a new instance of the `currentTabComponent`.

Recreating dynamic components is normally useful behavior, but in this case, we'd really like those tab component instances to be cached once they're created for the first time. To solve this problem, we can wrap our dynamic component with a `<keep-alive>` element:

```vue-html
<!-- Inactive components will be cached! -->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

Check out the result below:

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="VwLJQvP" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Dynamic components: with keep-alive">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/VwLJQvP">
  Dynamic components: with keep-alive</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Now the _Posts_ tab maintains its state (the selected post) even when it's not rendered.

Check out more details on `<keep-alive>` in the [API reference](../api/built-in-components.html#keep-alive).

## Async Components

In large applications, we may need to divide the app into smaller chunks and only load a component from the server when it's needed. To make that possible, Vue has a `defineAsyncComponent` method:

```js
const app = Vue.createApp({})

const AsyncComp = Vue.defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      resolve({
        template: '<div>I am async!</div>'
      })
    })
)

app.component('async-example', AsyncComp)
```

As you can see, this method accepts a factory function returning a `Promise`. Promise's `resolve` callback should be called when you have retrieved your component definition from the server. You can also call `reject(reason)` to indicate the load has failed.

You can also return a `Promise` in the factory function, so with Webpack 2 or later and ES2015 syntax you can do:

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)

app.component('async-component', AsyncComp)
```

You can also use `defineAsyncComponent` when [registering a component locally](component-registration.html#local-registration):

```js
import { createApp, defineAsyncComponent } from 'vue'

createApp({
  // ...
  components: {
    AsyncComponent: defineAsyncComponent(() =>
      import('./components/AsyncComponent.vue')
    )
  }
})
```

### Using with Suspense

Async components are _suspensible_ by default. This means if it has a [`<Suspense>`](TODO) in the parent chain, it will be treated as an async dependency of that `<Suspense>`. In this case, the loading state will be controlled by the `<Suspense>`, and the component's own loading, error, delay and timeout options will be ignored.

The async component can opt-out of `Suspense` control and let the component always control its own loading state by specifying `suspensible: false` in its options.

You can check the list of available options in the [API Reference](../api/global-api.html#arguments-4)
