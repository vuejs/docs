# TypeScript with Composition API {#typescript-with-composition-api}

> This page assumes you've already read the overview on [Using Vue with TypeScript](./overview).

## Typing Component Props {#typing-component-props}

### Using `<script setup>` {#using-script-setup}

When using `<script setup>`, the `defineProps()` macro supports inferring the props types based on its argument:

```vue
<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number
})

props.foo // string
props.bar // number | undefined
</script>
```

This is called "runtime declaration", because the argument passed to `defineProps()` will be used as the runtime `props` option.

However, it is usually more straightforward to define props with pure types via a generic type argument:

```vue
<script setup lang="ts">
const props = defineProps<{
  foo: string
  bar?: number
}>()
</script>
```

This is called "type-based declaration". The compiler will try to do its best to infer the equivalent runtime options based on the type argument. In this case, our second example compiles into the exact same runtime options as the first example.

You can use either type-based declaration OR runtime declaration, but you cannot use both at the same time.

We can also move the props types into a separate interface:

```vue
<script setup lang="ts">
interface Props {
  foo: string
  bar?: number
}

const props = defineProps<Props>()
</script>
```

#### Syntax Limitations {#syntax-limitations}

In order to generate the correct runtime code, the generic argument for `defineProps()` must be one of the following:

- An object literal type:

  ```ts
  defineProps<{ /*... */ }>()
  ```

- A reference to an interface or object literal type **in the same file**:

  ```ts
  interface Props {/* ... */}

  defineProps<Props>()
  ```

The interface or object literal type can contain references to types imported from other files, however, the generic argument itself passed to `defineProps` **cannot** be an imported type:

```ts
import { Props } from './other-file'

// NOT supported
defineProps<Props>()
```

This is because Vue components are compiled in isolation and the compiler currently does not crawl imported files in order to analyze the source type. This limitation could be removed in a future release.

### Props Default Values {#props-default-values}

When using type-based declaration, we lose the ability to declare default values for the props. This can be resolved by the `withDefaults` compiler macro:

```ts
export interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

This will be compiled to equivalent runtime props `default` options. In addition, the `withDefaults` helper provides type checks for the default values, and ensures the returned `props` type has the optional flags removed for properties that do have default values declared.

Alternatively, you can use the currently experimental [Reactivity Transform](/guide/extras/reactivity-transform.html):

```vue
<script setup lang="ts">
interface Props {
  name: string
  count?: number
}

// reactive destructure for defineProps()
// default value is compiled to equivalent runtime option
const { name, count = 100 } = defineProps<Props>()
</script>
```

This behavior currently requires [explicit opt-in](/guide/extras/reactivity-transform.html#explicit-opt-in).

### Without `<script setup>` {#without-script-setup}

If not using `<script setup>`, it is necessary to use `defineComponent()` to enable props type inference. The type of the props object passed to `setup()` is inferred from the `props` option.

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    message: String
  },
  setup(props) {
    props.message // <-- type: string
  }
})
```

## Typing Component Emits {#typing-component-emits}

In `<script setup>`, the `emit` function can also be typed using either runtime declaration OR type declaration:

```vue
<script setup lang="ts">
// runtime
const emit = defineEmits(['change', 'update'])

// type-based
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

The type argument should be a type literal with [Call Signatures](https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures). The type literal will be used as the type of the returned `emit` function. As we can see, the type declaration gives us much finer-grained control over the type constraints of emitted events.

When not using `<script setup>`, `defineComponent()` is able to infer the allowed events for the `emit` function exposed on the setup context:

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['change'],
  setup(props, { emit }) {
    emit('change') // <-- type check / auto-completion
  }
})
```

## Typing `ref()` {#typing-ref}

Refs infer the type from the initial value:

```ts
import { ref } from 'vue'

// inferred type: Ref<number>
const year = ref(2020)

// => TS Error: Type 'string' is not assignable to type 'number'.
year.value = '2020'
```

Sometimes we may need to specify complex types for a ref's inner value. We can do that by using the `Ref` type:

```ts
import { ref } from 'vue'
import type { Ref } from 'vue'

const year: Ref<string | number> = ref('2020')

year.value = 2020 // ok!
```

Or, by passing a generic argument when calling `ref()` to override the default inference:

```ts
// resulting type: Ref<string | number>
const year = ref<string | number>('2020')

year.value = 2020 // ok!
```

