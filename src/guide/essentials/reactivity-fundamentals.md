---
outline: deep
---

# Podstawy reaktywności

:::tip Preferencje API
Ta strona i wiele innych rozdziałów w dalszej części podręcznika zawierają różne treści dla interfejsów Options API i Composition API. Obecne twoje preferencje to <span class="options-api">Options API</span><span class="composition-api">Composition API</span>. Możesz przełączać się między stylami API za pomocą przełączników "Preferowane API" znajdujących się w górnej części lewego paska bocznego.
:::

## Deklarowanie Stanu Reaktywnego

<div class="options-api">

W Options API używamy parametru `data`, aby zadeklarować reaktywny stan komponentu. Wartość parametru opcji powinna być funkcją, która zwraca obiekt. Vue wywoła tę funkcję podczas tworzenia nowej instancji komponentu i opakuje zwrócony obiekt w swój system reaktywności. Wszelkie właściwości najwyższego poziomu tego obiektu są przekazywane na instancję komponentu (`this` w metodach i momentach cyklu życia komponentu):

```js{2-6}
export default {
  data() {
    return {
      count: 1
    }
  },

  // `mounted` jest hookiem cyklu życia komponentu, który wyjaśnimy później
  mounted() {
    // `this` odnosi się do instancji komponentu.
    console.log(this.count) // => 1

// dane również mogą być modyfikowane
    this.count = 2
  }
}
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDFcbiAgICB9XG4gIH0sXG5cbiAgLy8gYG1vdW50ZWRgIGlzIGEgbGlmZWN5Y2xlIGhvb2sgd2hpY2ggd2Ugd2lsbCBleHBsYWluIGxhdGVyXG4gIG1vdW50ZWQoKSB7XG4gICAgLy8gYHRoaXNgIHJlZmVycyB0byB0aGUgY29tcG9uZW50IGluc3RhbmNlLlxuICAgIGNvbnNvbGUubG9nKHRoaXMuY291bnQpIC8vID0+IDFcblxuICAgIC8vIGRhdGEgY2FuIGJlIG11dGF0ZWQgYXMgd2VsbFxuICAgIHRoaXMuY291bnQgPSAyXG4gIH1cbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIENvdW50IGlzOiB7eyBjb3VudCB9fVxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

Te właściwości instancji są dodawane tylko podczas pierwszego tworzenia instancji, więc musisz się upewnić, że wszystkie one są obecne w obiekcie zwracanym przez funkcję `data`. Tam, gdzie to konieczne, użyj `null`, `undefined` lub innej wartości zastępczej dla właściwości, gdzie pożądana wartość nie jest jeszcze dostępna.

Możliwe jest dodanie nowej właściwości bezpośrednio do `this` bez umieszczania jej w `data`. Jednakże, właściwości dodane w ten sposób nie będą w stanie wywoływać reaktywnych aktualizacji.

Vue używa prefiksu `$`, gdy udostępnia swoje własne wbudowane API poprzez instancję komponentu. Zastrzega też przedrostek `_` dla wewnętrznych właściwości. Powinieneś unikać używania nazw dla właściwości najwyższego poziomu `data` , które zaczynają się od któregokolwiek z tych znaków.

### Reaktywne Proxy vs. Oryginalne Proxy

W Vue 3 dane stają się reaktywne dzięki wykorzystaniu [JavaScript Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Użytkownicy pochodzący z Vue 2 powinni być świadomi następującego skrajnego przypadku:

```js
export default {
  data() {
    return {
      someObject: {}
    }
  },
  mounted() {
    const newObject = {}
    this.someObject = newObject

    console.log(newObject === this.someObject) // false
  }
}
```

Kiedy uzyskujesz dostęp do `this.someObject` po przypisaniu go, wartość jest reaktywnym proxy oryginalnego `newObject`. **Inaczej niż w Vue 2, oryginalny `newObject` pozostaje nienaruszony i nie będzie reaktywny: upewnij się, że zawsze uzyskujesz dostęp do stanu reaktywnego jako właściwości `this`.someObject`.

</div>

<div class="composition-api">

