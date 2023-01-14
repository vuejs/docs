---
outline: deep
---

<script setup>
import SpreadSheet from './demos/SpreadSheet.vue'
</script>

# Reactivity in Depth {#reactivity-in-depth}

One of Vue’s most distinctive features is the unobtrusive reactivity system. Component state consists of reactive JavaScript objects. When you modify them, the view updates. It makes state management simple and intuitive, but it’s also important to understand how it works to avoid some common gotchas. In this section, we are going to dig into some of the lower-level details of Vue’s reactivity system.

## What is Reactivity? {#what-is-reactivity}

This term comes up in programming quite a bit these days, but what do people mean when they say it? Reactivity is a programming paradigm that allows us to adjust to changes in a declarative manner. The canonical example that people usually show, because it’s a great one, is an Excel spreadsheet:

<SpreadSheet />

Here cell A2 is defined via a formula of `= A0 + A1` (you can click on A2 to view or edit the formula), so the spreadsheet gives us 3. No surprises there. But if you update A0 or A1, you'll notice that A2 automagically updates too.

JavaScript doesn’t usually work like this. If we were to write something comparable in JavaScript:

```js
let A0 = 1
let A1 = 2
let A2 = A0 + A1

console.log(A2) // 3

A0 = 2
console.log(A2) // Still 3
```

When we mutate `A0`, `A2` does not change automatically.

So how would we do this in JavaScript? First, in order to re-run the code that updates `A2`, let's wrap it in a function:

```js
let A2

function update() {
  A2 = A0 + A1
}
```

Then, we need to define a few terms:

- The `update()` function produces a **side effect**, or **effect** for short, because it modifies the state of the program.

- `A0` and `A1` are considered **dependencies** of the effect, as their values are used to perform the effect. The effect is said to be a **subscriber** to its dependencies.

What we need is a magic function that can invoke `update()` (the **effect**) whenever `A0` or `A1` (the **dependencies**) change:

```js
whenDepsChange(update)
```

This `whenDepsChange()` function has the following tasks:

1. Track when a variable is read. E.g. when evaluating the expression `A0 + A1`, both `A0` and `A1` are read.

2. If a variable is read when there is a currently running effect, make that effect a subscriber to that variable. E.g. because `A0` and `A1` are read when `update()` is being executed, `update()` becomes a subscriber to both `A0` and `A1` after the first call.

3. Detect when a variable is mutated. E.g. when `A0` is assigned a new value, notify all its subscriber effects to re-run.

## How Reactivity Works in Vue {#how-reactivity-works-in-vue}

We can't really track the reading and writing of local variables like in the example. There's just no mechanism for doing that in vanilla JavaScript. What we **can** do though, is intercept the reading and writing of **object properties**.

