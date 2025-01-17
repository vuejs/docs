# Dyrektywy niestandardowe {#custom-directives}

<script setup>
const vFocus = {
  mounted: el => {
    el.focus()
  }
}
</script>

## Wprowadzenie {#introduction}

Oprócz domyślnego zestawu dyrektyw dostarczanych w rdzeniu (takich jak `v-model` lub `v-show`), Vue pozwala również na rejestrowanie własnych dyrektyw niestandardowych.

Wprowadziliśmy dwie formy ponownego wykorzystania kodu w Vue: [komponenty](/guide/essentials/component-basics) i [funkcje kompozycyjne](./composables). Komponenty są głównymi blokami konstrukcyjnymi, podczas gdy funkcje kompozycyjne koncentrują się na ponownym wykorzystaniu logiki stanowej. Z drugiej strony dyrektywy niestandardowe są przeznaczone głównie do ponownego wykorzystania logiki, która obejmuje dostęp do DOM niskiego poziomu w zwykłych elementach.

Dyrektywa niestandardowa jest zdefiniowana jako obiekt zawierający haki cyklu życia podobne do haków komponentu. Haki otrzymują element, do którego dyrektywa jest powiązana. Oto przykład dyrektywy, która skupia dane wejściowe, gdy element jest wstawiany do DOM przez Vue:

<div class="composition-api">

```vue
<script setup>
// włącza v-focus w szablonach
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

</div>

<div class="options-api">

```js
const focus = {
  mounted: (el) => el.focus()
}

export default {
  directives: {
    // włącza v-focus w szablonach
    focus
  }
}
```

```vue-html
<input v-focus />
```

</div>

<div class="demo">
  <input v-focus placeholder="To powinno mieć stan focus" />
</div>

Zakładając, że nie kliknąłeś nigdzie indziej na stronie, powyższe dane wejściowe powinny być automatycznie wyostrzone. Ta dyrektywa jest bardziej użyteczna niż atrybut `autofocus`, ponieważ działa nie tylko podczas ładowania strony - działa również, gdy element jest dynamicznie wstawiany przez Vue.

<div class="composition-api">

W `<script setup>`, każda zmienna camelCase zaczynająca się od prefiksu `v` może być używana jako dyrektywa niestandardowa. W powyższym przykładzie `vFocus` może być używana w szablonie jako `v-focus`.

Jeśli nie używasz `<script setup>`, dyrektywy niestandardowe można zarejestrować za pomocą opcji `directives`:

```js
export default {
  setup() {
    /*...*/
  },
  directives: {
    // włącza v-focus w szablonach
    focus: {
      /* ... */
    }
  }
}
```

</div>

<div class="options-api">

Podobnie jak komponenty, dyrektywy niestandardowe muszą być zarejestrowane, aby można było ich używać w szablonach. W powyższym przykładzie używamy lokalnej rejestracji za pomocą opcji `directives`.

</div>

Powszechną praktyką jest również globalne rejestrowanie dyrektyw niestandardowych na poziomie aplikacji:

```js
const app = createApp({})

