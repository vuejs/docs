---
outline: deep
---

# Funciones de Renderizado y JSX

Vue recomienda el uso de plantillas para construir aplicaciones en la gran mayoría de los casos. Sin embargo, hay situaciones en las que necesitamos toda la potencia programática de JavaScript. Ahí es donde podemos utilizar la **render function**.

> Si eres nuevo en el concepto de virtual DOM y render functions, asegúrate de leer primero el capítulo [Mecanismo de Renderizado](/guide/extras/rendering-mechanism.html).

## Uso Básico

### Creando Vnodos

Vue proporciona una función `h()` para crear vnodos:

```js
import { h } from 'vue'

const vnode = h(
  'div', // tipo
  { id: 'foo', class: 'bar' }, // props
  [
    /* hijos */
  ]
)
```

`h()` es la abreviatura de **hyperscript**, que significa "JavaScript que produce HTML (lenguaje de marcado de hipertexto)". Este nombre es heredado de las convenciones compartidas por muchas implementaciones del virtual DOM. Un nombre más descriptivo podría ser `createVnode()`, pero un nombre más corto ayuda cuando se tiene que llamar a esta función muchas veces en una función de renderizado.

La función `h()` está diseñada para ser muy flexible:

```js
// todos los argumentos excepto el tipo son opcionales
h('div')
h('div', { id: 'foo' })

// tanto los atributos como las propiedades pueden ser utilizados en props
// Vue elige automáticamente la forma correcta de asignarlo
h('div', { clase: 'barra', innerHTML: 'hola' })

// se pueden añadir modificadores de props como .prop y .attr
// con los prefijos '.' y '^' respectivamente
h('div', { '.name': 'some-name', '^width': '100' })

// class y style tienen el mismo soporte de valor
// de objeto / array que tienen en las plantillas
h('div', { class: [foo, { bar }], style: { color: 'red' } })

// los escuchadores de eventos deben ser pasados como onXxx
h('div', { onClick: () => {} })

// los hijos pueden ser un string
h('div', { id: 'foo' }, 'hola')

// las props pueden ser omitidas cuando no hay props
h('div', 'hola')
h('div', [h('span', 'hola')])

// el array hijo puede contener una mezcla de vnodos y strings
h('div', ['hola', h('span', 'hola')])
```

El vnode resultante tiene la siguiente forma:

```js
const vnode = h('div', { id: 'foo' }, [])

vnode.type // 'div'
vnode.props // { id: 'foo' }
vnode.children // []
vnode.key // null
```

:::warning Nota
La interfaz completa de `VNode` contiene muchas otras propiedades internas, pero se recomienda encarecidamente evitar depender de cualquier otra propiedad que no sean las listadas aquí. Esto evita que se produzcan interrupciones involuntarias en caso de que se modifiquen las propiedades internas.
:::

### Declaración de las Funciones de Renderizado

<div class="composition-api">

Cuando se utilizan plantillas con la Composition API, el valor de retorno del hook `setup()` se utiliza para exponer los datos a la plantilla. Sin embargo, cuando se utilizan funciones de renderizado, podemos devolver directamente la función de renderizado en su lugar:

```js
import { ref, h } from 'vue'

export default {
  props: {
    /* ... */
  },
  setup(props) {
    const count = ref(1)

    // retorna la función de renderizado
    return () => h('div', props.msg + count.value)
  }
}
```

La función de renderizado se declara dentro de `setup()` por lo que naturalmente tiene acceso a las props y a cualquier estado reactivo declarado en el mismo ámbito.

Además de retornar un único vnode, también puedes retornar strings o arrays:

```js
export default {
  setup() {
    return () => '¡Hola mundo!'
  }
}
```

```js
import { h } from 'vue'

export default {
  setup() {
    // utiliza un array para devolver varios nodos raíz
    return () => [h('div'), h('div'), h('div')]
  }
}
```

:::tip
Asegúrate de retornar una función en lugar de retornar valores directamente. La función `setup()` sólo se llama una vez por componente, mientras que la función de renderizado retornada se llamará varias veces.
:::

</div>
<div class="options-api">

Podemos declarar funciones de renderizado utilizando la opción `render`:

```js
import { h } from 'vue'

export default {
  data() {
    return {
      msg: 'hola'
    }
  },
  render() {
    return h('div', this.msg)
  }
}
```

La función `render()` tiene acceso a la instancia del componente a través de `this`.

Además de retornar un único vnode, también puede devolver strings o arrays:

```js
export default {
  render() {
    return '¡Hola mundo!'
  }
}
```

