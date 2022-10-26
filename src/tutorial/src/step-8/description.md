# Computed Property {#computed-property}

Let's keep building on top of the todo list from the last step. Here, we've already added a toggle functionality to each todo. This is done by adding a `done` property to each todo object, and using `v-model` to bind it to a checkbox:

```vue-html{2}
<li v-for="todo in todos">
  <input type="checkbox" v-model="todo.done">
  ...
</li>
```

The next improvement we can add is to be able to hide already completed todos. We already have a button that toggles the `hideCompleted` state. But how do we render different list items based on that state?

<div class="options-api">

Introducing <a target="_blank" href="/guide/essentials/computed.html">computed property</a>. We can declare a property that is reactively computed from other properties using the `computed` option:

<div class="sfc">

```js
export default {
  // ...
  computed: {
    filteredTodos() {
      // return filtered todos based on `this.hideCompleted`
    }
  }
}
```

</div>
<div class="html">

```js
createApp({
  // ...
  computed: {
    filteredTodos() {
      // return filtered todos based on `this.hideCompleted`
    }
  }
})
```

</div>

</div>
<div class="composition-api">

Introducing <a target="_blank" href="/guide/essentials/computed.html">`computed()`</a>. We can create a computed ref that computes its `.value` based on other reactive data sources:

<div class="sfc">

```js{8-11}
import { ref, computed } from 'vue'

const hideCompleted = ref(false)
const todos = ref([
  /* ... */
])

const filteredTodos = computed(() => {
  // return filtered todos based on
  // `todos.value` & `hideCompleted.value`
})
```

</div>
<div class="html">

```js{10-13}
import { createApp, ref, computed } from 'vue'

createApp({
  setup() {
    const hideCompleted = ref(false)
    const todos = ref([
      /* ... */
    ])

    const filteredTodos = computed(() => {
      // return filtered todos based on
      // `todos.value` & `hideCompleted.value`
    })

    return {
      // ...
    }
  }
})
```

</div>

</div>

```diff
- <li v-for="todo in todos">
+ <li v-for="todo in filteredTodos">
```

A computed property tracks other reactive state used in its computation as dependencies. It caches the result and automatically updates it when its dependencies change.

Now, try to add the `filteredTodos` computed property and implement its computation logic! If implemented correctly, checking off a todo when hiding completed items should instantly hide it as well.
