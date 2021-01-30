# Provide / Inject

> Ce guide suppose que vous avez déjà lu l '[introduction du Composition API](composition-api-introduction.html) et les [Fondamentaux de la réactivité](reactivity-fundamentals.html). Lisez cela d'abord si vous êtes nouveau dans le composition API.

Nous pouvons également utiliser [provide/inject](component-provide-inject.html) avec le Composition API. Les deux ne peuvent être appelés que pendant [`setup ()`](composition-api-setup.html) avec une instance active courante.

## Contexte du scénario

Supposons que nous voulions réécrire le code suivant, qui contient un composant `MyMap` qui fournit un composant`MyMarker` avec l'emplacement de l'utilisateur, en utilisant le composition API.

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
  inject: ['location', 'geolocation']
}
</script>
```

## Utiliser provide

Lorsqu'on utilise `provide` dans `setup ()`, on commence par importer explicitement la méthode depuis`vue`. Cela nous permet de définir chaque propriété avec sa propre invocation de `provide`.

La fonction `provide` vous permet de définir la propriété à travers deux paramètres:

1. Le nom de la propriété (type `<String>`)
2. La valeur de la propriété

En utilisant notre composant `MyMap`, les valeurs fournies peuvent être refactorisées comme suit:

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

## Utiliser inject

Lorsque vous utilisez `inject` dans `setup ()`, nous devons également l'importer explicitement depuis `vue`. Une fois que nous le faisons, cela nous permet de l'invoquer pour définir comment nous voulons l'exposer à notre composant.

The `inject` function takes two parameters:

1. Le nom de la propriété à injecté
2. Une valeur par defaut (**Optionelle**)

En utilisant notre composant `MyMarker`, nous pouvons le refactoriser avec le code suivant:

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

## Réactivité

### Ajouter de la réactivité

Pour ajouter de la réactivité entre les valeurs provide et inject, nous pouvons utiliser un [ref](reactivity-fundamentals.html#creating-standalone-reactive-values-as-refs) ou [reactive](reactivity-fundamentals.html#declaring-reactive-state) lorsqu'on fournit une valeur.

En utilisant notre composant `MyMap`, notre code peut être mis à jour comme suit:

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

Maintenant, si quelque chose change dans l'une ou l'autre des propriétés, le composant `MyMarker` sera également mis à jour automatiquement!

### Muter des propriétés réactives

Lorsque vous utilisez des valeurs provide / inject, **il est recommandé de conserver toutes les mutations des propriétés réactives à l'intérieur du _provider_ chaque fois que possible**.

Par exemple, dans le cas où nous devions changer l'emplacement de l'utilisateur, nous le ferions idéalement à l'intérieur de notre composant `MyMap`.

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

Cependant, il y a des moments où nous devons mettre à jour les données à l'intérieur du composant où les données sont injectées. Dans ce scénario, nous vous recommandons de fournir une méthode responsable de la mutation de la propriété réactive.

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
    const updateUserLocation = inject('updateLocation')

    return {
      userLocation,
      userGeolocation,
      updateUserLocation
    }
  }
}
</script>
```

Enfin, nous vous recommandons d'utiliser `readonly` sur la propriété fournie si vous voulez vous assurer que les données transmises via `provide` ne peuvent pas être mutées par le composant injecté.

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
