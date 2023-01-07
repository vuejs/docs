# Escuchadores de Eventos

Podemos escuchar los eventos del DOM usando la directiva `v-on`:

```vue-html
<button v-on:click="increment">{{ count }}</button>
```

Debido a su uso frecuente, `v-on` también tiene una sintaxis abreviada:

```vue-html
<button @click="increment">{{ count }}</button>
```

<div class="options-api">

En este caso, `increment` hace referencia a una función declarada con la opción `methods`:

<div class="sfc">

```js{7-12}
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      // actualiza el estado del componente
      this.count++
    }
  }
}
```

</div>
<div class="html">

```js{7-12}
createApp({
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      // actualiza el estado del componente
      this.count++
    }
  }
})
```

</div>

Dentro de un método, podemos acceder a la instancia del componente usando `this`. La instancia del componente expone las propiedades de los datos declarados por `data`. Podemos actualizar el estado del componente mutando estas propiedades.

</div>

<div class="composition-api">

<div class="sfc">

Aquí, `increment` hace referencia a una función declarada en `<script setup>`:

```vue{6-9}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  // actualiza el estado del componente
  count.value++
}
</script>
```

</div>

<div class="html">

En este caso, `increment` hace referencia a un método del objeto devuelto por `setup()`:

```js{$}
setup() {
  const count = ref(0)

  function increment(e) {
    // actualiza el estado del componente
    count.value++
  }

  return {
    count,
    increment
  }
}
```

</div>

Dentro de la función, podemos actualizar el estado del componente mutando las refs.

</div>

Los controladores de eventos también pueden utilizar expresiones en línea, y pueden simplificar tareas comunes con modificadores. Estos detalles se tratan en <a target="_blank" href="/guide/essentials/event-handling.html">Guía - Manejando Eventos</a>.

A continuación, procura implementar tú mismo <span class="options-api">el método</span><span class="composition-api">la función</span> `increment` y <span class="options-api">vincularlo</span><span class="composition-api">vincularla</span> al botón mediante `v-on`.
