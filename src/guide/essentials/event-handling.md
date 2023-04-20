# Event Handling {#event-handling}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/user-events-in-vue-3" title="Gratis Vue.js Lerneinheit zu Events"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-user-events-in-vue-3" title="Gratis Vue.js Lerneinheit zu Events"/>
</div>

## Auf Events horchen {#listening-to-events}

Die `v-on`-Direktive wird genutzt, um beim Auslösen von DOM-Events JavaScript-Code auszuführen. Sie wird meist in der Kurzform `@` benutzt. Die Direktive wird in der Form `v-on:click="handler"` oder in der Kurzform, `@click="handler"` genutzt.

Der Inhalt von _handler_ kann wie folgt definiert werden:

1. **Inline Handlers:** Inline JavaScript, welches ausgeführt wird wenn der Event ausgelöst wird (analog zum nativen `onclick`-Attribut).

2. **Method Handlers:** Der Name einer Property oder ein Verweis auf eine Methode, die in der Komponente definiert ist.

## Inline Handlers {#inline-handlers}

Inline Handler werden in der Regel für sehr einfache Anwendungsfälle genutzt, z.B.:

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
<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>
```

<div class="composition-api">

[Probiere es im Playground aus](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY291bnRlciA9IHJlZigwKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJjb3VudGVyKytcIj5BZGQgMTwvYnV0dG9uPlxuXHQ8cD5UaGUgYnV0dG9uIGFib3ZlIGhhcyBiZWVuIGNsaWNrZWQge3sgY291bnRlciB9fSB0aW1lcy48L3A+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[Probiere es im Playground aus](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcblx0ICByZXR1cm4ge1xuICAgIFx0Y291bnRlcjogMFxuICBcdH1cblx0fVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJjb3VudGVyKytcIj5BZGQgMTwvYnV0dG9uPlxuXHQ8cD5UaGUgYnV0dG9uIGFib3ZlIGhhcyBiZWVuIGNsaWNrZWQge3sgY291bnRlciB9fSB0aW1lcy48L3A+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

## Method Handlers {#method-handlers}

Für die meisten Eventhandler ist die Logik in der Realität komplexer als in den bisherigen Beispielen. Die Nutzung eines Inline Handlers ist in diesen komplexeren Fällen eher unhandlich. Deshalb kann auch der Name oder ein Verweis auf eine Methode innerhalb der Komponente an `v-on` übergeben werden.

Ein Beispiel:

<div class="composition-api">

```js
const name = ref('Vue.js')

function greet(event) {
  alert(`Hello ${name.value}!`)
  // `event` ist das native DOM Event
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
    // `this` zeigt innerhalb einer Methode auf die aktuell aktive Instanz
    alert(`Hello ${this.name}!`)
    // `event` ist das native DOM Event
    if (event) {
      alert(event.target.tagName)
    }
  }
}
```

</div>

```vue-html
<!-- `greet` ist der Name der oben definierten Methode  -->
<button @click="greet">Greet</button>
```

<div class="composition-api">

[Probiere es im Playground aus](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgbmFtZSA9IHJlZignVnVlLmpzJylcblxuZnVuY3Rpb24gZ3JlZXQoZXZlbnQpIHtcbiAgYWxlcnQoYEhlbGxvICR7bmFtZS52YWx1ZX0hYClcbiAgLy8gYGV2ZW50YCBpcyB0aGUgbmF0aXZlIERPTSBldmVudFxuICBpZiAoZXZlbnQpIHtcbiAgICBhbGVydChldmVudC50YXJnZXQudGFnTmFtZSlcbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJncmVldFwiPkdyZWV0PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[Probiere es im Playground aus](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ1Z1ZS5qcydcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBncmVldChldmVudCkge1xuICAgICAgLy8gYHRoaXNgIGluc2lkZSBtZXRob2RzIHBvaW50cyB0byB0aGUgY3VycmVudCBhY3RpdmUgaW5zdGFuY2VcbiAgICAgIGFsZXJ0KGBIZWxsbyAke3RoaXMubmFtZX0hYClcbiAgICAgIC8vIGBldmVudGAgaXMgdGhlIG5hdGl2ZSBET00gZXZlbnRcbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICBhbGVydChldmVudC50YXJnZXQudGFnTmFtZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxidXR0b24gQGNsaWNrPVwiZ3JlZXRcIj5HcmVldDwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

Ein Method Handler erhält automatisch das native DOM Event Objekt, von dem er ausgelöst wurde - im Beispiel oben können wir auf das Element, von dem das Event ausgelöst wurde, über `event.target.tagName` zugreifen.

<div class="composition-api">

Siehe dazu auch: [Typisierte Eventhandler](/guide/typescript/composition-api.html#typing-event-handlers) <sup class="vt-badge ts" />

</div>
<div class="options-api">

Siehe dazu auch: [Typisierte Eventhandler](/guide/typescript/options-api.html#typing-event-handlers) <sup class="vt-badge ts" />

</div>

### Automatische Identifizierung bei Method und Inline Handlern {#method-vs-inline-detection}

Der Template-Compiler erkennt, um welchen Typ es sich bei einem Handler handelt, indem der Inhalt der `v-on`-Direktive überprüft wird. ist dessen Wert ein gültiger JavaScript Identifier oder ein Verweis auf eine Property, wird ein Method Handler erkannt. Zum Beispiel werden `foo`, `foo.bar` und `foo['bar']` als Method Handler erkannt, `foo()` und `count++` werden als Inline Handler behandelt.

## Aufrufen von Methoden in Inline Handlern {#calling-methods-in-inline-handlers}

Anstatt das Event direkt an eine Methode zu binden, können aus einem Inline Handler heraus auch Methoden aufgerufen werden. So können der Methode auch beliebige Parameter übergeben werden und nicht nur das native Eventobjekt:

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
<button @click="say('hello')">Say hello</button>
<button @click="say('bye')">Say bye</button>
```

