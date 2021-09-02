# Creating New Projects - FAQ

It's easy to get overwhelmed when starting a new project, especially if you're new to Vue. There are a number of decisions that need to be made before you can even start writing any code. Here we're going to explore some of the most common questions we get asked. In most cases, there is no single right answer and the best approach is dependent on factors specific to your project. Hopefully the guidance on this page can provide some reassurance that you haven't missed anything 'obvious' while making those decisions.

## What do you recommend for a new project?

If you're creating a new project, and you aren't sure which combination of options to choose, we suggest the following baseline:

* Create the project using [Vite](/api/sfc-tooling.html#vite).
* Use [single-file components](/guide/single-file-component.html) with [`<script setup>`](/api/sfc-script-setup.html) and the [Composition API](/guide/composition-api-introduction.html).
* Use [VSCode with Volar](/api/sfc-tooling.html#ide-support).

This should be a good fit for most new projects, but we discuss various other options below.

## Should I be using JavaScript or TypeScript?

Vue itself is written in TypeScript, whereas the documentation examples are predominantly in JavaScript. Neither should be seen as a recommendation, they're just the best fit for their respective use cases. Both JavaScript and TypeScript are in common use in applications.

TypeScript support is an important consideration when new features are added to Vue. APIs that are designed with TypeScript in mind are typically easier for IDEs and linters to understand, even if you aren't using TypeScript yourself. Everybody wins.

For some applications there is a strong technical reason to go one way or the other, but given the strength of feeling many developers have on this topic, it is usually better to go with whichever language is the best fit for your team. Vue isn't really an influencing factor in making that decision.

## Should I use Class Components with TypeScript?

In Vue 2, it was common to use a tool known as [Vue Class Component](https://class-component.vuejs.org/) for improved TypeScript support. This required components to be written using classes and decorators, rather than defining them using objects.

With Vue 3, the core library already solves most of the problems that Class Components were intended to address. Some developers may still have a stylistic preference for using Class Components, but at a technical and DX level there is no longer a compelling reason to use them.

Class Components are still supported in Vue 3, but they should be seen as an alternative approach and not as the mainstream option.

## Should I use Single-File Components?

Probably.

Vue can be used without any build process, loading Vue directly from a CDN. This can be invaluable for some use cases and is very much supported. Single-file components would typically not be used in this scenario as they need to be compiled, introducing a build step. Some of these use cases may be better suited to using [petite-vue](https://github.com/vuejs/petite-vue) instead, which is a 5kb subset of Vue optimized for progressive enhancement.

However, for the majority of modern web applications, using build tools is the norm and the benefits of single-file components far outweigh any downsides. At this point, support for SFCs in IDEs and other tools is so widespread that it's rare to be in a situation where they can't be used.

If you're writing supporting libraries or plugins then single-file components may not be relevant. Vuex, for example, doesn't use components at all. Vue Router does include a couple of components, but they are both written using `render` functions and neither requires any CSS. In that case, using an SFC to wrap the code in a `<script>` tag doesn't add any extra value, it just adds an unnecessary dependency. If you're in a similar scenario then don't feel obliged to use SFCs.

## Which IDE should I use?

See [SFC Tooling - IDE Support](/api/sfc-tooling.html#ide-support).

## Are there alternatives to templates?

The most common approach is to use SFCs with the default Vue template syntax.

SFCs support using preprocessors with the template, e.g. Pug. It isn't a common option, but if your team wants to go down that route then it shouldn't be a problem.

Using `render` functions instead of templates is a bigger jump. Using `render` functions provides a lot of extra flexibility, but at the expense of code that most developers find more difficult to read. We recommend sticking to templates for most application components and only using `render` functions for more complex components that need the extra flexibility. Highly reusable components, such as those found in component libraries, often use `render` functions. It's perfectly normal for a large project to have a handful of components that use `render` functions, especially if you aren't using a third-party component library.

JSX can help to make using `render` functions a little more developer friendly. For most projects, it isn't worth introducing JSX for just a handful of components, but we provide official tooling for using JSX in SFCs to make it as easy as possible. This can also be an appealing option if you've got a background in React.

## Which build tool should I use?

If you're using single-file components then see [SFC Tooling - Project Scaffolding](/api/sfc-tooling.html#project-scaffolding).

If you're developing a library or plugin that doesn't require SFCs, then Rollup may be a good fit. Several of the official Vue repos are using Rollup.

## Should I use the Options API or Composition API?

First, let's clarify what we're asking here.

* Creating components using options such as `data` and `methods` is referred to as the *Options API*.
* Functions such as `reactive` and `ref` can be used independently of components and are known as the *Reactivity API*.
* Creating components using `setup` and function calls like `onMounted` is referred to as the *Composition API*.

The Reactivity API is most commonly used in conjunction with the Composition API, so you may sometimes find them being referred to jointly as the Composition API.

Most Vue components can be written using either the Options API or the Composition API, which brings us to the question of which to use. There are two main approaches commonly seen in real applications.

The first approach is to forgo the Options API entirely and just use the Composition API.

The second approach is to use the Options API by default and to only use the Composition API when there's no other option, e.g. because a third-party library requires it.

If you aren't sure which approach to take, we suggest that you try the Composition API. Using `<script setup>` is also highly recommended, as it cuts away most of the boilerplate.

You might prefer to use the Options API if you don't have a build process and can't use single-file components. You can still use the Composition API in that scenario, but some of the elegance is lost without `<script setup>`.

If your team has used the Options API on previous projects, then familiarity may be an important factor when choosing which way to go on a new project. Code written using the Composition API does not use the `this` keyword to access component properties. Instead, it makes greater use of plain functions and closures. It can feel a little alien at first, especially if you're used to the Options API.

We occasionally receive questions about whether the Options API is deprecated. It isn't. It remains very popular within the community and will continue to be supported so long as that remains the case. As a mature API, it's unlikely to need any major new features, but we remain open to suggestions for further enhancements. We do encourage you to migrate away from mixins though, even within components that use the Options API. Replacing the `mixins` option with a call to a composable is usually a relatively small change that shouldn't impact the rest of the component.

## Should I use `<script setup>`?

If you're using the Composition API with single-file components then `<script setup>` is the recommended approach.

## Why does the documentation start with the Options API?

We're in the process of rewriting the documentation to give both APIs equal visibility.

Prior to the introduction of `<script setup>`, the Options API was usually an easier way to start learning Vue. With the addition of `<script setup>` in Vue 3.2, it is now possible to introduce the Composition API at a much earlier stage in the documentation.

The current guides introduce Vue using a global/CDN approach. Avoiding tooling allows us to jump straight in with writing code, without worrying about whether the reader has prior experience of tools like `npm` or `webpack`. That decision made sense when the documentation was first written, but it increasingly makes the documentation feel disconnected from how real Vue applications are built. The new documentation should also help to tackle this problem.
