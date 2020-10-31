# Gradual Composition API Migration

The Composition API is an advanced feature introduced in Vue 3. It is purely addititive, the Options API is not legacy, however you may find that the Composition API can be a useful feature for more flexible large-scale architectures. So how would we go about introducing it in a larger system, gradually? The following is merely a recommendation, there are many ways of going about this.

Due to the flexbility of the Composition API, you may need to be more explicit about organization so that future maintainers can quickly understand intended purpose of pieces of the application.

## Step One: Refactor your Mixins

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

We could refactor this by creating a `composables` folder and create `composables/useToggle.js` instead. We suggest using a directory named composables so that you can communicate that this is being used slightly differently from a component, it's reusable logic that you can consume.

```js
import { ref, onMounted } from '@vue/composition-api'

export function useToggle() {
  const isShowing = ref(false)

  function toggleShow() {
    isShowing.value = !this.isShowing.value
  }

  return {
    isShowing,
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

Note that the template stays the same, but we've extracted the logic to use in our script section differently. If, from here, we wanted to use `isShowing` in the Options API, we could access it with `this.isShowing`, just as we normally do with a data property, and similarly, we can access `this.toggleShow` like we would a method.
