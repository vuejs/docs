---
title: Data Option
badges:
  - breaking
---

# {{ $frontmatter.title }} <MigrationBadges :badges="$frontmatter.badges" />

## Overview

- **BREAKING**: `data` component option declaration no longer accepts a plain JavaScript `object` and expects a `function` declaration.

- **BREAKING**: when merging multiple `data` return values from mixins or extends, the merge is now shallow instead of deep (only root-level properties are merged).

## 2.x Syntax

In 2.x, developers could define the `data` option with either an `object` or a `function`.

For example:

```html
<!-- Object Declaration -->
<script>
  const app = new Vue({
    data: {
      apiKey: 'a1b2c3'
    }
  })
</script>

<!-- Function Declaration -->
<script>
  const app = new Vue({
    data() {
      return {
        apiKey: 'a1b2c3'
      }
    }
  })
</script>
```

Though this provided some convenience in terms of root instances having a shared state, this has led to confusion due to the fact that its only possible on the root instance.

## 3.x Update

In 3.x, the `data` option has been standardized to only accept a `function` that returns an `object`.

Using the example above, there would only be one possible implementation of the code:

```html
<script>
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        apiKey: 'a1b2c3'
      }
    }
  }).mount('#app')
</script>
```

## Mixin Merge Behavior Change

In addition, when `data()` from a component and its mixins or extends base are merged, the merge is now performed *shallowly*:

```js
const Mixin = {
  data() {
    return {
      user: {
        name: 'Jack',
        id: 1
      }
    }
  }
}

const CompA = {
  mixins: [Mixin],
  data() {
    return {
      user: {
        id: 2
      }
    }
  }
}
```

In Vue 2.x, the resulting `$data` is:

```json
{
  "user": {
    "id": 2,
    "name": "Jack"
  }
}
```

In 3.0, the result will be:

```json
{
  "user": {
    "id": 2
  }
}
```

## Migration Strategy

For users relying on the object declaration, we recommend:

- Extracting the shared data into an external object and using it as a property in `data`
- Rewrite references to the shared data to point to a new shared object

For users relying on the deep merge behavior from mixins, we recommend refactoring your code to avoid such reliance altogether, since deep merges from mixins are very implicit and can make the code logic more difficult to understand and debug.
