# Watchers

Hay ocasiones en las que podemos necesitar la ejecución de "efectos secundarios" de forma reactiva; por ejemplo, registrar un número en la consola cada vez que esta cambie. Esto lo podemos conseguir con los watchers:

<div class="composition-api">

```js
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newCount) => {
  // sí, console.log() es un efecto secundario
  console.log(`La nueva cuenta es: ${newCount}`)
})
```

`watch()` puede observar directamente a una ref, y el callback se dispara cada vez que el valor de `count` cambia. `watch()` también puede observar otros tipos de fuentes de datos; más detalles en la <a target="_blank" href="/guide/essentials/watchers.html">Guía - Watchers</a>.

</div>
<div class="options-api">

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  watch: {
    count(newCount) {
      // sí, console.log() es un efecto secundario
      console.log(`La nueva cuenta es: ${newCount}`)
    }
  }
}
```

En este caso, estamos utilizando la opción `watch` para observar los cambios en la propiedad `count`. El callback watch es llamado cuando `count` cambia, y recibe el nuevo valor como argumento. Para más detalles, consulta la <a target="_blank" href="/guide/essentials/watchers.html">Guía - Watchers</a>.

</div>

Un ejemplo más práctico que registrar en la consola sería recuperar nuevos datos cuando un ID cambia. El código que tenemos está recuperando datos de tareas desde una API de prueba cuando se monta el componente. Hay también un botón que incrementa el ID de la tarea que debe ser recuperada. Intenta implementar un watcher que recupere una nueva tarea cuando se pulse el botón.
