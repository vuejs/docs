# Typescript: advanced

> This page assumes you've already read the overview on [Using Vue with TypeScript](./overview), Essentials and Components in-Depth.

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

Used to declare the component's `props`, `emits`, `slots`, etc. It can also be a `function`.

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

[ComponentPublicInstance](../../api/component-instance.md), retuned by [ComponentInstance](./../../api/utility-types#componentinstance),

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

#### Render

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

#### Differences

`Instance` and `Render` are pretty much the same, the main difference being `Instance` will set
`$props` with `default` properties as **not** `optional`, while `Render` will set `default` `$props` as optional.

```ts
const Comp = defineComponent({
  props: {
    foo: {
      type: String,
      default: 'foo'
    }
  },
  render() {
    this.$props.foo
  }
})

// valid because foo=string | undefined
;<Comp foo={undefined}></Comp>
```

### defineComponent Advanced

[defineComponent](./../../api/general.html#definecomponent), will accept component `Options` + `Instance` and return `Render` + `Options`.

If you check the [defineComponent source-code](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/apiDefineComponent.ts), you'll find there's a lot of generics and overloads, the reason for this is to make the API as flexible as possible, since Vue is very flexible in terms of declarations.

#### Generics parameters

`DefineComponent` generic order is pretty stable, but it's not guaranteed to be the same in future versions, so it's recommended to use [DeclareComponent](./../../api/utility-types.html#declarecomponent) instead.

```ts



### DefineComponent

Returned from [defineComponent](./../../api/general.html#definecomponent),
```
