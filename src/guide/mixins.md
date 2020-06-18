# Mixins

## Basics

Mixins are a flexible way to distribute reusable functionalities for Vue components. A mixin object can contain any component options. When a component uses a mixin, all options in the mixin will be "mixed" into the component's own options.

Example:

```js
// define a mixin object
const myMixin = {
  created() {
    this.hello()
  },
  methods: {
    hello() {
      console.log('hello from mixin!')
    }
  }
}

// define an app that uses this mixin
const app = Vue.createApp({
  mixins: [myMixin]
})

app.mount('#mixins-basic') // => "hello from mixin!"
```

## Option Merging

When a mixin and the component itself contain overlapping options, they will be "merged" using appropriate strategies.

For example, data objects undergo a recursive merge, with the component's data taking priority in cases of conflicts.

```js
const myMixin = {
  data() {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}

const app = Vue.createApp({
  mixins: [myMixin],
  data() {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created() {
    console.log(this.$data) // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})
```

Hook functions with the same name are merged into an array so that all of them will be called. Mixin hooks will be called **before** the component's own hooks.

```js
const myMixin = {
  created() {
    console.log('mixin hook called')
  }
}

const app = Vue.createApp({
  mixins: [myMixin],
  created() {
    console.log('component hook called')
  }
})

// => "mixin hook called"
// => "component hook called"
```

Options that expect object values, for example `methods`, `components` and `directives`, will be merged into the same object. The component's options will take priority when there are conflicting keys in these objects:

```js
const myMixin = {
  methods: {
    foo() {
      console.log('foo')
    },
    conflicting() {
      console.log('from mixin')
    }
  }
}

const app = Vue.createApp({
  mixins: [myMixin],
  methods: {
    bar() {
      console.log('bar')
    },
    conflicting() {
      console.log('from self')
    }
  }
})

const vm = app.mount('#mixins-basic')

vm.foo() // => "foo"
vm.bar() // => "bar"
vm.conflicting() // => "from self"
```

## Global Mixin

You can also apply a mixin globally for a Vue application:

```js
const app = Vue.createApp({
  myOption: 'hello!'
})

// inject a handler for `myOption` custom option
app.mixin({
  created() {
    const myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

app.mount('#mixins-global') // => "hello!"
```

Use with caution! Once you apply a mixin globally, it will affect **every** Vue instance created afterwards in the given app (for example, child components):

```js
const app = Vue.createApp({
  myOption: 'hello!'
})

// inject a handler for `myOption` custom option
app.mixin({
  created() {
    const myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

// add myOption also to child component
app.component('test-component', {
  myOption: 'hello from component!'
})

app.mount('#mixins-global')

// => "hello!"
// => "hello from component!"
```

In most cases, you should only use it for custom option handling like demonstrated in the example above. It's also a good idea to ship them as [Plugins](plugins.html) to avoid duplicate application.

## Custom Option Merge Strategies

When custom options are merged, they use the default strategy which overwrites the existing value. If you want a custom option to be merged using custom logic, you need to attach a function to `app.config.optionMergeStrategies`:

```js
const app = Vue.createApp({})

app.config.optionMergeStrategies.customOption = (toVal, fromVal) => {
  // return mergedVal
}
```

The merge strategy receives the value of that option defined on the parent and child instances as the first and second arguments, respectively. Let's try to check what do we have in these parameters when we use a mixin:

```js
const app = Vue.createApp({
  custom: 'hello!'
})

app.config.optionMergeStrategies.custom = (toVal, fromVal) => {
  console.log(fromVal, toVal)
  // => "goodbye!", undefined
  // => "hello", "goodbye!"
  return fromVal || toVal
}

app.mixin({
  custom: 'goodbye!',
  created() {
    console.log(this.$options.custom) // => "hello!"
  }
})
```

As you can see, in the console we have `toVal` and `fromVal` printed first from the mixin and then from the `app`. We always return `fromVal` if it exists, that's why `this.$options.custom` is set to `hello!` in the end. Let's try to change a strategy to _always return a value from the child instance_:

```js
const app = Vue.createApp({
  custom: 'hello!'
})

app.config.optionMergeStrategies.custom = (toVal, fromVal) => toVal || fromVal

app.mixin({
  custom: 'goodbye!',
  created() {
    console.log(this.$options.custom) // => "goodbye!"
  }
})
```

In Vue 2, mixins were the primary tool to abstract parts of component logic into reusable chunks. However, they have a few issues:

- Mixins are conflict-prone: Since properties from each feature are merged into the same component, you still have to know about every other feature to avoid property name conflicts and for debugging.

- Reusability is limited: we cannot pass any parameters to the mixin to change its logic which reduces their flexibility in terms of abstracting logic

To address these issues, we added a new way to organize code by logical concerns: the [Composition API](composition-api-introduction.html).
