---
outline: deep
---

# Composition API FAQ {#composition-api-faq}

:::tip
This FAQ assumes prior experience with Vue - in particular, experience with Vue 2 while primarily using Options API.
:::

## What is Composition API? {#what-is-composition-api}

Composition API is a set of APIs that allows us to author Vue components using imported functions instead of declaring options. It is an umbrella term that covers the following APIs:

- [Reactivity API](/api/reactivity-core.html), e.g. `ref()` and `reactive()`, that allows us to directly create reactive state, computed state, and watchers.

- [Lifecycle Hooks](/api/composition-api-lifecycle.html), e.g. `onMounted()` and `onUnmounted()`, that allow us to programmatically hook into the component lifecycle.

- [Dependency Injection](/api/composition-api-dependency-injection.html), i.e. `provide()` and `inject()`, that allow us to leverage Vue's dependency injection system while using Reactivity APIs.

Composition API is a built-in feature of Vue 3 and [Vue 2.7](https://blog.vuejs.org/posts/vue-2-7-naruto.html). For older Vue 2 versions, use the officially maintained [`@vue/composition-api`](https://github.com/vuejs/composition-api) plugin. In Vue 3, it is also primarily used together with the [`<script setup>`](/api/sfc-script-setup.html) syntax in Single-File Components. Here's a basic example of a component using Composition API:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

Despite an API style based on function composition, **Composition API is NOT functional programming**. Composition API is based on Vue's mutable, fine-grained reactivity paradigm, whereas functional programming emphasizes immutability.

If you are interested in learning how to use Vue with Composition API, you can set the site-wide API preference to Composition API using the toggle at the top of the left sidebar, and then go through the guide from the beginning.

## Why Composition API? {#why-composition-api}

### Better Logic Reuse {#better-logic-reuse}

The primary advantage of Composition API is that it enables clean, efficient logic reuse in the form of [Composable functions](/guide/reusability/composables.html). It solves [all the drawbacks of mixins](/guide/reusability/composables.html#vs-mixins), the primary logic reuse mechanism for Options API.

Composition API's logic reuse capability has given rise to impressive community projects such as [VueUse](https://vueuse.org/), an ever-growing collection of composable utilities. It also serves as a clean mechanism for easily integrating stateful third-party services or libraries into Vue's reactivity system, for example [immutable data](/guide/extras/reactivity-in-depth.html#immutable-data), [state machines](/guide/extras/reactivity-in-depth.html#state-machines), and [RxJS](https://vueuse.org/rxjs/readme.html#vueuse-rxjs).

### More Flexible Code Organization {#more-flexible-code-organization}

Many users love that we write organized code by default with Options API: everything has its place based on the option it falls under. However, Options API poses serious limitations when a single component's logic grows beyond a certain complexity threshold. This limitation is particularly prominent in components that need to deal with multiple **logical concerns**, which we have witnessed first hand in many production Vue 2 apps.

Take the folder explorer component from Vue CLI's GUI as an example: this component is responsible for the following logical concerns:

- Tracking current folder state and displaying its content
- Handling folder navigation (opening, closing, refreshing...)
- Handling new folder creation
- Toggling show favorite folders only
- Toggling show hidden folders
- Handling current working directory changes

The [original version](https://github.com/vuejs/vue-cli/blob/a09407dd5b9f18ace7501ddb603b95e31d6d93c0/packages/@vue/cli-ui/src/components/folder/FolderExplorer.vue#L198-L404) of the component was written in Options API. If we give each line of code a color based on the logical concern it is dealing with, this is how it looks:

<img alt="folder component before" src="./images/options-api.png" width="129" height="500" style="margin: 1.2em auto">

Notice how code dealing with the same logical concern is forced to be split under different options, located in different parts of the file. In a component that is several hundred lines long, understanding and navigating a single logical concern requires constantly scrolling up and down the file, making it much more difficult than it should be. In addition, if we ever intend to extract a logical concern into a reusable utility, it takes quite a bit of work to find and extract the right pieces of code from different parts of the file.

Here's the same component, before and after the [refactor into Composition API](https://gist.github.com/yyx990803/8854f8f6a97631576c14b63c8acd8f2e):

![folder component after](./images/composition-api-after.png)

Notice how the code related to the same logical concern can now be grouped together: we no longer need to jump between different options blocks while working on a specific logical concern. Moreover, we can now move a group of code into an external file with minimal effort, since we no longer need to shuffle the code around in order to extract them. This reduced friction for refactoring is key to the long-term maintainability in large codebases.

### Better Type Inference {#better-type-inference}

In recent years, more and more frontend developers are adopting [TypeScript](https://www.typescriptlang.org/) as it helps us write more robust code, make changes with more confidence, and provides a great development experience with IDE support. However, the Options API, originally conceived in 2013, was designed without type inference in mind. We had to implement some [absurdly complex type gymnastics](https://github.com/vuejs/core/blob/44b95276f5c086e1d88fa3c686a5f39eb5bb7821/packages/runtime-core/src/componentPublicInstance.ts#L132-L165) to make type inference work with the Options API. Even with all this effort, type inference for Options API can still break down for mixins and dependency injection.

This had led many developers who wanted to use Vue with TS to lean towards Class API powered by `vue-class-component`. However, a class-based API heavily relies on ES decorators, a language feature that was only a stage 2 proposal when Vue 3 was being developed in 2019. We felt it was too risky to base an official API on an unstable proposal. Since then, the decorators proposal has gone through yet another complete overhaul, and finally reached stage 3 in 2022. In addition, class-based API suffers from logic reuse and organization limitations similar to Options API.

In comparison, Composition API utilizes mostly plain variables and functions, which are naturally type friendly. Code written in Composition API can enjoy full type inference with little need for manual type hints. Most of the time, Composition API code will look largely identical in TypeScript and plain JavaScript. This also makes it possible for plain JavaScript users to benefit from partial type inference.

### Smaller Production Bundle and Less Overhead {#smaller-production-bundle-and-less-overhead}

Code written in Composition API and `<script setup>` is also more efficient and minification-friendly than Options API equivalent. This is because the template in a `<script setup>` component is compiled as a function inlined in the same scope of the `<script setup>` code. Unlike property access from `this`, the compiled template code can directly access variables declared inside `<script setup>`, without an instance proxy in between. This also leads to better minification because all the variable names can be safely shortened.

## Relationship with Options API {#relationship-with-options-api}

### Trade-offs {#trade-offs}

Some users moving from Options API found their Composition API code less organized, and concluded that Composition API is "worse" in terms of code organization. We recommend users with such opinions to look at that problem from a different perspective.

It is true that Composition API no longer provides the "guard rails" that guide you to put your code into respective buckets. In return, you get to author component code like how you would write normal JavaScript. This means **you can and should apply any code organization best practices to your Composition API code as you would when writing normal JavaScript**. If you can write well-organized JavaScript, you should also be able to write well-organized Composition API code.

Options API does allow you to "think less" when writing component code, which is why many users love it. However, in reducing the mental overhead, it also locks you into the prescribed code organization pattern with no escape hatch, which can make it difficult to refactor or improve code quality in larger scale projects. In this regard, Composition API provides better long term scalability.

### Does Composition API cover all use cases? {#does-composition-api-cover-all-use-cases}

Yes in terms of stateful logic. When using Composition API, there are only a few options that may still be needed: `props`, `emits`, `name`, and `inheritAttrs`. If using `<script setup>`, then `inheritAttrs` is typically the only option that may require a separate normal `<script>` block.

If you intend to exclusively use Composition API (along with the options listed above), you can shave a few kbs off your production bundle via a [compile-time flag](https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags) that drops Options API related code from Vue. Note this also affects Vue components in your dependencies.

### Can I use both APIs together? {#can-i-use-both-apis-together}

Yes. You can use Composition API via the [`setup()`](/api/composition-api-setup.html) option in an Options API component.

However, we only recommend doing so if you have an existing Options API codebase that needs to integrate with new features / external libraries written with Composition API.

### Will Options API be deprecated? {#will-options-api-be-deprecated}

No, we do not have any plan to do so. Options API is an integral part of Vue and the reason many developers love it. We also realize that many of the benefits of Composition API only manifest in larger-scale projects, and Options API remains a solid choice for many low-to-medium-complexity scenarios.

## Relationship with Class API {#relationship-with-class-api}

We no longer recommend using Class API with Vue 3, given that Composition API provides great TypeScript integration with additional logic reuse and code organization benefits.

## Comparison with React Hooks {#comparison-with-react-hooks}

Composition API provides the same level of logic composition capabilities as React Hooks, but with some important differences.

React Hooks are invoked repeatedly every time a component updates. This creates a number of caveats that can confuse even seasoned React developers. It also leads to performance optimization issues that can severely affect development experience. Here are some examples:

- Hooks are call-order sensitive and cannot be conditional.

- Variables declared in a React component can be captured by a hook closure and become "stale" if the developer fails to pass in the correct dependencies array. This leads to React developers relying on ESLint rules to ensure correct dependencies are passed. However, the rule is often not smart enough and over-compensates for correctness, which leads to unnecessary invalidation and headaches when edge cases are encountered.

- Expensive computations require the use of `useMemo`, which again requires manually passing in the correct dependencies array.

- Event handlers passed to child components cause unnecessary child updates by default, and require explicit `useCallback` as an optimization. This is almost always needed, and again requires a correct dependencies array. Neglecting this leads to over-rendering apps by default and can cause performance issues without realizing it.

- The stale closure problem, combined with Concurrent features, makes it difficult to reason about when a piece of hooks code is run, and makes working with mutable state that should persist across renders (via `useRef`) cumbersome.

In comparison, Vue Composition API:

- Invokes `setup()` or `<script setup>` code only once. This makes the code align better with the intuitions of idiomatic JavaScript usage as there are no stale closures to worry about. Composition API calls are also not sensitive to call order and can be conditional.

- Vue's runtime reactivity system automatically collects reactive dependencies used in computed properties and watchers, so there's no need to manually declare dependencies.

- No need to manually cache callback functions to avoid unnecessary child updates. In general, Vue's fine-grained reactivity system ensures child components only update when they need to. Manual child-update optimizations are rarely a concern for Vue developers.

We acknowledge the creativity of React Hooks, and it is a major source of inspiration for Composition API. However, the issues mentioned above do exist in its design and we noticed Vue's reactivity model happens to provide a way around them.
