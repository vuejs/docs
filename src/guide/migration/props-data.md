---
badges:
  - breaking
---

# `propsData` passed on instance creation <MigrationBadges :badges="$frontmatter.badges" />

## Overview

`propsData` option to pass props to Vue instance during its creation is removed. To pass props to the root of Vue application, use a second argument of [createApp](/api/global-api.html#createapp)

## 2.x Syntax

In 2.x, we were able to pass props to Vue instance during its creation:

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

`propsData` option was removed. If you need to pass props to the application instance during its creation, you should use `createApp` second argument:

```js
const app = createApp(
  {
    props: ['username']
  },
  { username: 'Evan' }
)
```

```html
<div id="app">
  <!-- Will display 'Evan' -->
  {{ username }}
</div>
```
