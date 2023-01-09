# Directivas Integradas

## v-text

Actualiza el texto de un elemento.

- **Espera:** `string`

- **Detalles**

  `v-text` trabaja seteando la propiedad [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) del elemento, por lo que sobreescribirá cualquier contenido existente dentro del elemento. Si necesitas actualizar parte del `textContent`, deberías usar la [interpolación de mostacho](/guide/essentials/template-syntax.html#text-interpolation) instead.

- **Ejemplo**

  ```vue-html
  <span v-text="msg"></span>
  <!-- es igual a -->
  <span>{{msg}}</span>
  ```

- **Ver también:** [Sintaxis de la Plantilla - interpolación de Texto](/guide/essentials/template-syntax.html#interpolacion-de-texto)

## v-html

Actualiza la propiedad [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) del elemento.

- **Espera:** `string`

- **Details:**

  EL contenido de `v-html` es insertado como HTML plano - Vue template syntax will not be processed. Si te encuentras tratando de componer plantillas usando `v-html`, trata de replantear la solución usando componentes en su lugar.

  ::: warning Nota de Seguridad
  Renderizar dinámicamente HTML arbitrario en tu sitio web puede ser muy peligroso porque puede conducir fácilmente a [ataques XSS](https://en.wikipedia.org/wiki/Cross-site_scripting). Sólo usa `v-html` en contenido de confianza y **nunca** en contenido proporcionado por el usuario.
  :::

  En los [Componentes de un Solo Archivo (SFC)](/guide/scaling-up/sfc), los estilos `scoped` no se aplicarán en el contenido dentro de `v-html`, porque ese HTML no es procesado por el compilador de plantillas de Vue. Si deseas orientar el contenido `v-html` con scoped CSS, puedes utilizar [módulos CSS] (./sfc-css-features.html#css-modules) o un elemento global adicional `<style>` con una estrategia de alcance manual como BEM.

- **Ejemplo:**

  ```vue-html
  <div v-html="html"></div>
  ```

- **Ver también:** [Sintáxis de la Plantilla - HTML Puro](/guide/essentials/template-syntax.html#html-puro)

## v-show

Cambia la visibilidad de un elemento basado en la veracidad del valor de la expresión.

- **Espera:** `any`

- **Detalles**

  `v-show` trabaja seteando la propiedad CSS `display` a través de estilos en línea, y tratará de respetar el valor inicial de `display` cuando el elemento está visible. También activa las transiciones cuando cambia su estado.

- **Ver también:** [Renderizado Condicional - v-show](/guide/essentials/conditional.html#v-show)

## v-if

Renderiza condicionalmente un elemento o un fragmento de plantilla basado en la veracidad del valor de la expresión.

- **Espera:** `any`

- **Detalles**

  Cuando un elemento `v-if` cambia, el elemento y sus directivas / componentes son destruidos y vueltos a construir. Si la condición inicial es falsa, el contenido interior no se renderizará en absoluto.

  Puede usarse en `<template>` para denotar un bloque condicional que contenga sólo texto o múltiples elementos.

  Esta directiva desencadena transiciones cuando su condición cambia.

  Cuando se utiliza conjuntamente, `v-if` tiene mayor prioridad que `v-for`. No recomendamos utilizar estas dos directivas juntas en un mismo elemento; ver la guía de [renderizado de listas] (/guide/essentials/list.html#v-for-con-v-if) para más detalles.

- **Ver también:** [Renderizado Condicional - v-if](/guide/essentials/conditional.html#v-if)

## v-else

Denota el "bloque else" para `v-if` o para un encadenamiento `v-if` / `v-else-if`.

- **No espera una expresión**

- **Detalles**

  - Restricción: el elemento anterior debe tener `v-if` o `v-else-if`.

  - Puede usarse en `<template>` para denotar un bloque condicional que contenga sólo texto o múltiples elementos.

- **Ejemplo**

  ```vue-html
  <div v-if="Math.random() > 0.5">
    Ahora me ves
  </div>
  <div v-else>
    Ahora no me ves
  </div>
  ```

- **Ver también:** [Renderizado Condicional - v-else](/guide/essentials/conditional.html#v-else)

## v-else-if

Denota el "bloque else if" para `v-if`. Se puede encadenar.

- **Espera:** `any`

- **Detalles**

  - Restricción: el elemento anterior debe tener `v-if` o `v-else-if`.

  - Puede usarse en `<template>` para denotar un bloque condicional que contenga sólo texto o múltiples elementos.

- **Ejemplo**

  ```vue-html
  <div v-if="type === 'A'">
    A
  </div>
  <div v-else-if="type === 'B'">
    B
  </div>
  <div v-else-if="type === 'C'">
    C
  </div>
  <div v-else>
    Ni A, ni B, ni C
  </div>
  ```

- **Ver también:** [Renderizado Condicional - v-else-if](/guide/essentials/conditional.html#v-else-if)

## v-for

Renderiza el elemento o bloque de plantilla varias veces en función de los datos de origen.

- **Espera:** `Array | Object | number | string | Iterable`

- **Detalles**

  El valor de la directiva debe utilizar la sintaxis especial `alias in expression` para proporcionar un alias para el elemento actual que se está iterando:

  ```vue-html
  <div v-for="item in items">
    {{ item.text }}
  </div>
  ```

  También puede especificar un alias para el índice (o la clave si se utiliza en un Object):

  ```vue-html
  <div v-for="(item, index) in items"></div>
  <div v-for="(value, key) in object"></div>
  <div v-for="(value, name, index) in object"></div>
  ```

  El comportamiento por defecto de `v-for` intentará colocar los elementos en su sitio sin moverlos. Para forzarlo a reordenar los elementos, debe proporcionar un identificador de ordenación con el atributo especial `key`:

  ```vue-html
  <div v-for="item in items" :key="item.id">
    {{ item.text }}
  </div>
  ```

  `v-for` puede trabajar también con valores que implementan el [Protocolo Iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol), incluyendo los objetos nativos `Map` y `Set`.

- **Ver también:**
  - [Renderizado de listas](/guide/essentials/list.html)

## v-on

Adjunta un escuchador de eventos al elemento.

- **Abreviatura:** `@`

- **Espera:** `Function | Inline Statement | Object (without argument)`

- **Argumento:** `event` (opcional si se usa la sintaxis de objeto)

- **Modificadores:**

  - `.stop` - llama a `event.stopPropagation()`.
  - `.prevent` - llama a `event.preventDefault()`.
  - `.capture` - agrega un escuchador de eventos en modo captura.
  - `.self` - solo se dispara el manejador si el evento fue activado desde este elemento.
  - `.{keyAlias}` - solo se activa el manejador en ciertas teclas.
  - `.once` - activa el manejador como máximo una vez.
  - `.left` - solo activa el manejador para los eventos del botón izquierdo del mouse.
  - `.right` - solo activa el manejador para los eventos del botón derecho del mouse.
  - `.middle` - solo activa el manejador para los eventos del botón del medio del mouse.
  - `.passive` - adjunta un evento DOM con `{ passive: true }`.

- **Detalles**

  El tipo de evento se denota con el argumento. La expresión puede ser un nombre de método, una declaración inline, u omitirse si hay modificadores presentes.

  Cuando se utiliza en un elemento normal, sólo escucha los [**eventos DOM nativos**](https://developer.mozilla.org/en-US/docs/Web/Events). Cuando se utiliza en un componente personalizado, escucha los **eventos personalizados** emitidos en ese componente hijo.

  Cuando escucha eventos nativos del DOM, el método recibe el evento nativo como único argumento. Si se utiliza una sentencia inline, la sentencia tiene acceso a la propiedad especial `$event`: `v-on:click="handle('ok', $event)"`.

  `v-on` también admite la vinculación a un objeto de pares evento /escuchador sin argumento. Tenga en cuenta que cuando se utiliza la sintaxis del objeto, no admite ningún modificador.

- **Ejemplo:**

  ```vue-html
  <!-- evento manejado por un método -->
  <button v-on:click="doThis"></button>

  <!-- evento dinámico -->
  <button v-on:[event]="doThis"></button>

  <!-- declaración inline -->
  <button v-on:click="doThat('hello', $event)"></button>

  <!-- abreviatura -->
  <button @click="doThis"></button>

  <!-- abreviatura con evento dinámico -->
  <button @[event]="doThis"></button>

  <!-- detener la propagación -->
  <button @click.stop="doThis"></button>

  <!-- prevenir comportamiento por defecto -->
  <button @click.prevent="doThis"></button>

  <!-- prevenir comportamiento por defecto sin expresión -->
  <form @submit.prevent></form>

  <!-- encadenando modificadores -->
  <button @click.stop.prevent="doThis"></button>

  <!-- modificador key usando keyAlias -->
  <input @keyup.enter="onEnter" />

  <!-- el evento click será disparado como máximo una vez -->
  <button v-on:click.once="doThis"></button>

  <!-- sintaxis de objecto -->
  <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
  ```

  Escuchar eventos personalizados en un componente hijo (el manejador es llamado cuando "mi-evento" es emitido en el hijo):

  ```vue-html
  <MyComponent @my-event="handleThis" />

  <!-- declaración inline -->
  <MyComponent @my-event="handleThis(123, $event)" />
  ```

- **Ver también:**
  - [Manejando Eventos](/guide/essentials/event-handling.html)
  - [Componentes - Escuchando los Eventos](/guide/essentials/component-basics.html#escuchando-los-eventos)

## v-bind

Vincula dinámicamente uno o más atributos, o una prop de un componente a una expresión.

- **Abreviatura:** `:` o `.` (cuando se usa el modificar `.prop`)

- **Espera:** `any (con argumento) | Object (sin argumento)`

- **Argumento:** `attrOrProp (opcional)`

- **Modificadores:**

  - `.camel` - transforma el nombre del atributo kebab-case en camelCase.
  - `.prop` - fuerza a que el vínculo sea seteado como una propiedad DOM. <sup class="vt-badge">3.2+</sup>
  - `.attr` - fuerza a que el vínculo sea seteado como un atributo DOM. <sup class="vt-badge">3.2+</sup>

- **Usage:**

  Cuando se utiliza para enlazar el atributo `class` o `style`, `v-bind` soporta tipos de valores adicionales como Array u Objects. Ver la sección de la guía vinculada más abajo para más detalles.

  Cuando se establece un enlace en un elemento, Vue comprueba por defecto si el elemento tiene la clave definida como una propiedad utilizando un operador de comprobación `in`. Si la propiedad está definida, Vue establecerá el valor como una propiedad DOM en lugar de un atributo. Esto debería funcionar en la mayoría de los casos, pero puedes anular este comportamiento utilizando explícitamente los modificadores `.prop` o `.attr`. Esto es a veces necesario, especialmente cuando [se trabaja con elementos personalizados](/guide/extras/web-components.html#uso-de-elementos-personalizados-en-vue).

  Cuando se utiliza para la vinculación de la prop del componente, la prop debe ser declarada correctamente en el componente hijo.

  Cuando se utiliza sin un argumento, puede usarse para enlazar un objeto que contenga pares nombre-valor de atributos.

- **Ejemplo:**

  ```vue-html
  <!-- vinculación de un atributo -->
  <img v-bind:src="imageSrc" />

  <!-- nombre de atributo dinámico -->
  <button v-bind:[key]="value"></button>

  <!-- abreviatura -->
  <img :src="imageSrc" />

  <!-- abreviatura con nombre de atributo dinámico -->
  <button :[key]="value"></button>

  <!-- concatenación de string inline -->
  <img :src="'/path/to/images/' + fileName" />

  <!-- vinculación de clase -->
  <div :class="{ red: isRed }"></div>
  <div :class="[classA, classB]"></div>
  <div :class="[classA, { classB: isB, classC: isC }]"></div>

  <!-- vinculación de estilo -->
  <div :style="{ fontSize: size + 'px' }"></div>
  <div :style="[styleObjectA, styleObjectB]"></div>

  <!-- vinculación de un objeto con atributos -->
  <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

  <!-- vinculación de prop. "prop" debe estar declarada en el componente hijo. -->
  <MyComponent :prop="someThing" />

  <!-- pasa las props en común del padre al componente hijo -->
  <MyComponent v-bind="$props" />

  <!-- XLink -->
  <svg><a :xlink:special="foo"></a></svg>
  ```

  El modificador `.prop` también tiene su propia abreviatura, `.`:

  ```vue-html
  <div :someProperty.prop="someObject"></div>

  <!-- equivalente a -->
  <div .someProperty="someObject"></div>
  ```

  El modificador `.camel` convierte a camel-case el nombre de un atributo de `v-bind` cuando cuando se usan plantillas en el DOM, por ejemplo, el atributo SVG `viewBox`:

  ```vue-html
  <svg :view-box.camel="viewBox"></svg>
  ```

  No se necesita `.camel` si estás usando plantillas escritas en un string, o si precompilas la plantilla en la compilación.

- **Ver también:**
  - [Vinculación de Clases y Estilos](/guide/essentials/class-and-style.html)
  - [Componentes - Detalles del Pase del Prop](/guide/components/props.html#detalles-del-pase-del-prop)

## v-model

Crear un enlace bidireccional en un elemento de entrada del formulario o un componente.

- **Espera:** varía en función del valor del elemento de entrada del formulario o de la salida de los componentes

- **Limitado a:**

  - `<input>`
  - `<select>`
  - `<textarea>`
  - componentes

- **Modificadores:**

  - [`.lazy`](/guide/essentials/forms.html#lazy) - escucha los eventos `change` en lugar de los eventos `input`
  - [`.number`](/guide/essentials/forms.html#number) - convertir una cadena de entrada válida en números
  - [`.trim`](/guide/essentials/forms.html#trim) - quita los espacios en blanco al comienzo y al final del valor ingresado

- **Ver también:**

  - [Vinculación de Entradas de Formularios](/guide/essentials/forms.html)
  - [Eventos de los Componentes - Uso con `v-model`](/guide/components/v-model.html)

## v-slot

Denota slots con nombre o slots asignados que esperan recibir props.

- **Abreviatura:** `#`

- **Espera:** una expresión JavaScript que sea válida en una posición de argumento de función, incluyendo soporte para desestructuración. Opcional - solo es necesaria si el slot espera que le sean pasadas props.

- **Argumento:** nombre del slot (opcional, el nombre por defecto es `default`)

- **Limitado a:**

  - `<template>`
  - [componentes](/guide/components/slots.html#slots-asignados) (para un solo slot por defecto con props)

- **Ejemplo:**

  ```vue-html
  <!-- Slots asignados -->
  <BaseLayout>
    <template v-slot:header>
      Contenido de la cabecera
    </template>

    <template v-slot:default>
      Contenido del slot por defecto
    </template>

    <template v-slot:footer>
      Contenido del pie de página
    </template>
  </BaseLayout>

  <!-- Slots asignados que reciben props -->
  <InfiniteScroll>
    <template v-slot:item="slotProps">
      <div class="item">
        {{ slotProps.item.text }}
      </div>
    </template>
  </InfiniteScroll>

  <!-- Slot por defecto que recibe props, con desestructuramiento -->
  <Mouse v-slot="{ x, y }">
    Mouse position: {{ x }}, {{ y }}
  </Mouse>
  ```

- **Ver también:**
  - [Componentes - Slots](/guide/components/slots.html)

## v-pre

Omite la compilación para este elemento y todos sus hijos.

- **No espera una expresión**

- **Detalles**

  Dentro del elemento con `v-pre`, toda la sintaxis de la plantilla Vue será preservada y renderizada tal cual. El caso de uso más común de esto es mostrar etiquetas de mostacho en bruto.

- **Ejemplo:**

  ```vue-html
  <span v-pre>{{ esto no será compilado }}</span>
  ```

## v-once

Renderiza el elemento y el componente una sola vez, y omite futuras actualizaciones.

- **No espera una expresión**

- **Detalles**

  En las siguientes re-renderizaciones, el elemento/componente y todos sus hijos serán tratados como contenido estático y serán omitidos. Esto puede utilizarse para optimizar el rendimiento de las actualizaciones.

  ```vue-html
  <!-- elemento único -->
  <span v-once>This will never change: {{msg}}</span>
  <!-- elemento con hijos -->
  <div v-once>
    <h1>comment</h1>
    <p>{{msg}}</p>
  </div>
  <!-- componente -->
  <MyComponent v-once :comment="msg"></MyComponent>
  <!-- uso con directiva `v-for` -->
  <ul>
    <li v-for="i in list" v-once>{{i}}</li>
  </ul>
  ```

  Desde la versión 3.2, también puedes memorizar parte de la plantilla con condiciones de invalidación utilizando [`v-memo`](#v-memo).

- **Ver también:**
  - [Sintaxis de la Plantilla - interpolaciones](/guide/essentials/template-syntax.html#interpolacion-de-texto)
  - [v-memo](#v-memo)

## v-memo <sup class="vt-badge" data-text="3.2+" />

- **Espera:** `any[]`

- **Detalles**

  Memoriza un sub-árbol de la plantilla. Puede utilizarse tanto en elementos como en componentes. La directiva espera una matriz de longitud fija de valores de dependencia para comparar para la memoización. Si todos los valores de la matriz son iguales a los de la última representación, se omitirán las actualizaciones de todo el subárbol. Por ejemplo:

  ```vue-html
  <div v-memo="[valueA, valueB]">
    ...
  </div>
  ```

  Cuando el componente se vuelve a renderizar, si tanto `valueA` como `valueB` siguen siendo los mismos, se saltarán todas las actualizaciones de este `<div>` y sus hijos. De hecho, incluso la creación del Virtual DOM VNode también se saltará ya que la copia memoizada del sub-árbol puede ser reutilizada.

  Es importante especificar el array de memoización correctamente, de lo contrario podemos saltarnos actualizaciones que sí deberían aplicarse. `v-memo` con un array de dependencia vacío (`v-memo="[]"`) sería funcionalmente equivalente a `v-once`.

  **Uso con `v-for`**

  `v-memo` se proporciona únicamente para microoptimizaciones en escenarios de rendimiento crítico y debería ser raramente necesario. El caso más común en el que esto puede resultar útil es cuando se renderizan grandes listas `v-for` (donde `length > 1000`):

  ```vue-html
  <div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
    <p>ID: {{ item.id }} - seleccionado: {{ item.id === selected }}</p>
    <p>...más nodos hijos</p>
  </div>
  ```

  Cuando el estado `selected` del componente cambia, se creará una gran cantidad de VNodes aunque la mayoría de los elementos permanezcan exactamente igual. El uso de `v-memo` aquí es esencialmente decir "sólo actualizar este elemento si pasó de no seleccionado a seleccionado, o al revés". Esto permite que cada elemento no afectado reutilice su VNode anterior y se salte la difusión por completo. Ten en cuenta que no necesitamos incluir `item.id` en la matriz de dependencia de memo aquí, ya que Vue lo infiere automáticamente de la `:key` del elemento.

  :::warning
  Cuando uses `v-memo` con `v-for`, asegúrate de que se usan en el mismo elemento. **`v-memo` no funciona dentro de `v-for`.**
  :::

  También se puede utilizar `v-memo` en los componentes para evitar manualmente las actualizaciones no deseadas en ciertos casos extremos en los que la comprobación de la actualización del componente hijo ha sido desoptimizada. Pero, de nuevo, es responsabilidad del desarrollador especificar las matrices de dependencia correctas para evitar omitir las actualizaciones necesarias.

- **Ver también:**
  - [v-once](#v-once)

## v-cloak

Se utiliza para ocultar la plantilla no compilada hasta que esté lista.

- **No espera una expresión**

- **Detalles**

  **Esta directiva es necesaria solo en configuraciones sin pasos de compilación.**

  Cuando se utilizan plantillas en el DOM, puede haber un "destello de plantillas no compiladas": el usuario puede ver etiquetas de mostacho sin procesar hasta que el componente montado las sustituya por contenido renderizado.

  La etiqueta `v-cloak` permanecerá en el elemento hasta que se monte la instancia del componente asociado. Combinado con reglas CSS como `[v-cloak] { display: none }`, puede utilizarse para ocultar las plantillas sin procesar hasta que el componente esté listo.

- **Ejemplo:**

  ```css
  [v-cloak] {
    display: none;
  }
  ```

  ```vue-html
  <div v-cloak>
    {{ message }}
  </div>
  ```

  El elemento `<div>` no será visible hasta que la compilación haya terminado.
