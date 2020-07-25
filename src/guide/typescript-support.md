> [Vue CLI](https://cli.vuejs.org) provides built-in TypeScript tooling support.

## Official Declaration in NPM Packages

A static type system can help prevent many potential runtime errors, especially as applications grow. That's why Vue is written in TypeScript. This means you don't need any additional tooling to use TypeScript with Vue - it has a first-class citizen support

## Recommended Configuration

```js
// tsconfig.json
{
  "compilerOptions": {
    // this aligns with Vue's browser support
    "target": "es2015",
    // this enables stricter inference for data properties on `this`
    "strict": true,
    // if using webpack 2+ or rollup, to leverage tree shaking:
    "module": "es2015",
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

You can type your `data` properties using type assertions:

```js
const Component = defineComponent({
  data() {
    return {
      message: 'Hello!' as string,
      count: 0 as number
    }
  },
  mounted() {
    const result = this.count.split('') // => Property 'split' does not exist on type 'number'
  }
})
```

If you need a complex type, you can create an interface:

```ts
interface Book {
  title: string
  author: string
  year: number
}

const Component = defineComponent({
  data() {
    return {
      message: 'Hello!' as string,
      count: 0 as number,
      book: <Book>{
        title: 'Vue 3 Guide',
        author: 'Vue Team',
        year: 2020
      }
    }
  }
})
```

### Annotating Return Types

Because of the circular nature of Vue’s declaration files, TypeScript may have difficulties inferring the types of certain methods. For this reason, you may need to annotate the return type on methods like render and those in computed.

```ts
import { defineComponent } from 'vue'

const Component = defineComponent({
  data() {
    return {
      message: 'Hello!' as string
    }
  },
  methods: {
    // need annotation due to `this` in return type
    greet(): string {
      return this.message + ' world'
    }
  },
  computed: {
    // need annotation
    greeting(): string {
      return this.message + '!'
    }
  }
})
```

### Annotating Props

```ts
{ defineComponent, PropType } from 'vue'

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
