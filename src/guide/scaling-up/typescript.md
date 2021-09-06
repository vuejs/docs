# Using Vue with TypeScript

// TODO mention `vue-tsc`
// TODO mention `vue-dts-gen`

## Official Declaration in NPM Packages

A static type system can help prevent many potential runtime errors as applications grow, which is why Vue 3 is written in TypeScript. This means you don't need any additional tooling to use TypeScript with Vue - it has first-class citizen support.

## Recommended Configuration

```js
// tsconfig.json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    // this enables stricter inference for data properties on `this`
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "node"
  }
}
```

Note that you have to include `strict: true` (or at least `noImplicitThis: true` which is a part of `strict` flag) to leverage type checking of `this` in component methods otherwise it is always treated as `any` type.

See [TypeScript compiler options docs](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for more details.

## Webpack Configuration

If you are using a custom Webpack configuration `ts-loader` needs to be configured to parse `<script lang="ts">` blocks in `.vue` files:

```js{10}
// webpack.config.js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }
      ...
```

## Development Tooling

### Project Creation

// TODO update thos

### Editor Support

For developing Vue applications with TypeScript, we strongly recommend using [Visual Studio Code](https://code.visualstudio.com/), which provides great out-of-the-box support for TypeScript. If you are using [Single-File Components](/guide/scaling-up/sfc.html) (SFCs), get the awesome [Volar extension](https://github.com/johnsoncodehk/volar), which provides TypeScript inference inside SFCs and many other great features.

[WebStorm](https://www.jetbrains.com/webstorm/) also provides out-of-the-box support for both TypeScript and Vue.

## Defining Vue Components

// TODO only need this if not using `<script setup>`

To let TypeScript properly infer types inside Vue component options, you need to define components with `defineComponent` global method:

```ts
import { defineComponent } from 'vue'

const Component = defineComponent({
  // type inference enabled
})
```

## Using with Options API

TypeScript should be able to infer most of the types without defining types explicitly. For example, if you have a component with a number `count` property, you will have an error if you try to call a string-specific method on it:

```ts
const Component = defineComponent({
  data() {
    return {
      count: 0
    }
  },
  mounted() {
    const result = this.count.split('') // => Property 'split' does not exist on type 'number'
  }
})
```

If you have a complex type or interface, you can cast it using [type assertion](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions):

```ts
interface Book {
  title: string
  author: string
  year: number
}

const Component = defineComponent({
  data() {
    return {
      book: {
        title: 'Vue 3 Guide',
        author: 'Vue Team',
        year: 2020
      } as Book
    }
  }
})
```

### Augmenting Types for `globalProperties`

Vue 3 provides a [`globalProperties` object](/api/application.html#app-config-globalproperties) that can be used to add a global property that can be accessed in any component instance. For example, a [plugin](/guide/reusability/plugins.html#writing-a-plugin) might want to inject a shared global object or function.

```ts
// User Definition
import axios from 'axios'

const app = Vue.createApp({})
app.config.globalProperties.$http = axios

// Plugin for validating some data
export default {
  install(app, options) {
    app.config.globalProperties.$validate = (data: object, rule: object) => {
      // check whether the object meets certain rules
    }
  }
}
```

In order to tell TypeScript about these new properties, we can use [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation).

In the above example, we could add the following type declaration:

```ts
import axios from 'axios'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $http: typeof axios
    $validate: (data: object, rule: object) => boolean
  }
}
```

We can put this type declaration in the same file, or in a project-wide `*.d.ts` file (for example, in the `src/typings` folder that is automatically loaded by TypeScript). For library/plugin authors, this file should be specified in the `types` property in `package.json`.

::: warning Make sure the declaration file is a TypeScript module
In order to take advantage of module augmentation, you will need to ensure there is at least one top-level `import` or `export` in your file, even if it is just `export {}`.

[In TypeScript](https://www.typescriptlang.org/docs/handbook/modules.html), any file containing a top-level `import` or `export` is considered a 'module'. If type declaration is made outside of a module, it will overwrite the original types rather than augmenting them.
:::

For more information about the `ComponentCustomProperties` type, see its [definition in `@vue/runtime-core`](https://github.com/vuejs/vue-next/blob/2587f36fe311359e2e34f40e8e47d2eebfab7f42/packages/runtime-core/src/componentOptions.ts#L64-L80) and [the TypeScript unit tests](https://github.com/vuejs/vue-next/blob/master/test-dts/componentTypeExtensions.test-d.tsx) to learn more.

### Annotating Return Types

Because of the circular nature of Vue’s declaration files, TypeScript may have difficulties inferring the types of computed. For this reason, you may need to annotate the return type of computed properties.

```ts
import { defineComponent } from 'vue'

const Component = defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  computed: {
    // needs an annotation
    greeting(): string {
      return this.message + '!'
    },

    // in a computed with a setter, getter needs to be annotated
    greetingUppercased: {
      get(): string {
        return this.greeting.toUpperCase()
      },
      set(newValue: string) {
        this.message = newValue.toUpperCase()
      }
    }
  }
})
```

### Annotating Props

Vue does a runtime validation on props with a `type` defined. To provide these types to TypeScript, we need to cast the constructor with `PropType`:

```ts
import { defineComponent, PropType } from 'vue'

interface Book {
  title: string
  author: string
  year: number
}

const Component = defineComponent({
  props: {
    name: String,
    id: [Number, String],
    success: { type: String },
    callback: {
      type: Function as PropType<() => void>
    },
    book: {
      type: Object as PropType<Book>,
      required: true
    },
    metadata: {
      type: null // metadata is typed as any
    }
  }
})
```

::: warning
Because of a [design limitation](https://github.com/microsoft/TypeScript/issues/38845) in TypeScript when it comes
to type inference of function expressions, you have to be careful with `validator` and `default` values for objects and arrays:
:::

```ts
import { defineComponent, PropType } from 'vue'

interface Book {
  title: string
  year?: number
}

const Component = defineComponent({
  props: {
    bookA: {
      type: Object as PropType<Book>,
      // Make sure to use arrow functions
      default: () => ({
        title: 'Arrow Function Expression'
      }),
      validator: (book: Book) => !!book.title
    },
    bookB: {
      type: Object as PropType<Book>,
      // Or provide an explicit this parameter
      default(this: void) {
        return {
          title: 'Function Expression'
        }
      },
      validator(this: void, book: Book) {
        return !!book.title
      }
    }
  }
})
```

### Annotating Emits

We can annotate a payload for the emitted event. Also, all non-declared emitted events will throw a type error when called:

```ts
const Component = defineComponent({
  emits: {
    addBook(payload: { bookName: string }) {
      // perform runtime validation
      return payload.bookName.length > 0
    }
  },
  methods: {
    onSubmit() {
      this.$emit('addBook', {
        bookName: 123 // Type error!
      })

      this.$emit('non-declared-event') // Type error!
    }
  }
})
```

## Using with Composition API

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

### Typing `refs`

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

### Typing Template Refs

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

Please note that you would also need to use [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) or any other way to check that `modal.value` is not undefined.

### Typing `reactive`

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

### Typing `computed`

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

### Typing Event Handlers

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
