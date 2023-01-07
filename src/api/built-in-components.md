---
pageClass: api
---

# Componentes Integrados

:::info Registración y Uso
Los componentes integrados pueden ser usados directamente en las plantillas sin necesidad de registrarlos. Cabe destacar que solo se incluyen en el build cuando son usados.

Cuando se usan en [funciones de renderizado](/guide/extras/render-function.html), necesitan ser importados explícitamente. Por ejemplo:

```js
import { h, Transition } from 'vue'

h(Transition, {
  /* props */
})
```

:::

## `<Transition>`

Proporciona efectos de transición animados a un **solo** elemento o componente.

- **Props**

  ```ts
  interface TransitionProps {
    /**
     * Usado para generar en forma automática nombres de clases de transición CSS.
     * ej. `name: 'fade'` generará las clases `.fade-enter`,
     * `.fade-enter-active`, etc.
     */
    name?: string
    /**
     * Si aplicar las clases de transición CSS.
     * Valor por defecto: true
     */
    css?: boolean
    /**
     * Especifica el tipo de eventos de transición que se debe esperar
     * para determinar el tiempo de finalización de la transición.
     * El comportamiento por defecto es auto detectar el tipo que tenga
     * la mayor duración.
     */
    type?: 'transition' | 'animation'
    /**
     * Especifica en forma explicita la duración de la transición.
     * El comportamiento por defecto es esperar el primer evento `transitionend`
     * o `animationend` en la raiz del elemento de transición.
     */
    duration?: number | { enter: number; leave: number }
    /**
     * Controla la secuencia temporal de las transiciones de salida/entrada.
     * El comportamiento por defecto es en simultáneo.
     */
    mode?: 'in-out' | 'out-in' | 'default'
    /**
     * Si aplicar la transición en el renderizado inicial.
     * Valor por defecto: false
     */
    appear?: boolean

    /**
     * Propiedades para personalizar las clases de transición.
     * Usar la notación kebab-case en las plantillas, ej. enter-from-class="xxx"
     */
    enterFromClass?: string
    enterActiveClass?: string
    enterToClass?: string
    appearFromClass?: string
    appearActiveClass?: string
    appearToClass?: string
    leaveFromClass?: string
    leaveActiveClass?: string
    leaveToClass?: string
  }
  ```

- **Eventos**

  - `@before-enter`
  - `@before-leave`
  - `@enter`
  - `@leave`
  - `@appear`
  - `@after-enter`
  - `@after-leave`
  - `@after-appear`
  - `@enter-cancelled`
  - `@leave-cancelled` (solo con `v-show`)
  - `@appear-cancelled`

- **Ejemplo**

  Elemento simple:

  ```vue-html
  <Transition>
    <div v-if="ok">contenido a mostrar</div>
  </Transition>
  ```

  Componente dinámico, con modo de transición + animación al inicio:

  ```vue-html
  <Transition name="fade" mode="out-in" appear>
    <component :is="view"></component>
  </Transition>
  ```

  Escuchando a los eventos de transición:

  ```vue-html
  <Transition @after-enter="onTransitionComplete">
    <div v-show="ok">contenido a mostrar</div>
  </Transition>
  ```

- **Ver también:** [Transition](/guide/built-ins/transition.html)

## `<TransitionGroup>`

Proporciona efectos de transición para **múltiples** elementos o componentes en una lista.

- **Props**

  `<TransitionGroup>` acepta las mismas props que  `<Transition>` excepto `mode`, más dos props adicionales:

  ```ts
  interface TransitionGroupProps extends Omit<TransitionProps, 'mode'> {
    /**
     * Si no está definido, se renderiza como un fragmento.
     */
    tag?: string
    /**
     * Para customizar las clases CSS aplicadas durante las transiciones de movimiento.
     * Usar la notación kebab-case en las plantillas, ej. move-class="xxx"
     */
    moveClass?: string
  }
  ```

- **Eventos**

  `<TransitionGroup>` emite los mismos eventos que `<Transition>`.

