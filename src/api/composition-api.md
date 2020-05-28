# Composition API

> This section uses [single-file component](TODO: SFC) syntax for code examples

## `setup`

The `setup` function is a new component option. It serves as the entry point for using the Composition API inside components.

### Invocation Timing

`setup` is called right after the initial props resolution when a component instance is created. [Lifecycle-wise](../guide/instance.html#instance-lifecycle-hooks), it is called before the `beforeCreate` hook.

### Arguments

The function receives the resolved [props](../guide/component-props.html) as its first argument:

```js
export default {
  props: {
    name: String
  },
  setup(props) {
    console.log(props.name)
  }
}
```

Note that this `props` object is reactive - i.e. it is updated when new props are passed in, and can be observed and reacted upon using [watchEffect](./computed-watch-api.html#watcheffect) or [watch](./computed-watch-api.html#watch):

```js
export default {
  props: {
    name: String
  },
  setup(props) {
    watchEffect(() => {
      console.log(`name is: ` + props.name)
    })
  }
}
```

However, **do NOT destructure** the `props` object! If you do so, the unpacked values won't have reactivity:

```js
export default {
  props: {
    name: String
  },
  setup({ name }) {
    watchEffect(() => {
      console.log(`name is: ` + name) // Will not be reactive!
    })
  }
}
```

The `props` object is immutable during development. Vue will emit a warning if there's an attempt to mutate it.

The second argument of `setup` provides a context object which exposes a selective list of the properties that were previously exposed on `this` in 2.x APIs:

```js
const MyComponent = {
  setup(props, context) {
    context.attrs
    context.slots
    context.emit
  }
}
```

Unlike `props`, `context` argument can be destructured safely so [attrs](./instance-properties.html#attrs) and [slots](./instance-properties.html#slots) would always expose the latest values even after updates:

```js
const MyComponent = {
  setup(props, { attrs }) {
    // a function that may get called at a later stage
    function onClick() {
      console.log(attrs.foo) // guaranteed to be the latest reference
    }
  }
}
```

However, `attrs` and `slots` themselves cannot be destructured without losing reactivity:

```js
const MyComponent = {
  setup(props, { attrs: { foo } }) {
    function onClick() {
      console.log(foo) // won't be the latest reference as we lost `attrs` reactivity with destructuring
    }
  }
}
```

### Usage with Templates

If `setup` returns an object, the properties on the object will be merged into the render context of the component's template:

```html
<template>
  <div>{{ count }} {{ object.foo }}</div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const object = reactive({ foo: 'bar' })

    // expose to template
    return {
      count,
      object
    }
  }
}
</script>
```

Note that [refs](./refs-api.html#ref) returned from `setup` are [automatically unwrapped](./refs-api.html#access-in-templates ) when accessed in the template so you shouldn't use `.value` in templates.

### Usage with Render Functions

`setup` can also return a render function which can directly make use of the reactive state declared in the same scope:

```js
import { h, ref, reactive } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const object = reactive({ foo: 'bar' })

    return () => h('div', [count.value, object.foo])
  }
}
```

### Usage of `this`

**Inside `setup()`, `this` won't be a reference to Vue instance** Since `setup()` is called before other component options are resolved, `this` inside `setup()` will behave quite differently from `this` in other options. This might cause confusions when using `setup()` along other Options API. Another reason for avoiding `this` in `setup()` is a very common pitfall for beginners:

```js
setup() {
  const that = this
  function onClick() {
      console.log(this !== that) // not the `this` you'd expect!
  }
}
```

### Typing

```ts
interface Data {
  [key: string]: unknown
}

interface SetupContext {
  attrs: Data
  slots: Slots
  emit: (event: string, ...args: unknown[]) => void
}

function setup(props: Data, context: SetupContext): Data
```

::: tip
To get type inference for the arguments passed to `setup()`, the use of [`defineComponent`](TODO) is needed.
:::

## Lifecycle Hooks

Lifecycle hooks can be registered with directly-imported `onX` functions:

```js
import { onMounted, onUpdated, onUnmounted } from 'vue'

const MyComponent = {
  setup() {
    onMounted(() => {
      console.log('mounted!')
    })
    onUpdated(() => {
      console.log('updated!')
    })
    onUnmounted(() => {
      console.log('unmounted!')
    })
  }
}
```

These lifecycle hook registration functions can only be used synchronously during [`setup()`](#setup), since they rely on internal global state to locate the current active instance (the component instance whose `setup()` is being called right now). Calling them without a current active instance will result in an error.

The component instance context is also set during the synchronous execution of lifecycle hooks, so watchers and computed properties created inside synchronously inside lifecycle hooks are also automatically tore down when the component unmounts.

- **Mapping between Options API Lifecycle Options and Composition API**

  - ~~`beforeCreate`~~ -> use `setup()`
  - ~~`created`~~ -> use `setup()`
  - `beforeMount` -> `onBeforeMount`
  - `mounted` -> `onMounted`
  - `beforeUpdate` -> `onBeforeUpdate`
  - `updated` -> `onUpdated`
  - `beforeUnmount` -> `onBeforeUnmount`
  - `unmounted` -> `onUnmounted`
  - `errorCaptured` -> `onErrorCaptured`
  - `renderTracked` -> `onRenderTracked`
  - `renderTriggered` -> `onRenderTriggered`

## Dependency Injection

`provide` and `inject` enables dependency injection. Both can only be called during [`setup()`](#setup) with a current active instance.

```js
import { provide, inject } from 'vue'

const ThemeSymbol = Symbol()

const Ancestor = {
  setup() {
    provide(ThemeSymbol, 'dark')
  }
}

const Descendent = {
  setup() {
    const theme = inject(ThemeSymbol, 'light' /* optional default value */)
    return {
      theme
    }
  }
}
```

`inject` accepts an optional default value as the 2nd argument. If a default value is not provided and the property is not found on the provide context, `inject` returns `undefined`.

### Injection Reactivity

To retain reactivity between provided and injected values, we can use a [ref](./refs-api.html#ref):

```js
// in provider
const themeRef = ref('dark')
provide(ThemeSymbol, themeRef)

// in consumer
const theme = inject(ThemeSymbol, ref('light'))
watchEffect(() => {
  console.log(`theme set to: ${theme.value}`)
})
```

If a reactive object is injected, it can also be reactively observed.

### Typing

```ts
interface InjectionKey<T> extends Symbol {}

function provide<T>(key: InjectionKey<T> | string, value: T): void

// without default value
function inject<T>(key: InjectionKey<T> | string): T | undefined
// with default value
function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T
```

Vue provides an `InjectionKey` interface which is a generic type that extends `Symbol`. It can be used to sync the type of the injected value between the provider and the consumer:

```ts
import { InjectionKey, provide, inject } from 'vue'

const key: InjectionKey<string> = Symbol()

provide(key, 'foo') // providing non-string value will result in error

const foo = inject(key) // type of foo: string | undefined
```

If using string keys or non-typed symbols, the type of the injected value will need to be explicitly declared:

```ts
const foo = inject<string>('foo') // string | undefined
```

## Template Refs

When using the Composition API, the concept of [reactive refs](./refs-api.html#ref) and [template refs](TODO) are unified. In order to obtain a reference to an in-template element or component instance, we can declare a ref as usual and return it from `setup()`:

```html
<template>
  <div ref="root"></div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const root = ref(null)

    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      console.log(root.value) // <div/>
    })

    return {
      root
    }
  }
}
</script>
```

Here we are exposing `root` on the render context and binding it to the div as its ref via `ref="root"`. In the Virtual DOM patching algorithm, if a VNode's `ref` key corresponds to a ref on the render context, the VNode's corresponding element or component instance will be assigned to the value of that ref. This is performed during the Virtual DOM mount / patch process, so template refs will only get assigned values after the initial render.

Refs used as templates refs behave just like any other refs: they are reactive and can be passed into (or returned from) composition functions.

### Usage with JSX

```js
export default {
  setup() {
    const root = ref(null)

    return () =>
      h('div', {
        ref: root
      })

    // with JSX
    return () => <div ref={root} />
  }
}
```

### Usage inside `v-for`

Composition API template refs do not have special handling when used inside `v-for`. Instead, use function refs to perform custom handling:

```html
<template>
  <div v-for="(item, i) in list" :ref="el => { divs[i] = el }">
    {{ item }}
  </div>
</template>

<script>
import { ref, reactive, onBeforeUpdate } from 'vue'

export default {
  setup() {
    const list = reactive([1, 2, 3])
    const divs = ref([])

    // make sure to reset the refs before each update
    onBeforeUpdate(() => {
      divs.value = []
    })

    return {
      list,
      divs
    }
  }
}
</script>
```
