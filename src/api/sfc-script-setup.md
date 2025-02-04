# \<script setup> {#script-setup}

`<script setup>` jest cukrem składniowym czasu kompilacji do używania Composition API wewnątrz komponentów jednoplikowych (SFC). Jest to zalecana składnia, jeśli używasz zarówno SFC, jak i Composition API. Zapewnia ona szereg korzyści w porównaniu z normalną składnią `<script>`:

- Bardziej zwięzły kod z mniejszą ilością szablonów
- Możliwość deklarowania rekwizytów i emitowanych zdarzeń przy użyciu czystego TypeScript
- Lepsza wydajność w czasie wykonywania (szablon jest kompilowany do funkcji renderowania w tym samym zakresie, bez pośredniego proxy)
- Lepsza wydajność wnioskowania o typie IDE (mniej pracy dla serwera językowego w celu wyodrębnienia typów z kodu)

## Podstawowa składnia {#basic-syntax}

Aby włączyć tę składnię, należy dodać atrybut `setup` do bloku `<script>`:

```vue
<script setup>
console.log('hello script setup')
</script>
```

Kod wewnątrz jest kompilowany jako zawartość funkcji `setup()` komponentu. Oznacza to, że w przeciwieństwie do zwykłego `<script>`, który wykonuje się tylko raz, gdy komponent jest importowany po raz pierwszy, kod wewnątrz `<script setup>` będzie **wykonywany za każdym razem, gdy tworzona jest instancja komponentu**.

### Wiązania najwyższego poziomu są dostępne dla szablonu {#top-level-bindings-are-exposed-to-template}

Podczas korzystania z `<script setup>`, wszelkie wiązania najwyższego poziomu (w tym zmienne, deklaracje funkcji i importy) zadeklarowane wewnątrz `<script setup>` są bezpośrednio używane w szablonie:

```vue
<script setup>
// zmienna
const msg = 'Hello!'

// funkcja
function log() {
  console.log(msg)
}
</script>

<template>
  <button @click="log">{{ msg }}</button>
</template>
```

Importy są eksponowane w ten sam sposób. Oznacza to, że można bezpośrednio użyć zaimportowanej funkcji pomocniczej w wyrażeniach szablonu bez konieczności eksponowania jej za pomocą opcji `methods`:

```vue
<script setup>
import { capitalize } from './helpers'
</script>

<template>
  <div>{{ capitalize('hello') }}</div>
</template>
```

## Reaktywnosć {#reactivity}

Stan reaktywny musi być jawnie utworzony przy użyciu [Reactivity APIs](./reactivity-core). Podobnie do wartości zwracanych z funkcji `setup()`, referencje są automatycznie rozpakowywane, gdy są przywoływane w szablonach:

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

## Korzystanie z komponentów {#using-components}

Wartości w zakresie `<script setup>` mogą być również używane bezpośrednio jako nazwy tagów komponentów niestandardowych:

```vue
<script setup>
import MyComponent from './MyComponent.vue'
</script>

<template>
  <MyComponent />
</template>
```

Pomyśl o `MyComponent` jako o zmiennej, do której można się odwoływać. Jeśli używałeś JSX, model mentalny jest tutaj podobny. Odpowiednik kebab-case `<my-component>` również działa w szablonie - jednak znaczniki komponentów PascalCase są zdecydowanie zalecane dla zachowania spójności. Pomaga to również w odróżnieniu od natywnych elementów niestandardowych.

### Dynamiczne komponenty {#dynamic-components}

Ponieważ komponenty są przywoływane jako zmienne, a nie rejestrowane pod kluczami łańcuchowymi, powinniśmy używać dynamicznego wiązania `:is`, gdy używamy dynamicznych komponentów wewnątrz `<script setup>`:

```vue
<script setup>
import Foo from './Foo.vue'
import Bar from './Bar.vue'
</script>

<template>
  <component :is="Foo" />
  <component :is="someCondition ? Foo : Bar" />
</template>
```

Zwróć uwagę, w jaki sposób składniki mogą być używane jako zmienne w wyrażeniu trójskładnikowym.

### Komponenty rekurencyjne {#recursive-components}

