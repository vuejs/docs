<script setup>
import { onMounted } from 'vue'

if (typeof window !== 'undefined') {
  const hash = window.location.hash

  // The docs for v-model used to be part of this page. Attempt to redirect outdated links.
  if ([
    '#usage-with-v-model',
    '#v-model-arguments',
    '#multiple-v-model-bindings',
    '#handling-v-model-modifiers'
  ].includes(hash)) {
    onMounted(() => {
      window.location = './v-model.html' + hash
    })
  }
}
</script>

# Component Events {#component-events}

> This page assumes you've already read the [Components Basics](/guide/essentials/component-basics). Read that first if you are new to components.

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/defining-custom-events-emits" title="Free Vue.js Lesson on Defining Custom Events"/>
</div>

## Emitting and Listening to Events {#emitting-and-listening-to-events}

A component can emit custom events directly in template expressions (e.g. in a `v-on` handler) using the built-in `$emit` method:

```vue-html
<!-- MyComponent -->
<button @click="$emit('someEvent')">Click Me</button>
```

<div class="options-api">

The `$emit()` method is also available on the component instance as `this.$emit()`:

```js
export default {
  methods: {
    submit() {
      this.$emit('someEvent')
    }
  }
}
```

</div>

The parent can then listen to it using `v-on`:

```vue-html
<MyComponent @some-event="callback" />
```

The `.once` modifier is also supported on component event listeners:

```vue-html
<MyComponent @some-event.once="callback" />
```

