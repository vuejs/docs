---
title: Props Default Function this Access
badges:
  - breaking
---

# Props Default Function `this` Access <MigrationBadges :badges="$frontmatter.badges" />

Props default value factory functions no longer have access to `this`.

Instead:

- Raw props received by the component are passed to the default function as argument;

- The [inject](../composition-api-provide-inject.md) API can be used inside default functions.

```js
import { inject } from 'vue'

export default {
  props: {
    theme: {
      default (props) {
        // `props` is the raw values passed to the component,
        // before any type / default coercions
        // can also use `inject` to access injected properties
        return inject('theme', 'default-theme')
      }
    }
  }
}
```
