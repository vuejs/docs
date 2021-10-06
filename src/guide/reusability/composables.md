# Reusing Logic with Composables

### Retaining Reactivity

When we want to use a few properties of the large reactive object, it could be tempting to use destructuring to get properties we want. However, the destructured property would lose the reactivity connection to the original object:

```js
const state = reactive({
  count: 0
  // ... with many other properties
})

// `count` won't be reactive once destructured
// as it's just a number now
const { count } = state
```

You can create a ref from a property of a reactive object with [`toRef()`](/api/reactivity-utilities.html#toref):

```js
import { toRef } from 'vue'

const count = toRef(state, 'count')

state.count++
console.log(count.value) // 1
```