SFC może niejawnie odnosić się do siebie poprzez nazwę pliku. Np. plik o nazwie `FooBar.vue` może odnosić się do siebie jako `<FooBar/>` w swoim szablonie.

Zauważ, że ma to niższy priorytet niż importowane komponenty. Jeśli masz nazwany import, który koliduje z wywnioskowaną nazwą komponentu, możesz nadać mu alias:

```js
import { FooBar as FooBarChild } from './components'
```

### Komponenty o nazwach własnych {#namespaced-components}

Można używać znaczników komponentów z kropkami, takimi jak `<Foo.Bar>`, aby odnosić się do komponentów zagnieżdżonych pod właściwościami obiektu. Jest to przydatne podczas importowania wielu komponentów z jednego pliku:

```vue
<script setup>
import * as Form from './form-components'
</script>

<template>
  <Form.Input>
    <Form.Label>label</Form.Label>
  </Form.Input>
</template>
```

## Używanie dyrektyw niestandardowych {#using-custom-directives}

Globalnie zarejestrowane dyrektywy niestandardowe działają normalnie. Lokalne dyrektywy niestandardowe nie muszą być jawnie rejestrowane za pomocą `<script setup>`, ale muszą być zgodne ze schematem nazewnictwa `vNameOfDirective`:

```vue
<script setup>
const vMyDirective = {
  beforeMount: (el) => {
    // zrób coś z elementem
  }
}
</script>
<template>
  <h1 v-my-directive>To jest nagłówek</h1>
</template>
```

Jeśli importujesz dyrektywę z innego miejsca, możesz zmienić jej nazwę, aby pasowała do wymaganego schematu nazewnictwa:

```vue
<script setup>
import { myDirective as vMyDirective } from './MyDirective.js'
</script>
```

## defineProps() & defineEmits() {#defineprops-defineemits}

Aby zadeklarować opcje takie jak `props` i `emits` z pełną obsługą wnioskowania o typie, możemy użyć API `defineProps` i `defineEmits`, które są automatycznie dostępne wewnątrz `<script setup>`:

```vue
<script setup>
const props = defineProps({
  foo: String
})

const emit = defineEmits(['change', 'delete'])
// setup code
</script>
```

- `defineProps` i `defineEmits` są **makrami kompilatora** używanymi tylko wewnątrz `<script setup>`. Nie muszą być importowane i są kompilowane podczas przetwarzania `<script setup>`.

- `defineProps` przyjmuje taką samą wartość jak opcja `props`, podczas gdy `defineEmits` przyjmuje taką samą wartość jak opcja `emits`.

- `defineProps` i `defineEmits` zapewniają właściwe wnioskowanie o typie na podstawie przekazanych opcji.

- Opcje przekazane do `defineProps` i `defineEmits` zostaną przeniesione poza setup do zakresu modułu. Dlatego też opcje nie mogą odwoływać się do zmiennych lokalnych zadeklarowanych w zakresie setup. Spowoduje to błąd kompilacji. Jednak _mogą_ odwoływać się do zaimportowanych wiązań, ponieważ znajdują się one również w zakresie modułu.


### Type-only props/emit declarations<sup class="vt-badge ts" /> {#type-only-props-emit-declarations}

Propsy i emity mogą być również zadeklarowane przy użyciu składni czystego typu poprzez przekazanie dosłownego argumentu typu do `defineProps` lub `defineEmits`:

```ts
const props = defineProps<{
  foo: string
  bar?: number
}>()

const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// 3.3+: alternative, more succinct syntax
const emit = defineEmits<{
  change: [id: number] // named tuple syntax
  update: [value: string]
}>()
```

- `defineProps` lub `defineEmits` mogą używać tylko deklaracji runtime LUB deklaracji typu. Użycie obu jednocześnie spowoduje błąd kompilacji.

- Podczas korzystania z deklaracji typu, równoważna deklaracja runtime jest automatycznie generowana z analizy statycznej, aby wyeliminować potrzebę podwójnej deklaracji i nadal zapewnić prawidłowe zachowanie w czasie wykonywania.

  - W trybie deweloperskim kompilator spróbuje wywnioskować odpowiednią walidację środowiska uruchomieniowego z typów. Na przykład tutaj `foo: String` jest wywnioskowane z typu `foo: string`. Jeśli typ jest odniesieniem do importowanego typu, wynikiem będzie `foo: null` (równy typowi `any`), ponieważ kompilator nie posiada informacji o plikach zewnętrznych.

  - W trybie prod kompilator wygeneruje deklarację formatu tablicy, aby zmniejszyć rozmiar wiązki (rekwizyty tutaj zostaną skompilowane do `['foo', 'bar']`).