Możemy utworzyć reaktywny obiekt lub tablicę za pomocą funkcji [`reactive()`](/api/reactivity-core.html#reactive):

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

Obiekty reaktywne są [JavaScript Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) i zachowują się tak samo jak normalne obiekty. Różnica polega na tym, że Vue jest w stanie śledzić dostęp do właściwości i mutacje obiektu reaktywnego. Jeśli jesteś ciekaw szczegółów, wyjaśniamy, jak działa system reaktywności w Vue w [Reactivity in Depth](/guide/extras/reactivity-in-depth.html) - zalecamy jednak przeczytanie go po ukończeniu głównego przewodnika.

Zobacz także: [Typowanie Reaktywne](/guide/typescript/composition-api.html#typing-reactive) <sup class="vt-badge ts" />

Aby użyć stanu reaktywnego w szablonie komponentu, należy go zadeklarować i zwrócić w funkcji `setup()` komponentu:

```js{5,9-11}
import { reactive } from 'vue'

export default {
// `setup` jest specjalnym hookiem przeznaczonym dla Composition API.
  setup() {
    const state = reactive({ count: 0 })

// udostępnij stan szablonowi
    return {
      state
    }
  }
}
```

```vue-html
<div>{{ state.count }}</div>
```

Podobnie, możemy zadeklarować funkcje, które mutują stan reaktywny w tym samym zakresie i udostępnić je jako metody obok stanu:

```js{7-9,14}
import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({ count: 0 })

    function increment() {
      state.count++
    }

// nie zapomnij również udostępnić tej funkcji.
    return {
      state,
      increment
    }
  }
}
```

Metody jawne są zwykle używane jako nasłuchy zdarzeń (listeners):

```vue-html
<button @click="increment">
  {{ state.count }}
</button>
```

### `<script setup>` \*\*

Ręczne udostępnianie stanu i metod przez `setup()` może być czasochłonne. Na szczęście, jest to konieczne tylko wtedy, gdy nie używamy proccesu generowania kodu. Kiedy używamy komponentów jednoplikowych (SFC), możemy znacznie uprościć ich użycie za pomocą `<script setup>`:

```vue
<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })

function increment() {
  state.count++
}
</script>

<template>
  <button @click="increment">
    {{ state.count }}
  </button>
</template>
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlYWN0aXZlIH0gZnJvbSAndnVlJ1xuXG5jb25zdCBzdGF0ZSA9IHJlYWN0aXZlKHsgY291bnQ6IDAgfSlcblxuZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICBzdGF0ZS5jb3VudCsrXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPlxuICAgIHt7IHN0YXRlLmNvdW50IH19XG4gIDwvYnV0dG9uPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

Importy i zmienne najwyższego poziomu zadeklarowane w `<script setup>` są automatycznie wykorzystywane w szablonie tego samego komponentu.

> W dalszej części poradnika będziemy przede wszystkim używać składni SFC + `<script setup>` w przykładach kodu Composition API , ponieważ jest to najczęściej spotykane użycie przez programistów Vue.

</div>

<div class="options-api">

## Deklaracja Metod

<VueSchoolLink href="https://vueschool.io/lessons/methods-in-vue-3" title="Free Vue.js Methods Lesson"/>

Aby dodać metody do instancji komponentu, używamy opcji `methods`. Powinien to być obiekt zawierający pożądane metody:

```js{7-11}
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    // metody mogą być wywoływane w hookach cyklu życia lub w innych metodach!
    this.increment()
  }
}
```

Vue automatycznie wiąże wartość `this` dla `metod` tak, aby zawsze odnosiła się do instancji komponentu. Dzięki temu metoda zachowuje poprawną wartość `this`, jeśli jest używana jako nasłuch zdarzeń lub wywołanie zwrotne. Powinieneś unikać używania funkcji strzałek podczas definiowania `metod`, ponieważ uniemożliwia to Vue powiązanie odpowiedniej wartości `this`:

```js
export default {
  methods: {
    increment: () => {
      // BAD: no `this` access here!
    }
  }
}
```

Tak jak wszystkie inne właściwości instancji komponentu, `metody` są dostępne z poziomu szablonu komponentu. Wewnątrz szablonu są one najczęściej używane jako nasłuchiwacze zdarzeń:

```vue-html
<button @click="increment">{{ count }}</button>
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY291bnQ6IDBcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBpbmNyZW1lbnQoKSB7XG4gICAgICB0aGlzLmNvdW50KytcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5pbmNyZW1lbnQoKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPnt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

