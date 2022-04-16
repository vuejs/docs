# Reguły priorytetu A: Podstawowe

Te reguły pomagają zapobiegać błędom, więc naucz się ich i przestrzegaj za wszelką cenę. Wyjątki mogą istnieć, ale powinny być bardzo rzadkie i powinny być stosowane tylko przez osoby posiadające specjalistyczną wiedzę na temat JavaScript i Vue.

## Używaj wielowyrazowych nazw komponentów

Nazwy komponentów użytkownika powinny być zawsze wielowyrazowe, z wyjątkiem głównych komponentów `App`. To [zapobiega konfliktom](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name) z istniejącymi i przyszłymi elementami HTML, ponieważ wszystkie elementy HTML są jednowyrazowe.

<div class="style-example style-example-bad">
<h3>Źle</h3>

```vue-html
<!-- w prekompilowanych szablonach (templates) -->
<Item />

<!-- w szablonach (templates) in-DOM -->
<item></item>
```

</div>

<div class="style-example style-example-good">
<h3>Dobrze</h3>

```vue-html
<!-- w prekompilowanych szablonach (templates) -->
<TodoItem />

<!-- w szablonach (templates) in-DOM -->
<todo-item></todo-item>
```

</div>

## Używaj szczegółowych definicji propsów

W zatwierdzonym kodzie, definicje propów powinny być zawsze jak najbardziej szczegółowe, określając co najmniej typ(y).

