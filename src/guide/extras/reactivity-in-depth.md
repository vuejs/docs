---
outline: deep
---

<script setup>
import SpreadSheet from './demos/SpreadSheet.vue'
</script>

# Reactividad en Profundidad

Una de las características más distintivas de Vue es el sistema de reactividad no intrusiva. El estado de los componentes consiste en objetos JavaScript reactivos. Cuando los modificas, la vista se actualiza. Esto hace que la gestión del estado sea sencilla e intuitiva, pero también es importante entender cómo funciona para evitar algunos problemas comunes. En esta sección, vamos a profundizar en algunos de los detalles de bajo nivel del sistema de reactividad de Vue.

## ¿Qué es la Reactividad?

Este término aparece bastante en la programación hoy en día, pero ¿a qué se refiere la gente cuando lo dice? La reactividad es un paradigma de programación que nos permite ajustarnos a los cambios de forma declarativa. El ejemplo canónico que la gente suele mostrar, porque es muy bueno, es una hoja de cálculo de Excel:

<SpreadSheet />

Aquí la celda A2 está definida mediante una fórmula de `= A0 + A1` (se puede pulsar sobre A2 para ver o editar la fórmula), por lo que la hoja de cálculo nos da 3. No hay sorpresas. Pero si actualizas A0 o A1, notarás que A2 también se actualiza automáticamente.

JavaScript no suele funcionar así. Si escribiéramos algo comparable en JavaScript:

```js
let A0 = 1
let A1 = 2
let A2 = A0 + A1

console.log(A2) // 3

A0 = 2
console.log(A2) // Aún es 3
```

Cuando mutamos `A0`, `A2` no cambia automáticamente.

Entonces, ¿cómo podríamos hacer esto en JavaScript? En primer lugar, para volver a ejecutar el código que actualiza `A2`, vamos a envolverlo en una función:

```js
let A2

function update() {
  A2 = A0 + A1
}
```

Entonces, necesitamos definir algunos términos:

- La función `update()` produce un **efecto secundario**, o **efecto** para abreviar, porque modifica el estado del programa.

- Los valores `A0` y `A1` se consideran **dependencias** del efecto, ya que sus valores se utilizan para realizar el efecto. Se dice que el efecto es un **suscriptor** de sus dependencias.

Lo que necesitamos es una función mágica que pueda invocar `update()` (el **efecto**) cada vez que `A0` o `A1` (las **dependencias**) cambien:

```js
whenDepsChange(update)
```

Esta función `whenDepsChange()` tiene las siguientes tareas:

1. Rastrear cuando una variable es leída. Por ejemplo, cuando se evalúa la expresión `A0 + A1`, se leen tanto `A0` como `A1`.

2. Si una variable es leída cuando hay un efecto en ejecución, hacer que ese efecto sea un suscriptor de esa variable. Por ejemplo, como `A0` y `A1` se leen cuando se ejecuta `update()`, `update()` se convierte en suscriptor de `A0` y `A1` después de la primera llamada.

3. Detectar cuando una variable es mutada. Por ejemplo, cuando a `A0` se le asigna un nuevo valor, notifica a todos sus efectos suscriptores para que se vuelvan a ejecutar.

## Cómo Funciona la Reactividad en Vue

Realmente no podemos hacer un seguimiento de la lectura y escritura de variables locales como en el ejemplo. No hay ningún mecanismo para hacerlo en JavaScript. Lo que sí **podemos** hacer es interceptar la lectura y escritura de las **propiedades de los objetos**.