W powyższym przykładzie metoda `increment` zostanie wywołana po kliknięciu przycisku `<button>`.

</div>

### Czas aktualizacji DOM

Gdy użytkownik modyfikuje stan reaktywny, DOM jest aktualizowany automatycznie. Należy jednak zauważyć, że aktualizacje DOM nie są stosowane synchronicznie. Zamiast tego, Vue buforuje je do "następnego kliknięcia" w cyklu aktualizacji, aby zapewnić, że każdy komponent musi zostać zaktualizowany tylko raz, bez względu na to, ile zmian stanu zostało dokonanych.

Aby poczekać na zakończenie aktualizacji DOM po zmianie stanu, można użyć globalnego API [nextTick()](/api/general.html#nexttick):

<div class="composition-api">

```js
import { nextTick } from 'vue'

function increment() {
  state.count++
  nextTick(() => {
    // dostęp do zaktualizowanego DOM
  })
}
```

</div>
<div class="options-api">

```js
import { nextTick } from 'vue'

export default {
  methods: {
    increment() {
      this.count++
      nextTick(() => {
    // dostęp do zaktualizowanego DOM
      })
    }
  }
}
```

</div>

### Dogłębna reaktywność

W Vue stan jest domyślnie głęboko reaktywny. Oznacza to, że można oczekiwać, że zmiany zostaną wykryte nawet wtedy, gdy zmutowane zostaną zagnieżdżone obiekty lub tablice:

<div class="options-api">

```js
export default {
  data() {
    return {
      obj: {
        nested: { count: 0 },
        arr: ['foo', 'bar']
      }
    }
  },
  methods: {
    mutateDeeply() {
      // będą one działać zgodnie z oczekiwaniami.
      this.obj.nested.count++
      this.obj.arr.push('baz')
    }
  }
}
```

</div>

<div class="composition-api">

```js
import { reactive } from 'vue'

const obj = reactive({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // these will work as expected.
  obj.nested.count++
  obj.arr.push('baz')
}
```

</div>

Możliwe jest również jawne tworzenie [płytkich obiektów reaktywnych] (/api/reactivity-advanced.html#shallowreactive), w których reaktywność jest śledzona tylko na poziomie głównym, jednak są one zazwyczaj potrzebne tylko w zaawansowanych przypadkach użycia.

<div class="composition-api">

### Reaktywne proxy vs. Oryginał

Należy zauważyć, że wartość zwracana przez `reactive()` jest [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) oryginalnego obiektu, który nie jest równy oryginalnemu obiektowi:

```js
const raw = {}
const proxy = reactive(raw)

// proxy NIE jest równe oryginałowi.
console.log(proxy === raw) // false
```

Tylko proxy jest reaktywne - mutowanie oryginalnego obiektu nie spowoduje aktualizacji. Dlatego najlepszą praktyką podczas pracy z systemem reaktywności Vue jest **wyłączne używanie proxy**.

Aby zapewnić spójny dostęp do proxy, wywołanie `reactive()` na tym samym obiekcie zawsze zwraca to samo proxy, a wywołanie `reactive()` na istniejącym proxy również zwraca to samo proxy:

```js
// wywołanie funkcji reactive() na tym samym obiekcie zwraca to samo proxy
console.log(reactive(raw) === proxy) // true

// wywołanie funkcji reactive() na proxy zwraca samo siebie
console.log(reactive(proxy) === proxy) // true
```

Ta zasada dotyczy także obiektów zagnieżdżonych. Ze względu na głęboką reaktywność, obiekty zagnieżdżone wewnątrz obiektu reaktywnego są również proxy:

```js
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

### Ograniczenia `reactive()` \*\*

API `reactive()` ma dwa ograniczenia:

1. Działa tylko dla typów obiektowych (obiekty, tablice i [typy kolekcji](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections) takie jak `Map` i `Zestaw`). Nie może obsługiwać [typów prymitywnych](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) takich jak `string`, `number` czy `boolean`.

2. Ponieważ śledzenie reaktywności w Vue działa poprzez dostęp do właściwości, musimy zawsze utrzymywać tę samą referencję do obiektu reaktywnego. Oznacza to, że nie możemy łatwo "zastąpić" obiektu reaktywnego, ponieważ połączenie reaktywności z pierwszym odniesieniem zostaje utracone:

   ```js
   let state = reactive({ count: 0 })

   // powyższe odniesienie ({ count: 0 }) nie jest już śledzone (utracono połączenie reaktywne!)
   state = reactive({ count: 1 })
   ```

   Oznacza to również, że gdy przypiszemy lub przekształcimy właściwość obiektu reaktywnego do zmiennych lokalnych lub gdy przekażemy tę właściwość do funkcji, utracimy połączenie z reaktywnością:

   ```js
   const state = reactive({ count: 0 })

   // n jest zmienną lokalną, która jest odłączona
   // od state.count.
   let n = state.count
   // nie wpływa na stan początkowy
   n++

   // count jest również odłączone od state.count.
   let { count } = state
   // nie ma wpływu na stan początkowy
   count++

   // funkcja otrzymuje zwykłą liczbę i
   // nie będzie w stanie śledzić zmian w state.count
   callSomeFunction(state.count)
   ```

## Reactive Variables with `ref()` \*\*

Aby zaradzić ograniczeniom funkcji `reactive()`, Vue dostarcza również funkcję [`ref()`](/api/reactivity-core.html#ref), która pozwala nam na tworzenie reaktywnych **"refów "**, które mogą przechowywać dowolny typ wartości:

```js
import { ref } from 'vue'

const count = ref(0)
```

Polecenie `ref()` pobiera argument i zwraca go opakowany w obiekt ref z właściwością `.value`:

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

Zobacz także: [Typowanie refów](/guide/typescript/composition-api.html#typing-ref) <sup class="vt-badge ts" />

Podobnie jak właściwości obiektu reaktywnego, właściwość `.value` ref jest reaktywna. Dodatkowo, gdy przechowuje typy obiektów, ref automatycznie konwertuje swoją `.value` za pomocą `reactive()`.

Ref zawierający wartość obiektu może reaktywnie zastąpić cały obiekt:

```js
const objectRef = ref({ count: 0 })

// działa to reaktywnie
objectRef.value = { count: 1 }
```

Refy można również przekazywać do funkcji lub usuwać z obiektów bez utraty reaktywności:

```js
const obj = {
  foo: ref(1),
  bar: ref(2)
}

// funkcja otrzymuje ref
// musi uzyskać dostęp do wartości za pomocą .value, ale
// zachowa połączenie reaktywne
callSomeFunction(obj.foo)

// wciąż reaktywne
const { foo, bar } = obj
```

Innymi słowy, `ref()` pozwala nam stworzyć "referencję" do dowolnej wartości i przekazać ją dalej bez utraty reaktywności. Ta zdolność jest dość ważna, ponieważ jest często używana podczas wyciągania logiki do [Composable Functions] (/guide/reusability/composables.html).

### Rozwijanie refów w szablonach

Gdy refy są dostępne jako właściwości najwyższego poziomu w szablonie, są automatycznie "rozpakowywane", więc nie ma potrzeby używania `.value`. Oto poprzedni przykład z licznikiem, używający zamiast tego `ref()`:

```vue{13}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }} <!-- nie potrzeba .value -->
  </button>
