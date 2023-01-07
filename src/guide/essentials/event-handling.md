# Manejando Eventos

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/user-events-in-vue-3" title="Lección gratuita de Eventos de Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-user-events-in-vue-3" title="Lección gratuita de Eventos de Vue.js "/>
</div>

## Escuchando Eventos

Podemos utilizar la directiva `v-on`, que normalmente acortamos con el símbolo `@`, para escuchar los eventos del DOM y ejecutar JavaScript cuando se activen. El uso sería `v-on:click="handler"` o con el atajo, `@click="handler"`.

El valor del manejador puede ser uno de los siguientes:

1. **Manejadores en línea:** JavaScript en línea que se ejecutará cuando se active el evento (similar al atributo nativo `onclick`).

2. **Manejadores de métodos:** Un nombre de propiedad o ruta que apunta a un método definido en el componente.

## Manejadores en Línea

Los manejadores en línea suelen utilizarse en casos sencillos, por ejemplo:

<div class="composition-api">

```js
const count = ref(0)
```

</div>
<div class="options-api">

```js
data() {
  return {
    count: 0
  }
}
```

</div>

```vue-html
<button @click="count++">Añadir 1</button>
<p>El Contador está en: {{ count }}</p>
```

<div class="composition-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY291bnRlciA9IHJlZigwKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJjb3VudGVyKytcIj5BZGQgMTwvYnV0dG9uPlxuXHQ8cD5UaGUgYnV0dG9uIGFib3ZlIGhhcyBiZWVuIGNsaWNrZWQge3sgY291bnRlciB9fSB0aW1lcy48L3A+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcblx0ICByZXR1cm4ge1xuICAgIFx0Y291bnRlcjogMFxuICBcdH1cblx0fVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJjb3VudGVyKytcIj5BZGQgMTwvYnV0dG9uPlxuXHQ8cD5UaGUgYnV0dG9uIGFib3ZlIGhhcyBiZWVuIGNsaWNrZWQge3sgY291bnRlciB9fSB0aW1lcy48L3A+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

## Manejadores de Métodos

La lógica de muchos manejadores de eventos será más compleja aún, y probablemente no sea factible con manejadores en línea. Por eso, `v-on` también puede aceptar el nombre o la ruta de un método del componente que quieras llamar.

Por ejemplo:

<div class="composition-api">

```js
const name = ref('Vue.js')

function greet(event) {
  alert(`Hola ${name.value}!`)
  // `event` es el evento nativo del DOM
  if (event) {
    alert(event.target.tagName)
  }
}
```

</div>
<div class="options-api">

```js
data() {
  return {
    name: 'Vue.js'
  }
},
methods: {
  greet(event) {
    // `this` dentro de los métodos apunta a la instancia activa actual
    alert(`Hola ${this.name}!`)
    // `event` es el evento nativo del DOM
    if (event) {
      alert(event.target.tagName)
    }
  }
}
```

</div>

```vue-html
<!-- `greet` es el nombre del método definido anteriormente -->
<button @click="greet">Saluda</button>
```

<div class="composition-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgbmFtZSA9IHJlZignVnVlLmpzJylcblxuZnVuY3Rpb24gZ3JlZXQoZXZlbnQpIHtcbiAgYWxlcnQoYEhlbGxvICR7bmFtZS52YWx1ZX0hYClcbiAgLy8gYGV2ZW50YCBpcyB0aGUgbmF0aXZlIERPTSBldmVudFxuICBpZiAoZXZlbnQpIHtcbiAgICBhbGVydChldmVudC50YXJnZXQudGFnTmFtZSlcbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJncmVldFwiPkdyZWV0PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ1Z1ZS5qcydcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBncmVldChldmVudCkge1xuICAgICAgLy8gYHRoaXNgIGluc2lkZSBtZXRob2RzIHBvaW50cyB0byB0aGUgY3VycmVudCBhY3RpdmUgaW5zdGFuY2VcbiAgICAgIGFsZXJ0KGBIZWxsbyAke3RoaXMubmFtZX0hYClcbiAgICAgIC8vIGBldmVudGAgaXMgdGhlIG5hdGl2ZSBET00gZXZlbnRcbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICBhbGVydChldmVudC50YXJnZXQudGFnTmFtZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxidXR0b24gQGNsaWNrPVwiZ3JlZXRcIj5HcmVldDwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

