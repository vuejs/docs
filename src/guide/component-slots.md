# Slots

> This page assumes you've already read the [Components Basics](component-basics.md). Read that first if you are new to components.

## Slot Content

Vue implements a content distribution API inspired by the [Web Components spec draft](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Slots-Proposal.md), using the `<slot>` element to serve as distribution outlets for content.

This allows you to compose components like this:

```html
<todo-button>
  Add todo
</todo-button>
```

Then in the template for `<todo-button>`, you might have:

```html
<!-- todo-button component template -->
<button class="btn-primary">
  <slot></slot>
</button>
```

When the component renders, `<slot></slot>` will be replaced by "Add Todo".

```html
<!-- rendered HTML -->
<button class="btn-primary">
  Add todo
</button>
```

Strings are just the beginning though! Slots can also contain any template code, including HTML:

```html
<todo-button>
  <!-- Add a Font Awesome icon -->
  <i class="fas fa-plus"></i>
  Add todo
</todo-button>
```

Or even other components:

```html
<todo-button>
  <!-- Use a component to add an icon -->
  <font-awesome-icon name="plus"></font-awesome-icon>
  Your Profile
</todo-button>
```

If `<todo-button>`'s template did **not** contain a `<slot>` element, any content provided between its opening and closing tag would be discarded.

```html
<!-- todo-button component template -->

<button class="btn-primary">
  Create a new item
</button>
```

```html
<todo-button>
  <!-- Following text won't be rendered -->
  Add todo
</todo-button>
```

## Render Scope

When you want to use data inside a slot, such as in:

```html
<todo-button>
  Delete a {{ item.name }}
</todo-button>
```

That slot has access to the same instance properties (i.e. the same "scope") as the rest of the template.

<img src="/images/slot.png" width="447" height="auto" style="display: block; margin: 0 auto; max-width: 100%" loading="lazy" alt="Slot explanation diagram">

The slot does **not** have access to `<todo-button>`'s scope. For example, trying to access `action` would not work:

```html
<todo-button action="delete">
  Clicking here will {{ action }} an item
  <!--
  The `action` will be undefined, because this content is passed
  _to_ <todo-button>, rather than defined _inside_ the
  <todo-button> component.
  -->
</todo-button>
```

As a rule, remember that:

> Everything in the parent template is compiled in parent scope; everything in the child template is compiled in the child scope.

## Fallback Content

There are cases when it's useful to specify fallback (i.e. default) content for a slot, to be rendered only when no content is provided. For example, in a `<submit-button>` component:

```html
<button type="submit">
  <slot></slot>
</button>
```

We might want the text "Submit" to be rendered inside the `<button>` most of the time. To make "Submit" the fallback content, we can place it in between the `<slot>` tags:

```html
<button type="submit">
  <slot>Submit</slot>
</button>
```

Now when we use `<submit-button>` in a parent component, providing no content for the slot:

```html
<submit-button></submit-button>
```

will render the fallback content, "Submit":

```html
<button type="submit">
  Submit
</button>
```

But if we provide content:

```html
<submit-button>
  Save
</submit-button>
```

Then the provided content will be rendered instead:

```html
<button type="submit">
  Save
</button>
```

## Named Slots

There are times when it's useful to have multiple slots. For example, in a `<base-layout>` component with the following template:

```html
<div class="container">
  <header>
    <!-- We want header content here -->
  </header>
  <main>
    <!-- We want main content here -->
  </main>
  <footer>
    <!-- We want footer content here -->
  </footer>
</div>
```

For these cases, the `<slot>` element has a special attribute, `name`, which can be used to assign a unique ID to different slots so you can determine where content should be rendered:

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

A `<slot>` outlet without `name` implicitly has the name "default".

To provide content to named slots, we need to use the `v-slot` directive on a `<template>` element, providing the name of the slot as `v-slot`'s argument:

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

Now everything inside the `<template>` elements will be passed to the corresponding slots.

The rendered HTML will be:

```html
<div class="container">
  <header>
    <h1>Here might be a page title</h1>
  </header>
  <main>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>
  <footer>
    <p>Here's some contact info</p>
  </footer>
</div>
```

