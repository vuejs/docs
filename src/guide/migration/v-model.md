# Changes to `v-model` on custom components

## Overview

In terms of what has changed, at a high level:

- When used on custom components, `v-model` prop and event default names are changed:
  - prop: `value` -> `modelValue`;
  - event: `input` -> `update:modelValue`;
- Multiple `v-model` bindings on the same component are possible now;
- **BREAKING:** `v-bind`'s `.sync` modifier and component `model` option are removed and replaced with an argument on `v-model`;
- **NEW:** Added the ability to create custom `v-model` modifiers.

For more information, read on!

## Introduction

In Vue 2, the `v-model` directive required developers to always use the `value` prop. And if developers required different props for different purposes, they would have to resort to using `v-bind.sync`. In addition, this hard-coded relationship between `v-model` and `value` led to issues with how native elements and custom elements were handled.

In 2.2 we introduced the `model` component option that allows the component to customize the prop and event to use for `v-model`. However, this still only allowed a single `v-model` to be used on the component.

With Vue 3, the API for two-way data binding is being standardized in order to reduce confusion and to allow developers more flexibility with the `v-model` directive.

## Previous Syntax

In v2, using a `v-model` on a component was an equivalent of passing a `value` prop and emitting an `input` event:

```html
<ChildComponent v-model="pageTitle" />

<!-- would be shorthand for: -->

<ChildComponent :value="pageTitle" @input="pageTitle = $event" />
```

If we wanted to change prop or event names to something different, we would need to add a `model` option to `ChildComponent` component:

```html
<!-- ParentComponent.vue -->

<ChildComponent v-model="pageTitle" />
```

```js
// ChildComponent.vue

export default {
  model: {
    prop: 'title',
    event: 'change'
  },
  props: {
    // this allows using the `value` prop for a different purpose
    value: String,
    // use `title` as the prop which take the place of `value`
    title: {
      type: String,
      default: 'Default title'
    }
  }
}
```

So, `v-model` in this case would be a shorthand to

```html
<ChildComponent :title="pageTitle" @change="pageTitle = $event" />
```

### Using `v-bind.sync`

In some cases, we might need "two-way binding" for a prop (sometimes in addition to existing `v-model` for the different prop). To do so, we recommended emitting events in the pattern of `update:myPropName`. For example, for `ChildComponent` from the previous example with the `title` prop, we could communicate the intent of assigning a new value with:

```js
this.$emit('update:title', newValue)
```

Then the parent could listen to that event and update a local data property, if it wants to. For example:

```html
<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```

For convenience, we had a shorthand for this pattern with the .sync modifier:

```html
<ChildComponent :title.sync="pageTitle" />
```

## Current Syntax

In v3 `v-model` on the custom component is an equivalent of passing a `modelValue` prop and emitting an `update:modelValue` event:

```html
<ChildComponent v-model="pageTitle" />

<!-- would be shorthand for: -->

<MyBook :modelValue="pageTitle" @update:modelValue="pageTitle = $event" />
```

### `v-model` arguments

To change a model name, instead of a `model` component option, now we can pass an _argument_ to `v-model`:

```html
<ChildComponent v-model:title="pageTitle" />

<!-- would be shorthand for: -->

<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```

![v-bind anatomy](/images/v-bind-instead-of-sync.png)

This also serves as a replacement to `.sync` modifier and allows us to have multiple `v-model`s on the custom component.

```html
<ChildComponent v-model:title="pageTitle" v-model:content="pageContent" />

<!-- would be shorthand for: -->

<ChildComponent
  :title="pageTitle"
  @update:title="pageTitle = $event"
  :content="pageContent"
  @update:content="pageContent = $event"
/>
```

### `v-model` modifiers

In addition to v2 hard-coded `v-model` modifiers like `.trim`, now v3 supports custom modifiers:

```html
<ChildComponent v-model.capitalize="pageTitle" />
```

Read more about custom `v-model` modifiers in the [Custom Events](../component-custom-events.html#handling-v-model-modifiers) section.

## Next Steps

For more information on the new `v-model` syntax, see:

- [Using `v-model` on Components](../component-basics.html#using-v-model-on-components)
- [`v-model` arguments](../component-custom-events.html#v-model-arguments)
- [Handling `v-model` modifiers](../component-custom-events.html#v-model-arguments)
