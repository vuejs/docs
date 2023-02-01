# Glossary

This glossary is intended to provide some rough guidance about the meanings of technical terms that are in common usage when talking about Vue. It is intended to be *descriptive* of how terms are commonly used, not a *prescriptive* specification of how they must be used. Some terms may have slightly different meanings or nuances depending on the surrounding context.

[[TOC]]

## compiler macro

A *compiler macro* is special code that is processed by a compiler and converted into something else. They are effectively just a clever form of string replacement.

Vue's [SFC](#single-file-component) compiler supports various macros, such as `defineProps()`, `defineEmits()` and `defineExpose()`. These macros are intentionally designed to look like normal JavaScript functions, but they aren't functions at all. These are special strings that the compiler detects and replaces with the real JavaScript code that will run in the browser.

Macros have limitations on their use that don't apply to normal JavaScript code. For example, you might think that `const dp = defineProps` would allow you to create an alias for `defineProps`, but it'll actually result in an error. There are also limitations on what values can be passed to `defineProps()`, as the 'arguments' have to be processed by the compiler and not at runtime.

These macros are conceptually similar to dynamic imports using `import()`. While `import()` looks a lot like a function call, it's actually special syntax that gets processed by the bundler as part of the build. Like with `defineProps()`, we can't create an alias using `const myImport = import`. There are also restrictions on exactly what syntax can be used to pass values to the 'function', so that the compiler can understand the values.

## composable

The term *composable* describes a common usage pattern in Vue. It isn't a separate feature of Vue, it's just a way of using the framework's Composition API. As with many patterns, there can be some disagreement about whether specific code qualifies for the label.

* A composable is a function.
* The function name usually begins with `use` so that other developers know it's a composable.
* The function is typically expected to be called from inside a component's `setup()` function (or within a `<script setup>` block). This ties the invocation of the composable to the current component context, e.g. via calls to `provide()`, `inject` or `onMounted()`. Occasionally a composable may be designed to be called from elsewhere, such as a lifecycle hook.
* Composables typically return a plain object, not a reactive object. This object is usually expected to be destructured within the calling code.

<!-- TODO: Say more -->

See [Guide - Composables](/guide/reusability/composables.html) for more details about writing composables.

## Composition API

