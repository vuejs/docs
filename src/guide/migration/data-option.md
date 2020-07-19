---
types:
  - breaking
---

# Data Option <span v-for="type in $frontmatter.types" class="badge" :key="`type-${type}`">{{ type }}</span>

## Overview

- **BREAKING**: `data` component option declaration no longer accepts a plain JavaScript `object` and expects a `function` declaration.

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

## Migration Strategy

For users relying on the object declaration, we recommend:

- Extracting the shared data into an external object and using it as a property in `data`
- Rewrite references to the shared data to point to a new shared object
