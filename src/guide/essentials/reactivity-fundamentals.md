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

To address the limitations of `reactive()`, Vue also provides a [`ref()`](/api/reactivity-core.html#ref) function which allows us to create reactive **"refs"** that can hold any value type:

```js
import { ref } from 'vue'

const count = ref(0)
```

`ref()` takes the argument and returns it wrapped within a ref object with a `.value` property:

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

See also: [Typing Refs](/guide/typescript/composition-api.html#typing-ref) <sup class="vt-badge ts" />

Similar to properties on a reactive object, the `.value` property of a ref is reactive. In addition, when holding object types, ref automatically converts its `.value` with `reactive()`.

A ref containing an object value can reactively replace the entire object:

```js
const objectRef = ref({ count: 0 })

// this works reactively
objectRef.value = { count: 1 }
```

Refs can also be passed into functions or destructured from plain objects without losing reactivity:

```js
const obj = {
  foo: ref(1),
  bar: ref(2)
}

// the function receives a ref
// it needs to access the value via .value but it
// will retain the reactivity connection
callSomeFunction(obj.foo)

// still reactive
const { foo, bar } = obj
```

In other words, `ref()` allows us to create a "reference" to any value and pass it around without losing reactivity. This capability is quite important as it is frequently used when extracting logic into [Composable Functions](/guide/reusability/composables.html).

### Ref Unwrapping in Templates \*\*

When refs are accessed as top-level properties in the template, they are automatically "unwrapped" so there is no need to use `.value`. Here's the previous counter example, using `ref()` instead:

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
    {{ count }} <!-- no .value needed -->
  </button>
</template>
```

[Try it in the Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgY291bnQgPSByZWYoMClcblxuZnVuY3Rpb24gaW5jcmVtZW50KCkge1xuICBjb3VudC52YWx1ZSsrXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8YnV0dG9uIEBjbGljaz1cImluY3JlbWVudFwiPnt7IGNvdW50IH19PC9idXR0b24+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

Note the unwrapping only applies if the ref is a top-level property on the template render context. As an example, `foo` is a top-level property, but `object.foo` is not.

So given the following object:

```js
const object = { foo: ref(1) }
```

The following expression will **NOT** work as expected:

```vue-html
{{ object.foo + 1 }}
```

The rendered result will be `[object Object]` because `object.foo` is a ref object. We can fix that by making `foo` a top-level property:

```js
const { foo } = object
```

```vue-html
{{ foo + 1 }}
```

Now the render result will be `2`.

One thing to note is that a ref will also be unwrapped if it is the final evaluated value of a text interpolation (i.e. a <code v-pre>{{ }}</code> tag), so the following will render `1`:

```vue-html
{{ object.foo }}
```

This is just a convenience feature of text interpolation and is equivalent to <code v-pre>{{ object.foo.value }}</code>.

### Ref Unwrapping in Reactive Objects \*\*

When a `ref` is accessed or mutated as a property of a reactive object, it is also automatically unwrapped so it behaves like a normal property:

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

If a new ref is assigned to a property linked to an existing ref, it will replace the old ref:

```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// original ref is now disconnected from state.count
console.log(count.value) // 1
```

Ref unwrapping only happens when nested inside a deep reactive object. It does not apply when it is accessed as a property of a [shallow reactive object](/api/reactivity-advanced.html#shallowreactive).

#### Ref Unwrapping in Arrays and Collections

Unlike reactive objects, there is no unwrapping performed when the ref is accessed as an element of a reactive array or a native collection type like `Map`:

```js
const books = reactive([ref('Vue 3 Guide')])
// need .value here
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// need .value here
console.log(map.get('count').value)
```

</div>

<div class="options-api">

### Stateful Methods \*

In some cases, we may need to dynamically create a method function, for example creating a debounced event handler:

```js
import { debounce } from 'lodash-es'

export default {
  methods: {
    // Debouncing with Lodash
    click: debounce(function () {
      // ... respond to click ...
    }, 500)
  }
}
```

However, this approach is problematic for components that are reused because a debounced function is **stateful**: it maintains some internal state on the elapsed time. If multiple component instances share the same debounced function, they will interfere with one another.

To keep each component instance's debounced function independent of the others, we can create the debounced version in the `created` lifecycle hook:

```js
export default {
  created() {
    // each instance now has its own copy of debounced handler
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // also a good idea to cancel the timer
    // when the component is removed
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... respond to click ...
    }
  }
}
```

</div>

<div class="composition-api">

## Reactivity Transform <sup class="vt-badge experimental" /> \*\*

Having to use `.value` with refs is a drawback imposed by the language constraints of JavaScript. However, with compile-time transforms we can improve the ergonomics by automatically appending `.value` in appropriate locations. Vue provides a compile-time transform that allows us to write the earlier "counter" example like this:

```vue
<script setup>
let count = $ref(0)

function increment() {
  // no need for .value
  count++
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

You can learn more about [Reactivity Transform](/guide/extras/reactivity-transform.html) in its dedicated section. Do note that it is currently still experimental and may change before being finalized.

</div>
