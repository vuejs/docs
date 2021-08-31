# State Management

## Official Flux-Like Implementation

Large applications can often grow in complexity, due to multiple pieces of state scattered across many components and the interactions between them. To solve this problem, Vue offers [Vuex](https://next.vuex.vuejs.org/), our own Elm-inspired state management library. It even integrates into [vue-devtools](https://github.com/vuejs/vue-devtools), providing zero-setup access to [time travel debugging](https://raw.githubusercontent.com/vuejs/vue-devtools/legacy/media/demo.gif).

### Information for React Developers

If you're coming from React, you may be wondering how vuex compares to [redux](https://github.com/reactjs/redux), the most popular Flux implementation in that ecosystem. Redux is actually view-layer agnostic, so it can easily be used with Vue via [simple bindings](https://classic.yarnpkg.com/en/packages?q=redux%20vue&p=1). Vuex is different in that it _knows_ it's in a Vue app. This allows it to better integrate with Vue, offering a more intuitive API and improved development experience.

## Simple State Management from Scratch

It is often overlooked that the source of truth in Vue applications is the reactive `data` object - a component instance only proxies access to it. Therefore, if you have a piece of state that should be shared by multiple instances, you can use the [reactive](/api/reactivity-core.html#reactive) method to make an object reactive:

```js
const { createApp, reactive } = Vue

const sourceOfTruth = reactive({
  message: 'Hello'
})

const appA = createApp({
  data() {
    return sourceOfTruth
  }
}).mount('#app-a')

const appB = createApp({
  data() {
    return sourceOfTruth
  }
}).mount('#app-b')
```

```vue-html
<div id="app-a">App A: {{ message }}</div>

<div id="app-b">App B: {{ message }}</div>
```

Now whenever `sourceOfTruth` is mutated, both `appA` and `appB` will update their views automatically. We have a single source of truth now, but debugging would be a nightmare. Any piece of data could be changed by any part of our app at any time, without leaving a trace.

```js
const appB = createApp({
  data() {
    return sourceOfTruth
  },
  mounted() {
    sourceOfTruth.message = 'Goodbye' // both apps will render 'Goodbye' message now
  }
}).mount('#app-b')
```

To help solve this problem, we can adopt a **store pattern**:

```js
const store = {
  debug: true,

  state: reactive({
    message: 'Hello!'
  }),

  setMessageAction(newValue) {
    if (this.debug) {
      console.log('setMessageAction triggered with', newValue)
    }

    this.state.message = newValue
  },

  clearMessageAction() {
    if (this.debug) {
      console.log('clearMessageAction triggered')
    }

    this.state.message = ''
  }
}
```

Notice all actions that mutate the store's state are put inside the store itself. This type of centralized state management makes it easier to understand what type of mutations could happen and how they are triggered. Now when something goes wrong, we'll also have a log of what happened leading up to the bug.

In addition, each instance/component can still own and manage its own private state:

```vue-html
<div id="app-a">{{sharedState.message}}</div>

<div id="app-b">{{sharedState.message}}</div>
```

```js
const appA = createApp({
  data() {
    return {
      privateState: {},
      sharedState: store.state
    }
  },
  mounted() {
    store.setMessageAction('Goodbye!')
  }
}).mount('#app-a')

const appB = createApp({
  data() {
    return {
      privateState: {},
      sharedState: store.state
    }
  }
}).mount('#app-b')
```

![State Management](/images/state.png)

::: tip
You should never replace the original state object in your actions - the components and the store need to share reference to the same object in order for mutations to be observed.
:::

As we continue developing the convention, where components are never allowed to directly mutate state that belongs to a store but should instead dispatch events that notify the store to perform actions, we eventually arrive at the [Flux](https://facebook.github.io/flux/) architecture. The benefit of this convention is we can record all state mutations happening to the store and implement advanced debugging helpers such as mutation logs, snapshots, and history re-rolls / time travel.

This brings us full circle back to [Vuex](https://next.vuex.vuejs.org/), so if you've read this far it's probably time to try it out!