</template>
```

[Spróbuj w tego w praktyce ](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY291bnQgPSByZWYoMClcblxuZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICBjb3VudC52YWx1ZSsrXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPnt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

Zwróć uwagę, że rozpakowywanie ma zastosowanie tylko wtedy, gdy ref jest właściwością najwyższego poziomu w kontekście renderowania szablonu. Na przykład, `foo` jest właściwością najwyższego poziomu, ale `object.foo` nie jest.

Zatem biorąc pod uwagę następujący obiekt:

```js
const object = { foo: ref(1) }
```

Poniższe wyrażenie **NIE** będzie działać zgodnie z oczekiwaniami:

```vue-html
{{ object.foo + 1 }}
```

Wynikiem renderowania będzie `[object Object]`, ponieważ `object.foo` jest obiektem ref. Możemy to naprawić przez uczynienie `foo` właściwością najwyższego poziomu:

```js
const { foo } = object
```

```vue-html
{{ foo + 1 }}
```

Teraz wynikiem renderowania będzie `2`.

Teraz wynikiem renderowania będzie `2`.
Należy zauważyć, że ref zostanie również zawinięty, jeśli jest końcową wartością interpolacji tekstowej (np. znacznik <code v-pre>{{ }}</code>), więc poniższy wynik wyrenderuje `1`:

```vue-html
{{ object.foo }}
```

Jest to tylko wygodna cecha interpolacji tekstu i jest równoważna <code v-pre>{{ object.foo.value }}</code>.

### Rozpakowywanie refów w obiektach reaktywnych

Kiedy uzyskuje się dostęp do `ref` lub modyfikuje się go jako właściwość obiektu reaktywnego, jest on również automatycznie rozwijany, więc zachowuje się jak normalna właściwość:

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

Jeśli do właściwości powiązanej z istniejącym ref zostanie przypisany nowy ref, zastąpi on stary ref:

```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// oryginalny ref jest teraz odłączony od state.count
console.log(count.value) // 1
```

Rozwijanie refów ma miejsce tylko wtedy, gdy są one zagnieżdżone wewnątrz głębokiego obiektu reaktywnego. Nie ma zastosowania, gdy jest dostępna jako właściwość [płytkiego obiektu reaktywnego] (/api/reactivity-advanced.html#shallowreactive).

#### Rozwijanie ref w tablicach i kolekcjach

W przeciwieństwie do obiektów reaktywnych, nie ma rozwijania, gdy ref jest dostępny jako element tablicy reaktywnej lub natywnej kolekcji typu `Map`:

```js
const books = reactive([ref('Vue 3 Guide')])
// tutaj musi być .value
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// tutaj musi być .value
console.log(map.get('count').value)
```

</div>

<div class="options-api">

### Metody stanowe

W niektórych przypadkach możemy potrzebować dynamicznie utworzyć funkcję metody, na przykład tworząc obsługę zdarzenia z odbicia:

```js
import { debounce } from 'lodash-es'

