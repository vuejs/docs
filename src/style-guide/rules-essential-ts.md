---
outline: deep
---

# Priority A Rules: Essential (TypeScript) {#priority-a-rules-essential}

These rules define the most important boundaries in Vue components that use TypeScript: what a component exposes, how data flows through it, how its styles are contained, and how derived state is kept separate from side effects. Follow them by default to keep components easier to understand, maintain, and evolve.

## Component Data Flow

Vue components stay reliable when data flow is explicit: props go down, events go up, `v-model` handles two-way bindings, and provide/inject supports cross-tree dependencies. Blurring these boundaries leads to stale state, hidden coupling, and hard-to-debug UI.

The main principle of data flow in Vue.js is **Props Down / Events Up**. This is the most maintainable default, and one-way flow scales well.

### Props Declaration {#use-detailed-prop-definitions}

In committed code, props should be treated as a key part of the component's contract and be defined in as much detail as possible.

::: details Why this matters
Typed [prop definitions](/guide/typescript/composition-api#typing-component-props) make a component's API easier to understand, help editors and `vue-tsc` catch incorrect usage, and make refactors safer.
:::


<div class="style-example style-example-bad">
<h3>Bad</h3>

```ts
defineProps(['status'])
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```ts
defineProps<{
  status: string
}>()
```

</div>

#### Access props variables

In Vue 3.5+, you can destructure typed props directly from `defineProps()`.

```ts
const { status } = defineProps<{
  status: string
}>()

watchEffect(() => {
  console.log(foo)
})
```

In Vue 3.4 and earlier, assign the result of `defineProps()` to a variable and access props through that variable.

```ts
const props = defineProps<{
  status: string
}>()

watchEffect(() => {
  console.log(props.status)
})
```

#### Declare prop defaults

In Vue 3.5+, you can use JavaScript's native default value syntax to declare default values for the props.

```ts
const { status = 'syncing' } = defineProps<{
  status?: string
}>()
```

In Vue 3.4 and earlier, use `withDefaults()` to declare default values for props.

```ts
const props = withDefaults(defineProps<{
  status?: string
}>(), {
  status: 'syncing'
})
```

### Emits Declaration {#declare-emitted-events}

Treat emitted events as part of a component's public contract, and declare event names and payloads explicitly.

::: details Why this matters
Typed [event declarations](/guide/typescript/composition-api#typing-component-emits) document how a component communicates outward and let TypeScript catch wrong event names or payload shapes before runtime.
:::

Use `defineEmits()` with named tuple syntax when events have payloads. Use a payload object when an event carries more than one value or may grow over time.

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

<br />

In Vue 3.3+, you can use named tuple syntax for a more succinct declaration:

```vue
<script setup lang="ts">
const emit = defineEmits<{
  submit: [payload: { email: string }]
  close: []
}>()
</script>

<template>
  <button @click="emit('submit', { email: 'john@example.com' })">Submit</button>
  <button @click="emit('close')">Close</button>
</template>
```

In Vue 3.2 and earlier, use the function syntax to declare the payload shape:

```vue
<script setup lang="ts">
const emit = defineEmits<{
  (event: 'submit', payload: { email: string }): void
  (event: 'close'): void
}>()
</script>

<template>
  <button @click="emit('submit', { email: 'john@example.com' })">Submit</button>
  <button @click="emit('close')">Close</button>
</template>
```

</div>

### Implement two-way binding {#keep-parent-child-data-flow-explicit}

Pass data down with props, and communicate requested changes back up with emitted events or typed `defineModel()`.

::: details Why this matters
Vue components are easier to understand and maintain when state ownership is clear. Prop mutation and other implicit parent-child coupling make updates harder to reason about and components harder to reuse.
:::

This includes `v-model`, which still follows the same prop-and-event communication pattern with shorthand syntax.

If a child needs editable local state, derive or initialize it from the prop instead of mutating the prop itself.

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue
<script setup lang="ts">
const props = defineProps<{
  open: boolean
}>()

function requestClose() {
  props.open = false
}
</script>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

<br />

In Vue 3.4+, use `defineModel()` for two-way bindings.

```vue [Child.vue]
<script setup lang="ts">
const open = defineModel<boolean>()

function requestClose() {
  open.value = false
}
</script>
```

In Vue 3.3 and earlier, use `defineEmits()` to request changes from the parent.

```vue [Child.vue]
<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function requestClose() {
  emit('update:modelValue', false)
}
</script>
```

<hr />

Usage in parent component:

```vue [Parent.vue]
<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
  <Child v-model="isOpen" />
</template>
```

</div>

## Single-File Component

Using SFCs with consistent structure and performant styling keeps components easier to maintain and avoids unnecessary render overhead.

### Access DOM or component instances {$#access-dom-or-component-instances}

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue
<script setup>
import { ref, onMounted } from 'vue'

const el = ref()

onMounted(() => {
  el.value = window.document.getElementById('my-input')
  el.value.focus()
})
</script>

<template>
  <input id="my-input" />
</template>
```

</div>


<div class="style-example style-example-good">
<h3>Good</h3>

<br />

In Vue 3.5+, use [`useTemplateRef()`](https://vuejs.org/api/composition-api-helpers.html#usetemplateref) to access DOM or component instances.

```vue
<script setup lang="ts">
import { useTemplateRef, onMounted } from 'vue'

const el = useTemplateRef<HTMLInputElement>('my-input')

onMounted(() => {
  if (el.value) {
    el.value.focus()
  }
})
</script>

<template>
  <input ref="my-input" />
</template>
```

In Vue 3.4 and earlier, use `ref` and template refs to access DOM or component instances.

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const el = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (el.value) {
    el.value.focus()
  }
})
</script>

