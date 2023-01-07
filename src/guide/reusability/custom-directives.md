# Directivas Personalizadas

<script setup>
const vFocus = {
  mounted: el => {
    el.focus()
  }
}
</script>

## Introducción

Además del conjunto de directivas por defecto incluidas en el core (como `v-model` o `v-show`), Vue también te permite registrar tus propias directivas personalizadas.

Hemos introducido dos formas de reutilización de código en Vue: componentes (/guide/essentials/component-basics.html) y composables (/composables). Los componentes son los principales bloques de construcción, mientras que los composables se centran en la reutilización de la lógica con estado. Las directivas personalizadas, por su parte, están pensadas principalmente para reutilizar la lógica que implica el acceso de bajo nivel al DOM en elementos planos.

Una directiva personalizada se define como un objeto que contiene hooks del ciclo de vida similares a los de un componente. Los hooks reciben el elemento al que está vinculada la directiva. Aquí hay un ejemplo de una directiva que focaliza una entrada cuando el elemento es insertado en el DOM por Vue:

<div class="composition-api">

```vue
<script setup>
// permite el v-focus en las plantillas
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

</div>

<div class="options-api">

```js
const focus = {
  mounted: (el) => el.focus()
}

export default {
  directives: {
    // permite el v-focus en las plantillas
    focus
  }
}
```

```vue-html
<input v-focus />
```

</div>

<div class="demo">
  <input v-focus placeholder="Debería estar enfocado" />
</div>

Suponiendo que no has hecho clic en otra parte de la página, la entrada de arriba debería estar autoenfocada. Esta directiva es más útil que el atributo `autofocus` porque funciona no sólo al cargar la página; también funciona cuando el elemento es insertado dinámicamente por Vue.

<div class="composition-api">

En `<script setup>`, cualquier variable camelCase que comience con el prefijo `v` puede utilizarse como directiva personalizada. En el ejemplo anterior, `vFocus` puede utilizarse en la plantilla como `v-focus`.

Si no se utiliza `<script setup>`, las directivas personalizadas pueden registrarse utilizando la opción `directives`:

```js
export default {
  setup() {
    /*...*/
  },
  directives: {
    // permite el v-focus en las plantillas
    focus: {
      /* ... */
    }
  }
}
```

</div>

<div class="options-api">

De forma parecida a los componentes, las directivas personalizadas deben ser registradas para que puedan ser utilizadas en las plantillas. En el ejemplo anterior, estamos utilizando el registro local a través de la opción `directives`.

</div>

También es común registrar globalmente las directivas personalizadas a nivel de la aplicación:

```js
const app = createApp({})

// hacer que v-focus sea utilizable en todos los componentes
app.directive('focus', {
  /* ... */
})
```

:::tip
Las directivas personalizadas deberían usarse únicamente cuando la funcionalidad deseada solo puede lograrse mediante la manipulación directa del DOM. Siempre que sea posible, es preferible utilizar directivas integradas como `v-bind`, ya que son más eficientes y fáciles de procesar por el servidor.
:::

## Hooks de la Directiva

Un objeto que defina la directiva puede proporcionar varias funciones de hook (todas ellas opcionales):

```js
const myDirective = {
  // llamada antes de que se apliquen los atributos del elemento vinculado
  // o se apliquen los escuchadores de eventos
  created(el, binding, vnode, prevVnode) {
    // ver más abajo los detalles de los argumentos
  },
  // llamada justo antes de que el elemento se inserte en el DOM.
  beforeMount(el, binding, vnode, prevVnode) {},
  // llamada cuando el componente padre del elemento vinculado
  // y todos sus hijos están montados.
  mounted(el, binding, vnode, prevVnode) {},
  // llamada antes de que se actualice el componente padre
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // llamada después de que el componente padre y
  // todos sus hijos se hayan actualizado
  updated(el, binding, vnode, prevVnode) {},
  // llamada antes de que el componente padre sea desmontado
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // llamada cuando se desmonta el componente padre
  unmounted(el, binding, vnode, prevVnode) {}
}
```

### Argumentos del Hook

A los hooks de directivas se les pasan estos argumentos

- `el`: el elemento al que está ligada la directiva. Se puede utilizar para manipular directamente el DOM.

- `binding`: un objeto que contiene las siguientes propiedades.

  - `value`: El valor pasado a la directiva. Por ejemplo, en `v-my-directive="1 + 1"`, el valor sería `2`.
  - `oldValue`: El valor previo, sólo disponible en `beforeUpdate` y `updated`. Está disponible tanto si el valor ha cambiado como si no.
  - `arg`: El argumento pasado a la directiva, si lo hay. Por ejemplo, en `v-my-directive:foo`, el argumento sería `"foo"`.
  - `modifiers`: Un objeto que contiene modificadores, si los hay. Por ejemplo, en `v-my-directive.foo.bar`, el objeto modificador sería `{ foo: true, bar: true }`.
  - `instance`: La instancia del componente donde se utiliza la directiva.
  - `dir`: el objeto de definición de la directiva.

- `vnode`: el VNode subyacente que representa el elemento vinculado.
- `prevNode`: el VNode que representa el elemento vinculado del renderizado anterior. Sólo está disponible en los hooks `beforeUpdate` y `updated`.

Como ejemplo, considera el siguiente uso de la directiva:

```vue-html
<div v-example:foo.bar="baz">
```

El argumento `binding` sería un objeto en forma de:

```js
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* valor de `baz` */,
  oldValue: /* valor de `baz` de la actualización previa */
}
```

De forma similar a las directivas integradas, los argumentos de las directivas personalizadas pueden ser dinámicos. Por ejemplo:

```vue-html
<div v-example:[arg]="value"></div>
```

En este caso, el argumento de la directiva se actualizará de forma reactiva en función de la propiedad `arg` en el estado de nuestro componente.

:::tip Nota
A parte de `el`, debes tratar estos argumentos como de sólo lectura y nunca modificarlos. Si necesitas compartir información entre hooks, se recomienda hacerlo a través del elemento [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset).
:::

## Abreviatura de la Función

Es habitual que una directiva personalizada tenga el mismo comportamiento para `mounted` y `updated`, sin necesidad de los otros hooks. En estos casos podemos definir la directiva como una función:

```vue-html
<div v-color="color"></div>
```

```js
app.directive('color', (el, binding) => {
  // esto se llamará tanto para `mounted` como para `updated`
  el.style.color = binding.value
})
```

## Object Literals

Si tu directiva necesita varios valores, puedes pasar también un objeto literal de JavaScript. Recuerda que las directivas pueden tomar cualquier expresión válida de JavaScript.

```vue-html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```js
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => " blanco"
  console.log(binding.value.text) // => " ¡hola!"
})
```

## Uso en Componentes

Cuando se utilizan en componentes, las directivas personalizadas siempre se aplicarán al nodo raíz de un componente, de forma similar a los [Atributos Fallthrough](/guide/components/attrs.html).

```vue-html
<MyComponent v-demo="test" />
```

```vue-html
<!-- plantilla de MyComponent -->

<div> <!-- se aplicará aquí la directiva v-demo -->
  <span>contenido de My component</span>
</div>
```

Observa que los componentes pueden tener potencialmente más de un nodo raíz. Cuando se aplica a un componente multi-raíz, la directiva será ignorada y se lanzará una advertencia. A diferencia de los atributos, las directivas no pueden pasarse a un elemento diferente con `v-bind="$attrs"`. En general, no se recomienda utilizar directivas personalizadas en los componentes.
