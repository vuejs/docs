# Refs de la Plantilla

Aunque el modelo de renderizado declarativo de Vue abstrae la mayor parte de las operaciones directas del DOM, puede haber casos en los que necesitemos acceso directo a los elementos subyacentes del DOM. Para ello, podemos utilizar el atributo especial `ref`:

```vue-html
<input ref="input">
```

`ref` es un atributo especial, similar al atributo `key` comentado en el capítulo `v-for`. Nos permite obtener una referencia directa a un elemento DOM específico o a una instancia de componente hijo después de que se haya montado. Esto puede ser útil cuando se quiere, por ejemplo, enfocar programáticamente una entrada al montar un componente, o inicializar una biblioteca de terceros en un elemento.

## Acceso a las Refs

<div class="composition-api">

Para obtener la referencia con la Composition API, necesitamos declarar una ref con el mismo nombre:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// declarar una ref para mantener la referencia del elemento
// el nombre debe coincidir con el valor de ref de la plantilla
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

Si no utilizas `<script setup>`, asegúrate de devolver también la ref de `setup()`:

```js{6}
export default {
  setup() {
    const input = ref(null)
    // ...
    return {
      input
    }
  }
}
```

</div>
<div class="options-api">

La ref resultante se expone en `this.$refs`:

```vue
<script>
export default {
  mounted() {
    this.$refs.input.focus()
  }
}
</script>

<template>
  <input ref="input" />
</template>
```

</div>

Ten en cuenta que sólo puedes acceder a la ref **después de que el componente esté montado.** Si intentas acceder a <span class="options-api">`refs.input`</span><span class="composition-api">`input`</span> en la declaración de la plantilla, resultará `null` en la primera renderización. Esto se debe a que el elemento no existe hasta después del primer renderizado.

<div class="composition-api">

Si estás intentando vigilar los cambios de una ref de plantillas, asegúrate de tener en cuenta el caso de que la ref tenga un valor `nulo`:

```js
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // no está montado todavía, o el elemento fue
    // desmontado (por ejemplo, por v-if)
  }
})
```

Mira también: [Escritura de Refs de la Plantilla](/guide/typescript/composition-api.html#escritura-de-refs-de-la-plantilla) <sup class="vt-badge ts" />

</div>

## Refs dentro de `v-for`

> Requiere v3.2.25 o superior

<div class="composition-api">

Cuando se utiliza `ref` dentro de `v-for`, la ref correspondiente debe contener un valor de Array, que se completará con los elementos después del montaje:

```vue
<script setup>
import { ref, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBsaXN0ID0gcmVmKFsxLCAyLCAzXSlcblxuY29uc3QgaXRlbVJlZnMgPSByZWYoW10pXG5cbm9uTW91bnRlZCgoKSA9PiB7XG4gIGFsZXJ0KGl0ZW1SZWZzLnZhbHVlLm1hcChpID0+IGkudGV4dENvbnRlbnQpKVxufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx1bD5cbiAgICA8bGkgdi1mb3I9XCJpdGVtIGluIGxpc3RcIiByZWY9XCJpdGVtUmVmc1wiPlxuICAgICAge3sgaXRlbSB9fVxuICAgIDwvbGk+XG4gIDwvdWw+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

Cuando se utiliza `ref` dentro de `v-for`, el valor de ref resultante será un array que contiene los elementos correspondientes:

```vue
<script>
export default {
  data() {
    return {
      list: [
        /* ... */
      ]
    }
  },
  mounted() {
    console.log(this.$refs.items)
  }
}
</script>

<template>
  <ul>
    <li v-for="item in list" ref="items">
      {{ item }}
    </li>
  </ul>
</template>
```

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGlzdDogWzEsIDIsIDNdXG4gICAgfVxuICB9LFxuICBtb3VudGVkKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuJHJlZnMuaXRlbXMpXG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx1bD5cbiAgICA8bGkgdi1mb3I9XCJpdGVtIGluIGxpc3RcIiByZWY9XCJpdGVtc1wiPlxuICAgICAge3sgaXRlbSB9fVxuICAgIDwvbGk+XG4gIDwvdWw+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

Hay que tener en cuenta que el array de la ref **no** garantiza el mismo orden que el array de origen.

## Refs de una Función

En lugar de una clave de cadena, el atributo `ref` también puede vincularse a una función, que será llamada en cada actualización del componente y te ofrece total flexibilidad sobre dónde almacenar la referencia del elemento. La función recibe la referencia del elemento como primer argumento:

```vue-html
<input :ref="(el) => { /* asigna el a una propiedad o ref */ }">
```

Observa que estamos utilizando un enlace dinámico `:ref` para poder pasarle una función en lugar de una cadena de nombre ref. Cuando el elemento es desmontado, el argumento será `null`. Por supuesto, puedes utilizar un método en lugar de una función inline.

## Ref en un Componente

> Esta sección supone el conocimiento de [Componentes](/guide/essentials/component-basics). Siéntete libre de saltarla y volver más tarde.

`ref` también puede utilizarse en un componente hijo. En este caso la referencia será la de una instancia del componente:

<div class="composition-api">

```vue
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {
  // child.value contendrá una instancia de <Child />
})
</script>

<template>
  <Child ref="child" />
</template>
```

</div>
<div class="options-api">

```vue
<script>
import Child from './Child.vue'

export default {
  components: {
    Child
  },
  mounted() {
    // this.$refs.child contendrá una instancia de <Child />
  }
}
</script>

<template>
  <Child ref="child" />
</template>
```

</div>

<span class="composition-api">Si el componente hijo utiliza la Options API o no utiliza `<script setup>`, la</span><span class="options-api">La</span> instancia referenciada será idéntica a la del componente hijo `this`, lo que significa que el componente padre tendrá acceso completo a cada propiedad y método del componente hijo. Esto facilita la creación de detalles de implementación estrechamente acoplados entre el padre y el hijo, por lo que las referencias a los componentes sólo deben utilizarse cuando sea absolutamente necesario. En la mayoría de los casos, debes tratar de implementar las interacciones padre / hijo utilizando primero las interfaces estándar props y emit.

<div class="composition-api">

Una excepción aquí es que los componentes que utilizan `<script setup>` son **privados por defecto**: un componente padre que hace referencia a un componente hijo que utiliza `<script setup>` no podrá acceder a nada a menos que el componente hijo elija exponer una interfaz pública utilizando la macro `defineExpose`:

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
```

Cuando un padre obtiene una instancia de este componente a través de las referencias de la plantilla, la instancia recuperada tendrá la forma `{ a: número, b: número }` (las referencias se desempaquetan automáticamente como en las instancias normales).

Mira también: [Escritura de Refs de la Plantilla del Componentes](/guide/typescript/composition-api.html#escritura-de-refs-de-la-plantilla-del-componente) <sup class="vt-badge ts" />

</div>
<div class="options-api">

La opción `expose` se puede utilizar para limitar el acceso a una instancia hija:

```js
export default {
  expose: ['publicData', 'publicMethod'],
  data() {
    return {
      publicData: 'foo',
      privateData: 'bar'
    }
  },
  methods: {
    publicMethod() {
      /* ... */
    },
    privateMethod() {
      /* ... */
    }
  }
}
```

En el ejemplo anterior, un padre referenciando este componente a través de la ref de plantilla sólo podrá acceder a `publicData` y `publicMethod`.

</div>
