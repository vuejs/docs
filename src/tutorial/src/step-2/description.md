# Renderowanie deklaratywne {#declarative-rendering}

<div class="sfc">

To, co widzisz w edytorze, to Vue Single-File Component (SFC). SFC to samodzielny blok kodu wielokrotnego użytku, który zawiera HTML, CSS i JavaScript, które należą do siebie, zapisane w pliku `.vue`.

</div>

Podstawową cechą Vue jest **renderowanie deklaratywne**: używając składni szablonu, która rozszerza HTML, możemy opisać, jak HTML powinien wyglądać w oparciu o stan JavaScript. Gdy stan się zmienia, HTML aktualizuje się automatycznie.

<div class="composition-api">

Stan, który może wyzwalać aktualizacje po zmianie, jest uważany za **reaktywny**. Możemy zadeklarować stan reaktywny za pomocą interfejsu API `reactive()`. Obiekty utworzone za pomocą `reactive()` są obiektami [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) które działają jak zwykłe obiekty:

```js
import { reactive } from 'vue'

const counter = reactive({
  count: 0
})

console.log(counter.count) // 0
counter.count++
```

`reactive()` działa tylko na obiektach (włączając w to tablice i wbudowane typy takie jak `Map` i `Set`). Funkcja `ref()`, z drugiej strony, może przyjąć dowolny typ wartości i utworzy obiekt, który eksponuje wewnętrzną wartość pod właściwością `.value`:

```js
import { ref } from 'vue'

const message = ref('Hello World!')

console.log(message.value) // "Hello World!"
message.value = 'Changed'
```

Szczegóły dotyczące funkcji `reactive()` i `ref()` zostały omówione w <a target="_blank" href="/guide/essentials/reactivity-fundamentals.html">Przewodnik - Podstawy reaktywności</a>.

<div class="sfc">

Stan reaktywny zadeklarowany w bloku `<script setup>` komponentu może być użyty bezpośrednio w szablonie. W ten sposób możemy renderować dynamiczny tekst na podstawie wartości obiektu `counter` i `message`, używając składni "wąsów":

</div>

<div class="html">

Obiekt przekazywany do `createApp()` jest komponentem Vue. Stan komponentu powinien być zadeklarowany wewnątrz jego funkcji `setup()` i zwrócony za pomocą obiektu:

```js{2,5}
setup() {
  const counter = reactive({ count: 0 })
  const message = ref('Hello World!')
  return {
    counter,
    message
  }
}
```

Właściwości w zwróconym obiekcie zostaną udostępnione w szablonie. W ten sposób możemy renderować dynamiczny tekst na podstawie wartości `message`, używając składni "wąsów":

</div>

```vue-html
<h1>{{ message }}</h1>
<p>Count is: {{ counter.count }}</p>
```

Zauważ, że nie musieliśmy używać `.value` gdy użyliśmy `message` w szablonie: jest on automatycznie rozpakowywany w celu bardziej zwięzłego użycia.

</div>

<div class="options-api">

Stan, który może wyzwalać aktualizacje po zmianie, jest uważany za **reaktywny**. W Vue stan reaktywny jest przechowywany w komponentach. <span class="html">W przykładowym kodzie obiekt przekazywany do funkcji `createApp()` jest komponentem.</span>

Możemy zadeklarować stan reaktywny za pomocą opcji `data`, która powinna być funkcją zwracającą obiekt:

<div class="sfc">

```js{3-5}
export default {
  data() {
    return {
      message: 'Hello World!'
    }
  }
}
```

</div>
<div class="html">

```js{3-5}
createApp({
  data() {
    return {
      message: 'Hello World!'
    }
  }
})
```

</div>

Właściwość `message` zostanie udostępniona w szablonie. W ten sposób możemy renderować dynamiczny tekst na podstawie wartości `message`, używając składni "wąsów":

```vue-html
<h1>{{ message }}</h1>
```

</div>

Zawartość wewnątrz "wąsów" nie jest ograniczona tylko do identyfikatorów lub ścieżek - możemy użyć dowolnego poprawnego wyrażenia JavaScript:

```vue-html
<h1>{{ message.split('').reverse().join('') }}</h1>
```

<div class="composition-api">

Teraz spróbuj samodzielnie utworzyć stan reaktywny i użyj go do renderowania dynamicznej zawartości tekstowej dla `<h1>` w szablonie.

</div>

<div class="options-api">

Teraz spróbuj samodzielnie utworzyć właściwość data i użyć jej jako zawartości tekstowej dla `<h1>` w szablonie.

</div>
