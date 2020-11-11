---
badges:
  - removed
---

# $children <MigrationBadges :badges="$frontmatter.badges" />

## Overview

The `$children` instance property has been removed from Vue 3.0 and is no longer supported.

## 2.x Syntax

In 2.x, developers could access direct child components of the current instance with `this.$children`:

```vue
<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <my-button>Change logo</my-button>
  </div>
</template>

<script>
import MyButton from './MyButton'

export default {
  components: {
    MyButton
  },
  mounted() {
    console.log(this.$children) // [VueComponent]
  }
}
</script>
```

## 3.x Update

In 3.x, the `$children` property is removed and no longer supported. Instead, if you need to access a child component instance, we recommend using [$refs](/guide/component-template-refs.html#template-refs).
