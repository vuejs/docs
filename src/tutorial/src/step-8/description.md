# Propiedad Computada

Sigamos desarrollando la lista de tareas del último paso. Para ello, ya hemos añadido una funcionalidad de conmutación a cada una de las tareas. Ello se consigue añadiendo una propiedad `done` a cada objeto todo, y utilizando `v-model` para vincularlo con una casilla de verificación:

```vue-html{2}
<li v-for="todo in todos">
  <input type="checkbox" v-model="todo.done">
  ...
</li>
```

La siguiente mejora que podemos añadir es ser capaz de ocultar las tareas completadas. Ya tenemos un botón que conmuta el estado `hideCompleted`. Pero, ¿cómo renderizamos diferentes elementos de la lista en función de ese estado?

<div class="options-api">

Te presentamos a la <a target="_blank" href="/guide/essentials/computed.html">propiedad computada</a>. Podemos declarar una propiedad que se computa reactivamente a partir de otras propiedades utilizando la opción `computed`:

<div class="sfc">

```js
export default {
  // ...
  computed: {
    filteredTodos() {
      // se devuelven las tareas filtradas basándose en `this.hideCompleted`.
    }
  }
}
```

</div>
<div class="html">

```js
createApp({
  // ...
  computed: {
    filteredTodos() {
      // se devuelven las tareas filtradas basándose en `this.hideCompleted`.
    }
  }
})
```

</div>

</div>
<div class="composition-api">

Te presentamos a <a target="_blank" href="/guide/essentials/computed.html">`computed()`</a>. Podemos crear una ref computada que calcule su `.value` en base a otras fuentes de datos reactivas:

<div class="sfc">

```js{8-11}
import { ref, computed } from 'vue'

const hideCompleted = ref(false)
const todos = ref([
  /* ... */
])

const filteredTodos = computed(() => {
  // retorna las tareas filtradas basándose en
  // `todos.value` y `hideCompleted.value`
})
```

</div>
<div class="html">

```js{10-13}
import { createApp, ref, computed } from 'vue'

createApp({
  setup() {
    const hideCompleted = ref(false)
    const todos = ref([
      /* ... */
    ])

    const filteredTodos = computed(() => {
      // retorna las tareas filtradas basándose en
      // `todos.value` y `hideCompleted.value`
    })

    return {
      // ...
    }
  }
})
```

</div>

</div>

```diff
- <li v-for="todo in todos">
+ <li v-for="todo in filteredTodos">
```

Una propiedad computada rastrea otros estados reactivos utilizados en su cómputo como dependencias. Almacena el resultado en caché y lo actualiza automáticamente cuando sus dependencias cambian.

Ahora, ¡intenta añadir la propiedad computada `filteredTodos` e implementa su lógica de cálculo! En caso de que se implemente correctamente, si se verifica una tarea, se ocultará instantáneamente cuando se oculten los ítems completados.
