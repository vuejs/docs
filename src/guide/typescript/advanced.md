# Typescript: advanced

> This page assumes you've already read the overview on [Using Vue with TypeScript](./overview), Essentials and Components in-Depth.
>

## Components

Components are hard to fully understand, even when reading the source-code or looking for examples. This section will explain more advanced topics and some use cases for some of the API's.

### What's a component in typescript?

> For what's a component please check [Components Basics](./../essentials/component-basics)

For the examples we will be using [defineComponent](./../../api/general.html#definecomponent), it makes it easier to explain, same concepts are valid for [Single-File Components](./../../guide/scaling-up/sfc).

```ts
const Comp = defineComponent({
  /* ... */
})
```

In terms of typing Vue components are mainly composed by 3 parts:

#### Options

Used to declare the component's `props`, `emits`, `slots`, etc.

```ts
defineComponent({
  props: {
    msg: String
  },
  emits: {
    clicked: (msg: string) => true
  },
  methods: {
    onClick() {
      this.$emit('clicked', this.msg)
    }
  }
})
```

#### Instance

Component's context (`this`) and retuned by [ComponentInstance](./../../api/utility-types#componentinstance)

```ts
const Comp = defineComponent({
  props: {
    msg: String
  },
  emits: {
    clicked: (msg: string) => true
  },
  methods: {
    onClick() {
      // this.msg is typed as string
      this.$emit('clicked', this.msg)
    }
  }
})

const compEl = ref<InstanceType<typeof Comp>>()

compEl.value.msg //string
compEl.value.onClick // function
```

### Render

Contract to render the component, eg: `props` and `slots`.

In this example we will use [h](../../api/render-function.md);

```ts
const Comp = defineComponent({
  props: {
    msg: String
  },
  emits: {
    clicked: (msg: string) => true
  },
  methods: {
    onClick() {
      // this.msg is typed as string
      this.$emit('clicked', this.msg)
    }
  }
})

// the second argument is the render contract.
h(Comp, {
  msg: 'hello',
  onClick: () => {
    // button clicked
  }
})
```
