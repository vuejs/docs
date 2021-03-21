---
badges:
  - breaking
---

# Events API <MigrationBadges :badges="$frontmatter.badges" />

## Overview

`$on`, `$off` and `$once` instance methods are removed. Application instances no longer implement the event emitter interface.

## 2.x Syntax

In 2.x, Vue instance could be used to trigger handlers attached imperatively via the event emitter API (`$on`, `$off` and `$once`). This was used to create _event hubs_ to create global event listeners used across the whole application:

```js
// eventHub.js

const eventHub = new Vue()

export default eventHub
```

```js
// ChildComponent.vue
import eventHub from './eventHub'

export default {
  mounted() {
    // adding eventHub listener
    eventHub.$on('custom-event', () => {
      console.log('Custom event triggered!')
    })
  },
  beforeDestroy() {
    // removing eventHub listener
    eventHub.$off('custom-event')
  }
}
```

```js
// ParentComponent.vue
import eventHub from './eventHub'

export default {
  methods: {
    callGlobalCustomEvent() {
      eventHub.$emit('custom-event') // if ChildComponent is mounted, we will have a message in the console
    }
  }
}
```

## 3.x Update

We removed `$on`, `$off` and `$once` methods from the instance completely. `$emit` is still a part of the existing API as it's used to trigger event handlers declaratively attached by a parent component

## Migration Strategy

Existing event hubs can be replaced by using an external library implementing the event emitter interface, for example [mitt](https://github.com/developit/mitt) or [tiny-emitter](https://github.com/scottcorgan/tiny-emitter).

These methods can also be supported in compatibility builds.