If you specify a generic type argument but omit the initial value, the resulting type will be a union type that includes `undefined`:

```ts
// inferred type: Ref<number | undefined>
const n = ref<number>()
```

## Typing `reactive()` {#typing-reactive}

`reactive()` also implicitly infers the type from its argument:

```ts
import { reactive } from 'vue'

// inferred type: { title: string }
const book = reactive({ title: 'Vue 3 Guide' })
```

To explicitly type a `reactive` property, we can use interfaces:

```ts
import { reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

const book: Book = reactive({ title: 'Vue 3 Guide' })
```

:::tip
It's not recommended to use the generic argument of `reactive()` because the returned type, which handles nested ref unwrapping, is different from the generic argument type.
:::

## Typing `computed()` {#typing-computed}

`computed()` infers its type based on the getter's return value:

```ts
import { ref, computed } from 'vue'

const count = ref(0)

// inferred type: ComputedRef<number>
const double = computed(() => count.value * 2)

// => TS Error: Property 'split' does not exist on type 'number'
const result = double.value.split('')
```

You can also specify an explicit type via a generic argument:

```ts
const double = computed<number>(() => {
  // type error if this doesn't return a number
})
```

## Typing Event Handlers {#typing-event-handlers}

When dealing with native DOM events, it might be useful to type the argument we pass to the handler correctly. Let's take a look at this example:

```vue
<script setup lang="ts">
function handleChange(event) {
  // `event` implicitly has `any` type
  console.log(event.target.value)
}
</script>

<template>
  <input type="text" @change="handleChange" />
</template>
```

Without type annotation, the `event` argument will implicitly have a type of `any`. This will also result in a TS error if `"strict": true` or `"noImplicitAny": true` are used in `tsconfig.json`. It is therefore recommended to explicitly annotate the argument of event handlers. In addition, you may need to explicitly cast properties on `event`:

```ts
function handleChange(event: Event) {
  console.log((event.target as HTMLInputElement).value)
}
```

## Typing Provide / Inject {#typing-provide-inject}

Provide and inject are usually performed in separate components. To properly type injected values, Vue provides an `InjectionKey` interface, which is a generic type that extends `Symbol`. It can be used to sync the type of the injected value between the provider and the consumer:

```ts
import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

const key = Symbol() as InjectionKey<string>

provide(key, 'foo') // providing non-string value will result in error

const foo = inject(key) // type of foo: string | undefined
```

It's recommended to place the injection key in a separate file so that it can be imported in multiple components.

When using string injection keys, the type of the injected value will be `unknown`, and needs to be explicitly declared via a generic type argument:

```ts
const foo = inject<string>('foo') // type: string | undefined
```

Notice the injected value can still be `undefined`, because there is no guarantee that a provider will provide this value at runtime.

The `undefined` type can be removed by providing a default value:

```ts
const foo = inject<string>('foo', 'bar') // type: string
```

If you are sure that the value is always provided, you can also force cast the value:

```ts
const foo = inject('foo') as string
```

## Typing Template Refs {#typing-template-refs}

Template refs should be created with an explicit generic type argument and an initial value of `null`:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const el = ref<HTMLInputElement | null>(null)

onMounted(() => {
  el.value?.focus()
})
</script>

<template>
  <input ref="el" />
</template>
```

Note that for strict type safety, it is necessary to use optional chaining or type guards when accessing `el.value`. This is because the initial ref value is `null` until the component is mounted, and it can also be set to `null` if the referenced element is unmounted by `v-if`.

## Typing Component Template Refs {#typing-component-template-refs}

Sometimes you might need to annotate a template ref for a child component in order to call its public method. For example, we have a `MyModal` child component with a method that opens the modal:

```vue
<!-- MyModal.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const isContentShown = ref(false)
const open = () => (isContentShown.value = true)

defineExpose({
  open
})
</script>
```

In order to get the instance type of `MyModal`, we need to first get its type via `typeof`, then use TypeScript's built-in `InstanceType` utility to extract its instance type:

```vue{5}
<!-- App.vue -->
<script setup lang="ts">
import MyModal from './MyModal.vue'

const modal = ref<InstanceType<typeof MyModal> | null>(null)

const openModal = () => {
  modal.value?.open()
}
</script>
```

Note if you want to use this technique in TypeScript files instead of Vue SFCs, you need to enable Volar's [Takeover Mode](./overview.html#volar-takeover-mode).