Un manejador de método recibe automáticamente el objeto Evento nativo del DOM que lo desencadena. En el ejemplo anterior, podemos acceder al elemento que envía el evento a través de `event.target.tagName`.

<div class="composition-api">

Mira también: [Manejadores de Eventos de Escritura](/guide/typescript/composition-api.html#escritura-de-manejadores-de-eventos) <sup class="vt-badge ts" />

</div>
<div class="options-api">

Mira también: [Manejadores de Eventos de Escritura](/guide/typescript/options-api.html#escritura-de-manejadores-de-eventos) <sup class="vt-badge ts" />

</div>

### Método vs. la Detección en Línea

El compilador de plantillas detecta los manejadores de métodos comprobando si la cadena de valores `v-on` es un identificador JavaScript válido o una ruta de acceso a una propiedad. Por ejemplo, `foo`, `foo.bar` y `foo['bar']` se tratan como manejadores de métodos, mientras que `foo()` y `count++` se tratan como manejadores en línea.

## Llamando Métodos en Manejadores en Línea

En lugar de vincularlos directamente a un nombre de un método, también podemos llamar a los métodos en un manejador en línea. Esto nos permite pasar los argumentos personalizados del método en lugar del evento nativo:

<div class="composition-api">

```js
function say(message) {
  alert(message)
}
```

</div>
<div class="options-api">

```js
methods: {
  say(message) {
    alert(message)
  }
}
```

</div>

```vue-html
<button @click="say('hello')">Di hola</button>
<button @click="say('bye')">Di adiós</button>
```

<div class="composition-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmZ1bmN0aW9uIHNheShtZXNzYWdlKSB7XG4gIGFsZXJ0KG1lc3NhZ2UpXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuXHQ8YnV0dG9uIEBjbGljaz1cInNheSgnaGknKVwiPlNheSBoaTwvYnV0dG9uPlxuICA8YnV0dG9uIEBjbGljaz1cInNheSgnd2hhdCcpXCI+U2F5IHdoYXQ8L2J1dHRvbj5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9)

</div>
<div class="options-api">

[Pruébalo en la Zona de Práctica](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kczoge1xuXHQgIHNheShtZXNzYWdlKSB7XG4gICAgXHRhbGVydChtZXNzYWdlKVxuICBcdH1cblx0fVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJzYXkoJ2hpJylcIj5TYXkgaGk8L2J1dHRvbj5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJzYXkoJ3doYXQnKVwiPlNheSB3aGF0PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

## Acceso al Argumento del Evento en los Manejadores en Línea

A veces también necesitamos acceder al evento original del DOM en un manejador en línea. Puedes pasarlo a un método usando la variable especial `$event`, o usar una función de flecha en línea:

```vue-html
<!-- utilizando la variable especial $event -->
<button @click="warn('Aún no se puede enviar el formulario.', $event)">
  Enviar
</button>

<!-- utilizando la función de flecha en línea -->
<button @click="(event) => warn('Aún no se puede enviar el formulario.', event)">
  Enviar
</button>
```

<div class="composition-api">

```js
function warn(message, event) {
  // ahora tenemos acceso al evento nativo
  if (event) {
    event.preventDefault()
  }
  alert(message)
}
```

</div>
<div class="options-api">

```js
methods: {
  warn(message, event) {
    // ahora tenemos acceso al evento nativo
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

</div>

## Modificadores de Eventos

Es una necesidad muy común llamar a `event.preventDefault()` o `event.stopPropagation()` dentro de los manejadores de eventos. Aunque podemos hacer esto fácilmente dentro de los métodos, sería mejor si los métodos pueden ser puramente sobre la lógica de los datos en lugar de tener que lidiar con los detalles de los eventos del DOM.

Para solucionar este problema, Vue proporciona **modificadores de eventos** para `v-on`. Recordemos que los modificadores son directivas postfijas denotadas por un punto.

- `.stop`
- `.prevent`
- `.self`
- `.capture`
- `.once`
- `.passive`

```vue-html
<!-- se detendrá la propagación del evento clic -->
<a @click.stop="doThis"></a>

<!-- el evento de envío ya no recargará la página -->
<form @submit.prevent="onSubmit"></form>

<!-- los modificadores se pueden encadenar -->
<a @click.stop.prevent="doThat"></a>

<!-- sólo el modificador -->
<form @submit.prevent></form>

<!-- sólo activar el manejador si event.target es del propio elemento -->
<!-- es decir, no de un elemento hijo -->
<div @click.self="doThat">...</div>
```

::: tip
El orden importa cuando se utilizan modificadores porque el código relevante se genera en el mismo orden. Por lo tanto, el uso de `@click.prevent.self` impedirá **la acción por defecto de los clics en el propio elemento y sus hijos** mientras que `@click.self.prevent` sólo impedirá la acción por defecto de los clics en el propio elemento.
:::

Los modificadores `.capture`, `.once` y `.passive` reflejan las [opciones del método nativo `addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters):

```vue-html
<!-- utiliza el modo de captura al añadir el receptor de eventos -->
<!-- es decir, un evento dirigido a un elemento interior es manejado aquí antes de ser manejado por ese elemento -->
<div @click.capture="doThis">...</div>

<!-- el evento clic se activará como máximo una vez -->
<a @click.once="doThis"></a>

<!-- el comportamiento por defecto del evento scroll (desplazamiento)  -->
<!-- se producirá inmediatamente, en lugar de esperar a que `onScroll` -->
<!-- se complete en caso de que contenga `event.preventDefault()`.     -->
<div @scroll.passive="onScroll">...</div>
```

El modificador `.passive` se suele utilizar con los escuchadores de eventos táctiles para [mejorar el rendimiento en los dispositivos móviles](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners).

::: tip
No utilice `.passive` y `.prevent` juntos, porque `.passive` ya le indica al navegador que _no_ pretendes impedir el comportamiento por defecto del evento, y es probable que veas una advertencia del navegador si lo haces.
:::

## Modificadores Clave

Cuando escuchamos eventos de teclado, a menudo necesitamos comprobar teclas específicas. Vue permite añadir modificadores de tecla para `v-on` o `@` al escuchar eventos de teclado:

```vue-html
<!-- sólo llama a `submit` cuando la `key` es `Enter` -->
<input @keyup.enter="submit" />
```

Puedes utilizar directamente cualquier nombre de tecla válido expuesto a través de [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) como modificadores convirtiéndolos en kebab-case.

```vue-html
<input @keyup.page-down="onPageDown" />
```

En el ejemplo anterior, el controlador sólo será llamado si `$event.key` es igual a `'PageDown'`.

### Alias de las Teclas

Vue proporciona alias para las teclas más utilizadas:

- `.enter`
- `.tab`
- `.delete` (captura las teclas "Borrar" y "Retroceso")
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

### Teclas Modificadoras del Sistema

Puedes utilizar los siguientes modificadores para activar los receptores de eventos del ratón o del teclado sólo cuando se pulse la tecla modificadora correspondiente:

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

::: tip Note
En los teclados Macintosh, meta es la tecla de comando (⌘). En los teclados Windows, meta es la tecla Windows (⊞). En los teclados de Sun Microsystems, meta está marcada como un diamante sólido (◆). En ciertos teclados, específicamente en los teclados de las máquinas MIT, Lisp y sus sucesores, como el teclado Knight y el teclado space-cadet, meta está etiquetado como "META". En los teclados Symbolics, meta lleva la etiqueta "META" o "Meta"
:::

Por ejemplo:

```vue-html
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Haz algo</div>
```

::: tip
Ten en cuenta que las teclas modificadoras son diferentes de las teclas normales y cuando se usan con eventos `keyup`, tienen que estar pulsadas cuando se emite el evento. En otras palabras, `keyup.ctrl` sólo se activará si sueltas una tecla mientras mantienes pulsada `ctrl`. No se activará si sueltas la tecla "ctrl" sola.
:::

### Modificador `.exact`

El modificador `.exact` permite controlar la combinación exacta de modificadores del sistema necesarios para activar un evento.

```vue-html
<!-- esto se disparará incluso si se pulsa también Alt o Shift -->
<button @click.ctrl="onClick">A</button>

<!-- esto sólo se disparará cuando se pulse Ctrl y ninguna otra tecla -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- esto sólo se disparará cuando no se pulsen modificadores del sistema -->
<button @click.exact="onClick">A</button>
```

## Modificadores del Botón del Ratón

- `.left`
- `.right`
- `.middle`

Estos modificadores restringen el manejador a los eventos desencadenados por un botón específico del ratón.
