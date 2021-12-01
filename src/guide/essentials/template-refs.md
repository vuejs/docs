# Template Refs

While Vue's declarative rendering model abstracts away most of the direct DOM operations for you, there may still be cases where we need direct access to the underlying DOM elements. To achieve this, we can use the special `ref` attribute:

```vue-html
<input ref="input">
```

`ref` is a special attribute that is similar to `key` and `is`. It allows us to obtain a direct reference to a specific DOM element or child component instance after it's mounted. This may be useful when you want to, for example, programmatically focus an input on component mount, or initialize a 3rd party library on an element.

## Accessing the Refs

<div class="composition-api">

To obtain the reference with Composition API, we need to declare a ref with the same name:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// declare a ref to hold the element reference
// the name must match template ref value
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

</div>
<div class="options-api">

The resulting ref is exposed on `this.$refs`:

```vue
<script setup>
export default {
  mounted() {
    this.$refs.input.focus()
  }
}
</script>

<template>
  <input ref="input" />
</template>
```

</div>

Note that you can only access the ref **after the component is mounted.** If you try to access `$refs.input` in a template expression, it will be `null` on the first render. This is because the element doesn't exist until after the first render!

<div class="composition-api">
If you are trying to watch the changes of a template ref, make sure to account for the case where the ref has `null` value:

```js
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // not mounted yet, or the element was unmounted (e.g. by v-if)
  }
})
```

</div>

## Function Refs

Instead of a string key, the `ref` attribute can also be bound to a function, which will be called on each component update. The function receives the element reference as the first argument:

```vue-html
<input :ref="(el) => { /* assign el to a property or ref */ }">
```

You can, of course, use a method instead of an inline function.

## Refs inside `v-for`

Unlike Vue 2, template refs in Vue 3 will not automatically populate an array when used inside `v-for`. You can, however, achieve that using function refs:

<div class="composition-api">

```vue
<script setup>
import { ref, onBeforeUpdate } from 'vue'

const list = ref([
  /* ... */
])

let itemRefs = []

onBeforeUpdate(() => {
  // reset the array before each update
  itemRefs = []
})
</script>

<template>
  <div v-for="item in list" :ref="(el) => el && itemRefs.push(el)"></div>
</template>
```

</div>
<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      list: [
        /* ... */
      ],
      itemRefs: []
    }
  },
  beforeUpdate() {
    // reset the array before an update
    this.itemRefs = []
  }
}
</script>

<template>
  <div v-for="item in list" :ref="(el) => el && itemRefs.push(el)"></div>
</template>
```

</div>

## Ref on Component

> This section assumes knowledge of [Components](/guide/essentials/component-basics). Feel free to skip it and come back later.

`ref` can also be used on a child component. In this case the reference will be that of a component instance:

<div class="composition-api">

```vue
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {
  // child.value will hold an instance of <Child />
})
</script>

<template>
  <Child ref="child" />
</template>
```

</div>
<div class="options-api">

```vue
<script>
import Child from './Child.vue'

export default {
  components: {
    Child
  },
  mounted() {
    // this.$refs.child will hold an instance of <Child />
  }
}
</script>

<template>
  <Child ref="child" />
</template>
```

</div>

If the child component is using Options API or not using `<script setup>`, the referenced instance will be identical to the child component's `this`, which means the parent component will have full access to every property and method of the child component. This makes it easy to create tightly coupled implementation details between the parent and the child, so component refs should be only used when absolutely needed - in most cases, you should try to implement parent / child interactions using the standard props and emit interfaces first.

<div class="composition-api">

An exception here is that components using `<script setup>` are **private by default**: a parent component referencing a child component using `<script setup>` won't be able to access anything unless the child component choose to expose a public interface using the `defineExpose` macro:

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
```

When a parent gets an instance of this component via template refs, the retrieved instance will be of the shape `{ a: number, b: number }` (refs are automatically unwrapped just like on normal instances).

</div>
<div class="options-api">

The `expose` option can be used to limit the access to a child instance:

```js
export default {
  expose: ['publicData', 'publicMethod'],
  data() {
    publicData: 'foo',
    privateData: 'bar'
  },
  methods: {
    publicMethod() { /* ... */ },
    privateMethod() { /* ... */ }
  }
}
```

In the above example, a parent referencing this component via template ref will only be able to access `publicData` and `publicMethod`.

</div>
