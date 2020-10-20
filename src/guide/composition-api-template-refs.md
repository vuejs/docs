# Template Refs

> This section uses [single-file component](single-file-component.html) syntax for code examples

> This guide assumes that you have already read the [Composition API Introduction](composition-api-introduction.html) and [Reactivity Fundamentals](reactivity-fundamentals.html). Read that first if you are new to Composition API.

When using the Composition API, the concept of [reactive refs](reactivity-fundamentals.html#creating-standalone-reactive-values-as-refs) and [template refs](component-template-refs.html) are unified. In order to obtain a reference to an in-template element or component instance, we can declare a ref as usual and return it from [setup()](composition-api-setup.html):

```html
<template>
  <div ref="root">This is a root element</div>
</template>

<script>
  import { ref, onMounted } from 'vue'

  export default {
    setup() {
      const root = ref(null)

      onMounted(() => {
        // the DOM element will be assigned to the ref after initial render
        console.log(root.value) // <div>This is a root element</div>
      })

      return {
        root
      }
    }
  }
</script>
```

Here we are exposing `root` on the render context and binding it to the div as its ref via `ref="root"`. In the Virtual DOM patching algorithm, if a VNode's `ref` key corresponds to a ref on the render context, the VNode's corresponding element or component instance will be assigned to the value of that ref. This is performed during the Virtual DOM mount / patch process, so template refs will only get assigned values after the initial render.

Refs used as templates refs behave just like any other refs: they are reactive and can be passed into (or returned from) composition functions.

## Usage with JSX

```js
export default {
  setup() {
    const root = ref(null)

    return () =>
      h('div', {
        ref: root
      })

    // with JSX
    return () => <div ref={root} />
  }
}
```

## Usage inside `v-for`

Composition API template refs do not have special handling when used inside `v-for`. Instead, use function refs to perform custom handling:

```html
<template>
  <div v-for="(item, i) in list" :ref="el => { if (el) divs[i] = el }">
    {{ item }}
  </div>
</template>

<script>
  import { ref, reactive, onBeforeUpdate } from 'vue'

  export default {
    setup() {
      const list = reactive([1, 2, 3])
      const divs = ref([])

      // make sure to reset the refs before each update
      onBeforeUpdate(() => {
        divs.value = []
      })

      return {
        list,
        divs
      }
    }
  }
</script>
```
