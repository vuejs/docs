# Priority D Rules: Use with Caution

Some features of Vue exist to accommodate rare edge cases or smoother migrations from a legacy code base. When overused however, they can make your code more difficult to maintain or even become a source of bugs. These rules shine a light on potentially risky features, describing when and why they should be avoided.

## Element selectors with `scoped`

**Element selectors should be avoided with `scoped`.**

Prefer class selectors over element selectors in `scoped` styles, because large numbers of element selectors are slow.

::: details Detailed Explanation
To scope styles, Vue adds a unique attribute to component elements, such as `data-v-f3f3eg9`. Then selectors are modified so that only matching elements with this attribute are selected (e.g. `button[data-v-f3f3eg9]`).

The problem is that large numbers of [element-attribute selectors](http://stevesouders.com/efws/css-selectors/csscreate.php?n=1000&sel=a%5Bhref%5D&body=background%3A+%23CFD&ne=1000) (e.g. `button[data-v-f3f3eg9]`) will be considerably slower than [class-attribute selectors](http://stevesouders.com/efws/css-selectors/csscreate.php?n=1000&sel=.class%5Bhref%5D&body=background%3A+%23CFD&ne=1000) (e.g. `.btn-close[data-v-f3f3eg9]`), so class selectors should be preferred whenever possible.
:::

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
<template>
  <button>×</button>
</template>

<style scoped>
button {
  background-color: red;
}
</style>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<template>
  <button class="btn btn-close">×</button>
</template>

<style scoped>
.btn-close {
  background-color: red;
}
</style>
```

</div>

## Implicit parent-child communication

**Props and events should be preferred for parent-child component communication, instead of `this.$parent` or mutating props.**

An ideal Vue application is props down, events up. Sticking to this convention makes your components much easier to understand. However, there are edge cases where prop mutation or `this.$parent` can simplify two components that are already deeply coupled.

The problem is, there are also many _simple_ cases where these patterns may offer convenience. Beware: do not be seduced into trading simplicity (being able to understand the flow of your state) for short-term convenience (writing less code).

<div class="style-example style-example-bad">
<h3>Bad</h3>

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  template: '<input v-model="todo.text">'
})
```

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  methods: {
    removeTodo() {
      this.$parent.todos = this.$parent.todos.filter(
        (todo) => todo.id !== vm.todo.id
      )
    }
  },

  template: `
    <span>
      {{ todo.text }}
      <button @click="removeTodo">
        ×
      </button>
    </span>
  `
})
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  emits: ['input'],

  template: `
    <input
      :value="todo.text"
      @input="$emit('input', $event.target.value)"
    >
  `
})
```

```js
app.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  emits: ['delete'],

  template: `
    <span>
      {{ todo.text }}
      <button @click="$emit('delete')">
        ×
      </button>
    </span>
  `
})
```

</div>

## Non-flux state management

**[Vuex](https://next.vuex.vuejs.org/) should be preferred for global state management, instead of `this.$root` or a global event bus.**

Managing state on `this.$root` and/or using a global event bus can be convenient for very simple cases, but it is not appropriate for most applications.

[Vuex](/guide/scaling-up/state-management.html#vuex) is the official flux-like implementation for Vue, and offers not only a central place to manage state, but also tools for organizing, tracking, and debugging state changes. It integrates well in the Vue ecosystem (including full [Vue DevTools](/guide/scaling-up/tooling.html#browser-devtools) support).

<div class="style-example style-example-bad">
<h3>Bad</h3>

```js
// main.js
import { createApp } from 'vue'
import mitt from 'mitt'
const app = createApp({
  data() {
    return {
      todos: [],
      emitter: mitt()
    }
  },

  created() {
    this.emitter.on('remove-todo', this.removeTodo)
  },

  methods: {
    removeTodo(todo) {
      const todoIdToRemove = todo.id
      this.todos = this.todos.filter((todo) => todo.id !== todoIdToRemove)
    }
  }
})
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```js
// store/modules/todos.js
export default {
  state: {
    list: []
  },

  mutations: {
    REMOVE_TODO(state, todoId) {
      state.list = state.list.filter((todo) => todo.id !== todoId)
    }
  },

  actions: {
    removeTodo({ commit, state }, todo) {
      commit('REMOVE_TODO', todo.id)
    }
  }
}
```

```vue-html
<!-- TodoItem.vue -->
<template>
  <span>
    {{ todo.text }}
    <button @click="removeTodo(todo)">
      X
    </button>
  </span>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  methods: mapActions(['removeTodo'])
}
</script>
```

</div>