Like components and props, event names provide an automatic case transformation. Notice we emitted a camelCase event, but can listen for it using a kebab-cased listener in the parent. As with [props casing](/guide/components/props#prop-name-casing), we recommend using kebab-cased event listeners in templates.

:::tip
Unlike native DOM events, component emitted events do **not** bubble. You can only listen to the events emitted by a direct child component. If there is a need to communicate between sibling or deeply nested components, use an external event bus or a [global state management solution](/guide/scaling-up/state-management).
:::

### Listening to Lifecycle Events {#listening-to-lifecycle-events}

Using a special prefix `vue:` followed by the name of the [Lifecycle Hook](/guide/essentials/lifecycle) allows you to listen to lifecycle events happening inside a child component. 

To demonstrate this feature consider following example:

<div class="composition-api">

```vue{11}
<!-- App.vue -->
<script setup>
import Comp from './Comp.vue'

function onMountedHandler() {
  console.log("onMounted event captured in parent")
}
</script>

<template>
  <Comp @vue:mounted="onMountedHandler" />
</template>

<!-- Comp.vue -->
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log("onMounted hook in child")
})
</script>

<template>
  <div>
    This is a child component
  </div>
</template>
```

</div>
<div class="options-api">


```vue{18}
<!-- App.vue -->
<script>
import Comp from './Comp.vue'

export default {
  components: {
    Comp
  },
  methods: {
    mountedHandler() {
      console.log("mounted event captured in parent")
    }
  }
}
</script>

<template>
  <Comp @vue:mounted="mountedHandler" />
</template>

<!-- Comp.vue -->
<script>
export default {
  mounted() {
    console.log("mounted hook in child")
  }
}
</script>

<template>
  <div>
    This is a child component
  </div>
</template>
```
</div>


First, the lifecycle event will be handled inside the hook declared in the child component, then it gets propagated into the parent and captured there.

<div class="composition-api">

[Try it in the Playground](https://play.vuejs.org/#eNp9UttqwkAQ/ZVhX6ogyUP7JCq9ILSFXmh93JeQjLqazC57sYLk3zubmGihCgnszJyZPWf2HMSDMckuoBiLicutMh4c+mBmklRltPXwpCsDS6sruEnSGET4jSRJy0C5V5pA05sO5LF4zqgo0Q6GcJAEkGtyusSk1KuBFD0KcIfkIc+MD5ZDRWAyyykphpJqSZO0pcIkOPBYmTLzyBHApKFzzxTGVTttejb5eL8UkDJ6kp61ipHwjgkt1SrZOE0suOEoRc4TFXd9mCjGSTFu2cdaVpb657XJeRtw1OXzNebbf/Ibt485KT4tOrQ7lKKv+cyukDXG8vz7Hfd87ouVLkLJ6CvFL+RlhsixhT2Go9ge17B9aZ5N0Wrh5nuP5DpRkWhE1g1eCt5hXOYl6Se6t8ld08dvw1vsLHDZMYeTIaA+WqfzTF8ZsEmms+s+WWu9je7I16osWnPwf80dhdo1B4DFWjngL2u7+Q4mR9FkEZe2wL8OqX8BmMQKiQ==)

</div>
<div class="options-api">

[Try it in the Playground](https://play.vuejs.org/#eNqFUstqwzAQ/BWhSxII9qE9hbT0QaDtoS1tjroYe2MrkSWhh2sI+feu5FcDaQvGSLuzq5ndOdJ7rZPGA13Rtc0N1+6WSV5rZRx5VLUmO6NqMkvScAnAGZNMQhsBBewyLxw5MklIjgAlQTq76gIkNgin0zL8a3CVKqZsrbx0UDxlshBg5oshHlpJqwQkQpVzRnscgQabkzzTzhu8ckl0ZjDE6KIrPMW3mMRvnY5i8OKg1iJzgDdC1lHWHUpZ9Z1vxjd6LoySFLHr9EchXVJnkdiOl8neKokDi3wZDcI5Vr1px5E4o6NCRjMh1NdLjDnjIc4h1lSQHy7E97YNMUbfDVgwDTA65lxmSkC1Ib35fIUWz2OyVoUXiP4j+QE4VB84drAH34sdcZHtc1w+l+XWbloH0g6iAtFpm4ziBMMof5M+0b1KrofN4BQHI5057pKh+p1Mxrhsi0qpQzBDXnFR9F743wQFb+KBkG3FLcEv6zpMPo64tAOeW+H0DZFIFOM=)

</div>

Note that unlike in the example above, you **don't** have to explicitly declare and handle the respective lifecycle hook in the child component.

`<Comp @vue:mounted="onMountedHandler" />` **will** trigger even if there is no explicit <span class="composition-api">`onMounted`</span><span class="options-api">`mounted`</span> handler declared inside `Comp` as the lifecycle is handled by Vue itself.

## Event Arguments {#event-arguments}

It's sometimes useful to emit a specific value with an event. For example, we may want the `<BlogPost>` component to be in charge of how much to enlarge the text by. In those cases, we can pass extra arguments to `$emit` to provide this value:

```vue-html
<button @click="$emit('increaseBy', 1)">
  Increase by 1
</button>
```

Then, when we listen to the event in the parent, we can use an inline arrow function as the listener, which allows us to access the event argument:

```vue-html
<MyButton @increase-by="(n) => count += n" />
```

Or, if the event handler is a method:

```vue-html
<MyButton @increase-by="increaseCount" />
```

Then the value will be passed as the first parameter of that method:

<div class="options-api">

```js
methods: {
  increaseCount(n) {
    this.count += n
  }
}
```

</div>
<div class="composition-api">

```js
function increaseCount(n) {
  count.value += n
}
```

</div>

:::tip
All extra arguments passed to `$emit()` after the event name will be forwarded to the listener. For example, with `$emit('foo', 1, 2, 3)` the listener function will receive three arguments.
:::

## Declaring Emitted Events {#declaring-emitted-events}

A component can explicitly declare the events it will emit using the <span class="composition-api">[`defineEmits()`](/api/sfc-script-setup#defineprops-defineemits) macro</span><span class="options-api">[`emits`](/api/options-state#emits) option</span>:

<div class="composition-api">

```vue
<script setup>
defineEmits(['inFocus', 'submit'])
</script>
```

The `$emit` method that we used in the `<template>` isn't accessible within the `<script setup>` section of a component, but `defineEmits()` returns an equivalent function that we can use instead:

```vue
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>
```

The `defineEmits()` macro **cannot** be used inside a function, it must be placed directly within `<script setup>`, as in the example above.

If you're using an explicit `setup` function instead of `<script setup>`, events should be declared using the [`emits`](/api/options-state#emits) option, and the `emit` function is exposed on the `setup()` context:

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, ctx) {
    ctx.emit('submit')
  }
}
```

As with other properties of the `setup()` context, `emit` can safely be destructured:

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, { emit }) {
    emit('submit')
  }
}
```

</div>
<div class="options-api">

```js
export default {
  emits: ['inFocus', 'submit']
}
```

</div>

The `emits` option and `defineEmits()` macro also support an object syntax. If using TypeScript you can type arguments, which allows us to perform runtime validation of the payload of the emitted events:

<div class="composition-api">

```vue
<script setup lang="ts">
const emit = defineEmits({
  submit(payload: { email: string, password: string }) {
    // return `true` or `false` to indicate
    // validation pass / fail
  }
})
</script>
```

If you are using TypeScript with `<script setup>`, it's also possible to declare emitted events using pure type annotations:

```vue
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

More details: [Typing Component Emits](/guide/typescript/composition-api#typing-component-emits) <sup class="vt-badge ts" />

</div>
<div class="options-api">

```js
export default {
  emits: {
    submit(payload: { email: string, password: string }) {
      // return `true` or `false` to indicate
      // validation pass / fail
    }
  }
}
```

See also: [Typing Component Emits](/guide/typescript/options-api#typing-component-emits) <sup class="vt-badge ts" />

</div>

Although optional, it is recommended to define all emitted events in order to better document how a component should work. It also allows Vue to exclude known listeners from [fallthrough attributes](/guide/components/attrs#v-on-listener-inheritance), avoiding edge cases caused by DOM events manually dispatched by 3rd party code.

:::tip
If a native event (e.g., `click`) is defined in the `emits` option, the listener will now only listen to component-emitted `click` events and no longer respond to native `click` events.
:::

## Events Validation {#events-validation}

Similar to prop type validation, an emitted event can be validated if it is defined with the object syntax instead of the array syntax.

To add validation, the event is assigned a function that receives the arguments passed to the <span class="options-api">`this.$emit`</span><span class="composition-api">`emit`</span> call and returns a boolean to indicate whether the event is valid or not.

<div class="composition-api">

```vue
<script setup>
const emit = defineEmits({
  // No validation
  click: null,

  // Validate submit event
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```

</div>
<div class="options-api">

```js
export default {
  emits: {
    // No validation
    click: null,

    // Validate submit event
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('Invalid submit event payload!')
        return false
      }
    }
  },
  methods: {
    submitForm(email, password) {
      this.$emit('submit', { email, password })
    }
  }
}
```

</div>
