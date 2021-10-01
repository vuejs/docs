# Setup

> This section uses [single-file component](single-file-component.html) syntax for code examples

> This guide assumes that you have already read the [Composition API Introduction](composition-api-introduction.html) and [Reactivity Fundamentals](reactivity-fundamentals.html). Read that first if you are new to Composition API.

## Arguments

When using the `setup` function, it will take two arguments:

1. `props`
2. `context`

Let's dive deeper into how each argument can be used.

### Props

The first argument in the `setup` function is the `props` argument. Just as you would expect in a standard component, `props` inside of a `setup` function are reactive and will be updated when new props are passed in.

```js
// MyBook.vue

export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

:::warning
However, because `props` are reactive, you **cannot use ES6 destructuring** because it will remove props reactivity.
:::

If you need to destructure your props, you can do this by utilizing the [toRefs](reactivity-fundamentals.html#destructuring-reactive-state) inside of the `setup` function:

```js
// MyBook.vue

import { toRefs } from 'vue'

setup(props) {
  const { title } = toRefs(props)

  console.log(title.value)
}
```

If `title` is an optional prop, it could be missing from `props`. In that case, `toRefs` won't create a ref for `title`. Instead you'd need to use `toRef`:

```js
// MyBook.vue

import { toRef } from 'vue'

setup(props) {
  const title = toRef(props, 'title')

  console.log(title.value)
}
```

### Context

The second argument passed to the `setup` function is the `context`. The `context` is a normal JavaScript object that exposes other values that may be useful inside `setup`:

```js
// MyBook.vue

export default {
  setup(props, context) {
    // Attributes (Non-reactive object, equivalent to $attrs)
    console.log(context.attrs)

    // Slots (Non-reactive object, equivalent to $slots)
    console.log(context.slots)

    // Emit events (Function, equivalent to $emit)
    console.log(context.emit)

    // Expose public properties (Function)
    console.log(context.expose)
  }
}
```

The `context` object is a normal JavaScript object, i.e., it is not reactive, this means you can safely use ES6 destructuring on `context`.

```js
// MyBook.vue
export default {
  setup(props, { attrs, slots, emit, expose }) {
    ...
  }
}
```

`attrs` and `slots` are stateful objects that are always updated when the component itself is updated. This means you should avoid destructuring them and always reference properties as `attrs.x` or `slots.x`. Also note that, unlike `props`, the properties of `attrs` and `slots` are **not** reactive. If you intend to apply side effects based on changes to `attrs` or `slots`, you should do so inside an `onBeforeUpdate` lifecycle hook.

We'll explain the role of `expose` shortly.

## Accessing Component Properties

When `setup` is executed, the component instance has not been created yet. As a result, you will only be able to access the following properties:

- `props`
- `attrs`
- `slots`
- `emit`

In other words, you **will not have access** to the following component options:

- `data`
- `computed`
- `methods`
- `refs` (template refs)

## Usage with Templates

If `setup` returns an object, the properties on the object can be accessed in the component's template, as well as the properties of the `props` passed into `setup`:

```vue-html
<!-- MyBook.vue -->
<template>
  <div>{{ collectionName }}: {{ readersNumber }} {{ book.title }}</div>
</template>

<script>
  import { ref, reactive } from 'vue'

  export default {
    props: {
      collectionName: String
    },
    setup(props) {
      const readersNumber = ref(0)
      const book = reactive({ title: 'Vue 3 Guide' })

      // expose to template
      return {
        readersNumber,
        book
      }
    }
  }
</script>
```

Note that [refs](../api/refs-api.html#ref) returned from `setup` are [automatically shallow unwrapped](/guide/reactivity-fundamentals.html#ref-unwrapping) when accessed in the template so you shouldn't use `.value` in templates.

## Usage with Render Functions

`setup` can also return a render function which can directly make use of the reactive state declared in the same scope:

```js
// MyBook.vue

import { h, ref, reactive } from 'vue'

export default {
  setup() {
    const readersNumber = ref(0)
    const book = reactive({ title: 'Vue 3 Guide' })
    // Please note that we need to explicitly use ref value here
    return () => h('div', [readersNumber.value, book.title])
  }
}
```

Returning a render function prevents us from returning anything else. Internally that shouldn't be a problem, but it can be problematic if we want to expose methods of this component to the parent component via template refs.

We can solve this problem by calling `expose`, passing it an object that defines the properties that should be available on the external component instance:

```js
import { h, ref } from 'vue'

export default {
  setup(props, { expose }) {
    const count = ref(0)
    const increment = () => ++count.value

    expose({
      increment
    })

    return () => h('div', count.value)
  }
}
```

The `increment` method would then be available in the parent component via a template ref.

## Usage of `this`

**Inside `setup()`, `this` won't be a reference to the current active instance** Since `setup()` is called before other component options are resolved, `this` inside `setup()` will behave quite differently from `this` in other options. This might cause confusions when using `setup()` along other Options API.
