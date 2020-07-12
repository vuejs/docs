# Changes to `v-model` on custom components

## Overview

In terms of what has changed, at a high level:

- When used on custom components, `v-model` prop and event default names are changed:
  - prop: `value` -> `modelValue`;
  - event: `input` -> `update:modelValue`;
- Multiple `v-model` bindings on the same component are possible now;
- **DEPRECATED:** `v-bind`'s `.sync` modifier and component `model` option are removed and replaced with an argument on `v-model`;
- **NEW:** Added a possibility to create custom `v-model` modifiers.

For more information, read on!

## Introduction

In Vue 2, `v-model="foo"` on components roughly compiled to the following:

```js
h(Comp, {
  value: foo,
  onInput: value => {
    foo = value
  }
})
```

However, this required the component to always use the `value` prop for binding with `v-model` when the component may want to expose the value prop for a different purpose.

In 2.2 we introduced the `model` component option that allows the component to customize the prop and event to use for `v-model`. However, this still only allowed a single `v-model` to be used on the component. In practice we are seeing some components that need to sync multiple values, and the other values have to use `v-bind.sync`. We noticed that `v-model` and `v-bind.sync` are fundamentally doing the same thing and can be combined into a single construct by allowing `v-model` to accept arguments.

## Previous Syntax

In v2, using a `v-model` on a component was an equivalent of passing a `value` prop and emitting an `input` event:

```html
<MyBook v-model="readersCount" />

<!-- would be shorthand for: -->

<MyBook :value="readersCount" @input="readersCount = $event" />
```

If we wanted to change prop or event names to something different, we would need to add a `model` option to `MyBook` component:

```html
<MyBook v-model="readersCount" />
```

```js
// MyBook.vue

export default {
  model: {
    prop: 'readers',
    event: 'change'
  },
  props: {
    // this allows using the `value` prop for a different purpose
    value: String,
    // use `checked` as the prop which take the place of `value`
    readers: {
      type: Number,
      default: 0
    }
  }
}
```

So, `v-model` in this case would be a shorthand to

```html
<MyBook :readers="readersCount" @change="readersCount = $event" />
```

### Using `v-bind.sync`

In some cases, we might need "two-way binding" for a prop (sometimes in addition to existing `v-model` for the different prop). To do so, we recommended emitting events in the pattern of `update:myPropName`. For example, for `MyBook` component from the previous example with the `readers` prop, we could communicate the intent of assigning a new value with:

```js
this.$emit('update:readers', newValue)
```

Then the parent could listen to that event and update a local data property, if it wants to. For example:

```html
<MyBook :readers="readersCount" @update:readers="readersCount = $event" />
```

For convenience, we had a shorthand for this pattern with the .sync modifier:

```html
<MyBook :readers.sync="readersCount" />
```

## Current Syntax

Now, `v-model` on the custom component is an equivalent of passing a `modelValue` prop and emitting an `update:modelValue` event:

```html
<MyBook v-model="readersCount" />

<!-- would be shorthand for: -->

<MyBook
  :modelValue="readersCount"
  @update:modelValue="readersCount = $event"
/>
```

### `v-model` arguments

To change a model name, instead of `model` component option, now we can pass an _argument_ to `v-model`:

```html
<MyBook v-model:readers="readersCount" />

<!-- would be shorthand for: -->

<MyBook
  :readers="readersCount"
  @update:readers="readersCount = $event"
/>
```

This also serves as a replacement to `.sync` modifier and allows us to have multiple `v-model`s on the custom component.

```html
<MyBook v-model:readers="readersCount" v-model:title="book.title" />

<!-- would be shorthand for: -->

<MyBook
  :readers="readersCount"
  @update:readers="readersCount = $event"
  :title="book.title"
  @update:title="book.title = $event"
/>
```

### `v-model` modifiers

In addition to v2 hard-coded `v-model` modifiers like `.trim`, now v3 supports custom modifiers:

```html
<MyBook v-model.capitalize="book.title" />
```

Read more about custom `v-model` modifiers in the [Custom Events](../component-custom-events.html#handling-v-model-modifiers) section.

## Next Steps

For more information on the new `v-model` syntax, see:

- [Using `v-model` on Components](../component-basics.html#using-v-model-on-components)
- [`v-model` arguments](../component-custom-events.html#v-model-arguments)
- [Handling `v-model` modifiers](../component-custom-events.html#v-model-arguments)
