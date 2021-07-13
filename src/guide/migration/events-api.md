---
badges:
  - breaking
---

# Events API <MigrationBadges :badges="$frontmatter.badges" />

## Overview

`$on`, `$off` and `$once` instance methods are removed. Component instances no longer implement the event emitter interface.

## 2.x Syntax

In 2.x, a Vue instance could be used to trigger handlers attached imperatively via the event emitter API (`$on`, `$off` and `$once`). This could be used to create an _event bus_ to create global event listeners used across the whole application:

```js
// eventBus.js

const eventBus = new Vue()

export default eventBus
```

```js
// ChildComponent.vue
import eventBus from './eventBus'

export default {
  mounted() {
    // adding eventBus listener
    eventBus.$on('custom-event', () => {
      console.log('Custom event triggered!')
    })
  },
  beforeDestroy() {
    // removing eventBus listener
    eventBus.$off('custom-event')
  }
}
```

```js
// ParentComponent.vue
import eventBus from './eventBus'

export default {
  methods: {
    callGlobalCustomEvent() {
      eventBus.$emit('custom-event') // if ChildComponent is mounted, we will have a message in the console
    }
  }
}
```

## 3.x Update

We removed `$on`, `$off` and `$once` methods from the instance completely. `$emit` is still a part of the existing API as it's used to trigger event handlers declaratively attached by a parent component.

## Migration Strategy

[Migration build flag: `INSTANCE_EVENT_EMITTER`](migration-build.html#compat-configuration)

In Vue 3, it is no longer possible to use these APIs to listen to a component's own emitted events from within a component. There is no migration path for that use case.

### Root Component Events

Static event listeners can be added to the root component by passing them as props to `createApp`:

```js
createApp(App, {
  // Listen for the 'expand' event
  onExpand() {
    console.log('expand')
  }
})
```

### Event Bus

The event bus pattern can be replaced by using an external library implementing the event emitter interface, for example [mitt](https://github.com/developit/mitt) or [tiny-emitter](https://github.com/scottcorgan/tiny-emitter).

Example:

```js
// eventBus.js
import emitter from 'tiny-emitter/instance'

export default {
  $on: (...args) => emitter.on(...args),
  $once: (...args) => emitter.once(...args),
  $off: (...args) => emitter.off(...args),
  $emit: (...args) => emitter.emit(...args)
}
```

This provides the same event emitter API as in Vue 2.

In most circumstances, using a global event bus for communicating between components is discouraged. While it is often the simplest solution in the short term, it almost invariably proves to be a maintenance headache in the long term. Depending on the circumstances, there are various alternatives to using an event bus:

* [Props](/guide/component-basics.html#passing-data-to-child-components-with-props) and [events](/guide/component-basics.html#listening-to-child-components-events) should be your first choice for parent-child communication. Siblings can communicate via their parent.
* [Provide and inject](/guide/component-provide-inject.html) allow a component to communicate with its slot contents. This is useful for tightly-coupled components that are always used together.
* `provide`/`inject` can also be used for long-distance communication between components. It can help to avoid 'prop drilling', where props need to be passed down through many levels of components that don't need those props themselves.
* Prop drilling can also be avoided by refactoring to use slots. If an interim component doesn't need the props then it might indicate a problem with separation of concerns. Introducing a slot in that component allows the parent to create the content directly, so that props can be passed without the interim component needing to get involved.
* [Global state management](/guide/state-management.html), such as [Vuex](https://next.vuex.vuejs.org/).
