# Sintaxis de la Plantilla

Vue utiliza una sintaxis de plantilla basada en HTML que te permite vincular declarativamente el renderizado del DOM con los datos de la instancia del componente subyacente. Todas las plantillas de Vue son HTML sintácticamente válido que puede ser analizado por navegadores y por analizadores de HTML que cumplan las especificaciones.

Entre bastidores, Vue compila las plantillas en código JavaScript altamente optimizado. Combinado con el sistema de reactividad, Vue es capaz de descifrar de manera inteligente la cantidad mínima de componentes a re-renderizar y aplicar la cantidad mínima de manipulaciones al DOM cuando cambia el estado de la aplicación.

Si estás familiarizado con los conceptos de Virtual DOM y prefieres la potencia bruta de JavaScript, también puedes [escribir directamente funciones de renderizado](/guide/extras/render-function.html) en lugar de plantillas, con soporte opcional para JSX. Sin embargo, ten en cuenta que no disfrutarás el mismo nivel de optimizaciones en tiempo de compilación como con las plantillas.

## Interpolación de Texto

La forma más básica de vinculación de datos es la interpolación de texto utilizando la sintaxis de "Mostacho" o bigotes (dobles llaves):

```vue-html
<span>Mensaje: {{ msg }}</span>
```

La etiqueta del mostacho se reemplazará con el valor de la propiedad `msg` de la instancia del componente correspondiente. También se actualizará cada vez que cambie la propiedad `msg`.

## HTML Puro