- **Detalles**

  Por defecto, `<TransitionGroup>` no renderiza un elemento del DOM contenedor, pero se puede definir uno mendiante la prop `tag`.

  Ten en cuenta que cada hijo en un `<transition-group>` debe estar con una [**única key**](/guide/essentials/list.html#maintaining-state-with-key) para que la animación funciones correctamente.

  `<TransitionGroup>` soporta transiciones de movimiento mediante la propiedad CSS transform. Cuando la posición de un hijo en la pantalla es cambiada luego de una actualización de estado, se le aplicará una clase CSS de movimiento (auto generada a partir del atributo `name` o configurara con la prop `move-class`). Si la propiedad CSS `transform` admite animaciones cuando la clase de movimiento sea aplicada, el elemento se animará suavemente hasta su destino usando la [técnica FLIP](https://aerotwist.com/blog/flip-your-animations/).

- **Ejemplo**

  ```vue-html
  <TransitionGroup tag="ul" name="slide">
    <li v-for="item in items" :key="item.id">
      {{ item.text }}
    </li>
  </TransitionGroup>
  ```

- **Ver también:** [Guía - TransitionGroup](/guide/built-ins/transition-group.html)

## `<KeepAlive>`

Almacena los componentes que alternan dinámicamente en su interior.

- **Props**

  ```ts
  interface KeepAliveProps {
    /**
     * Si se especifica, solo los componentes cuyos nombres 
     * coinciden con `include` serán almacenados.
     */
    include?: MatchPattern
    /**
     * Cualquier componente cuyo nombre coincida con `exclude`
     * no será almacenado.
     */
    exclude?: MatchPattern
    /**
     * El número máximo de instancias de componentes a almacenar.
     */
    max?: number | string
  }

  type MatchPattern = string | RegExp | (string | RegExp)[]
  ```

- **Detalles**

  Cuando se envuelve en un componente dinámico, `<KeepAlive>` almacena en caché las instancias del componente inactivo sin destruirlas.

  Sólo puede haber una instancia de componente activo como hijo directo de `<KeepAlive>` en cualquier momento.

  Cuando un componente se activa dentro de `<KeepAlive>`, sus hooks de ciclo de vida `activated` y `deactivated` serán invocados en consecuencia, proporcionando una alternativa a `mounted` y `unmounted`, que no son llamados. Esto se aplica al hijo directo de `<KeepAlive>` así como a todos sus descendientes.

- **Ejemplo**

  Uso básico:

  ```vue-html
  <KeepAlive>
    <component :is="view"></component>
  </KeepAlive>
  ```

  Cuando se utiliza con `v-if` / `v-else`, debe haber sólo un componente renderizado a la vez:

  ```vue-html
  <KeepAlive>
    <comp-a v-if="a > 1"></comp-a>
    <comp-b v-else></comp-b>
  </KeepAlive>
  ```

  Usado junto a `<Transition>`:

  ```vue-html
  <Transition>
    <KeepAlive>
      <component :is="view"></component>
    </KeepAlive>
  </Transition>
  ```

  Usando `include` / `exclude`:

  ```vue-html
  <!-- cadena de texto delimitada por coma -->
  <KeepAlive include="a,b">
    <component :is="view"></component>
  </KeepAlive>

  <!-- expresión regular (usar `v-bind`) -->
  <KeepAlive :include="/a|b/">
    <component :is="view"></component>
  </KeepAlive>

  <!-- Array (usar `v-bind`) -->
  <KeepAlive :include="['a', 'b']">
    <component :is="view"></component>
  </KeepAlive>
  ```

  Uso con `max`:

  ```vue-html
  <KeepAlive :max="10">
    <component :is="view"></component>
  </KeepAlive>
  ```

- **Ver también:** [Guía - KeepAlive](/guide/built-ins/keep-alive.html)

## `<Teleport>`

Renderiza su contenido en otra parte del DOM.

- **Props**

  ```ts
  interface TeleportProps {
    /**
     * Requerida. Especifica el contenedor de destino.
     * Puede ser un selector o un elemento HTML.
     */
    to: string | HTMLElement
    /**
     * Si es `true`, el contenido permanecerá en su posición
     * original en lugar de ser movido al contenedor de destino.
     * Puede ser cambiado en forma dinámica.
     */
    disabled?: boolean
  }
  ```

- **Ejemplo**

  Especificando el contenedor de destino:

  ```vue-html
  <teleport to="#some-id" />
  <teleport to=".some-class" />
  <teleport to="[data-teleport]" />
  ```

  Deshabilitándolo en forma condicional:

  ```vue-html
  <teleport to="#popup" :disabled="displayVideoInline">
    <video src="./my-movie.mp4">
  </teleport>
  ```

- **Ver también:** [Guía - Teleport](/guide/built-ins/teleport.html)

## `<Suspense>` <sup class="vt-badge experimental" />

Se utiliza para orquestar dependencias asíncronas anidadas en un árbol de componentes.

- **Props**

  ```ts
  interface SuspenseProps {
    timeout?: string | number
  }
  ```

- **Eventos**

  - `@resolve`
  - `@pending`
  - `@fallback`

- **Detalles**

  `<Suspense>` acepta dos slots: el slot `#default` y el slot `#fallback`. Mostrará el contenido del slot fallback mientras renderiza el slot por defecto en la memoria.

  Si encuentra dependencias asíncronas ([Componentes Asincrónicos](/guide/components/async.html) y componentes con [`async setup()`](/guide/built-ins/suspense.html#async-setup)) mientras se muestra el slot por defecto, esperará hasta que todas ellas se resuelvan antes de mostrar el slot por defecto.

- **Ver también:** [Guía - Suspense](/guide/built-ins/suspense.html)
