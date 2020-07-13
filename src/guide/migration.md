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

## Custom Directives

### Custom Directive Lifecycle API

Abstractions can be incredibly powerful to development, but they tend to break down when there is no escape hatch or extension beyond the original implementation. Custom directives allow us to create directives that are unique to our application.

Previously, we constructed these directives by using the hooks listed below to target an element’s lifecycle, all of which are optional:

- **bind** - Occurs once the directive is bound to the element. Occurs only once.
- **inserted** - Occurs once the element is inserted into the parent DOM.
- **update** - This hook is called when the element updates, but children haven't been updated yet.
- **componentUpdated** - This hook is called once the component and the children have been updated.
- **unbind** - This hook is called once the directive is removed. Also called only once.

Here’s an example of this:

```html
<p v-highlight="yellow">Highlight this text bright yellow</p>
```

```js
Vue.directive('highlight', {
  bind(el, binding, vnode) {
    el.style.background = binding.value
  }
})
```

Here, in the initial setup for this element, the directive binds a style by passing in a value, that can be updated to different values through the application.

In Vue 3, however, we’ve created a more cohesive API for custom directives. As you can see, they differ greatly from our component lifecycle methods even though we’re hooking into similar events. We’ve now unified them like so:

- bind → **beforeMount**
- inserted → **mounted**
- **beforeUpdate**: new! this is called before the element itself is updated, much like the component lifecycle hooks.
- update → removed! There were too many similarities to updated, so this is redundant. Please use updated instead.
- componentUpdated → **updated**
- **beforeUnmount** new! similar to component lifecycle hooks, this will be called right before an element is unmounted.
- unbind -> **unmounted**

The final API is as follows:

```js
const MyDirective = {
  beforeMount(el, binding, vnode, prevVnode) {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {}, // new
  unmounted() {}
}
```

The resulting API could be used like this, mirroring the example from earlier:

```html
<p v-highlight="yellow">Highlight this text bright yellow</p>
```

```js
Vue.directive('highlight', {
  beforeMount(el, binding, vnode) {
    el.style.background = binding.value
  }
})
```

Now that the custom directive lifecycle hooks mirror those of the components themselves, they become easier to reason about and remember!

#### Implementation Details

In Vue 3, we’re now supporting fragments, which allow us to return more than one DOM node per component. You can imagine how handy that is for something like a component with multiple lis or the children elements of a table:

```html
<>
  <li>Hello</li>
  <li>Vue</li>
  <li>Devs!</li>
</>
```

As wonderfully flexible as this is, we can potentially encounter a problem with a custom directive that could potentially have multiple root nodes.

As a result, custom directives are included as part of a virtual DOM node’s data. When a custom directive is used on a component, hooks are passed down to the component as extraneous props and end up in this.\$attrs.

[//]: # 'TODO: add in a better example'

[example]

This also means it's possible to directly hook into an element's lifecycle like this in the template, which can be handy when a custom directive is too involved:

[write a better example with more text when it’s implemented]

```html
<div @vnodeMounted="myHook" />
```

[//]: # 'TODO: add in link'

This is consistent with the attribute fallthrough behavior, so when a child component uses `v-bind="$attrs"` on an inner element, it will apply any custom directives used on it as well.
