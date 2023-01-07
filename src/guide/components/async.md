# Componentes Asíncronos

## Uso Básico

En aplicaciones grandes, podemos necesitar dividir la aplicación en trozos más pequeños y sólo cargar un componente desde el servidor cuando sea necesario. Para hacer esto posible, Vue tiene una función [`defineAsyncComponent`](/api/general.html#defineasynccomponent):

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...cargar el componente desde el servidor
    resolve(/* componente cargado */)
  })
})
// ... usar `AsyncComp` como un componente normal
```

Como puedes ver, `defineAsyncComponent` acepta una función de carga que devuelve una Promise. El callback `resolve` de la Promise debe ser llamado cuando hayas recuperado la definición de tu componente desde el servidor. También puede llamar a `reject(reason)` para indicar que la carga ha fallado.

La [importación dinámica de un módulo ES](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports) también devuelve una Promise, así que la mayoría de las veces la usaremos en combinación con `defineAsyncComponent`. Bundlers como Vite y webpack también soportan la sintaxis (y la utilizarán como puntos de división del bundle), por lo que podemos utilizarla para importar los SFCs de Vue:

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

El componente resultante, `AsyncComp`, es una especie de contenedor que sólo llama a la función del cargador cuando se carga en la página. Además, pasará cualquier props y slots al componente interno, por lo que se puede utilizar el componente asíncrono para reemplazar sin problemas el componente original mientras se consigue una carga perezosa (lazy).

Al igual que los componentes normales, los componentes asíncronos pueden ser [registrados globalmente](/guide/components/registration.html#registro-global) utilizando `app.component()`:

```js
app.component(
  'MyComponent',
  defineAsyncComponent(() => import('./components/MyComponent.vue'))
)
```

<div class="options-api">

También puede utilizar `defineAsyncComponent` al [registrar un componente localmente](/guide/components/registration.html#registro-local):

```vue
<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    AdminPage: defineAsyncComponent(() =>
      import('./components/AdminPageComponent.vue')
    )
  }
}
</script>

<template>
  <AdminPage />
</template>
```

</div>

<div class="composition-api">

También se pueden definir directamente dentro de su componente principal:

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

const AdminPage = defineAsyncComponent(() =>
  import('./components/AdminPageComponent.vue')
)
</script>

<template>
  <AdminPage />
</template>
```

</div>

## Estados de Carga y Error

Las operaciones asíncronas implican inevitablemente estados de carga y error; `defineAsyncComponent()` soporta el manejo de estos estados a través de opciones avanzadas:

```js
const AsyncComp = defineAsyncComponent({
  // la función del cargador
  loader: () => import('./Foo.vue'),

  // Un componente para usar mientras se carga el componente asíncrono
  loadingComponent: LoadingComponent,
  // Retraso antes de mostrar el componente de carga. Default: 200ms.
  delay: 200,

  // Un componente a utilizar si la carga falla
  errorComponent: ErrorComponent,
  // El componente de error se mostrará si se proporciona
  // un tiempo de espera y se supera. Default: Infinity.
  timeout: 3000
})
```

Si se proporciona un componente de carga, se mostrará primero mientras se carga el componente interno. Hay un retraso por defecto de 200ms antes de que se muestre el componente de carga; esto es porque en redes rápidas, un estado de carga instantánea puede ser reemplazado demasiado rápido y terminar pareciendo un parpadeo.

Si se proporciona un componente de error, se mostrará cuando la promesa devuelta por la función de carga sea rechazada. También puede especificar un tiempo de espera para mostrar el componente de error cuando la petición esté tardando demasiado.

## Uso con Suspense

Los componentes asíncronos pueden utilizarse con el componente incorporado `<Suspense>`. La interacción entre `<Suspense>` y los componentes asíncronos está documentada en el [capítulo dedicado a `<Suspense>`] (/guide/built-ins/suspense.html).
