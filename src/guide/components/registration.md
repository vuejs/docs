# Rejestracja komponentu

<VueSchoolLink href="https://vueschool.io/lessons/vue-3-global-vs-local-vue-components" title="Free Vue.js Component Registration Lesson"/>

> Ta strona zakłada, że przeczytałeś już [Podstawy komponentów](/guide/essentials/component-basics). Przeczytaj ją najpierw, jeśli nie korzystałeś jeszcze z komponentów.

Komponent Vue musi być "zarejestrowany", aby Vue wiedziało, gdzie zlokalizować jego implementację, gdy zostanie on napotkany w szablonie. Istnieją dwa sposoby rejestrowania komponentów: globalny i lokalny.

## Rejestracja globalna

Możemy udostępnić komponenty globalnie w bieżącej [Aplikacji Vue](/guide/essentials/application.html) za pomocą metody `app.component()`:

<!-- We can make components available globally in the current [Vue application](/guide/essentials/application.html) using the `app.component()` method: -->

```js
import { createApp } from 'vue'

const app = createApp({})

app.component(
  // nazwa komponentu
  'MyComponent',
  // implementacja
  {
    /* ... */
  }
)
```

Jeśli używasz SFC, będziesz rejestrować importowane pliki `.vue`:

```js
import MyComponent from './App.vue'

app.component('MyComponent', MyComponent)
```

Metodę `app.component()` można łączyć w łańcuch:

```js
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

Komponenty zarejestrowane globalnie mogą być używane w szablonie dowolnego komponentu w zasięgu tej aplikacji:

```vue-html
<!-- będzie to działać w każdym komponencie wewnątrz aplikacji -->
<ComponentA/>
<ComponentB/>
<ComponentC/>
```

Dotyczy to nawet wszystkich podkomponentów, co oznacza, że wszystkie te trzy komponenty będą również dostępne _wewnątrz siebie_.

## Rejestracja lokalna

Rejestracja globalna, choć wygodna, ma kilka wad:

1. Globalna rejestracja zapobiega usuwaniu przez systemy kompilacji nieużywanych komponentów (tzw. "tree-shaking"). Jeśli zarejestrujesz komponent globalnie, ale nie będziesz go używał w swojej aplikacji, to i tak zostanie on włączony do końcowego bundle'a.
<!-- 1. Global registration prevents build systems from removing unused components (a.k.a "tree-shaking"). If you globally register a component but end up not using it anywhere in your app, it will still be included in the final bundle. -->

1. Globalna rejestracja sprawia, że w dużych aplikacjach zależności są mniej wyraźne. Sprawia, że trudno jest zlokalizować implementację komponentu potomnego z poziomu komponentu nadrzędnego, który z niego korzysta. Może to mieć negatywny wpływ na długoterminowe utrzymanie aplikacji, podobnie jak używanie zbyt wielu zmiennych globalnych.

Rejestracja lokalna ogranicza dostępność zarejestrowanych komponentów tylko do bieżącego komponentu. Dzięki temu zależność jest bardziej wyraźna.

<div class="composition-api">

Jeżeli używasz `<script setup>` importowane komponenty mogą być używane lokalnie bez rejestracji:

```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

Jeżeli nie używasz `<script setup>`, będziesz musiał użyć opcji components:

```js
import ComponentA from './ComponentA.js'

export default {
  components: {
    ComponentA
  },
  setup() {
    // ...
  }
}
```

</div>
<div class="options-api">

Lokalnej rejestracji dokonuje się za pomocą opcji `components`:

```vue
<script>
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  }
}
</script>

<template>
  <ComponentA />
</template>
```

</div>

Dla każdej właściwości w obiekcie `components` kluczem będzie zarejestrowana nazwa komponentu, natomiast wartość będzie zawierała implementację komponentu. W powyższym przykładzie użyto skrótu właściwości ES2015 i jest on równoważny:

```js
export default {
  components: {
    ComponentA: ComponentA
  }
  // ...
}
```

Należy pamiętać, że **lokalnie zarejestrowane komponenty nie są dostępne w komponentach potomnych**. W tym przypadku `ComponentA` będzie dostępny tylko dla bieżącego komponentu, a nie dla żadnego z jego komponentów potomnych.

## Konwencja nazewnictwa komponentów

Przy rejestracji komponentów używamy notacji PascalCase. Dzieje się tak, ponieważ:

1. Notacja PascalCase jest zgodna z JavaScriptem. Ułatwia ona importowanie i rejestrowanie komponentów w JavaScript. Pomaga także IDE z autouzupełnianiem.

2. `<PascalCase />` sprawia, że bardziej oczywiste jest, że jest to komponent Vue, a nie natywny element HTML w szablonach. Odróżnia to również komponenty Vue od elementów niestandardowych (web components).

Jest to zalecany styl podczas pracy z szablonami SFC lub szablonami ciągów. Jednak zgodnie z opisem w [Ostrzeżenia dotyczące analizy szablonów DOM](/guide/essentials/component-basics.html#dom-template-parsing-caveats), tagów PascalCase nie można używać w szablonach DOM.

Na szczęście Vue obsługuje rozwiązywanie tagów kebab-case na komponenty zarejestrowane za pomocą PascalCase. Oznacza to, że do komponentu zarejestrowanego jako `MyComponent` można się odwoływać w szablonie zarówno poprzez `<MyComponent>` jak i `<my-component>`. Dzięki temu możemy używać tego samego kodu rejestracyjnego komponentu JavaScript niezależnie od źródła szablonu.
