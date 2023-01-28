# Composables {#composables}

<script setup>
import { useMouse } from './mouse'
const { x, y } = useMouse()
</script>

:::tip
This section assumes basic knowledge of Composition API. If you have been learning Vue with Options API only, you can set the API Preference to Composition API (using the toggle at the top of the left sidebar) and re-read the [Reactivity Fundamentals](/guide/essentials/reactivity-fundamentals.html) and [Lifecycle Hooks](/guide/essentials/lifecycle.html) chapters.
:::

## What is a "Composable"? {#what-is-a-composable}

In the context of Vue applications, a "composable" is a function that leverages Vue's Composition API to encapsulate and reuse **stateful logic**.

When building frontend applications, we often need to reuse logic for common tasks. For example, we may need to format dates in many places, so we extract a reusable function for that. This formatter function encapsulates **stateless logic**: it takes some input and immediately returns expected output. There are many libraries out there for reusing stateless logic - for example [lodash](https://lodash.com/) and [date-fns](https://date-fns.org/), which you may have heard of.

By contrast, stateful logic involves managing state that changes over time. A simple example would be tracking the current position of the mouse on a page. In real-world scenarios, it could also be more complex logic such as touch gestures or connection status to a database.

## Mouse Tracker Example {#mouse-tracker-example}

If we were to implement the mouse tracking functionality using the Composition API directly inside a component, it would look like this:

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(event) {
  x.value = event.pageX
  y.value = event.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

But what if we want to reuse the same logic in multiple components? We can extract the logic into an external file, as a composable function:

```js
// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// by convention, composable function names start with "use"
export function useMouse() {
  // state encapsulated and managed by the composable
  const x = ref(0)
  const y = ref(0)

  // a composable can update its managed state over time.
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // a composable can also hook into its owner component's
  // lifecycle to setup and teardown side effects.
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // expose managed state as return value
  return { x, y }
}
```

And this is how it can be used in components:

```vue
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

<div class="demo">
  Mouse position is at: {{ x }}, {{ y }}
</div>

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZU1vdXNlIH0gZnJvbSAnLi9tb3VzZS5qcydcblxuY29uc3QgeyB4LCB5IH0gPSB1c2VNb3VzZSgpXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICBNb3VzZSBwb3NpdGlvbiBpcyBhdDoge3sgeCB9fSwge3sgeSB9fVxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59IiwibW91c2UuanMiOiJpbXBvcnQgeyByZWYsIG9uTW91bnRlZCwgb25Vbm1vdW50ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VNb3VzZSgpIHtcbiAgY29uc3QgeCA9IHJlZigwKVxuICBjb25zdCB5ID0gcmVmKDApXG5cbiAgZnVuY3Rpb24gdXBkYXRlKGV2ZW50KSB7XG4gICAgeC52YWx1ZSA9IGV2ZW50LnBhZ2VYXG4gICAgeS52YWx1ZSA9IGV2ZW50LnBhZ2VZXG4gIH1cblxuICBvbk1vdW50ZWQoKCkgPT4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHVwZGF0ZSkpXG4gIG9uVW5tb3VudGVkKCgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB1cGRhdGUpKVxuXG4gIHJldHVybiB7IHgsIHkgfVxufSJ9)

As we can see, the core logic remains identical - all we had to do was move it into an external function and return the state that should be exposed. Just like inside a component, you can use the full range of [Composition API functions](/api/#composition-api) in composables. The same `useMouse()` functionality can now be used in any component.

The cooler part about composables though, is that you can also nest them: one composable function can call one or more other composable functions. This enables us to compose complex logic using small, isolated units, similar to how we compose an entire application using components. In fact, this is why we decided to call the collection of APIs that make this pattern possible Composition API.

For example, we can extract the logic of adding and removing a DOM event listener into its own composable:

```js
// event.js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  // if you want, you can also make this
  // support selector strings as target
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```

And now our `useMouse()` composable can be simplified to:

```js{3,9-12}
// mouse.js
import { ref } from 'vue'
import { useEventListener } from './event'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event) => {
    x.value = event.pageX
    y.value = event.pageY
  })

  return { x, y }
}
```

:::tip
Each component instance calling `useMouse()` will create its own copies of `x` and `y` state so they won't interfere with one another. If you want to manage shared state between components, read the [State Management](/guide/scaling-up/state-management.html) chapter.
:::

## Async State Example {#async-state-example}

The `useMouse()` composable doesn't take any arguments, so let's take a look at another example that makes use of one. When doing async data fetching, we often need to handle different states: loading, success, and error:

```vue
<script setup>
import { ref } from 'vue'

