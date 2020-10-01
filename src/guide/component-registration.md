# Component Registration

> This page assumes you've already read the [Components Basics](component-basics.md). Read that first if you are new to components.

## Component Names

When registering a component, it will always be given a name. For example, in the global registration we've seen so far:

```js
const app = Vue.createApp({...})

app.component('my-component-name', {
  /* ... */
})
```

The component's name is the first argument of `app.component`. In the example above, the component's name is "my-component-name".

The name you give a component may depend on where you intend to use it. When using a component directly in the DOM (as opposed to in a string template or [single-file component](../guide/single-file-component.html)), we strongly recommend following the [W3C rules](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name) for custom tag names:

1. All lowercase
2. Contains a hyphen (i.e., has multiple words connected with the hyphen symbol)

By doing so, this will help you avoid conflicts with current and future HTML elements.

You can see other recommendations for component names in the [Style Guide](../style-guide/#base-component-names-strongly-recommended).

### Name Casing

When defining components in a string template or a single-file component, you have two options when defining component names:

#### With kebab-case

```js
app.component('my-component-name', {
  /* ... */
})
```

When defining a component with kebab-case, you must also use kebab-case when referencing its custom element, such as in `<my-component-name>`.

#### With PascalCase

```js
app.component('MyComponentName', {
  /* ... */
})
```

When defining a component with PascalCase, you can use either case when referencing its custom element. That means both `<my-component-name>` and `<MyComponentName>` are acceptable. Note, however, that only kebab-case names are valid directly in the DOM (i.e. non-string templates).

## Global Registration

So far, we've only created components using `app.component`:

```js
Vue.createApp({...}).component('my-component-name', {
  // ... options ...
})
```

These components are **globally registered** for the application. That means they can be used in the template of any component instance within this application:

```js
const app = Vue.createApp({})

app.component('component-a', {
  /* ... */
})
app.component('component-b', {
  /* ... */
})
app.component('component-c', {
  /* ... */
})

app.mount('#app')
```

```html
<div id="app">
  <component-a></component-a>
  <component-b></component-b>
  <component-c></component-c>
</div>
```

This even applies to all subcomponents, meaning all three of these components will also be available _inside each other_.

## Local Registration

Global registration often isn't ideal. For example, if you're using a build system like Webpack, globally registering all components means that even if you stop using a component, it could still be included in your final build. This unnecessarily increases the amount of JavaScript your users have to download.

In these cases, you can define your components as plain JavaScript objects:

```js
const ComponentA = {
  /* ... */
}
const ComponentB = {
  /* ... */
}
const ComponentC = {
  /* ... */
}
```

Then define the components you'd like to use in a `components` option:

```js
const app = Vue.createApp({
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})
```

For each property in the `components` object, the key will be the name of the custom element, while the value will contain the options object for the component.

Note that **locally registered components are _not_ also available in subcomponents**. For example, if you wanted `ComponentA` to be available in `ComponentB`, you'd have to use:

```js
const ComponentA = {
  /* ... */
}

const ComponentB = {
  components: {
    'component-a': ComponentA
  }
  // ...
}
```

Or if you're using ES2015 modules, such as through Babel and Webpack, that might look more like:

```js
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  }
  // ...
}
```

Note that in ES2015+, placing a variable name like `ComponentA` inside an object is shorthand for `ComponentA: ComponentA`, meaning the name of the variable is both:

- the custom element name to use in the template, and
- the name of the variable containing the component options

## Module Systems

If you're not using a module system with `import`/`require`, you can probably skip this section for now. If you are, we have some special instructions and tips just for you.

### Local Registration in a Module System

If you're still here, then it's likely you're using a module system, such as with Babel and Webpack. In these cases, we recommend creating a `components` directory, with each component in its own file.

Then you'll need to import each component you'd like to use, before you locally register it. For example, in a hypothetical `ComponentB.js` or `ComponentB.vue` file:

```js
import ComponentA from './ComponentA'
import ComponentC from './ComponentC'

export default {
  components: {
    ComponentA,
    ComponentC
  }
  // ...
}
```

Now both `ComponentA` and `ComponentC` can be used inside `ComponentB`'s template.