// zrób v-focus użytecznym we wszystkich komponentach
app.directive('focus', {
  /* ... */
})
```

:::tip
Niestandardowe dyrektywy powinny być używane tylko wtedy, gdy pożądaną funkcjonalność można osiągnąć tylko poprzez bezpośrednią manipulację DOM. Preferuj deklaratywne szablonowanie przy użyciu wbudowanych dyrektyw, takich jak `v-bind`, gdy jest to możliwe, ponieważ są one bardziej wydajne i przyjazne dla renderowania serwerowego.
:::

## Cykle życia dyrektyw {#directive-hooks}

Obiekt definicji dyrektywy może udostępniać kilka funkcji haczykowych (wszystkie opcjonalne):

```js
const myDirective = {
  // wywoływane przed atrybutami powiązanego elementu
  // lub zastosowaniem nasłuchiwaczy zdarzeń
  created(el, binding, vnode) {
    // zobacz poniżej szczegóły dotyczące argumentów
  },
  // wywoływana tuż przed wstawieniem elementu do DOM.
  beforeMount(el, binding, vnode) {},
  // wywoływane, gdy komponent nadrzędny powiązanego elementu
  // i wszystkie jego elementy podrzędne są zamontowane.
  mounted(el, binding, vnode) {},
  // wywoływane przed aktualizacją komponentu nadrzędnego
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // wywoływane po tym, jak komponent nadrzędny i
  // wszystkie jego komponenty podrzędne zostały zaktualizowane
  updated(el, binding, vnode, prevVnode) {},
  // wywoływane przed odmontowaniem komponentu nadrzędnego
  beforeUnmount(el, binding, vnode) {},
  // wywoływane, gdy komponent nadrzędny jest odmontowany
  unmounted(el, binding, vnode) {}
}
```

### Argumenty cyklów zycia dyrektyw {#hook-arguments}

Do hooków dyrektyw przekazywane są następujące argumenty:

- `el`: element, do którego dyrektywa jest przypisana. Może być używany do bezpośredniej manipulacji DOM.

- `binding`: obiekt zawierający następujące właściwości.

- `value`: wartość przekazana do dyrektywy. Na przykład w `v-my-directive="1 + 1"`, wartością byłoby `2`.
- `oldValue`: poprzednia wartość, dostępna tylko w `beforeUpdate` i `updated`. Jest dostępna niezależnie od tego, czy wartość została zmieniona.
- `arg`: argument przekazany do dyrektywy, jeśli taki istnieje. Na przykład w `v-my-directive:foo`, argumentem byłoby `"foo"`.
- `modifiers`: obiekt zawierający modyfikatory, jeśli takie istnieją. Na przykład w `v-my-directive.foo.bar`, obiektem modyfikatorów byłby `{ foo: true, bar: true }`.
- `instance`: Instancja komponentu, w którym użyto dyrektywy.
- `dir`: obiekt definicji dyrektywy.

- `vnode`: bazowy VNode reprezentujący powiązany element.
- `prevVnode`: VNode reprezentujący powiązany element z poprzedniego renderowania. Dostępne tylko w hakach `beforeUpdate` i `updated`.

Jako przykład rozważmy następujące użycie dyrektywy:

```vue-html
<div v-example:foo.bar="baz">
```

Argument `binding` będzie obiektem w kształcie:

```js
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* wartość `baz` */,
  oldValue: /* wartość `baz` z poprzedniej aktualizacji */
}
```

Podobnie jak wbudowane dyrektywy, argumenty dyrektyw niestandardowych mogą być dynamiczne. Na przykład:

```vue-html
<div v-example:[arg]="value"></div>
```

Tutaj argument dyrektywy zostanie reaktywnie zaktualizowany na podstawie właściwości `arg` w stanie naszego komponentu.

:::tip Note
Oprócz `el`, powinieneś traktować te argumenty jako tylko do odczytu i nigdy ich nie modyfikować. Jeśli musisz udostępniać informacje między hakami, zaleca się, aby zrobić to za pośrednictwem [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) elementu.
:::

## Skrócone funkcje {#function-shorthand}

Często zdarza się, że dyrektywa niestandardowa zachowuje się tak samo dla `mounted` i `updated`, bez potrzeby innych haków. W takich przypadkach możemy zdefiniować dyrektywę jako funkcję:

```vue-html
<div v-color="color"></div>
```

```js
app.directive('color', (el, binding) => {
  // to będzie wywoływane zarówno dla `mounted` jak i `updated`
  el.style.color = binding.value
})
```

## Obiekty literałowe {#object-literals}

Jeśli Twoja dyrektywa wymaga wielu wartości, możesz również przekazać obiekt JavaScript literal. Pamiętaj, że dyrektywy mogą przyjmować dowolne prawidłowe wyrażenie JavaScript.

```vue-html
<div v-demo="{ color: 'biały', text: 'Hej!' }"></div>
```

```js
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "biały"
  console.log(binding.value.text) // => "Hej!"
})
```

## Użycie na komponentach {#usage-on-components}

:::warning Not recommended
Nie zaleca się używania dyrektyw niestandardowych w komponentach. Nieoczekiwane zachowanie może wystąpić, gdy komponent ma wiele węzłów głównych.
:::


Gdy są używane w komponentach, dyrektywy niestandardowe zawsze będą miały zastosowanie do węzła głównego komponentu, podobnie jak [Fallthrough Attributes](/guide/components/attrs).

```vue-html
<MyComponent v-demo="test" />
```

```vue-html
<!-- template of MyComponent -->

<div> <!-- dyrektywa v-demo directive będzie tutaj dodana -->
  <span>My component content</span>
</div>
```

Należy pamiętać, że komponenty mogą potencjalnie mieć więcej niż jeden węzeł główny. Po zastosowaniu do komponentu wielordzeniowego dyrektywa zostanie zignorowana i zostanie wygenerowane ostrzeżenie. W przeciwieństwie do atrybutów, dyrektyw nie można przekazać do innego elementu za pomocą `v-bind="$attrs"`.
