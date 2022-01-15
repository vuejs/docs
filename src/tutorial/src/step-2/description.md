# Declarative Rendering

The core feature of Vue is **declarative rendering**: using a template syntax that extends HTML, we can keep the HTML view in sync with the JavaScript state, automatically.

<div class="composition-api">

We can declare reactive state using the `ref()` API:

```js
const message = ref('Hello World!')
```

A "ref" is an object that exposes its inner value under a `.value` property:

```js
console.log(message.value) // "Hello World!"

// refs can also be mutated.
message.value = 'Changed'
```

<div class="sfc">

Refs declared in the `<script setup>` block can be used directly in the template, **without the need of `.value`**. This is how we can render dynamic text based on the value of the `message` ref, using mustaches syntax:

</div>

<div class="html">

A component's state should be declared inside its `setup()` function, and returned using an object:

```js{2,5}
setup() {
  const message = ref('Hello World!')
  return {
    message
  }
}
```

Properties in the returned object will be exposed to the template, and can be accessed **without the need of `.value`**. This is how we can render dynamic text based on the value of `message`, using mustaches syntax:

</div>

```vue-html
<h1>{{ message }}</h1>
```

</div>

<div class="options-api">

We can declare reactive state using the `data` option, which should be a function that returns an object:

<div class="sfc">

```js
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

```js{2-6}
createApp({
  data() {
    return {
      message: 'Hello World!'
    }
  }
}).mount('#app')
```

</div>

The `message` property will be made available in the template. This is how we can render dynamic text based on the value of `message`, using mustaches syntax:

```vue-html
<h1>{{ message }}</h1>
```

</div>

The content inside the mustaches is not limited to just single properties - we can use any valid JavaScript expression:

```vue-html
<h1>{{ message.split('').reverse().join('') }}</h1>
```

<div class="composition-api">

Now, try to create a ref object yourself, and use it as the text content for the `<h1>` in the template.

</div>

<div class="options-api">

Now, try to create a data property yourself, and use it as the text content for the `<h1>` in the template.

</div>