```js
import { h } from 'vue'

export default {
  render() {
    // utiliza un array para devolver varios nodos raíz
    return [h('div'), h('div'), h('div')]
  }
}
```

</div>

Si un componente de la función de renderizado no necesita ningún estado de la instancia, en aras de la brevedad también pueden declararse directamente como una función:

```js
function Hello() {
  return '¡Hola mundo!'
}
```

Así es, ¡este es un componente Vue válido! Consulta [Componentes Funcionales](#componentes-funcionales) para más detalles sobre esta sintaxis.

### Los Vnodos Deben Ser Únicos

Todos los vnodos en el árbol de componentes deben ser únicos. Esto significa que la siguiente función de renderizado no es válida:

```js
function render() {
  const p = h('p', 'hi')
  return h('div', [
    // Vaya, ¡vnodos duplicados!
    p,
    p
  ])
}
```

Si realmente quieres duplicar el mismo elemento/componente muchas veces, puedes hacerlo con una factory function. Por ejemplo, la siguiente función de renderizado es una forma perfectamente válida para renderizar 20 párrafos idénticos:

```js
function render() {
  return h(
    'div',
    Array.from({ length: 20 }).map(() => {
      return h('p', 'hola')
    })
  )
}
```

## JSX / TSX

[JSX](https://facebook.github.io/jsx/) es una extensión de JavaScript de tipo XML que nos permite escribir código como éste:

```jsx
const vnode = <div>hola</div>
```

Dentro de las expresiones JSX, usa llaves para insertar valores dinámicos:

```jsx
const vnode = <div id={dynamicId}>hola, {userName}</div>
```

Tanto `create-vue` como Vue CLI tienen opciones para crear proyectos con soporte JSX preconfigurado. Si vas a configurar JSX manualmente, consulta la documentación de [`@vue/babel-plugin-jsx`](https://github.com/vuejs/jsx-next) para más detalles.

Aunque fue introducido por primera vez por React, JSX en realidad no tiene una semántica de tiempo de ejecución definida y puede ser compilado en varias salidas diferentes. Si has trabajado con JSX antes, ten en cuenta que **la transformación JSX de Vue es diferente de la transformación JSX de React**, por lo que no puedes usar la transformación JSX de React en aplicaciones Vue. Algunas diferencias notables con respecto a React JSX incluyen:

- Puedes usar atributos HTML como `class` y `for` como props; no es necesario usar `className` o `htmlFor`.
- Pasar hijos a los componentes (es decir, slots) [funciona de forma diferente](#paso-de-slots).

La definición de tipos de Vue también proporciona inferencia de tipos para el uso de TSX. Al utilizar TSX, asegúrate de especificar `"jsx": "preserve"` en `tsconfig.json` para que TypeScript deje la sintaxis JSX intacta a la hora de procesar la transformación JSX de Vue.

## Recetas de Funciones de Renderizado

A continuación vamos a proporcionar algunas recetas comunes para la implementación de funciones de plantilla con sus equivalentes funciones de renderizado / JSX.

### `v-if`

Template:

```vue-html
<div>
  <div v-if="ok">sí</div>
  <span v-else>no</span>
</div>
```

Función de renderizado y JSX equivalentes:

<div class="composition-api">

```js
h('div', [ok.value ? h('div', 'sí') : h('span', 'no')])
```

```jsx
<div>{ok.value ? <div>sí</div> : <span>no</span>}</div>
```

</div>
<div class="options-api">

```js
h('div', [this.ok ? h('div', 'sí') : h('span', 'no')])
```

```jsx
<div>{this.ok ? <div>sí</div> : <span>no</span>}</div>
```

</div>

### `v-for`

Template:

```vue-html
<ul>
  <li v-for="{ id, text } in items" :key="id">
    {{ text }}
  </li>
</ul>
```

Función de renderizado y JSX equivalentes:

<div class="composition-api">

```js
h(
  'ul',
  // suponiendo que `items` es una ref con valor de array
  items.value.map(({ id, text }) => {
    return h('li', { key: id }, text)
  })
)
```

```jsx
<ul>
  {items.value.map(({ id, text }) => {
    return <li key={id}>{text}</li>
  })}
</ul>
```

</div>
<div class="options-api">

```js
h(
  'ul',
  this.items.map(({ id, text }) => {
    return h('li', { key: id }, text)
  })
)
```

```jsx
<ul>
  {this.items.map(({ id, text }) => {
    return <li key={id}>{text}</li>
  })}
</ul>
```

</div>

### `v-on`

Las props con nombres que comienzan con `on` seguido de una letra mayúscula se tratan como escuchadores de eventos. Por ejemplo, `onClick` es el equivalente a `@click` en las plantillas.

```js
h(
  'button',
  {
    onClick(event) {
      /* ... */
    }
  },
  'hazme clic'
)
```

```jsx
<button
  onClick={(event) => {
    /* ... */
  }}
>
  hazme clic
</button>
```

#### Modificadores de Eventos

Los modificadores de eventos `.passive`, `.capture` y `.once` se pueden concatenar después del nombre del evento utilizando camelCase.

Por ejemplo:

```js
h('input', {
  onClickCapture() {
    /* escuchador en modo captura */
  },
  onKeyupOnce() {
    /* se activa solo una vez */
  },
  onMouseoverOnceCapture() {
    /* una vez + captura */
  }
})
```

```jsx
<input
  onClickCapture={() => {}}
  onKeyupOnce={() => {}}
  onMouseoverOnceCapture={() => {}}
/>
```

Para otros modificadores de eventos y keys, se puede utilizar el helper [`withModifiers`](/api/render-function.html#withmodifiers):

```js
import { withModifiers } from 'vue'

h('div', {
  onClick: withModifiers(() => {}, ['self'])
})
```

```jsx
<div onClick={withModifiers(() => {}, ['self'])} />
```

### Componentes

Para crear un vnode para un componente, el primer argumento pasado a `h()` debe ser la definición del componente. Esto significa que cuando se utilizan las funciones de renderizado, no es necesario registrar los componentes; se pueden utilizar directamente los componentes importados:

```js
import Foo from './Foo.vue'
import Bar from './Bar.jsx'

function render() {
  return h('div', [h(Foo), h(Bar)])
}
```

```jsx
function render() {
  return (
    <div>
      <Foo />
      <Bar />
    </div>
  )
}
```

Como podemos ver, `h` puede trabajar con componentes importados desde cualquier formato de archivo siempre que sea un componente Vue válido.

Los componentes dinámicos son fácilmente utilizables con las funciones de renderizado:

```js
import Foo from './Foo.vue'
import Bar from './Bar.jsx'

function render() {
  return ok.value ? h(Foo) : h(Bar)
}
```

```jsx
function render() {
  return ok.value ? <Foo /> : <Bar />
}
```

Si un componente está registrado por su nombre y no puede ser importado directamente (por ejemplo, registrado globalmente por una librería), se puede resolver programáticamente utilizando el helper [`resolveComponent()`](/api/render-function.html#resolvecomponent).

### Renderizado de Slots

<div class="composition-api">

En las funciones de renderizado, se puede acceder a los slots desde el contexto `setup()`. Cada slot en el objeto `slots` es una **función que devuelve un array de vnodos**:

```js
export default {
  props: ['message'],
  setup(props, { slots }) {
    return () => [
      // slot por defecto:
      // <div><slot /></div>
      h('div', slots.default()),

      // slot designado:
      // <div><slot name="footer" :text="message" /></div>
      h(
        'div',
        slots.footer({
          text: props.message
        })
      )
    ]
  }
}
```

JSX equivalente:

```jsx
// por defecto
<div>{slots.default()}</div>

// designado
<div>{slots.footer({ text: props.message })}</div>
```

</div>
<div class="options-api">

En las funciones de renderizado, se puede acceder a los slots desde [`this.$slots`](/api/component-instance.html#slots):

```js
export default {
  props: ['message'],
  render() {
    return [
      // <div><slot /></div>
      h('div', this.$slots.default()),

      // <div><slot name="footer" :text="message" /></div>
      h(
        'div',
        this.$slots.footer({
          text: this.message
        })
      )
    ]
  }
}
```

JSX equivalente:

```jsx
// <div><slot /></div>
<div>{this.$slots.default()}</div>

// <div><slot name="footer" :text="message" /></div>
<div>{this.$slots.footer({ text: this.message })}</div>
```

</div>

### Paso de Slots

Pasar hijos a los componentes funciona de forma un poco diferente a pasar hijos a los elementos. En lugar de un array, tenemos que pasar una función de slot, o un objeto de funciones de slot. Las funciones de slot pueden devolver cualquier cosa que una función de renderizado normal pueda devolver; que siempre se normalizará a arrays de vnodos cuando se acceda a ellos en el componente hijo.

```js
// slot único por defecto
h(MyComponent, () => 'hola')

// slot designados
// observa que el `null` es necesario para evitar
// que el objeto slot sea tratado como props
h(MyComponent, null, {
  default: () => 'slot por defecto',
  foo: () => h('div', 'foo'),
  bar: () => [h('span', 'uno'), h('span', 'dos')]
})
```

JSX equivalente:

```jsx
// por defecto
<MyComponent>{() => 'hola'}</MyComponent>

// designado
<MyComponent>{{
  default: () => 'slot por defecto',
  foo: () => <div>foo</div>,
  bar: () => [<span>uno</span>, <span>dos</span>]
}}</MyComponent>
```

Pasar los slots como funciones permite que sean invocados de forma perezosa por el componente hijo. Esto lleva a que las dependencias del slot sean rastreadas por el hijo en lugar del padre, lo que resulta en actualizaciones más precisas y eficientes.

### Componentes Integrados

[Los componentes integrados](/api/built-in-components.html) como `<KeepAlive>`, `<Transition>`, `<TransitionGroup>`, `<Teleport>` y `<Suspense>` deben ser importados para su uso en las funciones de renderizado:

<div class="composition-api">

```js
import { h, KeepAlive, Teleport, Transition, TransitionGroup } from 'vue'

export default {
  setup() {
    return () => h(Transition, { mode: 'out-in' } /* ... */)
  }
}
```

</div>
<div class="options-api">

```js
import { h, KeepAlive, Teleport, Transition, TransitionGroup } from 'vue'

export default {
  render() {
    return h(Transition, { mode: 'out-in' } /* ... */)
  }
}
```

</div>

### `v-model`

La directiva `v-model` se expande a las props `modelValue` y `onUpdate:modelValue` durante la compilación de la plantilla; tendremos que proporcionar estas props nosotros mismos:

<div class="composition-api">

```js
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () =>
      h(SomeComponent, {
        modelValue: props.modelValue,
        'onUpdate:modelValue': (value) => emit('update:modelValue', value)
      })
  }
}
```

</div>
<div class="options-api">

```js
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  render() {
    return h(SomeComponent, {
      modelValue: this.modelValue,
      'onUpdate:modelValue': (value) =>
        this.$emit('update:modelValue', value)
    })
  }
}
```

</div>

### Directivas Personalizadas

Las directivas personalizadas pueden ser aplicadas a un vnode usando [`withDirectives`](/api/render-function.html#withdirectives):

```js
import { h, withDirectives } from 'vue'

// una directiva personalizada
const pin = {
  mounted() {
    /* ... */
  },
  updated() {
    /* ... */
  }
}

// <div v-pin:top.animate="200"></div>
const vnode = withDirectives(h('div'), [
  [pin, 200, 'top', { animate: true }]
])
```

Si la directiva está registrada por su nombre y no se puede importar directamente, se puede resolver utilizando el helper [`resolveDirective`](/api/render-function.html#resolvedirective).

## Componentes Funcionales

Los componentes funcionales son una forma alternativa de componente que no tienen ningún estado propio. Actúan como funciones puras: entrada de props, salida de vnodes. Se renderizan sin crear una instancia del componente (es decir, sin `this`), y sin los hooks habituales del ciclo de vida del componente.

Para crear un componente funcional utilizamos una función simple, en lugar de un objeto de opciones. La función es efectivamente la función `render` para el componente.

<div class="composition-api">

La estructura de un componente funcional es la misma que la del hook `setup()`:

```js
function MyComponent(props, { slots, emit, attrs }) {
  // ...
}
```

</div>
<div class="options-api">

Como no hay una referencia `this` para un componente funcional, Vue pasará las `props` como primer argumento:

```js
function MyComponent(props, context) {
  // ...
}
```

El segundo argumento, `context`, contiene tres propiedades: `attrs`, `emit`, y `slots`. Estos son equivalentes a las propiedades de la instancia [`$attrs`](/api/component-instance.html#attrs), [`$emit`](/api/component-instance.html#emit), y [`$slots`](/api/component-instance.html#slots) respectivamente.

</div>

La mayor parte de las opciones de configuración habituales para los componentes no están disponibles para los componentes funcionales. No obstante, es posible definir [`props`](/api/options-state.html#props) y [`emits`](/api/options-state.html#emits) añadiéndolas como propiedades:

```js
MyComponent.props = ['value']
MyComponent.emits = ['click']
```

Si no se especifica la opción `props`, el objeto `props` pasado a la función contendrá todos los atributos, igual que `attrs`. Los nombres de las props no se normalizarán a camelCase a menos que se especifique la opción `props`.

Los componentes funcionales pueden ser registrados y consumidos como los componentes normales. Si pasas una función como primer argumento a `h()`, será tratada como un componente funcional.