The *Composition API* is a collection of functions used to write components and composables in Vue. It includes the [Reactivity API](#reactivity-api), as well as various other functions, such as `provide()` and `inject()` and lifecycle hooks such as `onMounted()`.

In the context of authoring components, a component would typically be described as a 'Composition API component' if it uses `<script setup>` or has an explicit `setup()` function.

For example, it would be common to describe either one of these examples as Composition API components:

```vue
<script setup>
// ...
</script>
```

```vue
<script>
export default {
  setup() {
    // ...
  }
}
</script>
```

In some cases it may be necessary to use functions from the Composition API within the Options API, for example:

```js
import { computed } from 'vue'

export default {
  data() {
    return {
      message: 'hello!'
    }
  },
  provide() {
    return {
      // explicitly provide a computed property
      message: computed(() => this.message)
    }
  }
}
```

Even though `computed()` is part of the Composition API, the component above would usually be described as being an Options API component, not a Composition API component.

## effect

See [reactive effect](#reactive-effect) and [side effect](#side-effect).

## fragment

The term *fragment* refers to a VNode that is used as a parent for other VNodes, but which doesn't render any elements itself.

The name comes from the similar concept of a [`DocumentFragment`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) in the standard DOM.

Fragments are used to support components with multiple root nodes. While such components might appear to have multiple roots, behind the scenes they actually use a fragment node as a single root, as a parent of the 'root' nodes.

Fragments are also used by the template compiler as a way to wrap multiple dynamic nodes, e.g. those created via `v-for` or `v-if`. This allows for extra hints to be passed to the VDOM patching algorithm. Much of this is handled internally, but one place you'll encounter this directly is using a `key` on a `<template>` tag with `v-for`. In that scenario, the `key` is added as a prop to the fragment VNode.

Fragment nodes are currently rendered to the DOM as empty text nodes, though that is an implementation detail. You may encounter that node if you use `$el` or attempt to walk the DOM with built-in browser APIs.

## functional component

A component definition is usually an object containing options. Even if you're using `<script setup>`, the component exported from the `.vue` file will be an object.

A *functional component* is an alternative form of component that is declared using a function instead. That function acts as the render function for the component.

A functional component cannot have any state of its own. It also doesn't go through the usual component lifecycle, so lifecycle hooks can't be used. This makes them slightly lighter than normal, stateful components.

For more details see:
- [Guide - Render Functions & JSX - Functional Components](/guide/extras/render-function.html#functional-components)

## in-DOM template

There are various ways to specify a template for a component. In most cases the template is provided as a string.

The term *in-DOM template* refers to the scenario where the template is provided in the form of DOM nodes, instead of a string. Vue then converts the DOM nodes into a template string using `innerHTML`.

Typically, an in-DOM template starts off as HTML markup written directly in the HTML of the page. The browser then parses this into DOM nodes, which Vue then uses to read off the `innerHTML`.

For more details see:
- [Guide - Creating an Application - In-DOM Root Component Template](/guide/essentials/application.html#in-dom-root-component-template)
- [Guide - Component Basics - DOM Template Parsing Caveats](/guide/essentials/component-basics.html#dom-template-parsing-caveats)
- [Options: Rendering - template](/api/options-rendering.html#template)

## macro

See [compiler macro](#compiler-macro).

## named slot

A component can have multiple slots, differentiated by name. Slots other than the default slot are referred to as *named slots*.

For more details see:
- [Guide - Slots - Named Slots](/guide/components/slots.html#named-slots)

## Options API

Vue components are defined using objects. The properties of these component objects are known as *options*.

Components can be written in two styles. One style uses the Composition API in conjunction with `setup` (either via a `setup()` option or `<script setup>`). The other style makes very little use of the Composition API, instead using various component options to achieve a similar result. The component options that are used in this way are referred to as the *Options API*.

The Options API includes options such as `data()`, `computed`, `methods` and `created`.

Some options, such as `props`, `emits` and `inheritAttrs`, can be used with either API. As they are component options, they can be considered part of the Options API. However, as these options are also used in conjunction with `setup()`, it is usually more useful to think of them as shared between the two component styles.

The `setup()` function itself is a component option, so it *could* be described as part of the Options API. However, this is not how the term 'Options API' is normally used. Instead, the `setup()` function is considered to be part of Composition API.

## prop

There are three common uses of the term *prop*:

* Component props
* VNode props
* Slot props

*Component props* are what most people think of as props. These are explicitly defined by a component using either `defineProps()` or the `props` option.

*VNode props* refers to the properties of the object passed as the second argument to `h()`. These can include component props, but they can also include component events, DOM events, DOM attributes and DOM properties. You'd usually only encounter VNode props if you're working with render functions to manipulate VNodes directly.

*Slot props* are the properties passed to a scoped slot.

In all cases, props are properties that are passed in from elsewhere.

While the word props is derived from the word *properties*, the term props has a much more specific meaning in the context of Vue. You should avoid using it as an abbreviation of properties.

## provide/inject

`provide` and `inject` are a form of inter-component communication.

When a component *provides* a value, all descendants of that component can then choose to grab that value, using `inject`. Unlike with props, the providing component doesn't know precisely which component is receiving the value.

`provide` and `inject` are sometimes used to avoid *prop drilling*. They can also be used as an implicit way for a component to communicate with its slot contents.

`provide` can also be used as the application level, making a value available to all components within that application.

For more details see:
- [Guide - provide / inject](/guide/components/provide-inject.html)

## reactive effect

A *reactive effect* is part of Vue's reactivity system. It refers to the process of tracking the dependencies of a function and re-running that function when those dependencies change.

`watchEffect()` is the most direct way to create an effect. Various other parts of Vue use effects internally. e.g. component rendering updates, `computed()` and `watch()`.

Vue can only track reactive dependencies within a reactive effect. If a property's value is read outside a reactive effect it'll 'lose' reactivity, in the sense that Vue won't know what to do if that property subsequently changes.

The term is derived from 'side effect'. Calling the effect function is a side effect of the property value being changed.

For more details see:
- [Guide - Reactivity in Depth](https://vuejs.org/guide/extras/reactivity-in-depth.html)

## reactivity

In general, *reactivity* refers to the ability to automatically perform actions in response to data changes. For example, updating the DOM or making a network request when a data value changes.

In a Vue context, reactivity is used to describe a collection of features. Those features combine to form a *reactivity system*, which is exposed via the [Reactivity API](#reactivity-api).

There are various different ways that reactivity can be implemented. For example, it can be done by static analysis of code to determine its dependencies. However, Vue doesn't employ that form of reactivity system.

Instead, Vue's reactivity system tracks property access at runtime. It does this using both Proxy wrappers and getter/setter functions for properties.

For more details see:
- [Guide - Reactivity Fundamentals](/guide/essentials/reactivity-fundamentals.html)
- [Guide - Reactivity in Depth](/guide/extras/reactivity-in-depth.html)

## Reactivity API

The *Reactivity API* refers to the core Vue functions related to reactivity. These can be used independently of components. It includes functions such as `ref()`, `reactive()`, `computed()`, `watch()` and `watchEffect()`.

The Reactivity API is a subset of the Composition API.

For more details see:
- [Reactivity API: Core](/api/reactivity-core.html)
- [Reactivity API: Utilities](/api/reactivity-utilities.html)
- [Reactivity API: Advanced](/api/reactivity-advanced.html)

## ref

For the `ref` attribute used in templates, see [template ref](#template-ref) instead.

A `ref` is part of Vue's reactivity system. It is an object with a single reactive property, called `value`.

Vue provides 4 functions to create refs directly: `ref()`, `shallowRef()`, `computed()` and `customRef()`.

For more details see:
- [Guide - Reactivity Fundamentals](/guide/essentials/reactivity-fundamentals.html)
- [Reactivity API: Core](/api/reactivity-core.html)
- [Reactivity API: Utilities](/api/reactivity-utilities.html)
- [Reactivity API: Advanced](/api/reactivity-advanced.html)

## render function

A *render function* is the part of a component that generates the VNodes used during rendering. Templates are compiled down into render functions.

For more details see:
- [Guide - Render Functions & JSX - Functional Components](/guide/extras/render-function.html#functional-components)

## scheduler

The *scheduler* is the part of Vue's internals that controls the timing of when reactive effects are run. 

When reactive state changes, Vue doesn't immediately trigger rendering updates. Instead, it batches them together using a queue. This ensures that a component only re-renders once, even if multiple changes need making to the underlying data.

There are two other queues inside the scheduler. The `flush: 'pre'` queue is processed prior to the rendering queue. The `flush: 'post'` queue runs after the rendering queue. These two queues are used by watchers, with `flush: 'pre'` being the default.

Jobs in the scheduler queues are also used to perform various other internal tasks, such as triggering lifecycle hooks or updating template refs.

## scoped slot

The term *scoped slot* is used to refer to slots that receive props.

Historically, Vue made a much clearer distinction between scoped and non-scoped slots. To some extent they could be regarded as two separate features, with template syntax hiding the distinction in the most common cases.

In Vue 3, the slot APIs were simplified to make all slots behave like scoped slots. However, the use cases for scoped and non-scoped slots often differ, so the term still proves useful when referring to slots with props.

The props passed to a slot can only be used within a specific region of the parent template, responsible for defining the slot's contents. This region of the template behaves as a variable scope for the props, hence 'scoped slot'.

For more details see:
- [Guide - Slots - Scoped Slots](/guide/components/slots.html#scoped-slots)

## SFC

See [Single-File Component](#single-file-component).

## side effect

The term *side effect* is not specific to Vue. It is used to describe operations or functions that do something beyond their local scope.

For example, in the context of setting a property like `user.name = null`, it is expected that this will change the value of `user.name`. If it also does something else, like triggering Vue's reactivity system, then this would be described as a side effect. This is the origin of the term [reactive effect](#reactive-effect) within Vue.

When a function is described as having side effects, it means that the function performs some sort of action that is observable outside the function, aside from just returning a value. This might mean that it updates a value in state, or trigger a network request.

The term is often used when describing rendering or computed properties. It is considered best practice for rendering to have no side effects. Likewise, the getter function for a computed property should have no side effects.

## Single-File Component

The term *Single-File Component*, or SFC, refers to the `.vue` file format that is commonly used for Vue components.

See also:
- [Guide - Single-File Components](/guide/scaling-up/sfc.html)
- [SFC Syntax Specification](/api/sfc-spec.html)

## slot

Slots are used to pass content to child components. Whereas props are used to pass data values, slots are used to pass richer content consisting of HTML elements and other Vue components.

For more details see:
- [Guide - Slots](/guide/components/slots.html)

## template ref

The term *template ref* refers to using a `ref` attribute on a tag within a template. After a component renders, this attribute is used to populate a corresponding property with either the HTML element or the component instance that corresponds to the tag in the template.

Template refs should not be confused with the refs found in Vue's reactivity system.

If you are using the Options API then the refs are exposed via property of the `$refs` object.

With the Composition API, template refs populate a reactive ref with the same name.

For more details see:
- [Guide - Template Refs](/guide/essentials/template-refs.html)

## VDOM

See [virtual DOM](#virtual-dom).

## virtual DOM

The term *virtual DOM* is not unique to Vue. It is a common approach used by several UI frameworks for managing updates to the UI.

Browsers use a tree of nodes to represent the current state of the page. That tree, and the JavaScript APIs used to interact with it, are referred to as the *document object model*, or DOM.

Manipulating the DOM is a major performance bottleneck. The virtual DOM provides one strategy for managing that.

Rather than creating DOM nodes directly, Vue components generate a description of what DOM nodes they would like. These descriptors are plain JavaScript objects, known as VNodes (virtual DOM nodes). Creating VNodes is relatively cheap.

Every time a component re-renders, the new tree of VNodes is compared to the previous tree of VNodes and any difference are then applied to the real DOM. If nothing has changed then the DOM doesn't need to be touched.

For more details see:
- [Guide - Rendering Mechanism](/guide/extras/rendering-mechanism.html)
- [Guide - Render Functions & JSX - Functional Components](/guide/extras/render-function.html#functional-components)

## VNode

A *VNode* is a *virtual DOM node*. They can be created using the [`h()`](/api/render-function.html#h) function.

See [virtual DOM](#virtual-dom) for more information.