- W wersji 3.2 i niższych, parametr typu generycznego dla `defineProps()` był ograniczony do literału typu lub odniesienia do lokalnego interfejsu.

  Ograniczenie to zostało rozwiązane w wersji 3.3. Najnowsza wersja Vue obsługuje odwoływanie się do importowanych i ograniczonego zestawu złożonych typów w pozycji parametru typu. Ponieważ jednak konwersja typu do środowiska uruchomieniowego jest nadal oparta na AST, niektóre typy złożone, które wymagają rzeczywistej analizy typu, np. typy warunkowe, nie są obsługiwane. Można używać typów warunkowych dla typu pojedynczego rekwizytu, ale nie dla całego obiektu rekwizytu.

### Domyślne wartości propsów podczas korzystania z deklaracji typu {#default-props-values-when-using-type-declaration}

Jedną z wad deklaracji `defineProps` typu tylko-type jest to, że nie ma sposobu na podanie wartości domyślnych dla właściwości. Aby rozwiązać ten problem, dostarczono również makro kompilatora `withDefaults`:

```ts
export interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

To zostanie skompilowane do równoważnych opcji `default` właściwości środowiska wykonawczego. Ponadto pomocnik `withDefaults` zapewnia sprawdzanie typu dla wartości domyślnych i zapewnia, że ​​zwrócony typ `props` ma usunięte opcjonalne flagi dla właściwości, które mają zadeklarowane wartości domyślne.

## defineModel() <sup class="vt-badge" data-text="3.4+" /> {#definemodel}

Ta makroinstrukcja może być używana do deklarowania dwukierunkowego wiązania właściwości, które mogą być pobierane przez `v-model` z komponentu nadrzędnego. Przykład użycia jest również omawiany w przewodniku [Komponent `v-model`](/guide/components/v-model).

Pod maską ta makroinstrukcja deklaruje właściwość modelu i odpowiadające jej zdarzenie aktualizacji wartości. Jeśli pierwszy argument jest ciągiem literowym, zostanie on użyty jako nazwa właściwości; w przeciwnym razie nazwa właściwości będzie domyślnie `"modelValue"`. W obu przypadkach możesz również przekazać dodatkowy obiekt, który może zawierać opcje właściwości i opcje transformacji wartości odniesienia modelu.

```js
// deklaruje właściwość „modelValue”, zużywaną przez rodzica za pośrednictwem v-model
const model = defineModel()
// LUB: deklaruje właściwość „modelValue” z opcjami
const model = defineModel({ type: String })

// emituje „update:modelValue” po mutacji
model.value = 'hello'

// deklaruje właściwość „count”, zużywaną przez rodzica za pośrednictwem v-model:count
const count = defineModel('count')
// LUB: deklaruje właściwość „count” z opcjami
const count = defineModel('count', { type: Number, default: 0 })

function inc() {
  // emituje „update:count” po mutacji
  count.value++
}
```

:::warning
Jeśli masz wartość `default` dla prop `defineModel` i nie podasz żadnej wartości dla tej prop z komponentu nadrzędnego, może to spowodować desynchronizację między komponentami nadrzędnymi i podrzędnymi. W poniższym przykładzie `myRef` rodzica jest niezdefiniowane, ale `model` dziecka jest 1:

```js
// child component:
const model = defineModel({ default: 1 })

// parent component:
const myRef = ref()
```

```html
<Child v-model="myRef"></Child>
```

:::

### Modyfikatory i transformatory {#modyfikatory-i-transformatory}

Aby uzyskać dostęp do modyfikatorów używanych w dyrektywie `v-model`, możemy rozłożyć wartość zwracaną przez `defineModel()` w następujący sposób:

```js
const [modelValue, modelModifiers] = defineModel()

