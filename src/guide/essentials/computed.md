# Właściwości obliczane (Computed Properties)

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/computed-properties-in-vue-3" title="Free Vue.js Computed Properties Lesson"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-computed-properties-in-vue-with-the-composition-api" title="Free Vue.js Computed Properties Lesson"/>
</div>

## Przykład podstawowy

Wyrażenia w szablonach są bardzo wygodne, ale służą do wykonywania prostych operacji. Umieszczanie zbyt dużej ilości logiki w szablonach może spowodować, że staną się one obszerne i trudne do utrzymania. Na przykład, jeśli mamy obiekt z zagnieżdżoną tablicą:

<div class="options-api">

```js
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  }
}
```

</div>
<div class="composition-api">

```js
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})
```

</div>

Chcemy też wyświetlać różne komunikaty w zależności od tego, czy `autor` ma już jakieś książki, czy nie:

```vue-html
<p>Has published books:</p>
<span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span>
```

W tym momencie szablon staje się nieco zagracony. Musimy przyjrzeć się mu przez chwilę, aby zorientować się, że wykonuje on obliczenia w zależności od `author.books`. Co ważniejsze, prawdopodobnie nie chcemy się powtarzać, jeśli będziemy musieli zawrzeć to obliczenie w szablonie więcej niż jeden raz.

Dlatego właśnie w przypadku złożonej logiki, która zawiera dane reaktywne, zaleca się używanie właściwości **computed**. Poniżej znajduje się ten sam przykład po refaktoryzacji:

<div class="options-api">

```js
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    // obliczeniowy getter
    publishedBooksMessage() {
      // `this` wskazuje na instancję komponentu
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
  }
}
```

```vue-html
<p>Has published books:</p>
<span>{{ publishedBooksMessage }}</span>
```

[Spróbuj tego w Vue Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYXV0aG9yOiB7XG4gICAgICAgIG5hbWU6ICdKb2huIERvZScsXG4gICAgICAgIGJvb2tzOiBbXG4gICAgICAgICAgJ1Z1ZSAyIC0gQWR2YW5jZWQgR3VpZGUnLFxuICAgICAgICAgICdWdWUgMyAtIEJhc2ljIEd1aWRlJyxcbiAgICAgICAgICAnVnVlIDQgLSBUaGUgTXlzdGVyeSdcbiAgICAgICAgXVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBwdWJsaXNoZWRCb29rc01lc3NhZ2UoKSB7XG4gICAgICByZXR1cm4gdGhpcy5hdXRob3IuYm9va3MubGVuZ3RoID4gMCA/ICdZZXMnIDogJ05vJ1xuICAgIH1cbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHA+SGFzIHB1Ymxpc2hlZCBib29rczo8L3A+XG4gIDxzcGFuPnt7IGF1dGhvci5ib29rcy5sZW5ndGggPiAwID8gJ1llcycgOiAnTm8nIH19PC9zcGFuPlxuPC90ZW1wbGF0ZT4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIlxuICB9XG59In0=)

Tutaj zadeklarowaliśmy właściwość obliczaną `publishedBooksMessage`.

Spróbuj zmienić wartość tablicy `books` w aplikacji `data`, a zobaczysz jak `publishedBooksMessage` odpowiednio się zmienia.

Możesz powiązać dane z właściwościami obliczanymi w szablonach tak samo jak z normalnymi właściwościami. Vue jest świadome, że `this.publishedBooksMessage` zależy od `this.author.books`, więc zaktualizuje wszystkie powiązania, które zależą od `this.publishedBooksMessage`, gdy `this.author.books` się zmieni.