<div class="composition-api">

[Probiere es im Playground aus](https://sfc.vuejs.org/#eNp9kN1uwjAMhV8l8g1Dos191aHtGXabm7QzUNb8yHaYKtR3X0KnCoHEnY/j88XHV/iMsb4khAZa7mmIohglxb3xh+R7GYJXbKc3h8z2iFt1NV4pOyLJ2jN+Nr7Viz0bsxB0cbSCRUnbJZHM+ejHof95N1CAmxOOY9hsDey/7KRuqtXL5AtXN+HqyfWdo9Xrp7CDwcVAUjkb6zMHn+PdFjf/D2ygWaKUXs5ftIGTSORGaz705ShnrgMdda5qSl4GhzWyqzoKv4yUwQZ2dwydmxekitB/IyG9Yj6MPnELNl91hvkPugmTrw==)

</div>
<div class="options-api">

[Probiere es im Playground aus](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kczoge1xuXHQgIHNheShtZXNzYWdlKSB7XG4gICAgXHRhbGVydChtZXNzYWdlKVxuICBcdH1cblx0fVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJzYXkoJ2hpJylcIj5TYXkgaGk8L2J1dHRvbj5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJzYXkoJ3doYXQnKVwiPlNheSB3aGF0PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

## In Inline Handlern auf Eventparameter zugreifen {#accessing-event-argument-in-inline-handlers}

Manchmal wollen wir innerhalb eines Inline Handler auf die Attribute des auslösenden DOM-Events zugreifen. Die ist über die spezielle Variable `$event` möglich, oder akternativ über eine Inline-Funktion:

```vue-html
<!-- using $event special variable -->
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

<!-- using inline arrow function -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>
```

<div class="composition-api">

```js
function warn(message, event) {
  // jetzt haben wir Zugriff auf das native Event
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
    // jetzt haben wir Zugriff auf das native Event
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

</div>

## Event Modifier {#event-modifiers}

Eine sehr übliche Anforderung ist das AUfrufen von Funktionen wie `event.preventDefault()` oder `event.stopPropagation()` innerhalb eines Eventhandlers. Obwohl dieser Code problemlos auch innerhalb andere Methoden aufgerufen werden kann, macht es den Code lesbarer und wartbarer, wenn die Methode nur die tatsächliche Anwendungslogik implmentiert und diese nicht mit der Behandlung von DOM Events vermischt wird.

Zur Lösung dieses Problems stellt Vue **Event Modifier** für die `v-on`-Direktive bereit. Modifiers werden in der Postfix-Notation durch einen Punkt getrennt an die Direktive ergänzt.

- `.stop`
- `.prevent`
- `.self`
- `.capture`
- `.once`
- `.passive`

```vue-html
<!-- Die Weitergabe des Click-Events wird verhindert -->
<a @click.stop="doThis"></a>

<!-- Das Submit-Event wird die Seite nicht neu laden -->
<form @submit.prevent="onSubmit"></form>

<!-- Modifier können verkettet genutzt werden -->
<a @click.stop.prevent="doThat"></a>

<!-- nur der Modifier ohne weiteren Handler -->
<form @submit.prevent></form>

<!-- löse den Handler nur aus, wenn event.target das auslösende Element selbst ist -->
<!-- i.e. not from a child element -->
<div @click.self="doThat">...</div>
```

::: tip
Bei der Nutzung von Modifiern ist es wichtig die Reihenfolge der Modifier zu beachten, weil der relevante Code in derselben Reihenfolge generiert wird. Somit wird bei der Nutzung von `@click.prevent.self` die **Standardaktion von Click auf dem Element und seinen UNterlementen verhindert**, während `@click.self.prevent` nur das Standardverhalten von Click auf dem Element selbst betrifft.
:::

Die Modifier `.capture`, `.once` und `.passive` spiegeln die [Optionen der nativen `addEventListener` Methode](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options) wieder:

```vue-html
<!-- nutze den capture-Modus beim Hinzufügen des Eventlisteners -->
<!-- z.B. wird ein Event eines Unterelementes dort behandelt, bevor der Handler des Elementes selbst ausgelöst wird -->
<div @click.capture="doThis">...</div>

<!-- Das Click-Event wird maximal einmal ausgelöst -->
<a @click.once="doThis"></a>

<!-- Das Standardverhalten des Scroll-Event (scrolling) wird direkt ausgeführt. Es wird nicht auf die Fertigstellung von `onScroll` gewartet falls es `event.preventDefault()` enthält                -->
<div @scroll.passive="onScroll">...</div>
```

Der Modifier `.passive` wird üblicherweise bei Touch-Eventlistenern verwendet, um [die Performance auf Mobilgeräten zu verbessern](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners).

::: tip
Nutze `.passive` und `.prevent` nicht zusammen, da `.passive` dem Browser bereits anzeigt, dass das Standardverhalten _nicht_ unterdrückt werden soll und der Browser (sehr wahrscheinlich) eine Warnung anzeigen wird, wenn dies doch umgesetzt wird.
:::

## Key Modifier {#key-modifiers}

Beim Horchen auf Tastaturevents müssen wir oft die Benutzung bestimmter Tasten überprüfen. Vue erlaubt das Anfügen von Key Modifiern an `v-on` oder `@` zum Reagieren auf Tastaturevents:

```vue-html
<!-- rufe `submit` nur auf, wenn der `key` `Enter` ist -->
<input @keyup.enter="submit" />
```

Es können beliebige gültige Tasten als Modifier genutzt werden, die über [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) verfügbar sind. Dazu müssen sie in Kebab-Case umgewandelt werden.

```vue-html
<input @keyup.page-down="onPageDown" />
```

Im Beispiel wird der Handler nur aufgerufen, wenn `$event.key` dem Wert `'PageDown'` entspricht.

### Key Aliase {#key-aliases}

Vue stellt Aliase für häufig genutzte Tasten bereit:

- `.enter`
- `.tab`
- `.delete` (reagiert sowohl auf "Delete" als auch auf "Backspace")
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

### System Modifier Keys {#system-modifier-keys}

Die folgenden Modifier können genutzt werden, um nur auf Maus- oder Tastaturevents zu reagieren, wenn der entsprechende Modifier Key gedrückt ist:

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

::: tip Note
Auf Macintosh-Tastaturen ist meta der Command Key (⌘). Bei Windows-Tastaturen ist meta die Windowstaste (⊞). Auf Sun Microsystems-Tastaturen ist meta als ausgefüllter Diamand (◆) dargestellt. Auf anderen Tastaturen, speziell MIT und 'Lisp Machine Keyboards' und deren Nachfolgern, wie z.B. das 'Knight Keyboard' oder 'Space-Cadet Keyboard', ist meta mit “META” beschriftet. Bei Symboltastaturen ist meta als “META” oder “Meta” beschriftet.
:::

Beispiele:

```vue-html
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

::: tip
Beachte, dass Modifier Keys sich von normalen Tasten unterscheiden. Wenn sie mit `keyup`-Events genutzt werden, müssen sie beim Auslösen des Events gedrückt sein. Konkret bedeutet das, dass `keyup.ctrl` nur ausgelöst wird, wenn eine Taste losgelassen wird während `ctrl` gedrückt ist. Das Event wird nicht ausgelöst, wenn die `ctrl` losgelassen wird.
:::

### `.exact` Modifier {#exact-modifier}

Der Modifier `.exact` erlaubt es, genaue Kombinationen von System Modifiern abzufragen, um ein Event auszulösen.

```vue-html
<!-- hier wird das Event auch ausgelöst, wenn Alt oder Shift auch gedürckt sind -->
<button @click.ctrl="onClick">A</button>

<!-- hier wird das Event nur ausgelöst, wenn nur Ctrl und keine andere Taste gedrückt werden -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- hier wird das Event nur ausgelöst, wenn keine System Keys gedrückt sind -->
<button @click.exact="onClick">A</button>
```

## Maustasten Modifier {#mouse-button-modifiers}

- `.left`
- `.right`
- `.middle`

Diese Modifier begrenzen den Handler auf Events, die von der angegebenen Maustaste ausgelöst werden.
