# Composition API: setup() {#composition-api-setup}

## Basic Usage {#basic-usage}

The `setup()` hook serves as the entry point for Composition API usage in components in the following cases:

1. Using Composition API without a build step;
2. Integrating with Composition-API-based code in an Options API component.

:::info Note
If you are using Composition API with Single-File Components, [`<script setup>`](/api/sfc-script-setup) is strongly recommended for a more succinct and ergonomic syntax.
:::

We can declare reactive state using [Reactivity APIs](./reactivity-core) and expose them to the template by returning an object from `setup()`. The properties on the returned object will also be made available on the component instance (if other options are used):

```vue
<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    // expose to template and other options API hooks
    return {
      count
    }
  },

  mounted() {
    console.log(this.count) // 0
  }
}
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

[refs](/api/reactivity-core#ref) returned from `setup` are [automatically shallow unwrapped](/guide/essentials/reactivity-fundamentals#deep-reactivity) when accessed in the template so you do not need to use `.value` when accessing them. They are also unwrapped in the same way when accessed on `this`.

`setup()` itself does not have access to the component instance - `this` will have a value of `undefined` inside `setup()`. You can access Composition-API-exposed values from Options API, but not the other way around.

`setup()` should return an object _synchronously_. The only case when `async setup()` can be used is when the component is a descendant of a [Suspense](../guide/built-ins/suspense) component.

## Accessing Props {#accessing-props}

The first argument in the `setup` function is the `props` argument. Just as you would expect in a standard component, `props` inside of a `setup` function are reactive and will be updated when new props are passed in.

```js
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

Note that if you destructure the `props` object, the destructured variables will lose reactivity. It is therefore recommended to always access props in the form of `props.xxx`.

If you really need to destructure the props, or need to pass a prop into an external function while retaining reactivity, you can do so with the [toRefs()](./reactivity-utilities#torefs) and [toRef()](/api/reactivity-utilities#toref) utility APIs:

```js
import { toRefs, toRef } from 'vue'

export default {
  setup(props) {
    // turn `props` into an object of refs, then destructure
    const { title } = toRefs(props)
    // `title` is a ref that tracks `props.title`
    console.log(title.value)

    // OR, turn a single property on `props` into a ref
    const title = toRef(props, 'title')
  }
}
```

## Setup Context {#setup-context}

The second argument passed to the `setup` function is a **Setup Context** object. The context object exposes other values that may be useful inside `setup`:

```js
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

The context object is not reactive and can be safely destructured:

```js
export default {
  setup(props, { attrs, slots, emit, expose }) {
    ...
  }
}
```

`attrs` and `slots` are stateful objects that are always updated when the component itself is updated. This means you should avoid destructuring them and always reference properties as `attrs.x` or `slots.x`. Also note that, unlike `props`, the properties of `attrs` and `slots` are **not** reactive. If you intend to apply side effects based on changes to `attrs` or `slots`, you should do so inside an `onBeforeUpdate` lifecycle hook.

### Exposing Public Properties {#exposing-public-properties}

`expose` is a function that can be used to explicitly limit the properties exposed when the component instance is accessed by a parent component via [template refs](/guide/essentials/template-refs#ref-on-component):

```js{5,10}
export default {
  setup(props, { expose }) {
    // make the instance "closed" -
    // i.e. do not expose anything to the parent
    expose()

    const publicCount = ref(0)
    const privateCount = ref(0)
    // selectively expose local state
    expose({ count: publicCount })
  }
}
```

## Usage with Render Functions {#usage-with-render-functions}

`setup` can also return a [render function](/guide/extras/render-function) which can directly make use of the reactive state declared in the same scope:

```js{6}
import { h, ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return () => h('div', count.value)
  }
}
```

Returning a render function prevents us from returning anything else. Internally that shouldn't be a problem, but it can be problematic if we want to expose methods of this component to the parent component via template refs.

We can solve this problem by calling [`expose()`](#exposing-public-properties):

```js{8-10}
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
