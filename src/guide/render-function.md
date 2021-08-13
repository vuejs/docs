# Render Functions

Vue recommends using templates to build applications in the vast majority of cases. However, there are situations where we need the full programmatic power of JavaScript. That's where we can use the **render function**.

Let's dive into an example where a `render()` function would be practical. Say we want to generate anchored headings:

```vue-html
<h1>
  <a name="hello-world" href="#hello-world">
    Hello world!
  </a>
</h1>
```

Anchored headings are used very frequently, we should create a component:

```vue-html
<anchored-heading :level="1">Hello world!</anchored-heading>
```

The component must generate a heading based on the `level` prop, and we quickly arrive at this:

```js
const { createApp } = Vue

const app = createApp({})

app.component('anchored-heading', {
  template: `
    <h1 v-if="level === 1">
      <slot></slot>
    </h1>
    <h2 v-else-if="level === 2">
      <slot></slot>
    </h2>
    <h3 v-else-if="level === 3">
      <slot></slot>
    </h3>
    <h4 v-else-if="level === 4">
      <slot></slot>
    </h4>
    <h5 v-else-if="level === 5">
      <slot></slot>
    </h5>
    <h6 v-else-if="level === 6">
      <slot></slot>
    </h6>
  `,
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```

This template doesn't feel great. It's not only verbose, but we're duplicating `<slot></slot>` for every heading level. And when we add the anchor element, we have to again duplicate it in every `v-if/v-else-if` branch.

While templates work great for most components, it's clear that this isn't one of them. So let's try rewriting it with a `render()` function:

```js
const { createApp, h } = Vue

const app = createApp({})

app.component('anchored-heading', {
  render() {
    return h(
      'h' + this.level, // tag name
      {}, // props/attributes
      this.$slots.default() // array of children
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```

The `render()` function implementation is much simpler, but also requires greater familiarity with component instance properties. In this case, you have to know that when you pass children without a `v-slot` directive into a component, like the `Hello world!` inside of `anchored-heading`, those children are stored on the component instance at `$slots.default()`. If you haven't already, **it's recommended to read through the [instance properties API](../api/instance-properties.html) before diving into render functions.**

## The DOM tree

Before we dive into render functions, it’s important to know a little about how browsers work. Take this HTML for example:

```vue-html
<div>
  <h1>My title</h1>
  Some text content
  <!-- TODO: Add tagline -->
</div>
```