There are two ways of intercepting property access in JavaScript: [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) / [setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) and [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Vue 2 used getter / setters exclusively due to browser support limitations. In Vue 3, Proxies are used for reactive objects and getter / setters are used for refs. Here's some pseudo-code that illustrates how they work:

```js{4,9,17,22}
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
    }
  })
}

function ref(value) {
  const refObject = {
    get value() {
      track(refObject, 'value')
      return value
    },
    set value(newValue) {
      value = newValue
      trigger(refObject, 'value')
    }
  }
  return refObject
}
```

:::tip
Code snippets here and below are meant to explain the core concepts in the simplest form possible, so many details are omitted, and edge cases ignored.
:::

This explains a few [limitations of reactive objects](/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive) that we have discussed in the fundamentals section:

- When you assign or destructure a reactive object's property to a local variable, the reactivity is "disconnected" because access to the local variable no longer triggers the get / set proxy traps.

- The returned proxy from `reactive()`, although behaving just like the original, has a different identity if we compare it to the original using the `===` operator.

Inside `track()`, we check whether there is a currently running effect. If there is one, we lookup the subscriber effects (stored in a Set) for the property being tracked, and add the effect to the Set:

```js
// This will be set right before an effect is about
// to be run. We'll deal with this later.
let activeEffect

function track(target, key) {
  if (activeEffect) {
    const effects = getSubscribersForProperty(target, key)
    effects.add(activeEffect)
  }
}
```

Effect subscriptions are stored in a global `WeakMap<target, Map<key, Set<effect>>>` data structure. If no subscribing effects Set was found for a property (tracked for the first time), it will be created. This is what the `getSubscribersForProperty()` function does, in short. For simplicity, we will skip its details.

Inside `trigger()`, we again lookup the subscriber effects for the property. But this time we invoke them instead:

```js
function trigger(target, key) {
  const effects = getSubscribersForProperty(target, key)
  effects.forEach((effect) => effect())
}
```

Now let's circle back to the `whenDepsChange()` function:

```js
function whenDepsChange(update) {
  const effect = () => {
    activeEffect = effect
    update()
    activeEffect = null
  }
  effect()
}
```

It wraps the raw `update` function in an effect that sets itself as the current active effect before running the actual update. This enables `track()` calls during the update to locate the current active effect.

At this point, we have created an effect that automatically tracks its dependencies, and re-runs whenever a dependency changes. We call this a **Reactive Effect**.

Vue provides an API that allows you to create reactive effects: [`watchEffect()`](/api/reactivity-core.html#watcheffect). In fact, you may have noticed that it works pretty similarly to the magical `whenDepsChange()` in the example. We can now rework the original example using actual Vue APIs:

```js
import { ref, watchEffect } from 'vue'

const A0 = ref(0)
const A1 = ref(1)
const A2 = ref()

watchEffect(() => {
  // tracks A0 and A1
  A2.value = A0.value + A1.value
})

// triggers the effect
A0.value = 2
```

Using a reactive effect to mutate a ref isn't the most interesting use case - in fact, using a computed property makes it more declarative:

```js
import { ref, computed } from 'vue'

const A0 = ref(0)
const A1 = ref(1)
const A2 = computed(() => A0.value + A1.value)

A0.value = 2
```

Internally, `computed` manages its invalidation and re-computation using a reactive effect.

So what's an example of a common and useful reactive effect? Well, updating the DOM! We can implement simple "reactive rendering" like this:

```js
import { ref, watchEffect } from 'vue'

const count = ref(0)

watchEffect(() => {
  document.body.innerHTML = `count is: ${count.value}`
})

// updates the DOM
count.value++
```

In fact, this is pretty close to how a Vue component keeps the state and the DOM in sync - each component instance creates a reactive effect to render and update the DOM. Of course, Vue components use much more efficient ways to update the DOM than `innerHTML`. This is discussed in [Rendering Mechanism](./rendering-mechanism).

<div class="options-api">

The `ref()`, `computed()` and `watchEffect()` APIs are all part of the Composition API. If you have only been using Options API with Vue so far, you'll notice that Composition API is closer to how Vue's reactivity system works under the hood. In fact, in Vue 3 the Options API is implemented on top of the Composition API. All property access on the component instance (`this`) triggers getter / setters for reactivity tracking, and options like `watch` and `computed` invoke their Composition API equivalents internally.

</div>

## Runtime vs. Compile-time Reactivity {#runtime-vs-compile-time-reactivity}

Vue's reactivity system is primarily runtime-based: the tracking and triggering are all performed while the code is running directly in the browser. The pros of runtime reactivity are that it can work without a build step, and there are fewer edge cases. On the other hand, this makes it constrained by the syntax limitations of JavaScript.

We have already encountered a limitation in the previous example: JavaScript does not provide a way for us to intercept the reading and writing of local variables, so we have to always access reactive state as object properties, using either reactive objects or refs.

We have been experimenting with the [Reactivity Transform](/guide/extras/reactivity-transform.html) feature to reduce the code verbosity:

```js
let A0 = $ref(0)
let A1 = $ref(1)

// track on variable read
const A2 = $computed(() => A0 + A1)

// trigger on variable write
A0 = 2
```

This snippet compiles into exactly what we'd have written without the transform, by automatically appending `.value` after references to the variables. With Reactivity Transform, Vue's reactivity system becomes a hybrid one.

## Reactivity Debugging {#reactivity-debugging}

It's great that Vue's reactivity system automatically tracks dependencies, but in some cases we may want to figure out exactly what is being tracked, or what is causing a component to re-render.

### Component Debugging Hooks {#component-debugging-hooks}

We can debug what dependencies are used during a component's render and which dependency is triggering an update using the <span class="options-api">`renderTracked`</span><span class="composition-api">`onRenderTracked`</span> and <span class="options-api">`renderTriggered`</span><span class="composition-api">`onRenderTriggered`</span> lifecycle hooks. Both hooks will receive a debugger event which contains information on the dependency in question. It is recommended to place a `debugger` statement in the callbacks to interactively inspect the dependency:

<div class="composition-api">

```vue
<script setup>
import { onRenderTracked, onRenderTriggered } from 'vue'

onRenderTracked((event) => {
  debugger
})

onRenderTriggered((event) => {
  debugger
})
</script>
```

</div>
<div class="options-api">

```js
export default {
  renderTracked(event) {
    debugger
  },
  renderTriggered(event) {
    debugger
  }
}
```

</div>

:::tip
Component debug hooks only work in development mode.
:::

The debug event objects have the following type:

<span id="debugger-event"></span>

```ts
type DebuggerEvent = {
  effect: ReactiveEffect
  target: object
  type:
    | TrackOpTypes /* 'get' | 'has' | 'iterate' */
    | TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
  key: any
  newValue?: any
  oldValue?: any
  oldTarget?: Map<any, any> | Set<any>
}
```

### Computed Debugging {#computed-debugging}

<!-- TODO options API equivalent -->

We can debug computed properties by passing `computed()` a second options object with `onTrack` and `onTrigger` callbacks:

- `onTrack` will be called when a reactive property or ref is tracked as a dependency.
- `onTrigger` will be called when the watcher callback is triggered by the mutation of a dependency.

Both callbacks will receive debugger events in the [same format](#debugger-event) as component debug hooks:

```js
const plusOne = computed(() => count.value + 1, {
  onTrack(e) {
    // triggered when count.value is tracked as a dependency
    debugger
  },
  onTrigger(e) {
    // triggered when count.value is mutated
    debugger
  }
})

// access plusOne, should trigger onTrack
console.log(plusOne.value)

// mutate count.value, should trigger onTrigger
count.value++
```

:::tip
`onTrack` and `onTrigger` computed options only work in development mode.
:::

### Watcher Debugging {#watcher-debugging}

<!-- TODO options API equivalent -->

Similar to `computed()`, watchers also support the `onTrack` and `onTrigger` options:

```js
watch(source, callback, {
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  }
})

watchEffect(callback, {
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  }
})
```

:::tip
`onTrack` and `onTrigger` watcher options only work in development mode.
:::

## Integration with External State Systems {#integration-with-external-state-systems}

Vue's reactivity system works by deeply converting plain JavaScript objects into reactive proxies. The deep conversion can be unnecessary or sometimes unwanted when integrating with external state management systems (e.g. if an external solution also uses Proxies).

The general idea of integrating Vue's reactivity system with an external state management solution is to hold the external state in a [`shallowRef`](/api/reactivity-advanced.html#shallowref). A shallow ref is only reactive when its `.value` property is accessed - the inner value is left intact. When the external state changes, replace the ref value to trigger updates.

### Immutable Data {#immutable-data}

If you are implementing an undo / redo feature, you likely want to take a snapshot of the application's state on every user edit. However, Vue's mutable reactivity system isn't best suited for this if the state tree is large, because serializing the entire state object on every update can be expensive in terms of both CPU and memory costs.

[Immutable data structures](https://en.wikipedia.org/wiki/Persistent_data_structure) solve this by never mutating the state objects - instead, it creates new objects that share the same, unchanged parts with old ones. There are different ways of using immutable data in JavaScript, but we recommend using [Immer](https://immerjs.github.io/immer/) with Vue because it allows you to use immutable data while keeping the more ergonomic, mutable syntax.

We can integrate Immer with Vue via a simple composable:

```js
import produce from 'immer'
import { shallowRef } from 'vue'

export function useImmer(baseState) {
  const state = shallowRef(baseState)
  const update = (updater) => {
    state.value = produce(state.value, updater)
  }

  return [state, update]
}
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZUltbWVyIH0gZnJvbSAnLi9pbW1lci5qcydcbiAgXG5jb25zdCBbaXRlbXMsIHVwZGF0ZUl0ZW1zXSA9IHVzZUltbWVyKFtcbiAge1xuICAgICB0aXRsZTogXCJMZWFybiBWdWVcIixcbiAgICAgZG9uZTogdHJ1ZVxuICB9LFxuICB7XG4gICAgIHRpdGxlOiBcIlVzZSBWdWUgd2l0aCBJbW1lclwiLFxuICAgICBkb25lOiBmYWxzZVxuICB9XG5dKVxuXG5mdW5jdGlvbiB0b2dnbGVJdGVtKGluZGV4KSB7XG4gIHVwZGF0ZUl0ZW1zKGl0ZW1zID0+IHtcbiAgICBpdGVtc1tpbmRleF0uZG9uZSA9ICFpdGVtc1tpbmRleF0uZG9uZVxuICB9KVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHVsPlxuICAgIDxsaSB2LWZvcj1cIih7IHRpdGxlLCBkb25lIH0sIGluZGV4KSBpbiBpdGVtc1wiXG4gICAgICAgIDpjbGFzcz1cInsgZG9uZSB9XCJcbiAgICAgICAgQGNsaWNrPVwidG9nZ2xlSXRlbShpbmRleClcIj5cbiAgICAgICAge3sgdGl0bGUgfX1cbiAgICA8L2xpPlxuICA8L3VsPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLmRvbmUge1xuICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCIsXG4gICAgXCJpbW1lclwiOiBcImh0dHBzOi8vdW5wa2cuY29tL2ltbWVyQDkuMC43L2Rpc3QvaW1tZXIuZXNtLmpzP21vZHVsZVwiXG4gIH1cbn0iLCJpbW1lci5qcyI6ImltcG9ydCBwcm9kdWNlIGZyb20gJ2ltbWVyJ1xuaW1wb3J0IHsgc2hhbGxvd1JlZiB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUltbWVyKGJhc2VTdGF0ZSkge1xuICBjb25zdCBzdGF0ZSA9IHNoYWxsb3dSZWYoYmFzZVN0YXRlKVxuICBjb25zdCB1cGRhdGUgPSAodXBkYXRlcikgPT4ge1xuICAgIHN0YXRlLnZhbHVlID0gcHJvZHVjZShzdGF0ZS52YWx1ZSwgdXBkYXRlcilcbiAgfVxuXG4gIHJldHVybiBbc3RhdGUsIHVwZGF0ZV1cbn0ifQ==)

### State Machines {#state-machines}

[State Machine](https://en.wikipedia.org/wiki/Finite-state_machine) is a model for describing all the possible states an application can be in, and all the possible ways it can transition from one state to another. While it may be overkill for simple components, it can help make complex state flows more robust and manageable.

One of the most popular state machine implementations in JavaScript is [XState](https://xstate.js.org/). Here's a composable that integrates with it:

```js
import { createMachine, interpret } from 'xstate'
import { shallowRef } from 'vue'

export function useMachine(options) {
  const machine = createMachine(options)
  const state = shallowRef(machine.initialState)
  const service = interpret(machine)
    .onTransition((newState) => (state.value = newState))
    .start()
  const send = (event) => service.send(event)

  return [state, send]
}
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZU1hY2hpbmUgfSBmcm9tICcuL21hY2hpbmUuanMnXG4gIFxuY29uc3QgW3N0YXRlLCBzZW5kXSA9IHVzZU1hY2hpbmUoe1xuICBpZDogJ3RvZ2dsZScsXG4gIGluaXRpYWw6ICdpbmFjdGl2ZScsXG4gIHN0YXRlczoge1xuICAgIGluYWN0aXZlOiB7IG9uOiB7IFRPR0dMRTogJ2FjdGl2ZScgfSB9LFxuICAgIGFjdGl2ZTogeyBvbjogeyBUT0dHTEU6ICdpbmFjdGl2ZScgfSB9XG4gIH1cbn0pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cInNlbmQoJ1RPR0dMRScpXCI+XG4gICAge3sgc3RhdGUubWF0Y2hlcyhcImluYWN0aXZlXCIpID8gXCJPZmZcIiA6IFwiT25cIiB9fVxuICA8L2J1dHRvbj5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCIsXG4gICAgXCJ4c3RhdGVcIjogXCJodHRwczovL3VucGtnLmNvbS94c3RhdGVANC4yNy4wL2VzL2luZGV4LmpzP21vZHVsZVwiXG4gIH1cbn0iLCJtYWNoaW5lLmpzIjoiaW1wb3J0IHsgY3JlYXRlTWFjaGluZSwgaW50ZXJwcmV0IH0gZnJvbSAneHN0YXRlJ1xuaW1wb3J0IHsgc2hhbGxvd1JlZiB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZU1hY2hpbmUob3B0aW9ucykge1xuICBjb25zdCBtYWNoaW5lID0gY3JlYXRlTWFjaGluZShvcHRpb25zKVxuICBjb25zdCBzdGF0ZSA9IHNoYWxsb3dSZWYobWFjaGluZS5pbml0aWFsU3RhdGUpXG4gIGNvbnN0IHNlcnZpY2UgPSBpbnRlcnByZXQobWFjaGluZSlcbiAgICAub25UcmFuc2l0aW9uKChuZXdTdGF0ZSkgPT4gKHN0YXRlLnZhbHVlID0gbmV3U3RhdGUpKVxuICAgIC5zdGFydCgpXG4gIGNvbnN0IHNlbmQgPSAoZXZlbnQpID0+IHNlcnZpY2Uuc2VuZChldmVudClcblxuICByZXR1cm4gW3N0YXRlLCBzZW5kXVxufSJ9)

### RxJS {#rxjs}

[RxJS](https://rxjs.dev/) is a library for working with asynchronous event streams. The [VueUse](https://vueuse.org/) library provides the [`@vueuse/rxjs`](https://vueuse.org/rxjs/readme.html) add-on for connecting RxJS streams with Vue's reactivity system.
