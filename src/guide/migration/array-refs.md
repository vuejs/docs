---
title: v-for Array Refs
badges:
  - breaking
---

# {{ $frontmatter.title }} <MigrationBadges :badges="$frontmatter.badges" />

In Vue 2, using the `ref` attribute inside `v-for` will populate the corresponding `$refs` property with an array of refs. This behavior becomes ambiguous and inefficient when there are nested `v-for`s present.

In Vue 3, such usage will no longer automatically create an array in `$refs`. To retrieve multiple refs from a single binding, bind `ref` to a function which provides more flexibility (this is a new feature):

```html
<div v-for="item in list" :ref="setItemRef"></div>
```

With Options API:

```js
export default {
  data() {
    return {
      itemRefs: []
    }
  },
  methods: {
    setItemRef(el) {
      if (el) {
        this.itemRefs.push(el)
      }
    }
  },
  beforeUpdate() {
    this.itemRefs = []
  },
  updated() {
    console.log(this.itemRefs)
  }
}
```

With Composition API:

```js
import { onBeforeUpdate, onUpdated } from 'vue'

export default {
  setup() {
    let itemRefs = []
    const setItemRef = el => {
      if (el) {
        itemRefs.push(el)
      }
    }
    onBeforeUpdate(() => {
      itemRefs = []
    })
    onUpdated(() => {
      console.log(itemRefs)
    })
    return {
      setItemRef
    }
  }
}
```

Note that:

- `itemRefs` doesn't have to be an array: it can also be an object where the refs are set by their iteration keys.

- This also allows `itemRefs` to be made reactive and watched, if needed.

## Migration Strategy

[Migration build flags:](migration-build.html#compat-configuration)

- `V_FOR_REF`
- `COMPILER_V_FOR_REF`
