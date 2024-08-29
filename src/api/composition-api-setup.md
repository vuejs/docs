# Composition API: setup() {#composition-api-setup}

## Użycie podstawowe {#basic-usage}

Funkcja `setup()` służy jako główny punkt wejścia do korzystania z Composition API w komponentach w następujących przypadkach:

1. Używanie Composition API bez kroku budowania;
2. Integracja kodu opartego na Composition API w komponencie korzystającym z Options API.

:::info Note
Uwaga Jeśli używasz Composition API z komponentami jednoplikowymi (Single-File Components), zdecydowanie zaleca się stosowanie składni [`<script setup>`](/api/sfc-script-setup) dla bardziej zwięzłej i ergonomicznej składni.
:::

Możemy zadeklarować reaktywny stan, używając [Reactivity APIs](./reactivity-core) i udostępnić go w szablonie, zwracając obiekt z funkcji setup(). Właściwości na zwróconym obiekcie będą również dostępne na instancji komponentu (jeśli używane są inne opcje):

```vue
<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    // udostępnianie funkcji API szablonów i innych opcji
    return {
      count
    }
  },

  mounted() {
    console.log(this.count) // 0
  }
}
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

[refs](/api/reactivity-core#ref) zwracane z setup są [automatycznie płytko rozpakowywane](/guide/essentials/reactivity-fundamentals#deep-reactivity) podczas dostępu do nich w szablonie, więc nie musisz używać `.value`, aby się do nich odwołać. Są one również rozpakowywane w ten sam sposób podczas dostępu przez `this`.

`setup()` sam w sobie nie ma dostępu do instancji komponentu - `this` będzie miało wartość `undefined` wewnątrz `setup()`. Możesz uzyskać dostęp do wartości udostępnionych przez Composition API z poziomu Options API, ale nie odwrotnie.

`setup()` powinien zwracać obiekt _synchronicznie_. Jedynym przypadkiem, kiedy można użyć `async setup()`, jest sytuacja, gdy komponent jest potomkiem komponentu [Suspense](../guide/built-ins/suspense).

## Dostęp do propsów {#accessing-props}

Pierwszym argumentem w funkcji `setup` jest argument `props`. Tak jak można oczekiwać w standardowym komponencie, `props` wewnątrz funkcji `setup` są reaktywne i będą aktualizowane po przekazaniu nowych rekwizytów.

```js
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

Zauważ, że jeśli zdestrukturyzujesz obiekt `props`, zdestrukturyzowane zmienne stracą reaktywność. Dlatego zaleca się, aby zawsze uzyskiwać dostęp do rekwizytów w postaci `props.xxx`.

Jeśli naprawdę potrzebujesz zdestrukturyzować rekwizyty lub chcesz przekazać rekwizyt do zewnętrznej funkcji, zachowując reaktywność, możesz to zrobić za pomocą API [toRefs()](./reactivity-utilities#torefs) i [toRef()](/api/reactivity-utilities#toref):

```js
import { toRefs, toRef } from 'vue'

export default {
  setup(props) {
    // przekształć `props` w obiekt refs, a następnie zdestrukturyzuj
    const { title } = toRefs(props)
    // `title` jest referencją, która śledzi `props.title`
    console.log(title.value)

    // LUB, przekształć pojedynczą właściwość w `props` na ref
    const title = toRef(props, 'title')
  }
}
```

## Setup Context {#setup-context}

Drugim argumentem przekazywanym do funkcji `setup` jest obiekt **Setup Context**. Obiekt kontekstu udostępnia inne wartości, które mogą być użyteczne wewnątrz `setup`:

```js
export default {
  setup(props, context) {
    // Atrybuty (Niereaktywne obiekty, odpowiednik do $attrs)
    console.log(context.attrs)

    // Sloty (Niereaktywne obiekty, odpowiednik do $slots)
    console.log(context.slots)

    // Emit (Funkcja, odpowiednik do $emit)
    console.log(context.emit)

    // Ujawnia właściwości publiczne  (Funckja)
    console.log(context.expose)
  }
}
```

Obiekt kontekstowy nie jest reaktywny i może być bezpiecznie zdestrukturyzowany:

```js
export default {
  setup(props, { attrs, slots, emit, expose }) {
    ...
  }
}
```

`attrs` i `slots` to obiekty posiadające stan, które są zawsze aktualizowane, gdy aktualizowany jest sam komponent. Oznacza to, że należy unikać ich destrukturyzacji i zawsze odwoływać się do właściwości jako `attrs.x` lub `slots.x`. Należy również pamiętać, że w przeciwieństwie do `props`, właściwości `attrs` i `slots` nie są **reaktywne**. Jeśli zamierzasz zastosować side effects oparte na zmianach w `attrs` lub `slots`, powinieneś zrobić to wewnątrz funkcji cyklu życia `onBeforeUpdate`.

### Ujawnianie właściwości publicznych {#exposing-public-properties}

`expose` to funkcja, której można użyć do wyraźnego ograniczenia właściwości ujawnianych, gdy instancja komponentu jest dostępna przez komponent nadrzędny za pośrednictwem [template refs] (/guide/essentials/template-refs#ref-on-component):

```js{5,10}
export default {
  setup(props, { expose }) {
    // instancja komponentu jest „zamknięta”
    // tj. nie ujawniaj niczego rodzicowi
    expose()

    const publicCount = ref(0)
    const privateCount = ref(0)
    // selektywnie ujawnia stan lokalny
    expose({ count: publicCount })
  }
}
```

## Użycie z funkcjami renderowania {#usage-with-render-functions}

`setup` może również zwracać [render function](/guide/extras/render-function), która może bezpośrednio korzystać ze stanu reaktywnego zadeklarowanego w tym samym zakresie:

```js{6}
import { h, ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return () => h('div', count.value)
  }
}
```

Zwrócenie funkcji renderującej uniemożliwia nam zwrócenie czegokolwiek innego. Wewnętrznie nie powinno to stanowić problemu, ale może być problematyczne, jeśli chcemy udostępnić metody tego komponentu komponentowi nadrzędnemu za pośrednictwem odwołań do szablonu.

We can solve this problem by calling [`expose()`](#exposing-public-properties):

```js{8-10}
import { h, ref } from 'vue'

export default {
  setup(props, { expose }) {
    const count = ref(0)
    const increment = () => ++count.value

    expose({
      increment
    })

    return () => h('div', count.value)
  }
}
```

Metoda `increment` byłaby wtedy dostępna w komponencie nadrzędnym poprzez szablon ref.