// odpowiada v-model.trim
if (modelModifiers.trim) {
  // ...
}
```

Gdy modyfikator jest obecny, prawdopodobnie musimy przekształcić wartość podczas odczytu lub synchronizacji z powrotem do rodzica. Możemy to osiągnąć, używając opcji transformatora `get` i `set`:

```js
const [modelValue, modelModifiers] = defineModel({
  // get() pominięto, ponieważ nie jest tu potrzebne
  set(value) {
    // jeśli użyto modyfikatora .trim, zwróć przyciętą wartość
    if (modelModifiers.trim) {
      return value.trim()
    }
    // w przeciwnym razie zwróć wartość taką, jaka jest
    return value
  }
})
```

### Użycie z TypeScript <sup class="vt-badge ts" /> {#usage-with-typescript}

Podobnie jak `defineProps` i `defineEmits`, `defineModel` może także otrzymywać argumenty typu w celu określenia typów wartości modelu i modyfikatorów:

```ts
const modelValue = defineModel<string>()
//    ^? Ref<string | undefined>

// domyślny model z opcjami, required usuwa możliwe niezdefiniowane wartości
const modelValue = defineModel<string>({ required: true })
//    ^? Ref<string>

const [modelValue, modifiers] = defineModel<string, 'trim' | 'uppercase'>()
//                 ^? Record<'trim' | 'uppercase', true | undefined>
```

## defineExpose() {#defineexpose}

Komponenty używające `<script setup>` są **domyślnie zamknięte** - tj. publiczna instancja komponentu, która jest pobierana za pomocą odwołań do szablonów lub łańcuchów `$parent`, **nie** ujawni żadnych powiązań zadeklarowanych wewnątrz `<script setup>`.

Aby jawnie ujawnić właściwości w komponencie `<script setup>`, użyj makra kompilatora `defineExpose`:

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
```

Gdy rodzic otrzyma wystąpienie tego komponentu za pośrednictwem odwołań do szablonu, pobrane wystąpienie będzie miało kształt `{ a: liczba, b: liczba }` (odwołania są automatycznie rozpakowywane, tak jak w przypadku normalnych wystąpień).

## defineOptions() <sup class="vt-badge" data-text="3.3+" /> {#defineoptions}

Tego makro można użyć do zadeklarowania opcji komponentu bezpośrednio w `<script setup>` bez konieczności używania oddzielnego bloku `<script>`:

```vue
<script setup>
defineOptions({
  inheritAttrs: false,
  customOptions: {
    /* ... */
  }
})
</script>
```

- Obsługiwane tylko w wersji 3.3+.
- To jest makro. Opcje zostaną przeniesione do zakresu modułu i nie będą miały dostępu do zmiennych lokalnych w `<script setup>`, które nie są stałymi literalnymi.

## defineSlots()<sup class="vt-badge ts"/> {#defineslots}

Ta makroinstrukcja może być używana do dostarczania wskazówek dotyczących typów do IDE w celu sprawdzenia nazw slotów i typów właściwości.

`defineSlots()` akceptuje tylko parametr typu i nie akceptuje argumentów czasu wykonania. Parametr typu powinien być literałem typu, gdzie kluczem właściwości jest nazwa slotu, a typem wartości jest funkcja slotu. Pierwszym argumentem funkcji są właściwości, których slot oczekuje otrzymać, a jej typ zostanie użyty dla właściwości slotu w szablonie. Typ zwracany jest obecnie ignorowany i może być `dowolny`, ale możemy wykorzystać go do sprawdzenia zawartości slotu w przyszłości.

Zwraca również obiekt `slots`, który jest równoważny obiektowi `slots` udostępnianemu w kontekście konfiguracji lub zwracanemu przez `useSlots()`.

```vue
<script setup lang="ts">
const slots = defineSlots<{
  default(props: { msg: string }): any
}>()
</script>
```

- Obsługiwane tylko w wersji 3.3+.

## `useSlots()` & `useAttrs()` {#useslots-useattrs}

Użycie `slots` i `attrs` wewnątrz `<script setup>` powinno być stosunkowo rzadkie, ponieważ możesz uzyskać do nich bezpośredni dostęp jako `$slots` i `$attrs` w szablonie. W rzadkich przypadkach, gdy ich potrzebujesz, użyj odpowiednio pomocników `useSlots` i `useAttrs`:

