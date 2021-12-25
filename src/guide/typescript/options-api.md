# TypeScript with Options API

> This page assumes you've already read the overview on [Using Vue with TypeScript](./overview).

:::tip
While Vue does support TypeScript usage with Options API, it is recommended to use Vue with TypeScript via Composition API as it offers simpler, more efficient and more robust type inference.
:::

## Annotating Component Props

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

## Annotating Component Emits

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

## Annotating Computed Return Types

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

## Augmenting Global Properties

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

## Augmenting Custom Options

// TODO
