# Gradual Composition API Migration

The Composition API is an advanced feature introduced in Vue 3. It is purely additive, the Options API is not legacy, however you may find that the Composition API can be a useful feature for more flexible large-scale architectures. So how would we go about introducing it in a larger system, gradually? The following is merely a recommendation, there are many ways of going about this.

Due to the flexibility of the Composition API, you may need to be more explicit about organization so that future maintainers can quickly understand intended purpose of pieces of the application.

## Refactor your Mixins

If you've made use of mixins for reusable logic across components, it's recommended that you start your refactor here. Mixins translate very directly.

### Base Example

Let's say we had this very small toggle mixin in `mixins/toggle.js`:

```js
const toggle = {
  data() {
    return {
      isShowing: false
    }
  },
  methods: {
    toggleShow() {
      this.isShowing = !this.isShowing
    }
  }
}
```

And it was being used in a modal component in `components/modal.vue`:

```html
<template>
  <div>
    <h3>Let's trigger this here modal!</h3>

    <button @click="toggleShow">
      <span v-if="isShowing">Hide child</span>
      <span v-else>Show child</span>
    </button>

    <div v-if="isShowing" class="modal">
      <h2>Here I am!</h2>
      <button @click="toggleShow">Close</button>
    </div>
  </div>
</template>
```

```js
<script>
  import { toggle } from '@/mixins/toggle';

  export default {
    mixins: [toggle]
  }
</script>
```

We could refactor this by creating a `composables` folder and create `composables/useToggle.js` instead. We suggest using a directory named `composables` so that you can communicate that this is being used slightly differently from a component, it's reusable logic that you can consume.

```js
import { reactive, toRefs } from '@vue/composition-api'

export function useToggle() {
  const state = reactive({
    isShowing: false
  })

  function toggleShow() {
    state.isShowing = !state.isShowing
  }

  return {
    ...toRefs(state),
    toggleShow
  }
}
```

And we can refactor our component as follows:

```html
<template>
  <div>
    <h3>Let's trigger this here modal!</h3>

    <button @click="toggleShow">
      <span v-if="isShowing">Hide child</span>
      <span v-else>Show child</span>
    </button>

    <div v-if="isShowing" class="modal">
      <h2>Here I am!</h2>
      <button @click="toggleShow">Close</button>
    </div>
  </div>
</template>
```

```js
<script>
  import { useToggle } from "@/composables/useToggle.js";

  export default {
    setup() {
      const { isShowing, toggleShow } = useToggle();

      return {
        isShowing,
        toggleShow
      };
    },
  }
</script>
```

<iframe src="https://codesandbox.io/embed/refactor-mixin-to-composition-api-hnloh?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Refactor Mixin to Composition API"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Note that the template stays the same, but we've extracted the logic to use in our script section differently. If, from here, we wanted to use `isShowing` in the Options API, we could access it with `this.isShowing`, just as we normally do with a data property, and similarly, we can access `this.toggleShow` like we would a method.

You may notice we used `reactive` here instead of `refs`. This is intentional- if you're refactoring a codebase, potentially full of many many values, `reactive` translates faster and more directly as the API is closer to Options, you're still using that same object notation.

## In Place of Vuex

It is possible to use the Composition API in place of Vuex, and save yourself a dependency. That said, it's not exactly necessary, either. And there are some tradeoffs.

If you're using Vuex, it's very clear exactly what centralized state is being used across the application. Composition API is very flexible, but you may lose that implicit declaration in communication to other fellow maintainers. Our suggestion that if you do use it as a centralized state management store, that you place it in a `store` folder, or something similarly named, so that responsibilities are clear.

## Components

It is possible at this point to start to move your components to the Composition API, however, for larger code bases, you may not see immediate need or good reason to, as the Options API still works nicely.

Our suggestion is to use this opportunity to instead refactor any larger components that have too much responsibility on their own.

For instance, if you have a component has the following methods:

- one that gathers input from a form
- one that validates that input
- one that uses the input to call out to an API
- one that does something with that API response

You may find that the one component has a lot of responsibility, and it may make more sense to break this apart more.

Not everything needs to be refactored, though. Use judgement to guide you and not hype.
