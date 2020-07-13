# Migration

> There's so much here! Does that mean 3.0 is completely different, I'll have to learn the basics all over again, and migrating will be practically impossible?

We're glad you asked! The answer is no. We've gone to great lengths to ensure most of the API is the same and the core concepts haven't changed. It's long because we like to offer very detailed explanations and include a lot of examples. Rest assured, **this is not something you have to read from top to bottom!**

[//]: # 'TODO: update composition API with a link'

Possibly the biggest change is our new Composition API, which is entirely additive- the previous Options API will continue to be supported, as the Composition API is an advanced feature.

## FAQ

> Where should I start in a migration?

[//]: # 'TODO: update this link when we have a migration helper'

1. Start by running the [migration helper](https://github.com/vuejs/vue-migration-helper) on a current project. We've carefully minified and compressed a senior Vue dev into a simple command line interface. Whenever they recognize an obsolete feature, they'll let you know, offer suggestions, and provide links to more info.

2. After that, browse through the table of contents for this page in the sidebar. If you see a topic you may be affected by, but the migration helper didn't catch, check it out.

3. If you have any tests, run them and see what still fails. If you don't have tests, just open the app in your browser and keep an eye out for warnings or errors as you navigate around.

4. By now, your app should be fully migrated. If you're still hungry for more though, you can read the rest of this page - or dive in to the new and improved guide from [the beginning](index.html). Many parts will be skimmable, since you're already familiar with the core concepts.

> How long will it take to migrate a Vue 2.x app to 3.0?

It depends on a few factors:

- The size of your app (small to medium-sized apps will probably be less than a day)

- How many times you get distracted and start playing with a cool new feature. 😉 &nbsp;Not judging, it also happened to us while building 3.0!

[//]: # 'TODO: update this with link to styleguide'

- Which obsolete features you're using. Most can be upgraded with find-and-replace, but others might take a few minutes. If you're not currently following best practices according to our styleguide, Vue 3.0 will also try harder to force you to. This is a good thing in the long run, but could also mean a significant (though possibly overdue) refactor.

> If I upgrade to Vue 3, will I also have to upgrade Vuex and Vue Router?

[//]: # 'TODO: still need to see where this lands'

## Built-in Directives

### `v-model` API Change

In Vue 2, the `v-model` directive required developers to always use the `value` prop. And if developers required different props for different purposes, they would have to resort to using `v-bind.sync`. In addition, this hard-coded relationship between `v-model` and `value` led to issues with how native elements and custom elements were handled.

However, with Vue 3, the API for two-way data binding is being standardized in order to reduce confusion and to allow developers more flexibility with the `v-model` directive.

Using v-model in Vue 3
In Vue 3, by detaching the `v-model` from the `value` prop, developers now have the ability to pass arguments to `v-model` which will allow them to create multiple `v-model` bindings on a single component.

```html
<SignupForm v-model:name="”userName”" v-model:email="”userEmail”" />
```

#### Modifiers

In Vue 2.x, hard-coded modifiers such as `.trim` on `v-model` were introduced to provide an intuitive way to solve common scenarios. However,

[//]: # 'TODO: still need to finish, and perhaps add in caveats'

### `v-model.sync` Replaced with `v-model` Argument

In Vue 2, the `.sync` modifier was created in order to offer a shorthand way to create two-way data binding for a prop. For example, in the event we want a child component to update its own title property, we would have done something like this:

**ChildComponent.vue**

```html
this.$emit('onUpdate:title', newTitle)
```

**ParentComponent.vue**

```html
<child-component v-bind:title.sync="pageTitle"></child-component>
```

However, this led to some confusion since two-way data flow is closely tied to the `v-model` directive, whereas `v-bind` is normally used for one-way data flow for props.

#### How to Sync Props in Vue 3

In Vue 3, we no longer need the `.sync` modifier anymore. Similar to how we can listen for changes to a form input value, Vue 3 allows us to perform "two way data binding" on props by allowing you to pass the prop as an argument to `v-model`.

![v-bind anatomy](/images/v-bind-instead-of-sync.png)

Using the example from before, it can now be simplified to:

**ParentComponent.vue**

```html
<child-component v-model:title="pageTitle"></child-component>
```

By passing our prop title to the `v-model` directive, Vue will listen for an `onUpdate:title` event that will be emitted from the child component in order to update the data accordingly.
