# Priority A Rules: Essential {#priority-a-rules-essential}

## Use detailed prop definitions {#use-detailed-prop-definitions}

Treat props as part of a component's public contract, and define them as explicitly as practical.

::: details Why this matters
Detailed [prop definitions](/guide/components/props#prop-validation) make a component's API easier to understand, easier to use correctly, and easier to change safely.
:::

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

**Notes**

- In TypeScript, a type-based `defineProps()` declaration is equally acceptable if it expresses the contract clearly.
- Array syntax may be acceptable while prototyping, but committed components should define a real contract.

## Declare emitted events {#declare-emitted-events}

Treat emitted events as part of a component's public contract, and declare them explicitly.

::: details Why this matters
Explicit [event declarations](/guide/components/events) document how a component communicates outward and make parent-child interactions easier to follow.
:::

<div class="style-example style-example-bad">
<h3>Bad</h3>

```js
const emit = defineEmits()

function submit() {
  emit('submit', { email: form.email })
}
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```js
const emit = defineEmits({
  submit: ({ email }) => typeof email === 'string'
})

function submit() {
  emit('submit', { email: form.email })
}
```

```ts
const emit = defineEmits<{
  (e: 'submit', payload: { email: string }): void
}>()

function submit() {
  emit('submit', { email: form.email })
}
```

</div>

**Notes**

- An array of event names is acceptable when payload validation would add no real value.
- In TypeScript, prefer a typed `defineEmits()` declaration so the event contract is checked by the type system as well as documented in the component.
- If runtime payload validation is also useful, use the object syntax.

## Keep parent-child data flow explicit {#keep-parent-child-data-flow-explicit}

Pass data down with props, and communicate requested changes back up with emitted events.

::: details Why this matters
Vue components are easier to understand and maintain when state ownership is clear. Prop mutation and other implicit parent-child coupling make updates harder to reason about and components harder to reuse.
:::

<div class="style-example style-example-bad">
<h3>Bad</h3>

```js
const props = defineProps({
  open: Boolean
})

function close() {
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

function close() {
  emit('update:open', false)
}
```

</div>

**Notes**

- `v-model` still follows this rule. It is prop-and-event communication with shorthand syntax.
- If a child needs editable local state, derive or initialize local state from the prop instead of mutating the prop itself.

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
  <button class="button-close">×</button>
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

Use [computed](/guide/essentials/computed) for synchronous derived state, and use [watch](/guide/essentials/watchers), `watchEffect()`, or lifecycle hooks for side effects.

::: details Why this matters
Computed state should describe what values mean, not perform work. Keeping derivation pure and synchronous makes reactive code easier to reason about and keeps side effects in the places Vue expects them.
:::

<div class="style-example style-example-bad">
<h3>Bad</h3>

```js
const fullName = computed(() => {
  analytics.track('full-name-read')
  return `${user.value.firstName} ${user.value.lastName}`
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

**Notes**

- Async reactions, network requests, DOM reads and writes, timers, and subscriptions belong in watchers, `watchEffect()`, or lifecycle hooks.
- If a value can be expressed from existing reactive state, prefer `computed` over storing and synchronizing another piece of state.