Los dobles mostachos interpretan los datos como texto sin formato, no como HTML. Para generar HTML real, necesitarás usar la [directiva `v-html`](/api/built-in-directives.html#v-html):

```vue-html
<p>Usando interpolación: {{ rawHtml }}</p>
<p>Usando la directiva v-html: <span v-html="rawHtml"></span></p>
```

<script setup>
  const rawHtml = '<span style="color: red">Esto debería ser rojo.</span>'
</script>

<div class="demo">
  <p>Usando interpolación: {{ rawHtml }}</p>
  <p>Usando la directiva v-html: <span v-html="rawHtml"></span></p>
</div>

Aquí nos encontramos con algo nuevo. El atributo `v-html` que estás viendo se llama **directiva**. Las directivas tienen el prefijo `v-` para indicar que son atributos especiales proporcionados por Vue y, como habrás adivinado, aplican un comportamiento reactivo especial al DOM renderizado. Básicamente estamos diciendo "manten actualizado el HTML interno de este elemento con la propiedad `rawHtml` en la instancia activa actual".

El contenido de `span` se reemplazará con el valor de la propiedad `rawHtml`, interpretado como HTML sin formato: los datos vinculados se ignoran. Ten en cuenta que no puedes usar `v-html` para componer plantillas parciales, porque Vue no es un motor de plantillas basado en cadenas. En su lugar, se prefieren los componentes como unidad fundamental para la reutilización y composición de la interfaz de usuario.

:::warning Advertencia de seguridad
El HTML arbitrario renderizado dinámicamente en tu sitio web puede ser muy peligroso porque puede conducir fácilmente a [vulnerabilidades XSS](https://es.wikipedia.org/wiki/Cross-site_scripting). Utiliza `v-html` solo en contenido confiable y **nunca** en contenido proporcionado por el usuario.
:::

## Vinculación de Atributos

Los mostachos no se pueden usar dentro de los atributos HTML. En su lugar, utiliza una directiva [`v-bind`](/api/built-in-directives.html#v-bind):

```vue-html
<div v-bind:id="dynamicId"></div>
```

La directiva `v-bind` le indica a Vue que mantenga el atributo `id` del elemento sincronizado con la propiedad `dynamicId` del componente. Si el valor vinculado es `null` o `undefined`, el atributo se eliminará del elemento renderizado.

### Abreviatura

Debido a que `v-bind` se usa con tanta frecuencia, tiene una sintaxis abreviada dedicada:

```vue-html
<div :id="dynamicId"></div>
```

Los atributos que comienzan con `:` pueden verse un poco diferentes del HTML normal, pero de hecho es un carácter válido para los nombres de atributos y todos los navegadores compatibles con Vue pueden analizarlo correctamente. Además, no aparecen en el renderizado final. La sintaxis abreviada es opcional, pero probablemente la apreciarás cuando aprendas más sobre su uso más adelante.

> Para el resto de la guía, usaremos la sintaxis abreviada en los ejemplos de código, ya que es la más comúnmente usada por los desarrolladores de Vue.

### Atributos Booleanos

Los [atributos booleanos](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes) son atributos que pueden indicar valores verdadero/falso por su presencia en un elemento. Por ejemplo, [`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled) es uno de los atributos booleanos más comúnmente utilizados.

`v-bind` funciona un poco diferente en este caso:

```vue-html
<button :disabled="isButtonDisabled">Button</button>
```

El atributo `disabled` se incluirá si `isButtonDisabled` tiene un [valor verdadero (thruty)](https://developer.mozilla.org/es/docs/Glossary/Truthy). También se incluirá si el valor es una cadena vacía, manteniendo la coherencia con `<button disabled="">`. Para otros valores falsos, se omitirá el atributo.

### Vinculación Dinámica de Múltiples Atributos

Si tienes un objeto de JavaScript representando múltiples atributos que se ve así:

<div class="composition-api">

```js
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}
```

</div>
<div class="options-api">

```js
data() {
  return {
    objectOfAttrs: {
      id: 'container',
      class: 'wrapper'
    }
  }
}
```

</div>

Puedes vincularlos a un único elemento usando `v-bind` sin un argumento:

```vue-html
<div v-bind="objectOfAttrs"></div>
```

## Usando Expresiones JavaScript

Hasta ahora, solo hemos estado vinculando claves de propiedad simples en nuestras plantillas. Pero Vue en realidad admite todo el poder de las expresiones de JavaScript dentro de todos los enlaces de datos:

```vue-html
{{ number + 1 }}

{{ ok ? 'SI' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>
```

Estas expresiones se evaluarán como JavaScript en el ámbito de datos de la instancia del componente actual.

En las plantillas de Vue, las expresiones de JavaScript se pueden usar en las siguientes posiciones:

- Interpolaciones de texto interior (mostachos)
- En el valor del atributo de cualquier directiva de Vue (atributos especiales que comienzan con `v-`)

### Solo Expresiones

Cada enlace solo puede contener **una única expresión**. Una expresión es un trozo de código que puede evaluarse a un valor. Una comprobación sencilla es si puede utilizarse después de `return`.

Por lo tanto, lo siguiente **NO** funcionará:

```vue-html
<!-- esto es una declaración, no una expresión: -->
{{ var a = 1 }}

<!-- el control de flujo tampoco funcionará, usa expresiones ternarias -->
{{ if (ok) { return message } }}
```

### Llamado de Funciones

Es posible llamar a un método expuesto a componentes dentro de una expresión vinculante:

```vue-html
<span :title="toTitleDate(date)">
  {{ formatDate(date) }}
</span>
```

:::tip
Las funciones llamadas dentro de las expresiones vinculantes se llamarán cada vez que se actualice el componente, por lo que **no** deberían tener ningún efecto secundario, como cambiar datos o disparar operaciones asincrónicas.
:::

### Acceso Global Restringido

Las expresiones de plantillas están en un espacio aislado y solo tienen acceso a una [lista restringida de elementos globales](https://github.com/vuejs/core/blob/main/packages/shared/src/globalsWhitelist.ts#L3). La lista expone métodos globales integrados de uso común, como `Math` y `Date`.

Los elementos globales no incluidos explícitamente en la lista, por ejemplo, las propiedades adjuntas por el usuario en `window`, no serán accesibles en las expresiones de la plantilla. Sin embargo, explícitamente, puedes definir métodos globales adicionales para todas las expresiones de Vue agregándolos a [`app.config.globalProperties`](/api/application.html#app-config-globalproperties).

## Directivas

Las directivas son atributos especiales con el prefijo `v-`. Vue proporciona una serie de [directivas integradas](/api/built-in-directives.html), incluidas `v-html` y `v-bind`, que hemos presentado anteriormente.

Se espera que los valores de los atributos de una directiva sean expresiones JavaScript únicas (con la excepción de `v-for`, `v-on` y `v-slot`, que se discutirán en sus respectivas secciones más adelante). El trabajo de una directiva es aplicar actualizaciones de forma reactiva al DOM cuando cambie el valor de su expresión. Toma [`v-if`](/api/built-in-directives.html#v-if) como ejemplo:

```vue-html
<p v-if="seen">Ahora me ves</p>
```

Aquí, la directiva `v-if` eliminaría/insertaría el elemento `<p>` en función de la veracidad del valor de la expresión `seen`.

### Argumentos

Algunas directivas pueden tomar un "argumento", indicado por dos puntos después del nombre de la directiva. Por ejemplo, la directiva `v-bind` se utiliza para actualizar de forma reactiva un atributo HTML:

```vue-html
<a v-bind:href="url"> ... </a>

<!-- abreviado -->
<a :href="url"> ... </a>
```

Aquí `href` es el argumento, que le dice a la directiva `v-bind` que enlace el atributo `href` del elemento con el valor de la expresión `url`. En resumen, todo lo que está antes del argumento (es decir, `v-bind:`) es reducido a un solo carácter, `:`.

Otro ejemplo es la directiva `v-on`, que escucha eventos del DOM:

```vue-html
<a v-on:click="doSomething"> ... </a>

<!-- abreviado -->
<a @click="doSomething"> ... </a>
```

Aquí el argumento es el nombre del evento a escuchar: `clic`. `v-on` es una de las pocas directivas que también tienen una abreviatura correspondiente, siendo su carácter abreviado `@`. También hablaremos sobre el manejo de eventos con más detalle.

### Argumentos Dinámicos

Es posible utilizar también una expresión de JavaScript en un argumento de directiva envolviéndola entre corchetes:

```vue-html
<!--
Ten en cuenta que existen algunas restricciones a la expresión del
argumento, como se explica en las secciones "Restricciones del
Valor de un Argumento Dinámico" y "Restricciones de la Sintaxis de
un Argumento Dinámico" a continuación.
-->
<a v-bind:[attributeName]="url"> ... </a>

<!-- abreviado -->
<a :[attributeName]="url"> ... </a>
```

Aquí `attributeName` se evaluará dinámicamente como una expresión de JavaScript, y su valor evaluado se usará como el valor final del argumento. Por ejemplo, si la instancia de tu componente tiene una propiedad de datos, `attributeName`, cuyo valor es `"href"`, entonces este enlace será equivalente a `v-bind:href`.

De manera similar, puedes usar argumentos dinámicos para vincular un manejador al nombre de un evento dinámico:

```vue-html
<a v-on:[eventName]="doSomething"> ... </a>

<!-- abreviado -->
<a @[eventName]="doSomething"> ... </a>
```

En este ejemplo, cuando el valor de `eventName` es `"focus"`, `v-on:[eventName]` será equivalente a `v-on:focus`.

#### Restricciones del Valor de un Argumento Dinámico

Se espera que los argumentos dinámicos se evalúen como una cadena, con la excepción de `null`. El valor especial `null` se puede usar para eliminar explícitamente el enlace. Cualquier otro valor que no sea una cadena disparará una advertencia.

#### Restricciones de la Sintaxis de un Argumento Dinámico

Las expresiones de argumentos dinámicos tienen algunas restricciones de sintaxis porque ciertos caracteres, como espacios y comillas, no son válidos dentro de los nombres de atributos HTML. Por ejemplo, lo siguiente no es válido:

```vue-html
<!-- Esto disparará una advertencia del compilador. -->
<a :['foo' + bar]="value"> ... </a>
```

Si necesitas pasar un argumento dinámico complejo, probablemente sea mejor usar una [propiedad computada](./computed.html), que trataremos en breve.

Cuando utilices plantillas del DOM (plantillas escritas directamente en un archivo HTML), debes evitar también nombrar claves con caracteres en mayúsculas, ya que los navegadores forzarán los nombres de los atributos a minúsculas:

```vue-html
<a :[someAttr]="value"> ... </a>
```

Lo anterior se convertirá a `:[someattr]` en las plantillas del DOM. Si tu componente tiene una propiedad `someAttr` en lugar de `someattr`, tu código no funcionará. Las plantillas dentro de los Componentes de un Solo Archivo **no** están sujetas a esta restricción.

### Modificadores

Los modificadores son sufijos especiales indicados por un punto, que indican que una directiva debe vincularse de alguna manera especial. Por ejemplo, el modificador `.prevent` le dice a la directiva `v-on` que llame a `event.preventDefault()` en el evento desencadenado:

```vue-html
<form @submit.prevent="onSubmit">...</form>
```

Verás otros ejemplos de modificadores más adelante, [para `v-on`](./event-handling.html#modificadores-de-eventos) y [para `v-model`](./forms.html#modificadores), cuando exploremos esas características.

Y finalmente, aquí está la sintaxis completa de la directiva:

![gráfico de la sintaxis de la directiva](./images/directive.png)

<!-- https://www.figma.com/file/BGWUknIrtY9HOmbmad0vFr/Directive -->