```vue
<script setup>
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()
</script>
```

`useSlots` i `useAttrs` to rzeczywiste funkcje środowiska wykonawczego, które zwracają odpowiednik `setupContext.slots` i `setupContext.attrs`. Mogą być również używane w normalnych funkcjach API kompozycji.

## Użycie obok normalnego `<script>` {#usage-alongside-normal-script}

`<script setup>` może być używany obok normalnego `<script>`. Normalny `<script>` może być potrzebny w przypadkach, gdy musimy:

- Zadeklarować opcje, których nie można wyrazić w `<script setup>`, na przykład `inheritAttrs` lub opcje niestandardowe włączone za pomocą wtyczek (Można je zastąpić przez [`defineOptions`](/api/sfc-script-setup#defineoptions) w wersji 3.3+).
- Zadeklarować nazwane eksporty.
- Uruchomić efekty uboczne lub utworzyć obiekty, które powinny zostać wykonane tylko raz.

```vue
<script>
// normalny <script>, wykonywany w zakresie modułu (tylko raz)
runSideEffectOnce()

// deklaracja dodatkowych opcji
export default {
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script setup>
// wykonywane w zakresie setup() (dla każdej instancji)
</script>
```

Obsługa łączenia `<script setup>` i `<script>` w tym samym komponencie jest ograniczona do scenariuszy opisanych powyżej. W szczególności:

- **NIE** używaj oddzielnej sekcji `<script>` dla opcji, które można już zdefiniować za pomocą `<script setup>`, takich jak `props` i `emits`.
- Zmienne utworzone wewnątrz `<script setup>` nie są dodawane jako właściwości do instancji komponentu, co czyni je niedostępnymi z poziomu interfejsu API opcji. Mieszanie interfejsów API w ten sposób jest zdecydowanie odradzane.

Jeśli znajdziesz się w jednym ze scenariuszy, który nie jest obsługiwany, powinieneś rozważyć przejście na jawną funkcję [`setup()`](/api/composition-api-setup), zamiast używać `<script setup>`.

## Top-level `await` {#top-level-await}

Top-level `await` można używać wewnątrz `<script setup>`. Wynikowy kod zostanie skompilowany jako `async setup()`:

```vue
<script setup>
const post = await fetch(`/api/post/1`).then((r) => r.json())
</script>
```

Ponadto oczekiwane wyrażenie zostanie automatycznie skompilowane w formacie, który zachowuje bieżący kontekst wystąpienia komponentu po `await`.

:::warning Note
`async setup()` musi być używany w połączeniu z [`Suspense`](/guide/built-ins/suspense.html), która jest obecnie wciąż funkcją eksperymentalną. Planujemy ją sfinalizować i udokumentować w przyszłej wersji - ale jeśli jesteś teraz ciekawy, możesz zapoznać się z jej [testami](https://github.com/vuejs/core/blob/main/packages/runtime-core/__tests__/components/Suspense.spec.ts), aby zobaczyć, jak działa.
:::

## Generics <sup class="vt-badge ts" /> {#generics}

Parametry typu generycznego można deklarować za pomocą atrybutu `generic` w znaczniku `<script>`:

```vue
<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
  selected: T
}>()
</script>
```

Wartość `generic` działa dokładnie tak samo, jak lista parametrów pomiędzy `<...>` w TypeScript. Na przykład możesz użyć wielu parametrów, ograniczeń `extends`, typów domyślnych i odwołać się do importowanych typów:

```vue
<script
  setup
  lang="ts"
  generic="T extends string | number, U extends Item"
>
import type { Item } from './types'
defineProps<{
  id: T
  list: U[]
}>()
</script>
```

## Ograniczenia {#restrictions}

- Ze względu na różnicę w semantyce wykonywania modułów, kod wewnątrz `<script setup>` opiera się na kontekście SFC. Po przeniesieniu do zewnętrznych plików `.js` lub `.ts` może to prowadzić do zamieszania zarówno dla programistów, jak i narzędzi. Dlatego **`<script setup>`** nie można używać z atrybutem `src`.
- `<script setup>` nie obsługuje In-DOM Root Component Template.([Powiązana dyskusja](https://github.com/vuejs/core/issues/8391))
