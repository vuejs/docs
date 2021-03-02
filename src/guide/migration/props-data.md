---
badges:
  - removed
---

# `propsData` <MigrationBadges :badges="$frontmatter.badges" />

## Overview

The `propsData` option, used to pass props to the Vue instance during its creation, is removed. To pass props to the root component of a Vue 3 application, use the second argument of [createApp](/api/global-api.html#createapp).

## 2.x Syntax

In 2.x, we were able to pass props to a Vue instance during its creation:

```js
const Comp = Vue.extend({
  props: ['username'],
  template: '<div>{{ username }}</div>'
})

new Comp({
  propsData: {
    username: 'Evan'
  }
})
```

## 3.x Update

The `propsData` option has been removed. If you need to pass props to the root component instance during its creation, you should use the second argument of `createApp`:

```js
const app = createApp(
  {
    props: ['username'],
    template: '<div>{{ username }}</div>'
  },
  { username: 'Evan' }
)
```