export default {
  methods: {
// Odbijanie za pomocą Lodash
    click: debounce(function () {
// ... reakcja na kliknięcie ...
    }, 500)
  }
}
```

Jednak takie podejście jest problematyczne w przypadku komponentów, które są ponownie używane, ponieważ funkcja odświeżania jest **statystyczna**: utrzymuje pewien wewnętrzny stan dotyczący upływającego czasu. Jeśli wiele instancji komponentów korzysta z tej samej funkcji odbicia, będą one wzajemnie się zakłócać.

Aby zachować niezależność funkcji odbicia każdej instancji komponentu od pozostałych, możemy utworzyć jej wersję w lifecycle hook `created`:

```js
export default {
  created() {
    // każda instancja ma teraz swoją własną kopię handler'a odbicia
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // dobrze jest też anulować timer
    // gdy komponent zostanie usunięty
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... reagować na kliknięcie ...
    }
  }
}
```

</div>

<div class="composition-api">

## Przekształcenie reaktywności <sup class="vt-badge experimental" /> 

Konieczność używania `.value` z referencjami jest wadą narzuconą przez ograniczenia języka JavaScript. Jednak dzięki przekształceniom w czasie kompilacji możemy poprawić ergonomię poprzez automatyczne dołączanie `.value` w odpowiednich miejscach. Vue udostępnia transformację w czasie kompilacji, która pozwala nam napisać wcześniejszy przykład "licznika" w ten sposób:

```vue
<script setup>
let count = $ref(0)

function increment() {
  // nie trzeba używać .value
  count++
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

Możesz dowiedzieć się więcej o [Przekształceniu reaktywności](/guide/extras/reactivity-transform.html) w dedykowanej sekcji. Należy pamiętać, że obecnie jest to wciąż eksperymentalne rozwiązanie i może ulec zmianie zanim zostanie sfinalizowane.

</div>
