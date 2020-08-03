---
badges:
  - breaking
---

# Global API Treeshaking <MigrationBadges :badges="$frontmatter.badges" />

## 2.x Syntax

If you’ve ever had to manually manipulate DOM in Vue, you might have come across this pattern:

```js
import Vue from 'vue'

Vue.nextTick(() => {
  // something something DOM-related
})
```

Or, if you’ve been unit-testing an application involving [async components](/guide/component-dynamic-async.html), chances are you’ve written something like this:

```js
import { shallowMount } from '@vue/test-utils'
import { MyComponent } from './MyComponent.vue'

test('an async feature', async () => {
  const wrapper = shallowMount(MyComponent)

  // execute some DOM-related tasks

  await wrapper.vm.$nextTick()

  // run your assertions
})
```

`Vue.nextTick()` is a global API exposed directly on a single Vue object – in fact, the instance method `$nextTick()` is just a handy wrapper around `Vue.nextTick()` with the callback’s `this` context automatically bound to the current instance for convenience.

But what if you’ve never had to deal with manual DOM manipulation, nor are you using or testing async components in our app? Or, what if, for whatever reason, you prefer to use the good old `window.setTimeout()` instead? In such a case, the code for `nextTick()` will become dead code – that is, code that’s written but never used. And dead code is hardly a good thing, especially in our client-side context where every kilobyte matters.

Module bundlers like [webpack](https://webpack.js.org/) support [tree-shaking](https://webpack.js.org/guides/tree-shaking/), which is a fancy term for “dead code elimination.” Unfortunately, due to how the code is written in previous Vue versions, global APIs like `Vue.nextTick()` are not tree-shakeable and will be included in the final bundle regardless of where they are actually used or not.

## 3.x Syntax

In Vue 3, the global and internal APIs have been restructured with tree-shaking support in mind. As a result, the global APIs can now only be accessed as named exports for the ES Modules build. For example, our previous snippets should now look like this:

```js
import { nextTick } from 'vue'

nextTick(() => {
  // something something DOM-related
})
```

and

```js
import { shallowMount } from '@vue/test-utils'
import { MyComponent } from './MyComponent.vue'
import { nextTick } from 'vue'

test('an async feature', async () => {
  const wrapper = shallowMount(MyComponent)

  // execute some DOM-related tasks

  await nextTick()

  // run your assertions
})
```

Calling `Vue.nextTick()` directly will now result in the infamous `undefined is not a function` error.

With this change, provided the module bundler supports tree-shaking, global APIs that are not used in a Vue application will be eliminated from the final bundle, resulting in an optimal file size.

## Affected APIs

These global APIs in Vue 2.x are affected by this change:

- `Vue.nextTick`
- `Vue.observable` (replaced by `Vue.reactive`)
- `Vue.version`
- `Vue.compile` (only in full builds)
- `Vue.set` (only in compat builds)
- `Vue.delete` (only in compat builds)

## Internal Helpers

In addition to public APIs, many of the internal components/helpers are now exported as named exports as well. This allows the compiler to output code that only imports features when they are used. For example the following template:

```html
<transition>
  <div v-show="ok">hello</div>
</transition>
```

is compiled into something similar to the following:

```js
import { h, Transition, withDirectives, vShow } from 'vue'

export function render() {
  return h(Transition, [withDirectives(h('div', 'hello'), [[vShow, this.ok]])])
}
```

This essentially means the `Transition` component only gets imported when the application actually makes use of it. In other words, if the application doesn’t have any `<transition>` component, the code supporting this feature will not be present in the final bundle.

With global tree-shaking, the user only “pay” for the features they actually use. Even better, knowing that optional features won't increase the bundle size for applications not using them, framework size has become much less a concern for additional core features in the future, if at all.

::: warning Important
The above only applies to the [ES Modules builds](/guide/installation.html#explanation-of-different-builds) for use with tree-shaking capable bundlers - the UMD build still includes all features and exposes everything on the Vue global variable (and the compiler will produce appropriate output to use APIs off the global instead of importing).
:::

## Usage in Plugins

If your plugin relies on an affected Vue 2.x global API, for instance:

```js
const plugin = {
  install: Vue => {
    Vue.nextTick(() => {
      // ...
    })
  }
}
```

In Vue 3, you’ll have to import it explicitly:

```js
import { nextTick } from 'vue'

const plugin = {
  install: app => {
    nextTick(() => {
      // ...
    })
  }
}
```

If you use a module bundle like webpack, this may cause Vue’s source code to be bundled into the plugin, and more often than not that’s not what you'd expect. A common practice to prevent this from happening is to configure the module bundler to exclude Vue from the final bundle. In webpack's case, you can use the [`externals`](https://webpack.js.org/configuration/externals/) configuration option:

```js
// webpack.config.js
module.exports = {
  /*...*/
  externals: {
    vue: 'Vue'
  }
}
```

This will tell webpack to treat the Vue module as an external library and not bundle it.

If your module bundler of choice happens to be [Rollup](https://rollupjs.org/), you basically get the same effect for free, as by default Rollup will treat absolute module IDs (`'vue'` in our case) as external dependencies and not include them in the final bundle. During bundling though, it might emit a [“Treating vue as external dependency”](https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency) warning, which can be suppressed with the `external` option:

```js
// rollup.config.js
export default {
  /*...*/
  external: ['vue']
}
```
