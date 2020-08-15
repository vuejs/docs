# TypeScript Support

> [Vue CLI](https://cli.vuejs.org) provides built-in TypeScript tooling support.

## Official Declaration in NPM Packages

A static type system can help prevent many potential runtime errors as applications grow, which is why Vue 3 is written in TypeScript. This means you don't need any additional tooling to use TypeScript with Vue - it has a first-class citizen support.

## Recommended Configuration

```js
// tsconfig.json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    // this enables stricter inference for data properties on `this`
    "strict": true,
    "moduleResolution": "node"
  }
}
```

Note that you have to include `strict: true` (or at least `noImplicitThis: true` which is a part of `strict` flag) to leverage type checking of `this` in component methods otherwise it is always treated as `any` type.

See [TypeScript compiler options docs](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for more details.

## Development Tooling

### Project Creation

[Vue CLI](https://github.com/vuejs/vue-cli) can generate new projects that use TypeScript. To get started:

```bash
# 1. Install Vue CLI, if it's not already installed
npm install --global @vue/cli@next

# 2. Create a new project, then choose the "Manually select features" option
vue create my-project-name

# If you already have a Vue CLI project without TypeScript, please add a proper Vue CLI plugin:
vue add typescript
```

Make sure that `script` part of the component has TypeScript set as a language:

```html
<script lang="ts">
  ...
</script>
```

### Editor Support

For developing Vue applications with TypeScript, we strongly recommend using [Visual Studio Code](https://code.visualstudio.com/), which provides great out-of-the-box support for TypeScript. If you are using [single-file components](./single-file-components.html) (SFCs), get the awesome [Vetur extension](https://github.com/vuejs/vetur), which provides TypeScript inference inside SFCs and many other great features.

[WebStorm](https://www.jetbrains.com/webstorm/) also provides out-of-the-box support for both TypeScript and Vue.

## Defining Vue components

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

If you have a complex type or interface, you can cast it using [type assertion](https://www.typescriptlang.org/docs/handbook/basic-types.html#type-assertions):

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

### Annotating Return Types

Because of the circular nature of Vue’s declaration files, TypeScript may have difficulties inferring the types of computed. For this reason, you may need to annotate the return type computed properties.

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
    }

    // in a computed with a setter, getter needs to be annotated
    greetingUppercased: {
      get(): string {
        return this.greeting.toUpperCase();
      },
      set(newValue: string) {
        this.message = newValue.toUpperCase();
      },
    },
  }
})
```

### Annotating Props

Vue does a runtime validation on props with a `type` defined. To provide these types to TypeScript, we need to cast the constructor with `PropType`:

```ts
import { defineComponent, PropType } from 'vue'

interface ComplexMessage {
  title: string
  okMessage: string
  cancelMessage: string
}
const Component = defineComponent({
  props: {
    name: String,
    success: { type: String },
    callback: {
      type: Function as PropType<() => void>
    },
    message: {
      type: Object as PropType<ComplexMessage>,
      required: true,
      validator(message: ComplexMessage) {
        return !!message.title
      }
    }
  }
})
```

If you find validator not getting type inference or member completion isn’t working, annotating the argument with the expected type may help address these problems.

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
    const filtered = props.message.filter(p => p.value) // an error will be thrown: Property 'filter' does not exist on type 'string'
  }
})
```

### Typing `ref`s

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

Sometimes we may need to specify complex types for a ref's inner value. We can do that simply passing a generic argument when calling ref to override the default inference:

```ts
const year = ref<string | number>('2020') // year's type: Ref<string | number>

year.value = 2020 // ok!
```

::: tip Note
If the type of the generic is unknown, it's recommended to cast `ref` to `Ref<T>`.
:::

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
