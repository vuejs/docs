# Declarative Rendering

The core feature of Vue is **declarative rendering**: using a template syntax that extends HTML, we can keep the HTML view in sync with the JavaScript state, automatically.

<div class="composition-api">

We can declare reactive state using `reactive()`. Objects created from `reactive()` are proxies that work just like normal objects:

```js
import { reactive } from 'vue'

const counter = reactive({
  count: 1
})

console.log(counter.count) // 0
counter.count++
```

`reactive()` only works on objects (including arrays and built-in types like `Map` and `Set`). `ref()`, on the other hand, can take any value type and create an object that exposes the inner value under a `.value` property:

```js
import { ref } from 'vue'

const message = ref('Hello World!')

console.log(message.value) // "Hello World!"
message.value = 'Changed'
```

Details on `reactive()` and `ref()` are discussed in <a target="_blank" href="/guide/essentials/reactivity-fundamentals.html">Guide - Reactivity Fundamentals</a>.

<div class="sfc">

Variables declared in the `<script setup>` block can be used directly in the template. This is how we can render dynamic text based on the value of the `state` object and `message` ref, using mustaches syntax:

</div>

<div class="html">

A component's state should be declared inside its `setup()` function, and returned using an object:

```js{2,5}
setup() {
  const state = reactive({ count: 0 })
  const message = ref('Hello World!')
  return {
    state,
    message
  }
}
```

Properties in the returned object will be exposed to the template. This is how we can render dynamic text based on the value of `message`, using mustaches syntax:

</div>

```vue-html
<h1>{{ message }}</h1>
<p>count is: {{ state.count }}</p>
```

Notice how we did not need to use `.value` when accessing the `message` ref in templates: it is automatically unwrapped for more succinct usage.

</div>

<div class="options-api">

We can declare reactive state using the `data` option, which should be a function that returns an object:

<div class="sfc">

```js{3-5}
export default {
  data() {
    return {
      message: 'Hello World!'
    }
  }
}
```

</div>
<div class="html">

```js{3-5}
createApp({
  data() {
    return {
      message: 'Hello World!'
    }
  }
})
```

</div>

The `message` property will be made available in the template. This is how we can render dynamic text based on the value of `message`, using mustaches syntax:

```vue-html
<h1>{{ message }}</h1>
```

</div>

The content inside the mustaches is not limited to just identifiers or paths - we can use any valid JavaScript expression:

```vue-html
<h1>{{ message.split('').reverse().join('') }}</h1>
```

<div class="composition-api">

Now, try to create some reactive state yourself, and use it to render dynamic text content for the `<h1>` in the template.

</div>

<div class="options-api">

Now, try to create a data property yourself, and use it as the text content for the `<h1>` in the template.

</div>
