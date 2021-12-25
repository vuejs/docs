# TypeScript with Composition API

## Typing Component Props

On `setup()` function, you don't need to pass a typing to `props` parameter as it will infer types from `props` component option.

```ts
import { defineComponent } from 'vue'

const Component = defineComponent({
  props: {
    message: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const result = props.message.split('') // correct, 'message' is typed as a string
    const filtered = props.message.filter((p) => p.value) // an error will be thrown: Property 'filter' does not exist on type 'string'
  }
})
```

## Typing Component Emits

## Typing `ref`

Refs infer the type from the initial value:

```ts
import { defineComponent, ref } from 'vue'

const Component = defineComponent({
  setup() {
    const year = ref(2020)

    const result = year.value.split('') // => Property 'split' does not exist on type 'number'
  }
})
```

Sometimes we may need to specify complex types for a ref's inner value. We can do that by simply passing a generic argument when calling ref to override the default inference:

```ts
const year = ref<string | number>('2020') // year's type: Ref<string | number>

year.value = 2020 // ok!
```

::: tip Note
If the type of the generic is unknown, it's recommended to cast `ref` to `Ref<T>`.
:::

## Typing `reactive`

When typing a `reactive` property, we can use interfaces:

```ts
import { defineComponent, reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

export default defineComponent({
  name: 'HelloWorld',
  setup() {
    const book = reactive<Book>({ title: 'Vue 3 Guide' })
    // or
    const book: Book = reactive({ title: 'Vue 3 Guide' })
    // or
    const book = reactive({ title: 'Vue 3 Guide' }) as Book
  }
})
```

## Typing `computed`

Computed values will automatically infer the type from returned value

```ts
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CounterButton',
  setup() {
    let count = ref(0)

    // read-only
    const doubleCount = computed(() => count.value * 2)

    const result = doubleCount.value.split('') // => Property 'split' does not exist on type 'number'
  }
})
```

## Typing Event Handlers

When dealing with native DOM events, it might be useful to type the argument we pass to the handler correctly. Let's take a look at this example:

```vue
<template>
  <input type="text" @change="handleChange" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    // `evt` will be of type `any`
    const handleChange = (evt) => {
      console.log(evt.target.value) // TS will throw an error here
    }

    return { handleChange }
  }
})
</script>
```

As you can see, without annotating the `evt` argument correctly, TypeScript will throw an error when we try to access the value of the `<input>` element. The solution is to cast the event target with a correct type:

```ts
const handleChange = (evt: Event) => {
  console.log((evt.target as HTMLInputElement).value)
}
```

## Typing Provide / Inject

## Typing Template Refs

## Typing Component Template Refs

Sometimes you might need to annotate a template ref for a child component in order to call its public method. For example, we have a `MyModal` child component with a method that opens the modal:

```ts
import { defineComponent, ref } from 'vue'

const MyModal = defineComponent({
  setup() {
    const isContentShown = ref(false)
    const open = () => (isContentShown.value = true)

    return {
      isContentShown,
      open
    }
  }
})
```

We want to call this method via a template ref from the parent component:

```ts
import { defineComponent, ref } from 'vue'

const MyModal = defineComponent({
  setup() {
    const isContentShown = ref(false)
    const open = () => (isContentShown.value = true)

    return {
      isContentShown,
      open
    }
  }
})

const app = defineComponent({
  components: {
    MyModal
  },
  template: `
    <button @click="openModal">Open from parent</button>
    <my-modal ref="modal" />
  `,
  setup() {
    const modal = ref()
    const openModal = () => {
      modal.value.open()
    }

    return { modal, openModal }
  }
})
```

While this will work, there is no type information about `MyModal` and its available methods. To fix this, you should use `InstanceType` when creating a ref:

```ts
setup() {
  const modal = ref<InstanceType<typeof MyModal>>()
  const openModal = () => {
    modal.value?.open()
  }

  return { modal, openModal }
}
```

Please note that you would also need to use [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) or any other way to check that `modal.value` is not `undefined`.
