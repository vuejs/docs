# Provide / Inject

> This guide assumes that you have already read the [Composition API Introduction](composition-api-introduction.html) and [Reactivity Fundamentals](reactivity-fundamentals.html). Read that first if you are new to Composition API.

We can use [provide / inject](component-provide-inject.html) with the Composition API as well. Both can only be called during [`setup()`](composition-api-setup.html) with a current active instance.

## Scenario Background

Let's assume that we want to rewrite the following code, which contains a `MyMap` component that provides a `MyMarker` component with the user's location, using the Composition API.

```vue
<!-- src/components/MyMap.vue -->
<template>
  <MyMarker />
</template>

<script>
import MyMarker from './MyMarker.vue'

export default {
  components: {
    MyMarker
  },
  provide: {
    location: 'North Pole',
    longitude: 90,
    latitude: 135
  }
}
</script>
```

```vue
<!-- src/components/MyMarker.vue -->
<script>
export default {
  inject: ['location', 'longitude', 'latitude']
}
</script>
```

## Using Provide

When using `provide` in `setup()`, we start by explicitly importing the method from `vue`. This allows us to define each property with its own invocation of `provide`.

The `provide` function allows you to define the property through two parameters:

1. The property's name (`<String>` type)
2. The property's value

Using our `MyMap` component, our provided values can be refactored as the following:

```vue{7,14-18}
<!-- src/components/MyMap.vue -->
<template>
  <MyMarker />
</template>

<script>
import { provide } from 'vue'
import MyMarker from './MyMarker.vue

export default {
  components: {
    MyMarker
  },
  setup() {
    provide('location', 'North Pole')
    provide('longitude', 90)
    provide('latitude', 135)
  }
}
</script>
```

## Using Inject

When using `inject` in `setup()`, we also need to explicitly import it from `vue`. Once we do so, this allows us to invoke it to define how we want to expose it to our component.

The `inject` function takes two parameters:

1. The name of the property to inject
2. A default value (**Optional**)

Using our `MyMarker` component from earlier, we can refactor it with the following code:

```vue{3,6-16}
<!-- src/components/MyMarker.vue -->
<script>
import { inject } from 'vue'

export default {
  setup() {
    const userLocation = inject('location', 'The Universe')
    const userLongitude = inject('longitude')
    const userLatitude = inject('latitude')

    return {
      userLocation,
      userLongitude,
      userLatitude
    }
  }
}
</script>
```

BREAKING POINT

## Injection Reactivity

To retain reactivity between provided and injected values, we can use a [ref](reactivity-fundamentals.html#creating-standalone-reactive-values-as-refs) or [reactive](reactivity-fundamentals.html#declaring-reactive-state) when providing a value:

```js
import { ref, reactive } from 'vue'

// in provider
setup() {
  const book = reactive({
    title: 'Vue 3 Guide',
    author: 'Vue Team'
  })
  const year = ref('2020')

  provide('book', book)
  provide('year', year)
}

// in consumer
setup() {
  const book = inject('book')
  const year = inject('year')

  return { book, year }
}
```

Now, when either `book` or `year` are changed on the _provider_ component, we can observe them changing on the component where they are injected.

::: warning
We don't recommend mutating a reactive property where it's injected as it's breaking Vue one-direction data flow. Instead, try to either mutate values where they are _provided_ or provide a method to mutate them

```js
import { ref, reactive } from 'vue'

// in provider
setup() {
  const book = reactive({
    title: 'Vue 3 Guide',
    author: 'Vue Team'
  })

  function changeBookName() {
    book.title = 'Vue 3 Advanced Guide'
  }

  provide('book', book)
  provide('changeBookName', changeBookName)
}

// in consumer
setup() {
  const book = inject('book')
  const changeBookName = inject('changeBookName')

  return { book, changeBookName }
}
```

:::