const data = ref(null)
const error = ref(null)

fetch('...')
  .then((res) => res.json())
  .then((json) => (data.value = json))
  .catch((err) => (error.value = err))
</script>

<template>
  <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <div v-else-if="data">
    Data loaded:
    <pre>{{ data }}</pre>
  </div>
  <div v-else>Loading...</div>
</template>
```

It would be tedious to have to repeat this pattern in every component that needs to fetch data. Let's extract it into a composable:

```js
// fetch.js
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}
```

Now in our component we can just do:

```vue
<script setup>
import { useFetch } from './fetch.js'

const { data, error } = useFetch('...')
</script>
```

`useFetch()` takes a static URL string as input - so it performs the fetch only once and is then done. What if we want it to re-fetch whenever the URL changes? We can achieve that by also accepting refs as an argument:

```js
// fetch.js
import { ref, isRef, unref, watchEffect } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  function doFetch() {
    // reset state before fetching..
    data.value = null
    error.value = null
    // unref() unwraps potential refs
    fetch(unref(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

  if (isRef(url)) {
    // setup reactive re-fetch if input URL is a ref
    watchEffect(doFetch)
  } else {
    // otherwise, just fetch once
    // and avoid the overhead of a watcher
    doFetch()
  }

  return { data, error }
}
```

This version of `useFetch()` now accepts both static URL strings and refs of URL strings. When it detects that the URL is a dynamic ref using [`isRef()`](/api/reactivity-utilities.html#isref), it sets up a reactive effect using [`watchEffect()`](/api/reactivity-core.html#watcheffect). The effect will run immediately and will also track the URL ref as a dependency. Whenever the URL ref changes, the data will be reset and fetched again.

Here's [the updated version of `useFetch()`](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyB1c2VGZXRjaCB9IGZyb20gJy4vdXNlRmV0Y2guanMnXG5cbmNvbnN0IGJhc2VVcmwgPSAnaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3RvZG9zLydcbmNvbnN0IGlkID0gcmVmKCcxJylcbmNvbnN0IHVybCA9IGNvbXB1dGVkKCgpID0+IGJhc2VVcmwgKyBpZC52YWx1ZSlcblxuY29uc3QgeyBkYXRhLCBlcnJvciwgcmV0cnkgfSA9IHVzZUZldGNoKHVybClcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIExvYWQgcG9zdCBpZDpcbiAgPGJ1dHRvbiB2LWZvcj1cImkgaW4gNVwiIEBjbGljaz1cImlkID0gaVwiPnt7IGkgfX08L2J1dHRvbj5cblxuXHQ8ZGl2IHYtaWY9XCJlcnJvclwiPlxuICAgIDxwPk9vcHMhIEVycm9yIGVuY291bnRlcmVkOiB7eyBlcnJvci5tZXNzYWdlIH19PC9wPlxuICAgIDxidXR0b24gQGNsaWNrPVwicmV0cnlcIj5SZXRyeTwvYnV0dG9uPlxuICA8L2Rpdj5cbiAgPGRpdiB2LWVsc2UtaWY9XCJkYXRhXCI+RGF0YSBsb2FkZWQ6IDxwcmU+e3sgZGF0YSB9fTwvcHJlPjwvZGl2PlxuICA8ZGl2IHYtZWxzZT5Mb2FkaW5nLi4uPC9kaXY+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0iLCJ1c2VGZXRjaC5qcyI6ImltcG9ydCB7IHJlZiwgaXNSZWYsIHVucmVmLCB3YXRjaEVmZmVjdCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZldGNoKHVybCkge1xuICBjb25zdCBkYXRhID0gcmVmKG51bGwpXG4gIGNvbnN0IGVycm9yID0gcmVmKG51bGwpXG5cbiAgYXN5bmMgZnVuY3Rpb24gZG9GZXRjaCgpIHtcbiAgICAvLyByZXNldCBzdGF0ZSBiZWZvcmUgZmV0Y2hpbmcuLlxuICAgIGRhdGEudmFsdWUgPSBudWxsXG4gICAgZXJyb3IudmFsdWUgPSBudWxsXG4gICAgXG4gICAgLy8gcmVzb2x2ZSB0aGUgdXJsIHZhbHVlIHN5bmNocm9ub3VzbHkgc28gaXQncyB0cmFja2VkIGFzIGFcbiAgICAvLyBkZXBlbmRlbmN5IGJ5IHdhdGNoRWZmZWN0KClcbiAgICBjb25zdCB1cmxWYWx1ZSA9IHVucmVmKHVybClcbiAgICBcbiAgICB0cnkge1xuICAgICAgLy8gYXJ0aWZpY2lhbCBkZWxheSAvIHJhbmRvbSBlcnJvclxuICBcdCAgYXdhaXQgdGltZW91dCgpXG4gIFx0ICAvLyB1bnJlZigpIHdpbGwgcmV0dXJuIHRoZSByZWYgdmFsdWUgaWYgaXQncyBhIHJlZlxuXHQgICAgLy8gb3RoZXJ3aXNlIHRoZSB2YWx1ZSB3aWxsIGJlIHJldHVybmVkIGFzLWlzXG4gICAgXHRjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmxWYWx1ZSlcblx0ICAgIGRhdGEudmFsdWUgPSBhd2FpdCByZXMuanNvbigpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZXJyb3IudmFsdWUgPSBlXG4gICAgfVxuICB9XG5cbiAgaWYgKGlzUmVmKHVybCkpIHtcbiAgICAvLyBzZXR1cCByZWFjdGl2ZSByZS1mZXRjaCBpZiBpbnB1dCBVUkwgaXMgYSByZWZcbiAgICB3YXRjaEVmZmVjdChkb0ZldGNoKVxuICB9IGVsc2Uge1xuICAgIC8vIG90aGVyd2lzZSwganVzdCBmZXRjaCBvbmNlXG4gICAgZG9GZXRjaCgpXG4gIH1cblxuICByZXR1cm4geyBkYXRhLCBlcnJvciwgcmV0cnk6IGRvRmV0Y2ggfVxufVxuXG4vLyBhcnRpZmljaWFsIGRlbGF5XG5mdW5jdGlvbiB0aW1lb3V0KCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPiAwLjMpIHtcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKCdSYW5kb20gRXJyb3InKSlcbiAgICAgIH1cbiAgICB9LCAzMDApXG4gIH0pXG59In0=), with an artificial delay and randomized error for demo purposes.

## Conventions and Best Practices {#conventions-and-best-practices}

### Naming {#naming}

It is a convention to name composable functions with camelCase names that start with "use".

### Input Arguments {#input-arguments}

A composable can accept ref arguments even if it doesn't rely on them for reactivity. If you are writing a composable that may be used by other developers, it's a good idea to handle the case of input arguments being refs instead of raw values. The [`unref()`](/api/reactivity-utilities.html#unref) utility function will come in handy for this purpose:

```js
import { unref } from 'vue'

function useFeature(maybeRef) {
  // if maybeRef is indeed a ref, its .value will be returned
  // otherwise, maybeRef is returned as-is
  const value = unref(maybeRef)
}
```

If your composable creates reactive effects when the input is a ref, make sure to either explicitly watch the ref with `watch()`, or call `unref()` inside a `watchEffect()` so that it is properly tracked.

### Return Values {#return-values}

You have probably noticed that we have been exclusively using `ref()` instead of `reactive()` in composables. The recommended convention is for composables to always return a plain, non-reactive object containing multiple refs. This allows it to be destructured in components while retaining reactivity:

```js
// x and y are refs
const { x, y } = useMouse()
```

Returning a reactive object from a composable will cause such destructures to lose the reactivity connection to the state inside the composable, while the refs will retain that connection.

If you prefer to use returned state from composables as object properties, you can wrap the returned object with `reactive()` so that the refs are unwrapped. For example:

```js
const mouse = reactive(useMouse())
// mouse.x is linked to original ref
console.log(mouse.x)
```

```vue-html
Mouse position is at: {{ mouse.x }}, {{ mouse.y }}
```

### Side Effects {#side-effects}

It is OK to perform side effects (e.g. adding DOM event listeners or fetching data) in composables, but pay attention to the following rules:

- If you are working on an application that uses [Server-Side Rendering](/guide/scaling-up/ssr.html) (SSR), make sure to perform DOM-specific side effects in post-mount lifecycle hooks, e.g. `onMounted()`. These hooks are only called in the browser, so you can be sure that code inside them has access to the DOM.

- Remember to clean up side effects in `onUnmounted()`. For example, if a composable sets up a DOM event listener, it should remove that listener in `onUnmounted()` as we have seen in the `useMouse()` example. It can be a good idea to use a composable that automatically does this for you, like the `useEventListener()` example.

### Usage Restrictions {#usage-restrictions}

Composables should only be called **synchronously** in `<script setup>` or the `setup()` hook. In some cases, you can also call them in lifecycle hooks like `onMounted()`.

These are the contexts where Vue is able to determine the current active component instance. Access to an active component instance is necessary so that:

1. Lifecycle hooks can be registered to it.

2. Computed properties and watchers can be linked to it, so that they can be disposed when the instance is unmounted to prevent memory leaks.

:::tip
`<script setup>` is the only place where you can call composables **after** using `await`. The compiler automatically restores the active instance context for you after the async operation.
:::

## Extracting Composables for Code Organization {#extracting-composables-for-code-organization}

Composables can be extracted not only for reuse, but also for code organization. As the complexity of your components grow, you may end up with components that are too large to navigate and reason about. Composition API gives you the full flexibility to organize your component code into smaller functions based on logical concerns:

```vue
<script setup>
import { useFeatureA } from './featureA.js'
import { useFeatureB } from './featureB.js'
import { useFeatureC } from './featureC.js'

const { foo, bar } = useFeatureA()
const { baz } = useFeatureB(foo)
const { qux } = useFeatureC(baz)
</script>
```

To some extent, you can think of these extracted composables as component-scoped services that can talk to one another.

## Using Composables in Options API {#using-composables-in-options-api}

If you are using Options API, composables must be called inside `setup()`, and the returned bindings must be returned from `setup()` so that they are exposed to `this` and the template:

```js
import { useMouse } from './mouse.js'
import { useFetch } from './fetch.js'

export default {
  setup() {
    const { x, y } = useMouse()
    const { data, error } = useFetch('...')
    return { x, y, data, error }
  },
  mounted() {
    // setup() exposed properties can be accessed on `this`
    console.log(this.x)
  }
  // ...other options
}
```

## Comparisons with Other Techniques {#comparisons-with-other-techniques}

### vs. Mixins {#vs-mixins}

Users coming from Vue 2 may be familiar with the [mixins](/api/options-composition.html#mixins) option, which also allows us to extract component logic into reusable units. There are three primary drawbacks to mixins:

1. **Unclear source of properties**: when using many mixins, it becomes unclear which instance property is injected by which mixin, making it difficult to trace the implementation and understand the component's behavior. This is also why we recommend using the refs + destructure pattern for composables: it makes the property source clear in consuming components.

2. **Namespace collisions**: multiple mixins from different authors can potentially register the same property keys, causing namespace collisions. With composables, you can rename the destructured variables if there are conflicting keys from different composables.

3. **Implicit cross-mixin communication**: multiple mixins that need to interact with one another have to rely on shared property keys, making them implicitly coupled. With composables, values returned from one composable can be passed into another as arguments, just like normal functions.

For the above reasons, we no longer recommend using mixins in Vue 3. The feature is kept only for migration and familiarity reasons.

### vs. Renderless Components {#vs-renderless-components}

In the component slots chapter, we discussed the [Renderless Component](/guide/components/slots.html#renderless-components) pattern based on scoped slots. We even implemented the same mouse tracking demo using renderless components.

The main advantage of composables over renderless components is that composables do not incur the extra component instance overhead. When used across an entire application, the amount of extra component instances created by the renderless component pattern can become a noticeable performance overhead.

The recommendation is to use composables when reusing pure logic, and use components when reusing both logic and visual layout.

### vs. React Hooks {#vs-react-hooks}

If you have experience with React, you may notice that this looks very similar to custom React hooks. Composition API was in part inspired by React hooks, and Vue composables are indeed similar to React hooks in terms of logic composition capabilities. However, Vue composables are based on Vue's fine-grained reactivity system, which is fundamentally different from React hooks' execution model. This is discussed in more detail in the [Composition API FAQ](/guide/extras/composition-api-faq#comparison-with-react-hooks).

## Further Reading {#further-reading}

- [Reactivity In Depth](/guide/extras/reactivity-in-depth.html): for a low-level understanding of how Vue's reactivity system works.
- [State Management](/guide/scaling-up/state-management.html): for patterns of managing state shared by multiple components.
- [Testing Composables](/guide/scaling-up/testing.html#testing-composables): tips on unit testing composables.
- [VueUse](https://vueuse.org/): an ever-growing collection of Vue composables. The source code is also a great learning resource.