Note that **`v-slot` can only be added to a `<template>`** (with [one exception](#abbreviated-syntax-for-lone-default-slots))

## Scoped Slots

Sometimes, it's useful for slot content to have access to data only available in the child component. It's a common case when a component is used to render an array of items, and we want to be able to customize the way each item is rendered.

For example, we have a component, containing a list of todo-items.

```js
app.component('todo-list', {
  data() {
    return {
      items: ['Feed a cat', 'Buy milk']
    }
  },
  template: `
    <ul>
      <li v-for="(item, index) in items">
        {{ item }}
      </li>
    </ul>
  `
})
```

We might want to replace the slot to customize it on parent component:

```html
<todo-list>
  <i class="fas fa-check"></i>
  <span class="green">{{ item }}<span>
</todo-list>
```

That won't work, however, because only the `<todo-list>` component has access to the `item` and we are providing the slot content from its parent.

To make `item` available to the slot content provided by the parent, we can add a `<slot>` element and bind it as an attribute:

```html
<ul>
  <li v-for="( item, index ) in items">
    <slot v-bind:item="item"></slot>
  </li>
</ul>
```

Attributes bound to a `<slot>` element are called **slot props**. Now, in the parent scope, we can use `v-slot` with a value to define a name for the slot props we've been provided:

```html
<todo-list>
  <template v-slot:default="slotProps">
    <i class="fas fa-check"></i>
    <span class="green">{{ slotProps.item }}<span>
  </template>
</todo-list>
```

<img src="/images/scoped-slot.png" width="611" height="auto" style="display: block; margin: 0 auto; max-width: 100%;" loading="lazy" alt="Scoped slot diagram"> 

In this example, we've chosen to name the object containing all our slot props `slotProps`, but you can use any name you like.

### Abbreviated Syntax for Lone Default Slots

In cases like above, when _only_ the default slot is provided content, the component's tags can be used as the slot's template. This allows us to use `v-slot` directly on the component:

```html
<todo-list v-slot:default="slotProps">
  <i class="fas fa-check"></i>
  <span class="green">{{ slotProps.item }}<span>
</todo-list>
```

This can be shortened even further. Just as non-specified content is assumed to be for the default slot, `v-slot` without an argument is assumed to refer to the default slot:

```html
<todo-list v-slot="slotProps">
  <i class="fas fa-check"></i>
  <span class="green">{{ slotProps.item }}<span>
</todo-list>
```

Note that the abbreviated syntax for default slot **cannot** be mixed with named slots, as it would lead to scope ambiguity:

```html
<!-- INVALID, will result in warning -->
<todo-list v-slot="slotProps">
  <todo-list v-slot:default="slotProps">
    <i class="fas fa-check"></i>
    <span class="green">{{ slotProps.item }}<span>
  </todo-list>
  <template v-slot:other="otherSlotProps">
    slotProps is NOT available here
  </template>
</todo-list>
```

Whenever there are multiple slots, use the full `<template>` based syntax for _all_ slots:

```html
<todo-list>
  <template v-slot:default="slotProps">
    <i class="fas fa-check"></i>
    <span class="green">{{ slotProps.item }}<span>
  </template>

  <template v-slot:other="otherSlotProps">
    ...
  </template>
</current-user>
```

### Destructuring Slot Props

Internally, scoped slots work by wrapping your slot content in a function passed a single argument:

```js
function (slotProps) {
  // ... slot content ...
}
```

That means the value of `v-slot` can actually accept any valid JavaScript expression that can appear in the argument position of a function definition. So you can also use [ES2015 destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring) to pull out specific slot props, like so:

```html
<todo-list v-slot="{ item }">
  <i class="fas fa-check"></i>
  <span class="green">{{ item }}<span>
</todo-list>
```

This can make the template much cleaner, especially when the slot provides many props. It also opens other possibilities, such as renaming props, e.g. `item` to `todo`:

```html
<todo-list v-slot="{ item: todo }">
  <i class="fas fa-check"></i>
  <span class="green">{{ todo }}<span>
</todo-list>
```

You can even define fallbacks, to be used in case a slot prop is undefined:

```html
<todo-list v-slot="{ item = 'Placeholder' }">
  <i class="fas fa-check"></i>
  <span class="green">{{ todo }}<span>
</todo-list>
```

## Dynamic Slot Names

[Dynamic directive arguments](template-syntax.md#dynamic-arguments) also work on `v-slot`, allowing the definition of dynamic slot names:

```html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

## Named Slots Shorthand

Similar to `v-on` and `v-bind`, `v-slot` also has a shorthand, replacing everything before the argument (`v-slot:`) with the special symbol `#`. For example, `v-slot:header` can be rewritten as `#header`:

```html
<base-layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

However, just as with other directives, the shorthand is only available when an argument is provided. That means the following syntax is invalid:

```html
<!-- This will trigger a warning -->

<todo-list #="{ item }">
  <i class="fas fa-check"></i>
  <span class="green">{{ item }}<span>
</todo-list>
```

Instead, you must always specify the name of the slot if you wish to use the shorthand:

```html
<todo-list #default="{ item }">
  <i class="fas fa-check"></i>
  <span class="green">{{ item }}<span>
</todo-list>
```
