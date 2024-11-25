# Vue and Web Components {#vue-and-web-components}

[Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) is an umbrella term for a set of web native APIs that allows developers to create reusable custom elements.

We consider Vue and Web Components to be primarily complementary technologies. Vue has excellent support for both consuming and creating custom elements. Whether you are integrating custom elements into an existing Vue application, or using Vue to build and distribute custom elements, you are in good company.

## Using Custom Elements in Vue {#using-custom-elements-in-vue}

Vue [scores a perfect 100% in the Custom Elements Everywhere tests](https://custom-elements-everywhere.com/libraries/vue/results/results.html). Consuming custom elements inside a Vue application largely works the same as using native HTML elements, with a few things to keep in mind:

### Skipping Component Resolution {#skipping-component-resolution}

By default, Vue will attempt to resolve a non-native HTML tag as a registered Vue component before falling back to rendering it as a custom element. This will cause Vue to emit a "failed to resolve component" warning during development. To let Vue know that certain elements should be treated as custom elements and skip component resolution, we can specify the [`compilerOptions.isCustomElement` option](/api/application#app-config-compileroptions).

If you are using Vue with a build setup, the option should be passed via build configs since it is a compile-time option.

#### Example In-Browser Config {#example-in-browser-config}

```js
// Only works if using in-browser compilation.
// If using build tools, see config examples below.
app.config.compilerOptions.isCustomElement = (tag) => tag.includes('-')
```

#### Example Vite Config {#example-vite-config}

```js
// vite.config.js
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    })
  ]
}
```

#### Example Vue CLI Config {#example-vue-cli-config}

```js
// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => ({
        ...options,
        compilerOptions: {
          // treat any tag that starts with ion- as custom elements
          isCustomElement: (tag) => tag.startsWith('ion-')
        }
      }))
  }
}
```

### Passing DOM Properties {#passing-dom-properties}

Since DOM attributes can only be strings, we need to pass complex data to custom elements as DOM properties. When setting props on a custom element, Vue 3 automatically checks DOM-property presence using the `in` operator and will prefer setting the value as a DOM property if the key is present. This means that, in most cases, you won't need to think about this if the custom element follows the [recommended best practices](https://web.dev/custom-elements-best-practices/).

However, there could be rare cases where the data must be passed as a DOM property, but the custom element does not properly define/reflect the property (causing the `in` check to fail). In this case, you can force a `v-bind` binding to be set as a DOM property using the `.prop` modifier:

```vue-html
<my-element :user.prop="{ name: 'jack' }"></my-element>

<!-- shorthand equivalent -->
<my-element .user="{ name: 'jack' }"></my-element>
```

## Building Custom Elements with Vue {#building-custom-elements-with-vue}

The primary benefit of custom elements is that they can be used with any framework, or even without a framework. This makes them ideal for distributing components where the end consumer may not be using the same frontend stack, or when you want to insulate the end application from the implementation details of the components it uses.

### defineCustomElement {#definecustomelement}

Vue supports creating custom elements using exactly the same Vue component APIs via the [`defineCustomElement`](/api/custom-elements#definecustomelement) method. The method accepts the same argument as [`defineComponent`](/api/general#definecomponent), but instead returns a custom element constructor that extends `HTMLElement`:

```vue-html
<my-vue-element></my-vue-element>
```

```js
import { defineCustomElement } from 'vue'

const MyVueElement = defineCustomElement({
  // normal Vue component options here
  props: {},
  emits: {},
  template: `...`,

  // defineCustomElement only: CSS to be injected into shadow root
  styles: [`/* inlined css */`]
})

// Register the custom element.
// After registration, all `<my-vue-element>` tags
// on the page will be upgraded.
customElements.define('my-vue-element', MyVueElement)

// You can also programmatically instantiate the element:
// (can only be done after registration)
document.body.appendChild(
  new MyVueElement({
    // initial props (optional)
  })
)
```

#### Lifecycle {#lifecycle}

- A Vue custom element will mount an internal Vue component instance inside its shadow root when the element's [`connectedCallback`](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks) is called for the first time.

- When the element's `disconnectedCallback` is invoked, Vue will check whether the element is detached from the document after a microtask tick.

  - If the element is still in the document, it's a move and the component instance will be preserved;

  - If the element is detached from the document, it's a removal and the component instance will be unmounted.

#### Props {#props}

- All props declared using the `props` option will be defined on the custom element as properties. Vue will automatically handle the reflection between attributes / properties where appropriate.

  - Attributes are always reflected to corresponding properties.

  - Properties with primitive values (`string`, `boolean` or `number`) are reflected as attributes.

- Vue also automatically casts props declared with `Boolean` or `Number` types into the desired type when they are set as attributes (which are always strings). For example, given the following props declaration:

  ```js
  props: {
    selected: Boolean,
    index: Number
  }
  ```

  And the custom element usage:

  ```vue-html
  <my-element selected index="1"></my-element>
  ```

  In the component, `selected` will be cast to `true` (boolean) and `index` will be cast to `1` (number).

#### Events {#events}

Events emitted via `this.$emit` or setup `emit` are dispatched as native [CustomEvents](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events#adding_custom_data_%E2%80%93_customevent) on the custom element. Additional event arguments (payload) will be exposed as an array on the CustomEvent object as its `detail` property.

#### Slots {#slots}

Inside the component, slots can be rendered using the `<slot/>` element as usual. However, when consuming the resulting element, it only accepts [native slots syntax](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots):

- [Scoped slots](/guide/components/slots#scoped-slots) are not supported.

- When passing named slots, use the `slot` attribute instead of the `v-slot` directive:

  ```vue-html
  <my-element>
    <div slot="named">hello</div>
  </my-element>
  ```

#### Provide / Inject {#provide-inject}

The [Provide / Inject API](/guide/components/provide-inject#provide-inject) and its [Composition API equivalent](/api/composition-api-dependency-injection#provide) also work between Vue-defined custom elements. However, note that this works **only between custom elements**. i.e. a Vue-defined custom element won't be able to inject properties provided by a non-custom-element Vue component.

#### App Level Config <sup class="vt-badge" data-text="3.5+" /> {#app-level-config}

You can configure the app instance of a Vue custom element using the `configureApp` option:

```js
defineCustomElement(MyComponent, {
  configureApp(app) {
    app.config.errorHandler = (err) => {
      /* ... */
    }
  }
})
```

### SFC as Custom Element {#sfc-as-custom-element}

`defineCustomElement` also works with Vue Single-File Components (SFCs). However, with the default tooling setup, the `<style>` inside the SFCs will still be extracted and merged into a single CSS file during production build. When using an SFC as a custom element, it is often desirable to inject the `<style>` tags into the custom element's shadow root instead.

The official SFC toolings support importing SFCs in "custom element mode" (requires `@vitejs/plugin-vue@^1.4.0` or `vue-loader@^16.5.0`). An SFC loaded in custom element mode inlines its `<style>` tags as strings of CSS and exposes them under the component's `styles` option. This will be picked up by `defineCustomElement` and injected into the element's shadow root when instantiated.

To opt-in to this mode, simply end your component file name with `.ce.vue`:

```js
import { defineCustomElement } from 'vue'
import Example from './Example.ce.vue'

console.log(Example.styles) // ["/* inlined css */"]

// convert into custom element constructor
const ExampleElement = defineCustomElement(Example)

// register
customElements.define('my-example', ExampleElement)
```

If you wish to customize what files should be imported in custom element mode (for example, treating _all_ SFCs as custom elements), you can pass the `customElement` option to the respective build plugins:

- [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#using-vue-sfcs-as-custom-elements)
- [vue-loader](https://github.com/vuejs/vue-loader/tree/next#v16-only-options)

### Tips for a Vue Custom Elements Library {#tips-for-a-vue-custom-elements-library}

When building custom elements with Vue, the elements will rely on Vue's runtime. There is a ~16kb baseline size cost depending on how many features are being used. This means it is not ideal to use Vue if you are shipping a single custom element - you may want to use vanilla JavaScript, [petite-vue](https://github.com/vuejs/petite-vue), or frameworks that specialize in small runtime size. However, the base size is more than justifiable if you are shipping a collection of custom elements with complex logic, as Vue will allow each component to be authored with much less code. The more elements you are shipping together, the better the trade-off.

If the custom elements will be used in an application that is also using Vue, you can choose to externalize Vue from the built bundle so that the elements will be using the same copy of Vue from the host application.

It is recommended to export the individual element constructors to give your users the flexibility to import them on-demand and register them with desired tag names. You can also export a convenience function to automatically register all elements. Here's an example entry point of a Vue custom element library:

```js
// elements.js

import { defineCustomElement } from 'vue'
import Foo from './MyFoo.ce.vue'
import Bar from './MyBar.ce.vue'

const MyFoo = defineCustomElement(Foo)
const MyBar = defineCustomElement(Bar)

// export individual elements
export { MyFoo, MyBar }

export function register() {
  customElements.define('my-foo', MyFoo)
  customElements.define('my-bar', MyBar)
}
```

A consumer can use the elements in a Vue file,

```vue
<script setup>
import { register } from 'path/to/elements.js'
register()
</script>

<template>
  <my-foo ...>
    <my-bar ...></my-bar>
  </my-foo>
</template>
```

or in any other framework such as one with JSX, and with custom names:

```jsx
import { MyFoo, MyBar } from 'path/to/elements.js'

customElements.define('some-foo', MyFoo)
customElements.define('some-bar', MyBar)

export function MyComponent() {
  return <>
    <some-foo ...>
      <some-bar ...></some-bar>
    </some-foo>
  </>
}
```

### Vue-based Web Components and TypeScript {#web-components-and-typescript}

When writing Vue SFC templates, you may want to [type check](/guide/scaling-up/tooling.html#typescript) your Vue components, including those that are defined as custom elements.

Custom elements are registered globally in browsers using their built-in APIs, and by default they won't have type inference when used in Vue templates. To provide type support for Vue components registered as custom elements, we can register global component typings by augmenting the [`GlobalComponents` interface](https://github.com/vuejs/language-tools/wiki/Global-Component-Types) for type checking in Vue templates (JSX users can augment the [JSX.IntrinsicElements](https://www.typescriptlang.org/docs/handbook/jsx.html#intrinsic-elements) type instead, which is not shown here).

Here is how to define the type for a custom element made with Vue:

```typescript
import { defineCustomElement } from 'vue'

// Import the Vue component.
import SomeComponent from './src/components/SomeComponent.ce.vue'

// Turn the Vue component into a Custom Element class.
export const SomeElement = defineCustomElement(SomeComponent)

// Remember to register the element class with the browser.
customElements.define('some-element', SomeElement)

// Add the new element type to Vue's GlobalComponents type.
declare module 'vue' {
  interface GlobalComponents {
    // Be sure to pass in the Vue component type here (SomeComponent, *not* SomeElement).
    // Custom Elements require a hyphen in their name, so use the hyphenated element name here.
    'some-element': typeof SomeComponent
  }
}
```

## Non-Vue Web Components and TypeScript {#non-vue-web-components-and-typescript}

Here is the recommended way to enable type checking in SFC templates of Custom
Elements that are not built with Vue.

> [!Note]
> This approach is one possible way to do it, but it may vary depending on the
> framework being used to create the custom elements.

Suppose we have a custom element with some JS properties and events defined, and
it is shipped in a library called `some-lib`:

```ts
// file: some-lib/src/SomeElement.ts

// Define a class with typed JS properties.
export class SomeElement extends HTMLElement {
  foo: number = 123
  bar: string = 'blah'

  lorem: boolean = false

  // This method should not be exposed to template types.
  someMethod() {
    /* ... */
  }

  // ... implementation details omitted ...
  // ... assume the element dispatches events named "apple-fell" ...
}

customElements.define('some-element', SomeElement)

// This is a list of properties of SomeElement that will be selected for type
// checking in framework templates (f.e. Vue SFC templates). Any other
// properties will not be exposed.
export type SomeElementAttributes = 'foo' | 'bar'

// Define the event types that SomeElement dispatches.
export type SomeElementEvents = {
  'apple-fell': AppleFellEvent
}

export class AppleFellEvent extends Event {
  /* ... details omitted ... */
}
```

The implementation details have been omitted, but the important part is that we
have type definitions for two things: prop types and event types.

Let's create a type helper for easily registering custom element type
definitions in Vue:

```ts
// file: some-lib/src/DefineCustomElement.ts

// We can re-use this type helper per each element we need to define.
type DefineCustomElement<
  ElementType extends HTMLElement,
  Events extends EventMap = {},
  SelectedAttributes extends keyof ElementType = keyof ElementType
> = new () => ElementType & {
  // Use $props to define the properties exposed to template type checking. Vue
  // specifically reads prop definitions from the `$props` type. Note that we
  // combine the element's props with the global HTML props and Vue's special
  // props.
  /** @deprecated Do not use the $props property on a Custom Element ref, this is for template prop types only. */
  $props: HTMLAttributes &
    Partial<Pick<ElementType, SelectedAttributes>> &
    PublicProps

  // Use $emit to specifically define event types. Vue specifically reads event
  // types from the `$emit` type. Note that `$emit` expects a particular format
  // that we map `Events` to.
  /** @deprecated Do not use the $emit property on a Custom Element ref, this is for template prop types only. */
  $emit: VueEmit<Events>
}

type EventMap = {
  [event: string]: Event
}

// This maps an EventMap to the format that Vue's $emit type expects.
type VueEmit<T extends EventMap> = EmitFn<{
  [K in keyof T]: (event: T[K]) => void
}>
```

> [!Note]
> We marked `$props` and `$emit` as deprecated so that when we get a `ref` to a
> custom element we will not be tempted to use these properties, as these
> properties are for type checking purposes only when it comes to custom elements.
> These properties do not actually exist on the custom element instances.

Using the type helper we can now select the JS properties that should be exposed
for type checking in Vue templates:

```ts
// file: some-lib/src/SomeElement.vue.ts

import {
  SomeElement,
  SomeElementAttributes,
  SomeElementEvents
} from './SomeElement.js'
import type { Component } from 'vue'
import type { DefineCustomElement } from './DefineCustomElement'

// Add the new element type to Vue's GlobalComponents type.
declare module 'vue' {
  interface GlobalComponents {
    'some-element': DefineCustomElement<
      SomeElement,
      SomeElementAttributes,
      SomeElementEvents
    >
  }
}
```

Suppose that `some-lib` builds its source TypeScript files into a `dist/` folder. A user of
`some-lib` can then import `SomeElement` and use it in a Vue SFC like so:

```vue
<script setup lang="ts">
// This will create and register the element with the browser.
import 'some-lib/dist/SomeElement.js'

// A user that is using TypeScript and Vue should additionally import the
// Vue-specific type definition (users of other frameworks may import other
// framework-specific type definitions).
import type {} from 'some-lib/dist/SomeElement.vue.js'

import { useTemplateRef, onMounted } from 'vue'

const el = useTemplateRef('el')

onMounted(() => {
  console.log(
    el.value!.foo,
    el.value!.bar,
    el.value!.lorem,
    el.value!.someMethod()
  )

  // Do not use these props, they are `undefined` (IDE will show them crossed out):
  el.$props
  el.$emit
})
</script>

<template>
  <!-- Now we can use the element, with type checking: -->
  <some-element
    ref="el"
    :foo="456"
    :blah="'hello'"
    @apple-fell="
      (event) => {
        // The type of `event` is inferred here to be `AppleFellEvent`
      }
    "
  ></some-element>
</template>
```

If an element does not have type definitions, the types of the properties and events can be
defined in a more manual fashion:

```vue
<script setup lang="ts">
// Suppose that `some-lib` is plain JS without type defintions, and TypeScript
// cannot infer the types:
import { SomeElement } from 'some-lib'

// We'll use the same type helper as before.
import { DefineCustomElement } from './DefineCustomElement'

type SomeElementProps = { foo?: number; bar?: string }
type SomeElementEvents = { 'apple-fell': AppleFellEvent }
interface AppleFellEvent extends Event {
  /* ... */
}

// Add the new element type to Vue's GlobalComponents type.
declare module 'vue' {
  interface GlobalComponents {
    'some-element': DefineCustomElement<
      SomeElementProps,
      SomeElementEvents
    >
  }
}

// ... same as before, use a reference to the element ...
</script>

<template>
  <!-- ... same as before, use the element in the template ... -->
</template>
```

Custom Element authors should not automatically export framework-specific custom
element type definitions from their libraries, for example they should not
export them from an `index.ts` file that also exports the rest of the library,
otherwise users will have unexpected module augmentation errors. Users should
import the framework-specific type definition file that they need.

## Web Components vs. Vue Components {#web-components-vs-vue-components}

Some developers believe that framework-proprietary component models should be avoided, and that exclusively using Custom Elements makes an application "future-proof". Here we will try to explain why we believe that this is an overly simplistic take on the problem.

There is indeed a certain level of feature overlap between Custom Elements and Vue Components: they both allow us to define reusable components with data passing, event emitting, and lifecycle management. However, Web Components APIs are relatively low-level and bare-bones. To build an actual application, we need quite a few additional capabilities which the platform does not cover:

- A declarative and efficient templating system;

- A reactive state management system that facilitates cross-component logic extraction and reuse;

- A performant way to render the components on the server and hydrate them on the client (SSR), which is important for SEO and [Web Vitals metrics such as LCP](https://web.dev/vitals/). Native custom elements SSR typically involves simulating the DOM in Node.js and then serializing the mutated DOM, while Vue SSR compiles into string concatenation whenever possible, which is much more efficient.

Vue's component model is designed with these needs in mind as a coherent system.

With a competent engineering team, you could probably build the equivalent on top of native Custom Elements - but this also means you are taking on the long-term maintenance burden of an in-house framework, while losing out on the ecosystem and community benefits of a mature framework like Vue.

There are also frameworks built using Custom Elements as the basis of their component model, but they all inevitably have to introduce their proprietary solutions to the problems listed above. Using these frameworks entails buying into their technical decisions on how to solve these problems - which, despite what may be advertised, doesn't automatically insulate you from potential future churns.

There are also some areas where we find custom elements to be limiting:

- Eager slot evaluation hinders component composition. Vue's [scoped slots](/guide/components/slots#scoped-slots) are a powerful mechanism for component composition, which can't be supported by custom elements due to native slots' eager nature. Eager slots also mean the receiving component cannot control when or whether to render a piece of slot content.

- Shipping custom elements with shadow DOM scoped CSS today requires embedding the CSS inside JavaScript so that they can be injected into shadow roots at runtime. They also result in duplicated styles in markup in SSR scenarios. There are [platform features](https://github.com/whatwg/html/pull/4898/) being worked on in this area - but as of now they are not yet universally supported, and there are still production performance / SSR concerns to be addressed. In the meanwhile, Vue SFCs provide [CSS scoping mechanisms](/api/sfc-css-features) that support extracting the styles into plain CSS files.

Vue will always stay up to date with the latest standards in the web platform, and we will happily leverage whatever the platform provides if it makes our job easier. However, our goal is to provide solutions that work well and work today. That means we have to incorporate new platform features with a critical mindset - and that involves filling the gaps where the standards fall short while that is still the case.