<template>
  <input ref="el" />
</template>
```

</div>

### Use component-scoped styling {#use-component-scoped-styling}

Keep component styles within the component boundary unless a style is intentionally global.

::: details Why this matters
Component-scoped styling reduces accidental coupling, makes style ownership clearer, and lowers the chance that a change in one component will unexpectedly affect another.
:::

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue
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

```vue
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

```vue
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

## Reactivity

### Avoid destructuring from `reactive()` directly

<div class="style-example style-example-bad">
<h3>Bad</h3>

```vue
<script setup lang="ts">
import { onMounted, reactive } from 'vue'

const state = reactive({ count: 0 })

onMounted(() => {
  state.count = 1
})

// disconnected from reactivity
const { count } = state
</script>

<template>
  <!-- it's not updating to 1 on mount -->
  <div>{{ count }}</div>
</template>
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

<br />

Read and write to properties on the original `reactive()` object to stay within the reactivity system.

```vue
<script setup lang="ts">
import { onMounted, reactive } from 'vue'

const state = reactive({ count: 0 })

onMounted(() => {
  state.count = 1
})
</script>

<template>
  <div>{{ state.count }}</div>
</template>
```

You can use `toRef` or `toRefs()` for a more destructure-like syntax that stays reactive.

```vue
<script setup lang="ts">
import { onMounted, reactive, toRef } from 'vue'

const state = reactive({ count: 0 })

// a two-way ref that syncs with the original property
const count = toRef(state, 'count')

onMounted(() => {
  count.value = 1
})
</script>

<template>
  <div>{{ count }}</div>
</template>
```

```ts
// or create readonly ref from reactive with a getter
const count = toRef(() => state.count)
```

Use `toRefs()` if you need to destructure multiple properties.

```vue
<script setup lang="ts">
import { onMounted, reactive, toRefs } from 'vue'

const state = reactive({ count: 0 })

const { count } = toRefs(state)

onMounted(() => {
  count.value = 2
})
</script>

<template>
  <div>{{ count }}</div>
</template>
```

</div>

### Watching reactive state

When watching reactive state, use a getter function or ref instead of watching the property of reactive object directly.

<div class="style-example style-example-bad">
<h3>Bad</h3>

```ts
import { watch, reactive } from 'vue'

const props = defineProps<{
  title: string
}>()

const state = reactive({ count: 0 })

// it won't trigger when props.title or state.count changes
watch(props.title, () => {})
watch(state.count, () => {})
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```ts
import { watch, reactive } from 'vue'

const props = defineProps<{
  title: string
}>()

const state = reactive({ count: 0 })

// watch reactive state with getter
watch(() => props.title, () => {})
watch(() => state.count, () => {})
```

</div>

### Use computed for derived state {#use-computed-for-derived-state}

Use [computed](/guide/essentials/computed) for synchronous derived state instead of storing and synchronizing it manually.

Keep [computed](/guide/essentials/computed) getters pure (no side effects) and put side effects in [watchers](/guide/essentials/watchers).

::: details Why this matters
Computed state should describe what values mean, not perform work. Keeping derivation pure and synchronous makes reactive code easier to reason about and keeps side effects in the places Vue expects them.
:::

Let computed refs infer their types when the implementation is obvious. Add an explicit return type when the computed value is part of a component contract, when it guards against accidental widening, or when inference becomes circular.

<div class="style-example style-example-bad">
<h3>Bad</h3>

```ts
const fullName = computed(() => {
  const value = `${user.value.firstName} ${user.value.lastName}`
  analytics.track('full-name-changed', value)
  return value
})
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```ts
const fullName = computed(() => {
  return `${user.value.firstName} ${user.value.lastName}`
})

watch(fullName, (value) => {
  analytics.track('full-name-changed', value)
})
```

</div>

### Prefer computed over watcher-assigned derived refs

When a ref's value is derived from other reactive state, use a computed ref instead of a manually assigned ref in a watcher.

<div class="style-example style-example-bad">
<h3>Bad</h3>

```ts
const items = ref([{ price: 10 }, { price: 20 }])
const total = ref(0)

watch(items, () => {
  total.value = items.value.reduce((sum, item) => sum + item.price, 0)
})
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```ts
const items = ref([{ price: 10 }, { price: 20 }])
const total = computed(() =>
  items.value.reduce((sum, item) => sum + item.price, 0)
)
```

</div>

### Use eager watchers instead of duplicate initial calls

Use watchers with the `immediate: true` option instead of manually duplicating an initial call to a function that also needs to run on reactive updates.

<div class="style-example style-example-bad">
<h3>Bad</h3>

```ts
const userId = ref(1)

onMounted(() => loadUser(userId.value))
watch(userId, (id) => loadUser(id))
```

</div>

<div class="style-example style-example-good">
<h3>Good</h3>

```ts
const userId = ref(1)

watch(userId, (id) => loadUser(id), { immediate: true })
```

</div>