When a browser reads this code, it builds a [tree of "DOM nodes"](https://javascript.info/dom-nodes) to help it keep track of everything.

The tree of DOM nodes for the HTML above looks like this:

![DOM Tree Visualization](/images/dom-tree.png)

Every element is a node. Every piece of text is a node. Even comments are nodes! Each node can have children (i.e. each node can contain other nodes).

Updating all these nodes efficiently can be difficult, but thankfully, we never have to do it manually. Instead, we tell Vue what HTML we want on the page, in a template:

```vue-html
<h1>{{ blogTitle }}</h1>
```

Or in a render function:

```js
render() {
  return h('h1', {}, this.blogTitle)
}
```

And in both cases, Vue automatically keeps the page updated, even when `blogTitle` changes.

## The Virtual DOM tree

Vue keeps the page updated by building a **virtual DOM** to keep track of the changes it needs to make to the real DOM. Taking a closer look at this line:

```js
return h('h1', {}, this.blogTitle)
```

What is the `h()` function returning? It's not _exactly_ a real DOM element. It returns a plain object which contains information describing to Vue what kind of node it should render on the page, including descriptions of any child nodes. We call this node description a "virtual node", usually abbreviated to **VNode**. "Virtual DOM" is what we call the entire tree of VNodes, built by a tree of Vue components.

## `h()` Arguments

The `h()` function is a utility to create VNodes. It could perhaps more accurately be named `createVNode()`, but it's called `h()` due to frequent use and for brevity. It accepts three arguments:

```js
// @returns {VNode}
h(
  // {String | Object | Function} tag
  // An HTML tag name, a component, an async component, or a
  // functional component.
  //
  // Required.
  'div',

  // {Object} props
  // An object corresponding to the attributes, props and events
  // we would use in a template.
  //
  // Optional.
  {},

  // {String | Array | Object} children
  // Children VNodes, built using `h()`,
  // or using strings to get 'text VNodes' or
  // an object with slots.
  //
  // Optional.
  [
    'Some text comes first.',
    h('h1', 'A headline'),
    h(MyComponent, {
      someProp: 'foobar'
    })
  ]
)
```

If there are no props then the children can usually be passed as the second argument. In cases where that would be ambiguous, `null` can be passed as the second argument to keep the children as the third argument.

## Complete Example

With this knowledge, we can now finish the component we started:

```js
const { createApp, h } = Vue

const app = createApp({})

/** Recursively get text from children nodes */
function getChildrenTextContent(children) {
  return children
    .map(node => {
      return typeof node.children === 'string'
        ? node.children
        : Array.isArray(node.children)
        ? getChildrenTextContent(node.children)
        : ''
    })
    .join('')
}

app.component('anchored-heading', {
  render() {
    // create kebab-case id from the text contents of the children
    const headingId = getChildrenTextContent(this.$slots.default())
      .toLowerCase()
      .replace(/\W+/g, '-') // replace non-word characters with dash
      .replace(/(^-|-$)/g, '') // remove leading and trailing dashes

    return h('h' + this.level, [
      h(
        'a',
        {
          name: headingId,
          href: '#' + headingId
        },
        this.$slots.default()
      )
    ])
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```

## Constraints

### VNodes Must Be Unique

All VNodes in the component tree must be unique. That means the following render function is invalid:

```js
render() {
  const myParagraphVNode = h('p', 'hi')
  return h('div', [
    // Yikes - duplicate VNodes!
    myParagraphVNode, myParagraphVNode
  ])
}
```

If you really want to duplicate the same element/component many times, you can do so with a factory function. For example, the following render function is a perfectly valid way of rendering 20 identical paragraphs:

```js
render() {
  return h('div',
    Array.from({ length: 20 }).map(() => {
      return h('p', 'hi')
    })
  )
}
```

## Creating Component VNodes

To create a VNode for a component, the first argument passed to `h` should be the component itself:

```js
render() {
  return h(ButtonCounter)
}
```

If we need to resolve a component by name then we can call `resolveComponent`:

```js
const { h, resolveComponent } = Vue

// ...

render() {
  const ButtonCounter = resolveComponent('ButtonCounter')
  return h(ButtonCounter)
}
```

`resolveComponent` is the same function that templates use internally to resolve components by name.

A `render` function will normally only need to use `resolveComponent` for components that are [registered globally](/guide/component-registration.html#global-registration). [Local component registration](/guide/component-registration.html#local-registration) can usually be skipped altogether. Consider the following example:

```js
// We can simplify this
components: {
  ButtonCounter
},
render() {
  return h(resolveComponent('ButtonCounter'))
}
```

Rather than registering a component by name and then looking it up we can use it directly instead:

```js
render() {
  return h(ButtonCounter)
}
```

## Replacing Template Features with Plain JavaScript

### `v-if` and `v-for`

Wherever something can be easily accomplished in plain JavaScript, Vue render functions do not provide a proprietary alternative. For example, in a template using `v-if` and `v-for`:

```vue-html
<ul v-if="items.length">
  <li v-for="item in items">{{ item.name }}</li>
</ul>
<p v-else>No items found.</p>
```

This could be rewritten with JavaScript's `if`/`else` and `map()` in a render function:

```js
props: ['items'],
render() {
  if (this.items.length) {
    return h('ul', this.items.map((item) => {
      return h('li', item.name)
    }))
  } else {
    return h('p', 'No items found.')
  }
}
```

In a template it can be useful to use a `<template>` tag to hold a `v-if` or `v-for` directive. When migrating to a `render` function, the `<template>` tag is no longer required and can be discarded.

### `v-model`

The `v-model` directive is expanded to `modelValue` and `onUpdate:modelValue` props during template compilation—we will have to provide these props ourselves:

```js
props: ['modelValue'],
emits: ['update:modelValue'],
render() {
  return h(SomeComponent, {
    modelValue: this.modelValue,
    'onUpdate:modelValue': value => this.$emit('update:modelValue', value)
  })
}
```

### `v-on`

We have to provide a proper prop name for the event handler, e.g., to handle `click` events, the prop name would be `onClick`.

```js
render() {
  return h('div', {
    onClick: $event => console.log('clicked', $event.target)
  })
}
```

#### Event Modifiers

For the `.passive`, `.capture`, and `.once` event modifiers, they can be concatenated after the event name using camel case.

For example:

```js
render() {
  return h('input', {
    onClickCapture: this.doThisInCapturingMode,
    onKeyupOnce: this.doThisOnce,
    onMouseoverOnceCapture: this.doThisOnceInCapturingMode
  })
}
```

For all other event and key modifiers, no special API is necessary, because we can use event methods in the handler:

| Modifier(s)                                          | Equivalent in Handler                                                                                      |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `.stop`                                              | `event.stopPropagation()`                                                                                  |
| `.prevent`                                           | `event.preventDefault()`                                                                                   |
| `.self`                                              | `if (event.target !== event.currentTarget) return`                                                         |
| Keys:<br>e.g. `.enter`                               | `if (event.key !== 'Enter') return`<br><br>Change `'Enter'` to the appropriate [key](http://keycode.info/) |
| Modifier Keys:<br>`.ctrl`, `.alt`, `.shift`, `.meta` | `if (!event.ctrlKey) return`<br><br>Likewise for `altKey`, `shiftKey`, and `metaKey`                       |

Here's an example with all of these modifiers used together:

```js
render() {
  return h('input', {
    onKeyUp: event => {
      // Abort if the element emitting the event is not
      // the element the event is bound to
      if (event.target !== event.currentTarget) return
      // Abort if the key that went up is not the enter
      // key and the shift key was not held down at the
      // same time
      if (!event.shiftKey || event.key !== 'Enter') return
      // Stop event propagation
      event.stopPropagation()
      // Prevent the default keyup handler for this element
      event.preventDefault()
      // ...
    }
  })
}
```

### Slots

We can access slot contents as arrays of VNodes from [`this.$slots`](../api/instance-properties.html#slots):

```js
render() {
  // `<div><slot></slot></div>`
  return h('div', this.$slots.default())
}
```

```js
props: ['message'],
render() {
  // `<div><slot :text="message"></slot></div>`
  return h('div', this.$slots.default({
    text: this.message
  }))
}
```

For component VNodes, we need to pass the children to `h` as an object rather than an array. Each property is used to populate the slot of the same name:

```js
render() {
  // `<div><child v-slot="props"><span>{{ props.text }}</span></child></div>`
  return h('div', [
    h(
      resolveComponent('child'),
      null,
      // pass `slots` as the children object
      // in the form of { name: props => VNode | Array<VNode> }
      {
        default: (props) => h('span', props.text)
      }
    )
  ])
}
```

The slots are passed as functions, allowing the child component to control the creation of each slot's contents. Any reactive data should be accessed within the slot function to ensure that it's registered as a dependency of the child component and not the parent. Conversely, calls to `resolveComponent` should be made outside the slot function, otherwise they'll resolve relative to the wrong component:

```js
// `<MyButton><MyIcon :name="icon" />{{ text }}</MyButton>`
render() {
  // Calls to resolveComponent should be outside the slot function
  const Button = resolveComponent('MyButton')
  const Icon = resolveComponent('MyIcon')

  return h(
    Button,
    null,
    {
      // Use an arrow function to preserve the `this` value
      default: (props) => {
        // Reactive properties should be read inside the slot function
        // so that they become dependencies of the child's rendering
        return [
          h(Icon, { name: this.icon }),
          this.text
        ]
      }
    }
  )
}
```

If a component receives slots from its parent, they can be passed on directly to a child component:

```js
render() {
  return h(Panel, null, this.$slots)
}
```

They can also be passed individually or wrapped as appropriate:

```js
render() {
  return h(
    Panel,
    null,
    {
      // If we want to pass on a slot function we can
      header: this.$slots.header,

      // If we need to manipulate the slot in some way
      // then we need to wrap it in a new function
      default: (props) => {
        const children = this.$slots.default ? this.$slots.default(props) : []

        return children.concat(h('div', 'Extra child'))
      }
    }
  )
}
```

### `<component>` and `is`

Behind the scenes, templates use `resolveDynamicComponent` to implement the `is` attribute. We can use the same function if we need all the flexibility provided by `is` in our `render` function:

```js
const { h, resolveDynamicComponent } = Vue

// ...

// `<component :is="name"></component>`
render() {
  const Component = resolveDynamicComponent(this.name)
  return h(Component)
}
```

Just like `is`, `resolveDynamicComponent` supports passing a component name, an HTML element name, or a component options object.

However, that level of flexibility is usually not required. It's often possible to replace `resolveDynamicComponent` with a more direct alternative.

For example, if we only need to support component names then `resolveComponent` can be used instead.

If the VNode is always an HTML element then we can pass its name directly to `h`:

```js
// `<component :is="bold ? 'strong' : 'em'"></component>`
render() {
  return h(this.bold ? 'strong' : 'em')
}
```

Similarly, if the value passed to `is` is a component options object then there's no need to resolve anything, it can be passed directly as the first argument of `h`.

Much like a `<template>` tag, a `<component>` tag is only required in templates as a syntactical placeholder and should be discarded when migrating to a `render` function.

### Custom Directives

Custom directives can be applied to a VNode using [`withDirectives`](/api/global-api.html#withdirectives):

```js
const { h, resolveDirective, withDirectives } = Vue

// ...

// <div v-pin:top.animate="200"></div>
render () {
  const pin = resolveDirective('pin')

  return withDirectives(h('div'), [
    [pin, 200, 'top', { animate: true }]
  ])
}
```

[`resolveDirective`](/api/global-api.html#resolvedirective) is the same function that templates use internally to resolve directives by name. That is only necessary if you don't already have direct access to the directive's definition object.

### Built-in Components

[Built-in components](/api/built-in-components.html) such as `<keep-alive>`, `<transition>`, `<transition-group>`, and `<teleport>` are not registered globally by default. This allows bundlers to perform tree-shaking, so that the components are only included in the build if they are used. However, that also means we can't access them using `resolveComponent` or `resolveDynamicComponent`.

Templates have special handling for those components, automatically importing them when they are used. When we're writing our own `render` functions, we need to import them ourselves:

```js
const { h, KeepAlive, Teleport, Transition, TransitionGroup } = Vue

// ...

render () {
  return h(Transition, { mode: 'out-in' }, /* ... */)
}
```

## Return Values for Render Functions

In all of the examples we've seen so far, the `render` function has returned a single root VNode. However, there are alternatives.

Returning a string will create a text VNode, without any wrapping element:

```js
render() {
  return 'Hello world!'
}
```

We can also return an array of children, without wrapping them in a root node. This creates a fragment:

```js
// Equivalent to a template of `Hello<br>world!`
render() {
  return [
    'Hello',
    h('br'),
    'world!'
  ]
}
```

If a component needs to render nothing, perhaps because data is still loading, it can just return `null`. This will be rendered as a comment node in the DOM.

## JSX

If we're writing a lot of `render` functions, it might feel painful to write something like this:

```js
h(
  resolveComponent('anchored-heading'),
  {
    level: 1
  },
  {
    default: () => [h('span', 'Hello'), ' world!']
  }
)
```

Especially when the template version is so concise in comparison:

```vue-html
<anchored-heading :level="1"> <span>Hello</span> world! </anchored-heading>
```

That's why there's a [Babel plugin](https://github.com/vuejs/jsx-next) to use JSX with Vue, getting us back to a syntax that's closer to templates:

```jsx
import AnchoredHeading from './AnchoredHeading.vue'

const app = createApp({
  render() {
    return (
      <AnchoredHeading level={1}>
        <span>Hello</span> world!
      </AnchoredHeading>
    )
  }
})

app.mount('#demo')
```

For more on how JSX maps to JavaScript, see the [usage docs](https://github.com/vuejs/jsx-next#installation).

## Functional Components

Functional components are an alternative form of component that don't have any state of their own. They are rendered without creating a component instance, bypassing the usual component lifecycle.

To create a functional component we use a plain function, rather than an options object. The function is effectively the `render` function for the component. As there is no `this` reference for a functional component, Vue will pass in the `props` as the first argument:

```js
const FunctionalComponent = (props, context) => {
  // ...
}
```

The second argument, `context`, contains three properties: `attrs`, `emit`, and `slots`. These are equivalent to the instance properties [`$attrs`](/api/instance-properties.html#attrs), [`$emit`](/api/instance-methods.html#emit), and [`$slots`](/api/instance-properties.html#slots) respectively.

Most of the usual configuration options for components are not available for functional components. However, it is possible to define [`props`](/api/options-data.html#props) and [`emits`](/api/options-data.html#emits) by adding them as properties:

```js
FunctionalComponent.props = ['value']
FunctionalComponent.emits = ['click']
```

If the `props` option is not specified, then the `props` object passed to the function will contain all attributes, the same as `attrs`. The prop names will not be normalized to camelCase unless the `props` option is specified.

Functional components can be registered and consumed just like normal components. If you pass a function as the first argument to `h`, it will be treated as a functional component.

## Template Compilation

You may be interested to know that Vue's templates actually compile to render functions. This is an implementation detail you usually don't need to know about, but if you'd like to see how specific template features are compiled, you may find it interesting. Below is a little demo using `Vue.compile` to live-compile a template string:

<iframe src="https://vue-next-template-explorer.netlify.app/" width="100%" height="420"></iframe>