Hay dos maneras de interceptar el acceso a las propiedades en JavaScript: [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) / [setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) y [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Vue 2 utilizaba exclusivamente getter / setters debido a las limitaciones de soporte del navegador. En Vue 3, se utilizan Proxies para los objetos reactive y getter / setters para los refs. Aquí hay un pseudocódigo que ilustra cómo funcionan:

```js{4,9,17,22}
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
    }
  })
}

function ref(value) {
  const refObject = {
    get value() {
      track(refObject, 'value')
      return value
    },
    set value(newValue) {
      value = newValue
      trigger(refObject, 'value')
    }
  }
  return refObject
}
```

:::tip
Los snippets de código aquí y más abajo pretenden explicar los conceptos básicos de la forma más sencilla posible, por lo que se omiten muchos detalles y se ignoran los casos extremos.
:::

Esto explica algunas [limitaciones de los objetos reactivos](/guide/essentials/reactivity-fundamentals.html#limitaciones-de-reactive) que hemos discutido en la sección de fundamentos:

- Cuando asignas o desestructuras una propiedad de un objeto reactivo a una variable local, la reactividad se "desconecta" porque el acceso a la variable local ya no acciona las capturas del proxy get / set.

- El proxy devuelto por `reactive()`, aunque se comporta igual que el original, tiene una identidad diferente si lo comparamos con el original usando el operador `===`.

Dentro de `track()`, comprobamos si hay un efecto en ejecución. Si lo hay, buscamos los efectos suscriptores (almacenados en un conjunto) para la propiedad que se está siguiendo, y añadimos el efecto al conjunto:

```js
// Esto se establecerá justo antes de que un efecto esté a punto
// de ser ejecutado. Nos ocuparemos de esto más adelante.
let activeEffect

function track(target, key) {
  if (activeEffect) {
    const effects = getSubscribersForProperty(target, key)
    effects.add(activeEffect)
  }
}
```

Las suscripciones de efectos se almacenan en una estructura de datos global `WeakMap<target, Map<key, Set<effect>>>`. Si no se ha encontrado ningún conjunto de efectos suscritos para una propiedad (rastreada por primera vez), se creará. Esto es lo que hace la función `getSubscribersForProperty()`, en resumen. Para simplificar, omitiremos sus detalles.

Dentro de `trigger()`, volvemos a buscar los efectos del suscriptor para la propiedad. Pero esta vez los invocamos:

```js
function trigger(target, key) {
  const effects = getSubscribersForProperty(target, key)
  effects.forEach((effect) => effect())
}
```

Volvamos ahora a la función `whenDepsChange()`:

```js
function whenDepsChange(update) {
  const effect = () => {
    activeEffect = effect
    update()
    activeEffect = null
  }
  effect()
}
```

Esto encierra la función cruda `update` en un efecto que se establece como el efecto activo actual antes de ejecutar la actualización real. Esto permite las llamadas a `track()` durante la actualización para localizar el efecto activo actual.

En este punto, hemos creado un efecto que rastrea automáticamente sus dependencias, y se vuelve a ejecutar cada vez que una dependencia cambia. A esto lo llamamos un **Efecto Reactivo**.

Vue proporciona una API que permite crear efectos reactivos: [`watchEffect()`](/api/reactivity-core.html#watcheffect). De hecho, te habrás dado cuenta de que funciona de forma bastante similar al mágico `whenDepsChange()` del ejemplo. Ahora podemos rehacer el ejemplo original utilizando las APIs reales de Vue:

```js
import { ref, watchEffect } from 'vue'

const A0 = ref(0)
const A1 = ref(1)
const A2 = ref()

watchEffect(() => {
  // rastrea A0 y A1
  A2.value = A0.value + A1.value
})

// dispara el efecto
A0.value = 2
```

Usar un efecto reactivo para mutar una ref no es el caso de uso más interesante; de hecho, usar una propiedad computada lo hace más declarativo:

```js
import { ref, computed } from 'vue'

const A0 = ref(0)
const A1 = ref(1)
const A2 = computed(() => A0.value + A1.value)

A0.value = 2
```

Internamente, `computed` gestiona su invalidación y recálculo utilizando un efecto reactivo.

Así que, ¿cuál es un ejemplo de un efecto reactivo común y útil? Bueno, ¡actualizar el DOM! Podemos implementar una simple "renderización reactiva" como esta:

```js
import { ref, watchEffect } from 'vue'

const count = ref(0)

watchEffect(() => {
  document.body.innerHTML = `La cuenta es: ${count.value}`
})

// actualiza el DOM
count.value++
```

De hecho, esto es bastante parecido a cómo un componente de Vue mantiene el estado y el DOM en sincronía; cada instancia del componente crea un efecto reactivo para renderizar y actualizar el DOM. Por supuesto, los componentes de Vue utilizan formas mucho más eficientes de actualizar el DOM que `innerHTML`. Esto se trata en [Mecanismo de Renderizado](./rendering-mechanism).

<div class="options-api">

Las APIs `ref()`, `computed()` y `watchEffect()` forman parte de la API de composición. Si hasta ahora sólo has utilizado la Options API con Vue, te darás cuenta de que la Composition API está más cerca de cómo funciona el sistema de reactividad de Vue. De hecho, en Vue 3 la Options API está implementada sobre la Composition API. Todo el acceso a las propiedades en la instancia del componente (`this`) activa getter / setters para el seguimiento de la reactividad, y las opciones como `watch` y `computed` invocan sus equivalentes de la Composition API internamente.

</div>

## Reactividad en Tiempo de Ejecución vs. Tiempo de Compilación

El sistema de reactividad de Vue se basa principalmente en el tiempo de ejecución: el seguimiento y la activación se realizan mientras el código se ejecuta directamente en el navegador. Las ventajas de la reactividad en tiempo de ejecución es que puede funcionar sin un paso de compilación, y hay menos casos límite. Por otro lado, esto hace que esté restringida por las limitaciones de sintaxis de JavaScript.

Ya hemos encontrado una limitación en el ejemplo anterior: JavaScript no nos proporciona una forma de interceptar la lectura y escritura de variables locales, por lo que tenemos que acceder siempre al estado reactivo como propiedades de objetos, utilizando objetos reactive o refs.

Hemos estado experimentando con la función [Transformación de la Reactividad](/guide/extras/reactivity-transform.html) para reducir la verbosidad del código:

```js
let A0 = $ref(0)
let A1 = $ref(1)

// seguimiento de la lectura de la variable
const A2 = $computed(() => A0 + A1)

// activación de la escritura de la variable
A0 = 2
```

Este snippet compila exactamente lo que habríamos escrito sin la transformación, añadiendo automáticamente `.value` después de las referencias a las variables. Con la Transformación de la Reactividad, el sistema de reactividad de Vue se convierte en uno híbrido.

## Depuración de la Reactividad

Es estupendo que el sistema de reactividad de Vue rastree automáticamente las dependencias, pero en algunos casos podemos querer averiguar exactamente qué se está rastreando, o qué está causando que un componente se vuelva a renderizar.

### Hooks de Depuración de Componentes

Podemos depurar qué dependencias se utilizan durante el renderizado de un componente y cuáles son las que desencadenan una actualización utilizando las funciones <span class="options-api">`renderTracked`</span><span class="composition- api">`onRenderTracked`</span> y <span class="options-api">`renderTriggered`</span><span class="composition-api">`onRenderTriggered`</span> del hooks del ciclo de vida. Ambos hooks recibirán un evento de depuración que contiene información sobre la dependencia en cuestión. Se recomienda colocar una sentencia `debugger` en los callbacks para inspeccionar interactivamente la dependencia:

<div class="composition-api">

```vue
<script setup>
import { onRenderTracked, onRenderTriggered } from 'vue'

onRenderTracked((event) => {
  debugger
})

onRenderTriggered((event) => {
  debugger
})
</script>
```

</div>
<div class="options-api">

```js
export default {
  renderTracked(event) {
    debugger
  },
  renderTriggered(event) {
    debugger
  }
}
```

</div>

:::tip
Los hooks de depuración de componentes sólo funcionan en modo de desarrollo.
:::

Los objetos de eventos de depuración tienen el siguiente tipo:

<span id="debugger-event"></span>

```ts
type DebuggerEvent = {
  effect: ReactiveEffect
  target: object
  type:
    | TrackOpTypes /* 'get' | 'has' | 'iterate' */
    | TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
  key: any
  newValue?: any
  oldValue?: any
  oldTarget?: Map<any, any> | Set<any>
}
```

### Depuración Computada

<!-- TODO equivalente de la Options API -->

Podemos depurar las propiedades computadas pasando a `computed()` un segundo objeto de opciones con los callbacks `onTrack` y `onTrigger`:

- `onTrack` será llamado cuando una propiedad reactive o ref sea rastreada como una dependencia.
- `onTrigger` se llamará cuando la llamada de retorno del watcher sea activada por la mutación de una dependencia.

Ambos callbacks recibirán eventos del depurador en el [mismo formato](#component-debugging-hooks) que los hooks de depuración del componente:

```js
const plusOne = computed(() => count.value + 1, {
  onTrack(e) {
    // activado cuando count.value es rastreado como una dependencia
    debugger
  },
  onTrigger(e) {
    // activado cuando count.value es mutado
    debugger
  }
})

// acceder a plusOne, debería activar a onTrack
console.log(plusOne.value)

// mutar count.value, debería activar a onTrigger
count.value++
```

:::tip
Las opciones computadas `onTrack` y `onTrigger` sólo funcionan en modo de desarrollo.
:::

### Depuración del Watcher

<!-- TODO equivalente de la Options API -->

Al igual que `computed()`, los watchers también soportan las opciones `onTrack` y `onTrigger`:

```js
watch(source, callback, {
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  }
})

watchEffect(callback, {
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  }
})
```

:::tip
Las opciones de seguimiento `onTrack` y `onTrigger` sólo funcionan en modo de desarrollo.
:::

## Integración con los Sistemas de Estado Externos

El sistema de reactividad de Vue funciona convirtiendo profundamente los objetos JavaScript planos en proxies reactivos. La conversión profunda puede ser innecesaria o a veces no deseada cuando se integra con sistemas de gestión de estado externos (por ejemplo, si una solución externa también utiliza Proxies).

La idea general de integrar el sistema de reactividad de Vue con una solución externa de gestión de estado es mantener el estado externo en un [`shallowRef`](/api/reactivity-advanced.html#shallowref). Una ref superficial sólo es reactiva cuando se accede a su propiedad `.value`; el valor interno se deja intacto. Cuando el estado externo cambia, reemplaza el valor de la ref para activar las actualizaciones.

### Datos Inmutables

Si estás implementando una función de deshacer / rehacer, es probable que quieras tomar una instantánea del estado de la aplicación en cada edición del usuario. Sin embargo, el sistema de reactividad mutable de Vue no es el más adecuado para esto si el árbol de estado es grande, porque serializar todo el objeto del estado en cada actualización puede ser costoso en términos de costes de CPU y memoria.

Las [estructuras de datos inmutables](https://en.wikipedia.org/wiki/Persistent_data_structure) solucionan esto al no mutar nunca los objetos de estado; en su lugar, crean nuevos objetos que comparten las mismas partes inalteradas con los antiguos. Hay diferentes formas de utilizar datos inmutables en JavaScript, pero recomendamos utilizar [Immer](https://immerjs.github.io/immer/) con Vue porque permite el uso de datos inmutables manteniendo la sintaxis mutable más ergonómica.

Podemos integrar Immer con Vue a través de un simple composable:

```js
import produce from 'immer'
import { shallowRef } from 'vue'

export function useImmer(baseState) {
  const state = shallowRef(baseState)
  const update = (updater) => {
    state.value = produce(state.value, updater)
  }

  return [state, update]
}
```

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZUltbWVyIH0gZnJvbSAnLi9pbW1lci5qcydcbiAgXG5jb25zdCBbaXRlbXMsIHVwZGF0ZUl0ZW1zXSA9IHVzZUltbWVyKFtcbiAge1xuICAgICB0aXRsZTogXCJMZWFybiBWdWVcIixcbiAgICAgZG9uZTogdHJ1ZVxuICB9LFxuICB7XG4gICAgIHRpdGxlOiBcIlVzZSBWdWUgd2l0aCBJbW1lclwiLFxuICAgICBkb25lOiBmYWxzZVxuICB9XG5dKVxuXG5mdW5jdGlvbiB0b2dnbGVJdGVtKGluZGV4KSB7XG4gIHVwZGF0ZUl0ZW1zKGl0ZW1zID0+IHtcbiAgICBpdGVtc1tpbmRleF0uZG9uZSA9ICFpdGVtc1tpbmRleF0uZG9uZVxuICB9KVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHVsPlxuICAgIDxsaSB2LWZvcj1cIih7IHRpdGxlLCBkb25lIH0sIGluZGV4KSBpbiBpdGVtc1wiXG4gICAgICAgIDpjbGFzcz1cInsgZG9uZSB9XCJcbiAgICAgICAgQGNsaWNrPVwidG9nZ2xlSXRlbShpbmRleClcIj5cbiAgICAgICAge3sgdGl0bGUgfX1cbiAgICA8L2xpPlxuICA8L3VsPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlPlxuLmRvbmUge1xuICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcbn1cbjwvc3R5bGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCIsXG4gICAgXCJpbW1lclwiOiBcImh0dHBzOi8vdW5wa2cuY29tL2ltbWVyQDkuMC43L2Rpc3QvaW1tZXIuZXNtLmpzP21vZHVsZVwiXG4gIH1cbn0iLCJpbW1lci5qcyI6ImltcG9ydCBwcm9kdWNlIGZyb20gJ2ltbWVyJ1xuaW1wb3J0IHsgc2hhbGxvd1JlZiB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUltbWVyKGJhc2VTdGF0ZSkge1xuICBjb25zdCBzdGF0ZSA9IHNoYWxsb3dSZWYoYmFzZVN0YXRlKVxuICBjb25zdCB1cGRhdGUgPSAodXBkYXRlcikgPT4ge1xuICAgIHN0YXRlLnZhbHVlID0gcHJvZHVjZShzdGF0ZS52YWx1ZSwgdXBkYXRlcilcbiAgfVxuXG4gIHJldHVybiBbc3RhdGUsIHVwZGF0ZV1cbn0ifQ==)

### Máquinas de Estado

Las [Máquinas de Estado](https://en.wikipedia.org/wiki/Finite-state_machine) son un modelo para describir todos los estados posibles en los que puede estar una aplicación y todas las formas posibles de transición de un estado a otro. Aunque puede ser exagerado para componentes simples, puede ayudar a que los flujos de estado complejos sean más robustos y manejables.

Una de las implementaciones de máquinas de estado más populares en JavaScript es [XState](https://xstate.js.org/). Aquí hay un composable que se integra con ella:

```js
import { createMachine, interpret } from 'xstate'
import { shallowRef } from 'vue'

export function useMachine(options) {
  const machine = createMachine(options)
  const state = shallowRef(machine.initialState)
  const service = interpret(machine)
    .onTransition((newState) => (state.value = newState))
    .start()
  const send = (event) => service.send(event)

  return [state, send]
}
```

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHVzZU1hY2hpbmUgfSBmcm9tICcuL21hY2hpbmUuanMnXG4gIFxuY29uc3QgW3N0YXRlLCBzZW5kXSA9IHVzZU1hY2hpbmUoe1xuICBpZDogJ3RvZ2dsZScsXG4gIGluaXRpYWw6ICdpbmFjdGl2ZScsXG4gIHN0YXRlczoge1xuICAgIGluYWN0aXZlOiB7IG9uOiB7IFRPR0dMRTogJ2FjdGl2ZScgfSB9LFxuICAgIGFjdGl2ZTogeyBvbjogeyBUT0dHTEU6ICdpbmFjdGl2ZScgfSB9XG4gIH1cbn0pXG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cInNlbmQoJ1RPR0dMRScpXCI+XG4gICAge3sgc3RhdGUubWF0Y2hlcyhcImluYWN0aXZlXCIpID8gXCJPZmZcIiA6IFwiT25cIiB9fVxuICA8L2J1dHRvbj5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCIsXG4gICAgXCJ4c3RhdGVcIjogXCJodHRwczovL3VucGtnLmNvbS94c3RhdGVANC4yNy4wL2VzL2luZGV4LmpzP21vZHVsZVwiXG4gIH1cbn0iLCJtYWNoaW5lLmpzIjoiaW1wb3J0IHsgY3JlYXRlTWFjaGluZSwgaW50ZXJwcmV0IH0gZnJvbSAneHN0YXRlJ1xuaW1wb3J0IHsgc2hhbGxvd1JlZiB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZU1hY2hpbmUob3B0aW9ucykge1xuICBjb25zdCBtYWNoaW5lID0gY3JlYXRlTWFjaGluZShvcHRpb25zKVxuICBjb25zdCBzdGF0ZSA9IHNoYWxsb3dSZWYobWFjaGluZS5pbml0aWFsU3RhdGUpXG4gIGNvbnN0IHNlcnZpY2UgPSBpbnRlcnByZXQobWFjaGluZSlcbiAgICAub25UcmFuc2l0aW9uKChuZXdTdGF0ZSkgPT4gKHN0YXRlLnZhbHVlID0gbmV3U3RhdGUpKVxuICAgIC5zdGFydCgpXG4gIGNvbnN0IHNlbmQgPSAoZXZlbnQpID0+IHNlcnZpY2Uuc2VuZChldmVudClcblxuICByZXR1cm4gW3N0YXRlLCBzZW5kXVxufSJ9)

### RxJS

[RxJS](https://rxjs.dev/) es una biblioteca para trabajar con flujos de eventos asíncronos. La librería [VueUse](https://vueuse.org/) proporciona el complemento [`@vueuse/rxjs`](https://vueuse.org/rxjs/readme.html) para conectar los flujos RxJS con el sistema de reactividad de Vue.