::: details Objaśnienia szczegółowe
Szczegółowe [definicje propsów](/guide/components/props.html#prop-validation) mają dwie zalety:

- Dokumentują interfejs API komponentu, dzięki czemu łatwo jest zobaczyć, w jaki sposób komponent ma być używany.
- Podczas tworzenia aplikacji Vue będzie ostrzegać, jeśli komponentowi zostaną dostarczone niepoprawnie sformatowane propsy, co pomoże wychwycić potencjalne źródła błędów.
  :::

<div class="style-example style-example-bad">
<h3>Źle</h3>

```js
// Jest to dobre rozwiązanie tylko w przypadku prototypowania
props: ['status']
```

</div>

<div class="style-example style-example-good">
<h3>Dobrze</h3>

```js
props: {
  status: String
}
```

```js
// Jeszcze lepiej!
props: {
  status: {
    type: String,
    required: true,

    validator: value => {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].includes(value)
    }
  }
}
```

</div>

## Używaj klucza dla `v-for`

`key` z `v-for` jest _zawsze_ wymagany na komponentach, aby utrzymać wewnętrzny stan komponentu w drzewie. Ale również w przypadku elementów dobrą praktyką jest zachowanie przewidywalnego zachowania, takiego jak [stałość obiektu](https://bost.ocks.org/mike/constancy/) w animacji.

::: details Objaśnienia szczegółowe
Załóżmy, że masz listę todos:

```js
data() {
  return {
    todos: [
      {
        id: 1,
        text: 'Learn to use v-for'
      },
      {
        id: 2,
        text: 'Learn to use key'
      }
    ]
  }
}
```

Następnie sortujesz je alfabetycznie. Gdy DOM jest aktualizowany, Vue optymalizuje renderowanie, aby przeprowadzić najkorzystniejsze mutacje DOM. Może to oznaczać usunięcie pierwszego elementu Todo, a następnie dodanie go z powrotem na końcu listy.

Problem polega na tym, że w niektórych przypadkach ważne jest, aby nie usuwać elementów, które pozostaną w DOM. Na przykład można użyć `<transition-group>` do animacji sortowania listy lub utrzymania fokusu, jeśli renderowany element jest `<input>`. W takich przypadkach dodanie unikalnego klucza dla każdego elementu (np. `:key="todo. id"`) powie Vue, jak ma się zachowywać w sposób bardziej przewidywalny.

Z naszego doświadczenia wynika, że lepiej _zawsze_ dodawać unikalny klucz, aby Ty i Twój zespół po prostu nie musieli się martwić o te skrajne przypadki. Następnie w rzadkich, krytycznych dla wydajności scenariuszach, w których stałość obiektu nie jest konieczna, możesz zrobić świadomy wyjątek.
:::

<div class="style-example style-example-bad">
<h3>Źle</h3>

```vue-html
<ul>
  <li v-for="todo in todos">
    {{ todo.text }}
  </li>
</ul>
```

</div>

<div class="style-example style-example-good">
<h3>Dobrze</h3>

```vue-html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

</div>

## Unikaj `v-if` z `v-for`

**Nigdy nie używaj `v-if` na tym samym elemencie co `v-for`.**

Istnieją dwa typowe przypadki, w których może to być kuszące:

- Aby filtrować elementy na liście (np. `v-for="user in users" v-if="user.isActive"`). W takich przypadkach należy zastąpić `users` nową właściwością obliczeniową (computed), która zwraca przefiltrowaną listę (np. `activeUsers`).

- Aby uniknąć renderowania listy, jeśli powinna być ukryta (np. `v-for="user in users" v-if="shouldShowUsers"`). W takich przypadkach należy przenieść `v-if` do elementu kontenera (np. `ul`, `ol`).

::: details Objaśnienia szczegółowe
Gdy Vue przetwarza dyrektywy, `v-if` ma wyższy priorytet niż `v-for`, więc ten szablon:

```vue-html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

Zgłosi błąd, ponieważ dyrektywa v-if zostanie oceniona jako pierwsza, a zmienna iteracyjna user nie istnieje w tej chwili.

Można to naprawić, wykonując iterację po obliczonej właściwości (computed), na przykład w ten sposób:

```js
computed: {
  activeUsers() {
    return this.users.filter(user => user.isActive)
  }
}
```

```vue-html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

Alternatywnie można użyć znacznika `<template>` z funkcją `v-for` aby owinąć element `<li>`:

```vue-html
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">
      {{ user.name }}
    </li>
  </template>
</ul>
```

:::

<div class="style-example style-example-bad">
<h3>Źle</h3>

```vue-html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

</div>

<div class="style-example style-example-good">
<h3>Dobrze</h3>

```vue-html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

```vue-html
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">
      {{ user.name }}
    </li>
  </template>
</ul>
```

</div>

## Używaj styli z zakresem

W przypadku aplikacji style w komponencie `App` najwyższego poziomu oraz w komponentach layoutu mogą być globalne, ale wszystkie inne komponenty powinny być zawsze z zakresem (scoped).


This is only relevant for [Single-File Components](/guide/scaling-up/sfc.html). It does _not_ require that the [`scoped` attribute](https://vue-loader.vuejs.org/en/features/scoped-css.html) be used. Scoping could be through [CSS modules](https://vue-loader.vuejs.org/en/features/css-modules.html), a class-based strategy such as [BEM](http://getbem.com/), or another library/convention.

**Biblioteki komponentów powinny jednak preferować strategię opartą na klasach, a nie na wykorzystaniu atrybutu `scoped`.**

Ułatwia to nadpisywanie stylów wewnętrznych, z czytelnymi dla człowieka nazwami klas, które nie mają zbyt dużej szczegółowości i nadal są bardzo mało prawdopodobne, aby doprowadziły do konfliktu.

::: details Objaśnienia szczegółowe
Jeśli tworzysz duży projekt, współpracujesz z innymi programistami lub czasami dołączasz HTML/CSS firm trzecich (np. z Auth0), spójne ustalanie zakresu zapewni, że style będą stosowane tylko do tych komponentów, do których są przeznaczone.

Poza atrybutem `scoped`, używanie unikalnych nazw klas może pomóc w zapewnieniu, że CSS innych firm nie będzie stosowany do twojego własnego HTML. Na przykład, wiele projektów używa nazw klas `button`, `btn` lub `icon`, więc nawet jeśli nie używasz strategii takiej jak BEM, dodanie przedrostka specyficznego dla aplikacji i/lub komponentu (np. `ButtonClose-icon`) może zapewnić pewną ochronę.
:::

<div class="style-example style-example-bad">
<h3>Źle</h3>

```vue-html
<template>
  <button class="btn btn-close">×</button>
</template>

<style>
.btn-close {
  background-color: red;
}
</style>
```

</div>

<div class="style-example style-example-good">
<h3>Dobrze</h3>

```vue-html
<template>
  <button class="button button-close">×</button>
</template>

<!-- Użycie atrybutu `scoped`. -->
<style scoped>
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
</style>
```

```vue-html
<template>
  <button :class="[$style.button, $style.buttonClose]">×</button>
</template>

<!-- Użycie modułów CSS -->
<style module>
.button {
  border: none;
  border-radius: 2px;
}

.buttonClose {
  background-color: red;
}
</style>
```

```vue-html
<template>
  <button class="c-Button c-Button--close">×</button>
</template>

<!-- Użycie konwencji BEM -->
<style>
.c-Button {
  border: none;
  border-radius: 2px;
}

.c-Button--close {
  background-color: red;
}
</style>
```

</div>

## Unikaj eksponowania prywatnych funkcji w mixinach

Zawsze używaj prefiksu `$_` dla niestandardowych prywatnych właściwości w pluginie, mixinie, itp, które nie powinny być uważane za publiczne API. Następnie, aby uniknąć konfliktów z kodem innych autorów, dołącz również nazwany zakres (np. $_yourPluginName_)

::: details Objaśnienia szczegółowe
Vue używa prefiksu `_` do definiowania własnych właściwości prywatnych, więc użycie tego samego prefiksu (np. `_update`) grozi nadpisaniem właściwości instancji. Nawet jeśli sprawdzisz i okaże się, że Vue nie używa obecnie danej nazwy właściwości, nie ma gwarancji, że konflikt nie pojawi się w późniejszej wersji.

Jeśli chodzi o przedrostek `$`, jego przeznaczeniem w ekosystemie Vue są specjalne właściwości instancji, które są wystawione na widok użytkownika, więc używanie go dla właściwości _private_ nie byłoby właściwe.

Zamiast tego zalecamy połączenie tych dwóch przedrostków w `$_`, jako konwencję dla prywatnych właściwości definiowanych przez użytkownika, która gwarantuje brak konfliktów z Vue.
:::

<div class="style-example style-example-bad">
<h3>Źle</h3>

```js
const myGreatMixin = {
  // ...
  methods: {
    update() {
      // ...
    }
  }
}
```

```js
const myGreatMixin = {
  // ...
  methods: {
    _update() {
      // ...
    }
  }
}
```

```js
const myGreatMixin = {
  // ...
  methods: {
    $update() {
      // ...
    }
  }
}
```

```js
const myGreatMixin = {
  // ...
  methods: {
    $_update() {
      // ...
    }
  }
}
```

</div>

<div class="style-example style-example-good">
<h3>Dobrze</h3>

```js
const myGreatMixin = {
  // ...
  methods: {
    $_myGreatMixin_update() {
      // ...
    }
  }
}
```

```js
// Jeszcze lepiej!
const myGreatMixin = {
  // ...
  methods: {
    publicMethod() {
      // ...
      myPrivateFunction()
    }
  }
}

function myPrivateFunction() {
  // ...
}

export default myGreatMixin
```

</div>
