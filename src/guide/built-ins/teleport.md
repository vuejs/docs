# Teleport

 <VueSchoolLink href="https://vueschool.io/lessons/vue-3-teleport" title="Free Vue.js Teleport Lesson"/>

`<Teleport>` es un componente integrado que nos permite "teletransportar" una parte de la plantilla de un componente a un nodo del DOM que existe fuera de la jerarquía del DOM de ese componente.

## Uso Básico

A veces podemos encontrarnos con el siguiente escenario: una parte de la plantilla de un componente le pertenece lógicamente, pero desde un punto de vista visual, debería mostrarse en otro lugar del DOM, fuera de la aplicación Vue.

El ejemplo más común de esto es cuando se construye un modal a pantalla completa. Idealmente, queremos que el botón del modal y el propio modal vivan dentro del mismo componente, ya que ambos están relacionados con el estado de apertura / cierre del modal. Pero eso significa que el modal se mostrará junto al botón, profundamente anidado en la jerarquía del DOM de la aplicación. Esto puede crear algunos problemas complicados al posicionar el modal a través de CSS.

Considera la siguiente estructura HTML.

```vue-html
<div class="outer">
<h3>Ejemplo de Teleport de Vue</h3>
  <div>
    <MyModal />
  </div>
</div>
```

Y esta es la implementación de `<MyModal>`:

<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <button @click="open = true">Abrir Modal</button>

  <div v-if="open" class="modal">
    <p>¡Hola desde el modal!</p>
    <button @click="open = false">Cerrar</button>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
```

</div>
<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      open: false
    }
  }
}
</script>

<template>
  <button @click="open = true">Abrir Modal</button>

  <div v-if="open" class="modal">
    <p>¡Hola desde el modal!</p>
    <button @click="open = false">Cerrar</button>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
```

</div>

El componente contiene un `<button>` para desencadenar la apertura del modal, y un `<div>` con clase `.modal`, que contendrá el contenido del modal y un botón para autocerrarse.

Cuando se utiliza este componente dentro de la estructura HTML inicial, hay una serie de problemas potenciales:

- `position: fixed` sólo coloca el elemento en relación con la ventana gráfica cuando ningún elemento antecesor tiene definida la propiedad `transform`, `perspective` o `filter`. Si, por ejemplo, pretendemos animar el elemento antecesor `<div class="outer">` con una transformación CSS, ¡se rompería el diseño del modal!

- El `z-index` del modal está limitado por los elementos que lo contienen. Si hay otro elemento que se superpone con `<div class="outer">` y tiene un `z-index` más alto, cubriría nuestro modal.

La función `<Teleport>` proporciona una forma limpia de trabajar con esto, permitiéndonos salir de la estructura anidada del DOM. Modifiquemos `<MyModal>` para utilizar `<Teleport>`:

```vue-html{3,8}
<button @click="open = true">Abrir Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>¡Hola desde el modal!</p>
    <button @click="open = false">Cerrar</button>
  </div>
</Teleport>
```

El objetivo `to` de `<Teleport>` espera una cadena de selección CSS o un nodo DOM real. En este caso, le estamos diciendo a Vue que "**teletransporte** este fragmento de la plantilla **a** la etiqueta **`body`**".

Puedes hacer clic en el botón de abajo e inspeccionar la etiqueta `<body>` a través de las herramientas de desarrollo de tu navegador:

<script setup>
let open = $ref(false)
</script>

<div class="demo">
  <button @click="open = true">Abrir Modal</button>
  <ClientOnly>
    <Teleport to="body">
      <div v-if="open" class="demo modal-demo">
        <p style="margin-bottom:20px">¡Hola desde el modal!</p>
        <button @click="open = false">Cerrar</button>
      </div>
    </Teleport>
  </ClientOnly>
</div>

<style>
.modal-demo {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  background-color: var(--vt-c-bg);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
</style>

Puedes combinar `<Teleport>` con [`<Transition>`](./transition) para crear modales animados; consulta el [Ejemplo aquí](/examples/#modal).

:::tip
El destino `to` del teletransporte debe estar ya en el DOM cuando se monta el componente `<Teleport>`. Lo ideal es que sea un elemento fuera de toda la aplicación Vue. Si el objetivo es otro elemento renderizado por Vue, tienes que asegurarte de que ese elemento se monta antes del `<Teleport>`.
:::

## Uso con Componentes

La función `<Teleport>` sólo altera la estructura del DOM renderizado, y no afecta a la jerarquía lógica de los componentes. Es decir, si `<Teleport>` contiene un componente, ese componente seguirá siendo hijo lógico del componente padre que contiene el `<Teleport>`. El paso de objetos y la emisión de eventos seguirán funcionando de la misma manera.

Esto también significa que las inyecciones desde un componente padre funcionan como se espera, y que el componente hijo será anidado debajo del componente padre en las Vue Devtools, en lugar de ser colocado a donde se movió el contenido actual.

## Desactivación de Teleport

En algunos casos, podemos querer desactivar condicionalmente `<Teleport>`. Por ejemplo, podemos querer renderizar un componente como una superposición para el escritorio, pero en línea en el móvil. El componente `<Teleport>` soporta la propiedad `disabled` que puede ser activada dinámicamente:

```vue-html
<Teleport :disabled="isMobile">
  ...
</Teleport>
```

Donde el estado `isMobile` puede actualizarse dinámicamente detectando los cambios en la consulta de medios.

## Múltiples Teletransportes sobre el Mismo Objetivo

Un caso de uso común sería un componente `<Modal>` reutilizable, con la posibilidad de que varias instancias estén activas al mismo tiempo. Para este tipo de escenario, múltiples componentes `<Teleport>` pueden montar su contenido en el mismo elemento de destino. El orden será un simple agregado; los montajes posteriores se ubicarán después de los anteriores dentro del elemento destino.

Teniendo en cuenta el siguiente uso:

```vue-html
<Teleport to="#modals">
  <div>A</div>
</Teleport>
<Teleport to="#modals">
  <div>B</div>
</Teleport>
```

El resultado renderizado sería:

```html
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```

---

**Relacionado**

- [Referencia de la API sobre `<Teleport>`](/api/built-in-components.html#teleport)
- [Manejo de Teleports en SSR](/guide/scaling-up/ssr.html#teleports)
