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

`DefineComponent` generic order is pretty stable, but it's not guaranteed to be the same in future versions, the reason is because it needs to support the full Vue behavior (eg: Mixins/Extends), so it's recommended to use the more stable helper [DeclareComponent](./../../api/utility-types.html#declarecomponent) instead.

```ts
type DefineComponent<
  PropsOrPropOptions = any,
  RawBindings = any,
  D = any,
  C extends ComputedOptions = ComputedOptions,
  M extends MethodOptions = MethodOptions,
  Mixin extends ComponentOptionsMixin = {},
  Extends extends ComponentOptionsMixin = {},
  E extends EmitsOptions = {},
  EE extends string = string,
  PP = PublicProps,
  Props = ResolveProps<PropsOrPropOptions, E>,
  Defaults = ExtractDefaultPropTypes<PropsOrPropOptions>,
  I extends ComponentInjectOptions = any,
  II extends string = string,
  S extends SlotsType = any,
  Options extends Record<PropertyKey, any> = {},
>
```

- `PropsOrPropOptions`: `Props` definition.
- `RawBindings`: `setup` return type.
- `D`: `data` return type.
- `C`: `computed` object.
- `M`: `methods` object.
- `Mixin`: `mixins` union type `(MixinA | MixinB)[]`.
- `Extends`: `extends` type.
- `E`: `emits` object, if object declaration is used.
- `EE`: `emits` string union type, if string is used.
- `PP`: `PublicProps`, contains `class`, `style`, `VNode` specific props and [ComponentCustomProps](../../api/utility-types#componentcustomprops).
- `Props`: Sanitised props, these are `PropsOrPropOptions` but with the resolved type.
- `Defaults`: defaulted props
- `I`: `inject` object, if object declaration is used.
- `II`: `inject` string union type, if string is used.
- `S`: `slots` object.
- `Options`: Unaltered `Options` object used to define the component.

### DefineComponent

Returned from [defineComponent](./../../api/general.html#definecomponent), has [Options](#options), [Render](#render) and [Instance](#instance) information about the component.

### Bespoke `defineComponent`

Vue options are very hard to get the correct type, sometimes `defineComponent` is not enough and creating a bespoke `defineComponent` can be useful for some more advance cases, such as [@vue/test-utils](https://test-utils.vuejs.org/) [mount](https://test-utils.vuejs.org/api/#mount) method.

For that use case we recommend using the utilities [DefineComponentOptions & DefineComponentFromOptions](../../api//utility-types.md#definecomponentoptions).
