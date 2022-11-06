# Event Listeners {#event-listeners}

We can listen to DOM events using the `v-on` directive:

```vue-html
<button v-on:click="increment">{{ count }}</button>
```

Due to its frequent use, `v-on` also has a shorthand syntax:

```vue-html
<button @click="increment">{{ count }}</button>
```

<div class="options-api">

Here, `increment` references a function declared using the `methods` option:

<div class="sfc">

```js{7-12}
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      // update component state
      this.count++
    }
  }
}
```

</div>
<div class="html">

```js{7-12}
createApp({
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      // update component state
      this.count++
    }
  }
})
```

</div>

Inside a method, we can access the component instance using `this`. The component instance exposes the data properties declared by `data`. We can update the component state by mutating these properties.

</div>

<div class="composition-api">

<div class="sfc">

Here, `increment` is referencing a function declared in `<script setup>`:

```vue{6-9}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  // update component state
  count.value++
}
</script>
```

</div>

<div class="html">

Here, `increment` is referencing a method in the object returned from `setup()`:

```js{$}
setup() {
  const count = ref(0)

  function increment(e) {
    // update component state
    count.value++
  }

  return {
    count,
    increment
  }
}
```

</div>

Inside the function, we can update the component state by mutating refs.

</div>

Event handlers can also use inline expressions, and can simplify common tasks with modifiers. These details are covered in <a target="_blank" href="/guide/essentials/event-handling.html">Guide - Event Handling</a>.

Now, try to implement the `increment` <span class="options-api">method</span><span class="composition-api">function</span> yourself and bind it to the button using `v-on`.
