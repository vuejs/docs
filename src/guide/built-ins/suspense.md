---
outline: deep
---

# Suspense

:::warning Característica Experimental
`<Suspense>` es una función experimental. No se garantiza que alcance un estado estable y la API puede cambiar antes de que lo haga.
:::

`<Suspense>` es un componente integrado para orquestar dependencias asíncronas en un árbol de componentes. Puede mostrar un estado de carga mientras espera que se resuelvan múltiples dependencias asíncronas anidadas en el árbol de componentes.

## Dependencias Asíncronas

Para explicar el problema que intenta resolver `<Suspense>` y cómo interactúa con estas dependencias asíncronas, imaginemos una jerarquía de componentes como la siguiente:

```
<Suspense>
└─ <Dashboard>
   ├─ <Profile>
   │  └─ <FriendStatus> (componente con setup() asíncrono)
   └─ <Content>
      ├─ <ActivityFeed> (componente asíncrono)
      └─ <Stats> (componente asíncrono)
```

En el árbol de componentes hay múltiples componentes anidados cuya renderización depende de que se resuelva primero algún recurso asíncrono. Sin `<Suspense>`, cada uno de ellos tendrá que manejar sus propias cargas / errores y estados cargados. En el peor de los casos, podemos ver tres spinners de carga en la página, con contenido mostrado en diferentes momentos.

El componente `<Suspense>` nos da la posibilidad de mostrar estados de carga / error de nivel superior mientras esperamos a que se resuelvan estas dependencias asíncronas anidadas.

Hay dos tipos de dependencias asíncronas a las que `<Suspense>` puede esperar:

1. Componentes con un hook asíncrono `setup()`. Esto incluye componentes que utilizan `<script setup>` con expresiones `await` de nivel superior.

2. [Componentes Asíncronos](/guide/components/async.html).

### `async setup()`

El hook `setup()` de un componente de la Composition API puede ser asíncrono:

```js
export default {
  async setup() {
    const res = await fetch(...)
    const posts = await res.json()
    return {
      posts
    }
  }
}
```

Si se utiliza `<script setup>`, la presencia de expresiones `await` de nivel superior convierte automáticamente al componente en una dependencia asíncrona:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

### Componentes Asíncronos

Los componentes asíncronos son **"suspendibles "** por defecto. Esto significa que si tiene un `<Suspense>` en la cadena principal, será tratado como una dependencia asíncrona de ese `<Suspense>`. En este caso, el estado de carga será controlado por el `<Suspense>`, y se ignorarán las opciones de carga, error, retraso y tiempo de espera del propio componente.

El componente asíncrono puede optar por no controlar el `<Suspense>` y dejar que el componente controle siempre su propio estado de carga especificando `<Suspensible: false>` en sus opciones.

## Carga del Estado

El componente `<Suspense>` tiene dos slots: `#default` y `#fallback`. Ambos slots sólo permiten **un** nodo hijo inmediato. Si es posible, se muestra el nodo del slot por defecto. Si no lo es, se mostrará el nodo del slot fallback en su lugar.

```vue-html
<Suspense>
  <!-- componente con dependencias asíncronas anidadas -->
  <Dashboard />

  <!-- carga del estado a través del slot #fallback -->
  <template #fallback>
    Loading...
  </template>
</Suspense>
```

En el renderizado inicial, `<Suspense>` renderizará en memoria el contenido de su slot por defecto. Si se encuentra alguna dependencia asíncrona durante el proceso, entrará en estado **pendiente**. Durante el estado pendiente, se mostrará el contenido fallback. Cuando se han resuelto todas las dependencias asíncronas encontradas, `<Suspense>` entra en estado **resuelto** y se muestra el contenido del slot por defecto resuelto.

Si no se han encontrado dependencias asíncronas durante el renderizado inicial, `<Suspense>` pasará directamente a un estado resuelto.

Una vez en estado resuelto, `<Suspense>` sólo volverá a un estado pendiente si el nodo raíz del slot `#default` es reemplazado. Las nuevas dependencias asíncronas anidadas a mayor profundidad en el árbol no provocarán que `<Suspense>` pase a un estado pendiente.

Cuando se produce una reversión, el contenido fallback no se mostrará inmediatamente. En su lugar, `<Suspense>` mostrará el contenido anterior `#default` mientras espera a que se resuelva el nuevo contenido y sus dependencias asíncronas. Este comportamiento puede configurarse con la prop `timeout`: `<Suspense>` que pasará a mostrar el contenido fallback si tarda más de `timeout` en renderizar el nuevo contenido por defecto. Un valor de `timeout` de `0` hará que el contenido fallback se muestre inmediatamente cuando el contenido default sea reemplazado.

## Eventos

El componente `<Suspense>` emite 3 eventos: `pending`, `resolve` y `fallback`. El evento `pending` se produce cuando se entra en estado pendiente. El evento `resolve` se emite cuando el nuevo contenido ha terminado de resolverse en el slot `default`. El evento `fallback` se emite cuando se muestra el contenido del slot `fallback`.

Los eventos podrían utilizarse, por ejemplo, para mostrar un indicador de carga delante del DOM antiguo mientras se cargan los nuevos componentes.

## Manejo de Errores

Actualmente, `<Suspense>` no proporciona un manejo de errores a través del propio componente; sin embargo, puedes utilizar la opción [`errorCaptured`](/api/options-lifecycle.html#errorcaptured) o el hook [`onErrorCaptured()`](/api/composition-api-lifecycle.html#onerrorcaptured) para capturar y manejar errores asíncronos en el componente padre de `<Suspense>`.

## Combinación con Otros Componentes

Es común querer usar `<Suspense>` en combinación con los componentes [`<Transition>`](./transition) y [`<KeepAlive>`](./keep-alive). El orden de anidamiento de estos componentes es importante para que todos funcionen correctamente.

Además, estos componentes se utilizan a menudo junto con el componente `<RouterView>` de [Vue Router](https://router.vuejs.org/).

El siguiente ejemplo muestra cómo anidar estos componentes para que todos se comporten como se espera. Para combinaciones más sencillas puedes eliminar los componentes que no necesites:

```vue-html
<RouterView v-slot="{ Component }">
  <template v-if="Component">
    <Transition mode="out-in">
      <KeepAlive>
        <Suspense>
          <!-- contenido principal -->
          <component :is="Component"></component>

          <!-- carga del estado -->
          <template #fallback>
            Loading...
          </template>
        </Suspense>
      </KeepAlive>
    </Transition>
  </template>
</RouterView>
```

Vue Router tiene soporte incorporado para [componentes de carga perezosa](https://router.vuejs.org/guide/advanced/lazy-loading.html) usando importaciones dinámicas. Estos son distintos de los componentes asíncronos y por el momento no activarán a `<Suspense>`. Sin embargo, aún pueden tener componentes asíncronos como descendientes y éstos pueden activar `<Suspense>` de la forma habitual.