Zobacz także: [Typowanie Computed Properties](/guide/typescript/options-api.html#typing-computed-properties) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// ref obliczeniowy
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

[Spróbuj tego w Vue Playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlYWN0aXZlLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuY29uc3QgYXV0aG9yID0gcmVhY3RpdmUoe1xuICBuYW1lOiAnSm9obiBEb2UnLFxuICBib29rczogW1xuICAgICdWdWUgMiAtIEFkdmFuY2VkIEd1aWRlJyxcbiAgICAnVnVlIDMgLSBCYXNpYyBHdWlkZScsXG4gICAgJ1Z1ZSA0IC0gVGhlIE15c3RlcnknXG4gIF1cbn0pXG5cbi8vIGEgY29tcHV0ZWQgcmVmXG5jb25zdCBwdWJsaXNoZWRCb29rc01lc3NhZ2UgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiBhdXRob3IuYm9va3MubGVuZ3RoID4gMCA/ICdZZXMnIDogJ05vJ1xufSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxwPkhhcyBwdWJsaXNoZWQgYm9va3M6PC9wPlxuICA8c3Bhbj57eyBwdWJsaXNoZWRCb29rc01lc3NhZ2UgfX08L3NwYW4+XG48L3RlbXBsYXRlPiIsImltcG9ydC1tYXAuanNvbiI6IntcbiAgXCJpbXBvcnRzXCI6IHtcbiAgICBcInZ1ZVwiOiBcImh0dHBzOi8vc2ZjLnZ1ZWpzLm9yZy92dWUucnVudGltZS5lc20tYnJvd3Nlci5qc1wiXG4gIH1cbn0ifQ==)

Tutaj zadeklarowaliśmy computed property (właściwość obliczaną) `publishedBooksMessage`. Funkcja `computed()` oczekuje, że zostanie jej przekazana funkcja pobierająca, a zwróconą wartością jest **computed ref**. Podobnie jak w przypadku zwykłych refów, możesz uzyskać dostęp do obliczonego wyniku jako `publishedBooksMessage.value`. Obliczone referencje są również automatycznie rozpakowywane w szablonach, więc można się do nich odwoływać bez `.value` w wyrażeniach szablonów.

Obliczona właściwość automatycznie śledzi swoje reaktywne zależności. Vue jest świadome, że obliczenie `publishedBooksMessage` zależy od `author.books`, więc zaktualizuje wszystkie powiązania, które zależą od `publishedBooksMessage`, gdy `author.books` się zmieni.

Zobacz także: [Typowanie Computed Properties](/guide/typescript/composition-api.html#typing-computed) <sup class="vt-badge ts" />

</div>

## Buforowanie Computed a metody

Być może zauważyłeś, że ten sam rezultat możemy osiągnąć, wywołując metodę w wyrażeniu:

```vue-html
<p>{{ calculateBooksMessage() }}</p>
```

<div class="options-api">

```js
// w komponencie
methods: {
  calculateBooksMessage() {
    return this.author.books.length > 0 ? 'Yes' : 'No'
  }
}
```

</div>

<div class="composition-api">

```js
// w komponencie
function calculateBooksMessage() {
  return author.books.length > 0 ? 'Yes' : 'No'
}
```

</div>

Zamiast właściwości obliczanej możemy zdefiniować tę samą funkcję jako metodę. Jeśli chodzi o wynik końcowy, oba podejścia są w istocie dokładnie takie same. Różnica polega jednak na tym, że **właściwości obliczeniowe są buforowane w oparciu o ich reaktywne zależności.** Właściwość obliczeniowa będzie ponownie oceniana tylko wtedy, gdy niektóre z jej reaktywnych zależności ulegną zmianie. Oznacza to, że dopóki `author.books` nie ulegnie zmianie, wielokrotny dostęp do `publishedBooksMessage` natychmiast zwróci poprzednio obliczony wynik bez konieczności ponownego uruchamiania funkcji gettera.

Oznacza to również, że poniższa właściwość obliczeniowa nigdy się nie zaktualizuje, ponieważ `Date.now()` nie jest zależnością reaktywną:

<div class="options-api">

```js
computed: {
  now() {
    return Date.now()
  }
}
```

</div>

<div class="composition-api">

```js
const now = computed(() => Date.now())
```

</div>

Dla porównania, wywołanie metody spowoduje **zawsze** uruchomienie funkcji, gdy tylko nastąpi renderowanie.

Dlaczego potrzebujemy buforowania? Wyobraźmy sobie, że mamy kosztowną właściwość obliczeniową `list`, która wymaga zapętlenia ogromnej tablicy i wykonania wielu obliczeń. Następnie możemy mieć inne obliczane właściwości, które z kolei zależą od `listy`. Bez buforowania, wykonywalibyśmy getter `list` o wiele więcej razy niż to konieczne! W przypadkach, gdy nie chcesz buforować, użyj zamiast tego wywołania metody.

## Zapisywalne Computed

Właściwości obliczane są domyślnie typu getter-only. Jeśli spróbujesz przypisać nową wartość do właściwości obliczeniowej, otrzymasz ostrzeżenie w czasie wykonywania. W rzadkich przypadkach, gdy potrzebna jest "zapisywalna" właściwość obliczana, można ją utworzyć, podając zarówno getter, jak i setter:

<div class="options-api">

```js
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed: {
    fullName: {
      // getter
      get() {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set(newValue) {
        // Uwaga: używamy tutaj składni przypisania destrukturyzacji.
        ;[this.firstName, this.lastName] = newValue.split(' ')
      }
    }
  }
}
```

Teraz, gdy uruchomisz `this.fullName = 'John Doe'`, setter zostanie wywołany, a `this.firstName` i `this.lastName` zostaną odpowiednio zaktualizowane.

</div>

<div class="composition-api">

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // Uwaga: używamy tutaj składni przypisania destrukturyzacji.
    ;[firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

Teraz, gdy uruchomisz `this.fullName = 'John Doe'`, setter zostanie wywołany, a `this.firstName` i `this.lastName` zostaną odpowiednio zaktualizowane.

</div>

## Najlepsze praktyki

### Gettery powinny być wolne od efektów ubocznych

Ważne jest, aby pamiętać, że obliczeniowe funkcje pobierające powinny wykonywać tylko czyste obliczenia i być wolne od efektów ubocznych. Na przykład, **nie wykonuj asynchronicznych żądań ani nie mutuj DOM wewnątrz obliczeniowego gettera!** Pomyśl o właściwości computed jako o deklaratywnym opisie sposobu uzyskiwania wartości na podstawie innych wartości - jej jedynym zadaniem powinno być obliczenie i zwrócenie tej wartości. W dalszej części przewodnika omówimy, w jaki sposób możemy wykonywać efekty uboczne w reakcji na zmiany stanu za pomocą [watchers](./watchers).

### Unikaj modyfikacji wartości obliczanej

Wartość zwracana przez obliczaną właściwość jest stanem pochodnym. Pomyśl o nim jak o tymczasowej migawce - za każdym razem, gdy zmienia się stan źródłowy, tworzona jest nowa migawka. Modyfikowanie migawki nie ma sensu, dlatego wartość zwracana przez właściwość obliczaną powinna być traktowana jako tylko do odczytu i nigdy nie powinna być modyfikowana - zamiast tego należy zaktualizować stan źródłowy, od którego zależy, aby wywołać nowe obliczenia.
