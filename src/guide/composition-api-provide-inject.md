# Provide / Inject

> This guide assumes that you have already read [Provide / Inject](component-provide-inject.html), [Composition API Introduction](composition-api-introduction.html), and [Reactivity Fundamentals](reactivity-fundamentals.html).

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
    geolocation: {
      longitude: 90,
      latitude: 135
    }
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

```vue{7,14-20}
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
    provide('geolocation', {
      longitude: 90,
      latitude: 135
    })
  }
}
</script>
```

## Using Inject

When using `inject` in `setup()`, we also need to explicitly import it from `vue`. Once we do so, this allows us to invoke it to define how we want to expose it to our component.

The `inject` function takes two parameters:

1. The name of the property to inject
2. A default value (**Optional**)

Using our `MyMarker` component, we can refactor it with the following code:

```vue{3,6-14}
<!-- src/components/MyMarker.vue -->
<script>
import { inject } from 'vue'

export default {
  setup() {
    const userLocation = inject('location', 'The Universe')
    const userGeolocation = inject('geolocation')

    return {
      userLocation,
      userGeolocation
    }
  }
}
</script>
```

## Reactivity

### Adding Reactivity

To add reactivity between provided and injected values, we can use a [ref](reactivity-fundamentals.html#creating-standalone-reactive-values-as-refs) or [reactive](reactivity-fundamentals.html#declaring-reactive-state) when providing a value.

Using our `MyMap` component, our code can be updated as follows:

```vue{7,15-22}
<!-- src/components/MyMap.vue -->
<template>
  <MyMarker />
</template>

<script>
import { provide, reactive, ref } from 'vue'
import MyMarker from './MyMarker.vue

export default {
  components: {
    MyMarker
  },
  setup() {
    const location = ref('North Pole')
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })

    provide('location', location)
    provide('geolocation', geolocation)
  }
}
</script>
```

Now, if anything changes in either property, the `MyMarker` component will automatically be updated as well!

### Mutating Reactive Properties

When using reactive provide / inject values, **it is recommended to keep any mutations to reactive properties inside of the _provider_ whenever possible**.

For example, in the event we needed to change the user's location, we would ideally do this inside of our `MyMap` component.

```vue{28-32}
<!-- src/components/MyMap.vue -->
<template>
  <MyMarker />
</template>

<script>
import { provide, reactive, ref } from 'vue'
import MyMarker from './MyMarker.vue

export default {
  components: {
    MyMarker
  },
  setup() {
    const location = ref('North Pole')
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })

    provide('location', location)
    provide('geolocation', geolocation)

    return {
      location
    }
  },
  methods: {
    updateLocation() {
      this.location = 'South Pole'
    }
  }
}
</script>
```

However, there are times where we need to update the data inside of the component where the data is injected. In this scenario, we recommend providing a method that is responsible for mutating the reactive property.

```vue{21-23,27}
<!-- src/components/MyMap.vue -->
<template>
  <MyMarker />
</template>

<script>
import { provide, reactive, ref } from 'vue'
import MyMarker from './MyMarker.vue

export default {
  components: {
    MyMarker
  },
  setup() {
    const location = ref('North Pole')
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })

    const updateLocation = () => {
      location.value = 'South Pole'
    }

    provide('location', location)
    provide('geolocation', geolocation)
    provide('updateLocation', updateLocation)
  }
}
</script>
```

```vue{9,14}
<!-- src/components/MyMarker.vue -->
<script>
import { inject } from 'vue'

export default {
  setup() {
    const userLocation = inject('location', 'The Universe')
    const userGeolocation = inject('geolocation')
    const updateUserLocation = inject('updateUserLocation')

    return {
      userLocation,
      userGeolocation,
      updateUserLocation
    }
  }
}
</script>
```

Finally, we recommend using `readonly` on provided property if you want to ensure that the data passed through `provide` cannot be mutated by the injected component.

```vue{7,25-26}
<!-- src/components/MyMap.vue -->
<template>
  <MyMarker />
</template>

<script>
import { provide, reactive, readonly, ref } from 'vue'
import MyMarker from './MyMarker.vue

export default {
  components: {
    MyMarker
  },
  setup() {
    const location = ref('North Pole')
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })

    const updateLocation = () => {
      location.value = 'South Pole'
    }

    provide('location', readonly(location))
    provide('geolocation', readonly(geolocation))
    provide('updateLocation', updateLocation)
  }
}
</script>
```
