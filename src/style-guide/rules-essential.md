# Priority A Rules: Essential {#priority-a-rules-essential}

These rules help prevent errors, so learn and abide by them at all costs. Exceptions may exist, but should be very rare and only be made by those with expert knowledge of both JavaScript and Vue.

## Use multi-word component names {#use-multi-word-component-names}

User component names should always be multi-word, except for root `App` components. This [prevents conflicts](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name) with existing and future HTML elements, since all HTML elements are a single word.

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
<!-- in pre-compiled templates -->
<Item />

<!-- in in-DOM templates -->
<item></item>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<!-- in pre-compiled templates -->
<TodoItem />

<!-- in in-DOM templates -->
<todo-item></todo-item>
```

</div>

## Use detailed prop definitions {#use-detailed-prop-definitions}

In committed code, props should be treated as a key part of the component's contract and be defined in as much detail as possible.

::: details Why this matters
Detailed [prop definitions](/guide/components/props#prop-validation) make a component's API easier to understand, easier to use correctly, and easier to change safely.
:::

<span class="composition-api">In TypeScript, a type-based `defineProps()` declaration can also be used when the prop contract is fully described by its types.</span>

<div class="options-api">

<div class="style-example style-example-bad">
<h3>Bad</h3>

```js
// This is only OK when prototyping
props: ['status']
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```js
props: {
  status: String
}
```

```js
// Even better!
props: {
  status: {
    type: String,
    required: true,

    validator: value => {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].includes(value)
    }
  }
}
```

</div>

</div>

<div class="composition-api">

<div class="style-example style-example-bad">
<h3>Bad</h3>

```js
// This is only OK when prototyping
const props = defineProps(['status'])
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```js
const props = defineProps({
  status: String
})
```

```js
// Even better!
const props = defineProps({
  status: {
    type: String,
    required: true,

    validator: (value) => {
      return ['syncing', 'synced', 'version-conflict', 'error'].includes(
        value
      )
    }
  }
})
```

</div>

</div>

## Declare emitted events {#declare-emitted-events}

Treat emitted events as part of a component's public contract, and declare them explicitly.

::: details Why this matters
Explicit [event declarations](/guide/components/events) document how a component communicates outward and make parent-child interactions easier to follow.
:::

In Options API, declare events with the [`emits`](/guide/components/events#declaring-emitted-events) option. In [`<script setup>`](/api/sfc-script-setup#defineprops-defineemits), declare them with `defineEmits()`.

Use the object syntax when event payloads need validation, and an array of event names when they do not.

<span class="composition-api">In TypeScript, a typed `defineEmits()` declaration can also be used so the event contract is checked by the type system as well as documented in the component. Vue 3.3+ also supports a named tuple syntax for the same declaration.</span>

<div class="options-api">

<div class="style-example style-example-bad">
<h3>Bad</h3>

```js
export default {
  methods: {
    submit(email) {
      this.$emit('submit', { email })
    }
  }
}
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```js
export default {
  emits: {
    submit: (payload) => typeof payload?.email === 'string'
  },

  methods: {
    submit(email) {
      this.$emit('submit', { email })
    }
  }
}
```

</div>

</div>

<div class="composition-api">

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue
<template>
  <button @click="$emit('submit')">Submit</button>
</template>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue
<script setup>
defineEmits(['submit'])
</script>

<template>
  <button @click="$emit('submit')">Submit</button>
</template>
```

```vue
<script setup lang="ts">
const form = {
  email: ''
}

const emit = defineEmits<{
  // Type-based declaration
  (e: 'submit', payload: { email: string }): void
  // Vue 3.3+: alternative, more succinct syntax
  // submit: [payload: { email: string }]
}>()
</script>

<template>
  <button @click="emit('submit', { email: form.email })">Submit</button>
</template>
```

</div>

</div>

## Keep parent-child data flow explicit {#keep-parent-child-data-flow-explicit}

Pass data down with props, and communicate requested changes back up with emitted events.

::: details Why this matters
Vue components are easier to understand and maintain when state ownership is clear. Prop mutation and other implicit parent-child coupling make updates harder to reason about and components harder to reuse.
:::

This includes `v-model`, which still follows the same prop-and-event communication pattern with shorthand syntax.

If a child needs editable local state, derive or initialize it from the prop instead of mutating the prop itself.

<div class="options-api">

<div class="style-example style-example-bad">
<h3>Bad</h3>

```js
export default {
  props: {
    open: Boolean
  },

  methods: {
    requestClose() {
      this.open = false
    }
  }
}
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```js
export default {
  props: {
    open: Boolean
  },

  emits: ['update:open'],

  methods: {
    requestClose() {
      this.$emit('update:open', false)
    }
  }
}
```

</div>

</div>

<div class="composition-api">

<div class="style-example style-example-bad">
<h3>Bad</h3>

```js
const props = defineProps({
  open: Boolean
})

function requestClose() {
  props.open = false
}
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```js
const props = defineProps({
  open: Boolean
})

const emit = defineEmits(['update:open'])

function requestClose() {
  emit('update:open', false)
}
```

</div>
  
</div>

## Use component-scoped styling {#use-component-scoped-styling}

Keep component styles within the component boundary unless a style is intentionally global.

::: details Why this matters
Component-scoped styling reduces accidental coupling, makes style ownership clearer, and lowers the chance that a change in one component will unexpectedly affect another.
:::

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue-html
<template>
  <button class="btn btn-close">×</button>
</template>

<style>
.btn-close {
  background-color: red;
}
</style>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```vue-html
<template>
  <button class="button button-close">×</button>
</template>

<!-- Using the `scoped` attribute -->
<style scoped>
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
</style>
```

```vue-html
<template>
  <button :class="[$style.button, $style.buttonClose]">×</button>
</template>

<!-- Using CSS modules -->
<style module>
.button {
  border: none;
  border-radius: 2px;
}

.buttonClose {
  background-color: red;
}
</style>
```

</div>

**Notes**

- The [`scoped` attribute](/api/sfc-css-features#scoped-css) is not the only option. CSS modules, native [CSS `@scope`](https://developer.mozilla.org/en-US/docs/Web/CSS/@scope), and disciplined class-based conventions such as [BEM](http://getbem.com/) can all work.
- App-level and layout-level styles may be global when they are intentionally shared.

## Use computed for derived state {#use-computed-for-derived-state}

Use [computed](/guide/essentials/computed) for synchronous derived state instead of storing and synchronizing it manually, and use [watch](/guide/essentials/watchers), `watchEffect()`, or lifecycle hooks for side effects.

::: details Why this matters
Computed state should describe what values mean, not perform work. Keeping derivation pure and synchronous makes reactive code easier to reason about and keeps side effects in the places Vue expects them.
:::

<div class="options-api">

<div class="style-example style-example-bad">
<h3>Bad</h3>

```js
export default {
  computed: {
    fullName() {
      const value = `${this.user.firstName} ${this.user.lastName}`
      analytics.track('full-name-changed', value)
      return value
    }
  }
}
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```js
export default {
  computed: {
    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`
    }
  },

  watch: {
    fullName(value) {
      analytics.track('full-name-changed', value)
    }
  }
}
```

</div>

</div>

<div class="composition-api">

<div class="style-example style-example-bad">
<h3>Bad</h3>

```js
const fullName = computed(() => {
  const value = `${user.value.firstName} ${user.value.lastName}`
  analytics.track('full-name-changed', value)
  return value
})
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```js
const fullName = computed(() => {
  return `${user.value.firstName} ${user.value.lastName}`
})

watch(fullName, (value) => {
  analytics.track('full-name-changed', value)
})
```

</div>

</div>
