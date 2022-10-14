# Obsługa Zdarzeń

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/user-events-in-vue-3" title="Free Vue.js Events Lesson"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-user-events-in-vue-3" title="Free Vue.js Events Lesson"/>
</div>

## Nasłuchiwanie zdarzeń

Możemy użyć dyrektywy `v-on`, którą zazwyczaj skracamy do symbolu `@`, aby nasłuchiwać zdarzeń DOM i uruchamiać JavaScript, gdy zostaną one wywołane. Używa się `v-on:click="handler"` lub skrótu, `@click="handler"`.

Sposóby użycia funkcji obsługi zdarzeń:

1. **Inline handlers:** Kod JavaScript wykonywany w linii, gdy zdarzenie zostanie wywołane (podobny do natywnego atrybutu `onclick`).

2. **Method handlers:** Nazwa właściwości lub ścieżka, która wskazuje na metodę zdefiniowaną w komponencie.

## Funkcje obsługi inline

Funkcji obsługi zdarzeń inline używa się zazwyczaj w prostych przypadkach, na przykład:

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

[Spróbuj tego w Vue Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY291bnRlciA9IHJlZigwKVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJjb3VudGVyKytcIj5BZGQgMTwvYnV0dG9uPlxuXHQ8cD5UaGUgYnV0dG9uIGFib3ZlIGhhcyBiZWVuIGNsaWNrZWQge3sgY291bnRlciB9fSB0aW1lcy48L3A+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[Spróbuj tego w Vue Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcblx0ICByZXR1cm4ge1xuICAgIFx0Y291bnRlcjogMFxuICBcdH1cblx0fVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJjb3VudGVyKytcIj5BZGQgMTwvYnV0dG9uPlxuXHQ8cD5UaGUgYnV0dG9uIGFib3ZlIGhhcyBiZWVuIGNsaWNrZWQge3sgY291bnRlciB9fSB0aW1lcy48L3A+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

## Funkcja obsługi zdarzeń na bazie metody.

Logika wielu mechanizmów obsługi zdarzeń będzie jednak bardziej złożona i prawdopodobnie nie będzie możliwa do zrealizowania za pomocą funkcji inline. Dlatego `v-on` może również przyjąć nazwę lub ścieżkę do metody komponentu, którą chcemy wywołać.

Dla przykładu:

<div class="composition-api">

```js
const name = ref('Vue.js')

function greet(event) {
  alert(`Hello ${name.value}!`)
  // `event` jest zdarzeniem DOM
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
    // `this` wewnątrz metod wskazuje na bieżącą aktywną instancję
    alert(`Hello ${this.name}!`)
// `event` jest zdarzeniem DOM
    if (event) {
      alert(event.target.tagName)
    }
  }
}
```

</div>

```vue-html
<!-- `greet` jest nazwą metody zdefiniowanej powyżej -->
<button @click="greet">Greet</button>
```

<div class="composition-api">

[Spróbuj tego w Vue Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgbmFtZSA9IHJlZignVnVlLmpzJylcblxuZnVuY3Rpb24gZ3JlZXQoZXZlbnQpIHtcbiAgYWxlcnQoYEhlbGxvICR7bmFtZS52YWx1ZX0hYClcbiAgLy8gYGV2ZW50YCBpcyB0aGUgbmF0aXZlIERPTSBldmVudFxuICBpZiAoZXZlbnQpIHtcbiAgICBhbGVydChldmVudC50YXJnZXQudGFnTmFtZSlcbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJncmVldFwiPkdyZWV0PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>
<div class="options-api">

[Spróbuj tego w Vue Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ1Z1ZS5qcydcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBncmVldChldmVudCkge1xuICAgICAgLy8gYHRoaXNgIGluc2lkZSBtZXRob2RzIHBvaW50cyB0byB0aGUgY3VycmVudCBhY3RpdmUgaW5zdGFuY2VcbiAgICAgIGFsZXJ0KGBIZWxsbyAke3RoaXMubmFtZX0hYClcbiAgICAgIC8vIGBldmVudGAgaXMgdGhlIG5hdGl2ZSBET00gZXZlbnRcbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICBhbGVydChldmVudC50YXJnZXQudGFnTmFtZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG5cdDxidXR0b24gQGNsaWNrPVwiZ3JlZXRcIj5HcmVldDwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

</div>

Metoda obsługi automatycznie otrzymuje natywny obiekt zdarzenia DOM, który ją wywołuje - w powyższym przykładzie możemy uzyskać dostęp do elementu wysyłającego zdarzenie poprzez `event.target.tagName`.

<div class="composition-api">

Zobacz także: [Typowanie Event Handlers](/guide/typescript/composition-api.html#typing-event-handlers) <sup class="vt-badge ts" />

</div>
<div class="options-api">

Zobacz także: [Typowanie Event Handlers](/guide/typescript/options-api.html#typing-event-handlers) <sup class="vt-badge ts" />

</div>

### Wykrywanie - Method czy Inline

Kompilator szablonów wykrywa metodę obsługi zdarzeń przez sprawdzenie, czy ciąg znaków `v-on` jest poprawnym kodem JavaScript lub ścieżką dostępu do właściwości. Na przykład, `foo`, `foo.bar` i `foo['bar']` są traktowane jako funkcje obsługi przez metodę, podczas gdy `foo()` i `count++` są traktowane jako funkcje obsługi inline.

## Wywoływanie metod w obsłudze typu inline

Zamiast wiązać się bezpośrednio z nazwą metody, możemy również wywoływać metody w obsłudze typu inline. Dzięki temu możemy przekazać metodzie niestandardowe argumenty zamiast natywnego zdarzenia:

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

[Spróbuj tego w Vue Playground](https://sfc.vuejs.org/#eNp9kN1uwjAMhV8l8g1Dos191aHtGXabm7QzUNb8yHaYKtR3X0KnCoHEnY/j88XHV/iMsb4khAZa7mmIohglxb3xh+R7GYJXbKc3h8z2iFt1NV4pOyLJ2jN+Nr7Viz0bsxB0cbSCRUnbJZHM+ejHof95N1CAmxOOY9hsDey/7KRuqtXL5AtXN+HqyfWdo9Xrp7CDwcVAUjkb6zMHn+PdFjf/D2ygWaKUXs5ftIGTSORGaz705ShnrgMdda5qSl4GhzWyqzoKv4yUwQZ2dwydmxekitB/IyG9Yj6MPnELNl91hvkPugmTrw==)

</div>
<div class="options-api">

[Spróbuj tego w Vue Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbWV0aG9kczoge1xuXHQgIHNheShtZXNzYWdlKSB7XG4gICAgXHRhbGVydChtZXNzYWdlKVxuICBcdH1cblx0fVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cblx0PGJ1dHRvbiBAY2xpY2s9XCJzYXkoJ2hpJylcIj5TYXkgaGk8L2J1dHRvbj5cbiAgPGJ1dHRvbiBAY2xpY2s9XCJzYXkoJ3doYXQnKVwiPlNheSB3aGF0PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

</div>

## Dostęp do argumentu zdarzenia w inline handlerach

Czasami potrzebujemy także dostępu do oryginalnego zdarzenia DOM w inline handlerze. Możesz przekazać je do metody, używając specjalnej zmiennej `$event`, lub użyć funkcji strzałki inline:

```vue-html
<!-- użycie zmiennej specjalnej $event -->
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

<!-- użycie funkcji strzałkowej w obsłudze typu inline -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>
```

<div class="composition-api">

```js
function warn(message, event) {
  // teraz mamy dostęp do zdarzenia natywnego
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
  // teraz mamy dostęp do zdarzenia natywnego
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

</div>

## Modyfikatory zdarzeń

Bardzo często zachodzi potrzeba wywołania `event.preventDefault()` lub `event.stopPropagation()` wewnątrz obsługi zdarzeń. Chociaż możemy to łatwo zrobić wewnątrz metod, byłoby lepiej, gdyby metody mogły zajmować się wyłącznie logiką danych, a nie szczegółami zdarzeń DOM.

Aby rozwiązać ten problem, Vue dostarcza **modyfikatory zdarzeń** dla `v-on`. Przypomnijmy, że modyfikatory to postfiksy instrukcji oznaczane kropką.

- `.stop`
- `.prevent`
- `.self`
- `.capture`
- `.once`
- `.passive`

```vue-html
<!-- kontynuacja zdarzenia kliknięcia zostanie zatrzymana -->
<a @click.stop="doThis"></a>

<!-- zdarzenie submit nie będzie już powodować przeładowania strony -->
<form @submit.prevent="onSubmit"></form>

<!-- modyfikatory mogą być łączone razem -->
<a @click.stop.prevent="doThat"></a>

<!-- tylko modyfikator -->
<form @submit.prevent></form>

<!-- wywołaj handler tylko wtedy, gdy event.target jest samym elementem -->
<!-- tzn. nie z elementu potomnego -->.
<div @click.self="doThat">...</div>
```

::: tip
Kolejność ma znaczenie podczas używania modyfikatorów, ponieważ odpowiedni kod jest generowany w tej samej kolejności. Dlatego użycie `@click.prevent.self` zapobiegnie **domyślnemu działaniu kliknięć na samym elemencie i jego dzieciach**, podczas gdy `@click.self.prevent` zapobiegnie tylko domyślnemu działaniu kliknięć na samym elemencie.
:::

Modyfikatory `.capture`, `.once` i `.passive` odzwierciedlają [opcje natywnej metody `addEventListener` method](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options):

```vue-html
<!-- użyj trybu przechwytywania podczas dodawania funkcji obsługi zdarzeń -->.
<!-- tzn. zdarzenie skierowane do elementu wewnętrznego jest obsługiwane tutaj, zanim zostanie obsłużone przez ten element -->.
<div @click.capture="doThis">...</div>

<!-- zdarzenie kliknięcia zostanie wywołane co najwyżej raz -->
<a @click.once="doThis"></a>

<!-- domyślne zachowanie zdarzenia przewijania (przewijanie) będzie miało miejsce -->
<!-- natychmiast, zamiast czekać na zakończenie `onScroll` -->.
<!-- w przypadku, gdy zawiera ono `event.preventDefault()` -->.
<div @scroll.passive="onScroll">...</div>
```

Modyfikator `.passive` jest zwykle używany z nasłuchiwaniem zdarzeń dotykowych w celu [poprawy wydajności na urządzeniach przenośnych](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners).

::: tip
Nie używaj `.passive` i `.prevent` razem, ponieważ `.passive` już wskazuje przeglądarce, że _nie zamierzasz_ zapobiec domyślnemu zachowaniu zdarzenia, i prawdopodobnie zobaczysz ostrzeżenie od przeglądarki, jeśli to zrobisz.
:::

## Modyfikatory klawiszy

Podczas nasłuchiwania zdarzeń na klawiaturze często musimy sprawdzać, czy nie występują określone klawisze. Vue umożliwia dodawanie modyfikatorów klawiszy dla `v-on` lub `@` podczas nasłuchiwania zdarzeń klawiszowych:

```vue-html
<!-- wywołaj `vm.submit()` tylko wtedy, gdy `key` jest `Enter` -->.
<input @keyup.enter="submit" />
```

Jako modyfikatorów można bezpośrednio używać dowolnych poprawnych nazw klawiszy dostępnych przez [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values), konwertując je na kebab-case.

```vue-html
<input @keyup.page-down="onPageDown" />
```

W powyższym przykładzie, funkcja obsługi zdarzenia zostanie wywołana tylko wtedy, gdy `$event.key` jest równy `'PageDown'`.

### Aliasy klawiszy

Vue udostępnia aliasy dla najczęściej używanych klawiszy:

- `.enter`
- `.tab`
- `.delete` (przechwytuje zarówno klawisze "Delete", jak i "Backspace")
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

### Klawisze modyfikatorów systemu

Można użyć następujących modyfikatorów, aby wywołać nasłuchiwanie zdarzeń myszy lub klawiatury tylko wtedy, gdy zostanie naciśnięty odpowiedni klawisz modyfikatora:

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

::: tip Note
Na klawiaturach Macintosha meta to klawisz polecenia (⌘). Na klawiaturach Windows meta to klawisz Windows (⊞). Na klawiaturach Sun Microsystems meta jest oznaczona jako romb (◆). Na niektórych klawiaturach, w szczególności na klawiaturach MIT i Lisp machine oraz ich następcach, takich jak klawiatura Knight, klawiatura z klawiszami spacji i kadetu, meta jest oznaczona jako "META". Na klawiaturach Symbolics meta jest oznaczana jako "META" lub "Meta".
:::

Na przykład:

```vue-html
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

::: tip
Zauważ, że klawisze modyfikujące różnią się od zwykłych klawiszy i kiedy są używane ze zdarzeniami `keyup`, muszą być wciśnięte w momencie emisji zdarzenia. Innymi słowy, `keyup.ctrl` wywoła się tylko wtedy, gdy puścisz klawisz trzymając wciśnięty `ctrl`. Nie wywoła się, jeśli zwolnisz sam klawisz `ctrl`.
:::

### Modyfikator `.exact

Modyfikator `.exact` pozwala kontrolować dokładną kombinację modyfikatorów systemowych potrzebnych do wywołania zdarzenia.

```vue-html
<!-- to zadziała nawet jeśli wciśnięty jest również Alt lub Shift -->
<button @click.ctrl="onClick">A</button>

<!-- to zadziała tylko wtedy, gdy zostanie naciśnięty Ctrl i żadne inne klawisze -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- to zadziała tylko wtedy, gdy nie zostaną naciśnięte żadne modyfikatory systemowe -->
<button @click.exact="onClick">A</button>
```

## Modyfikatory przycisków myszy

- `.left`
- `.right`
- `.middle`

Te modyfikatory ograniczają obsługę do zdarzeń wywoływanych przez określony przycisk myszy.
