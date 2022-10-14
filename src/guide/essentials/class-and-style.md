# Przypisywanie klas i stylów

Częstą potrzebą wiązania danych jest manipulowanie listą klas elementu i jego stylami inline. Ponieważ oba te elementy są atrybutami, możemy użyć `v-bind` do ich obsługi: musimy tylko obliczyć końcowy ciąg znaków za pomocą naszych wyrażeń. Jednakże, mieszanie się z konkatenacją ciągów znaków jest irytujące i podatne na błędy. Z tego powodu, Vue zapewnia specjalne ulepszenia, gdy `v-bind` jest używane z `class` i `style`. Oprócz ciągów znaków, wyrażenia mogą być również przetwarzane na obiekty lub tablice.

## Wiązanie klas HTML

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/dynamic-css-classes-with-vue-3" title="Free Vue.js Dynamic CSS Classes Lesson"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-dynamic-css-classes-with-vue" title="Free Vue.js Dynamic CSS Classes Lesson"/>
</div>

### Wiązanie z obiektami

Możemy przekazać obiekt do `:class` (skrót od `v-bind:class`), aby dynamicznie przełączać klasy:

```vue-html
<div :class="{ active: isActive }"></div>
```

Powyższa składnia oznacza, że obecność klasy `active` będzie określana przez [prawdziwość](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) właściwości danych `isActive`.

Możesz mieć wiele klas przełączanych przez posiadanie większej ilości pól w obiekcie. Dodatkowo, dyrektywa `:class` może również współistnieć ze zwykłym atrybutem `class`. Tak więc biorąc pod uwagę następujący stan:

<div class="composition-api">

```js
const isActive = ref(true)
const hasError = ref(false)
```

</div>

<div class="options-api">

```js
data() {
  return {
    isActive: true,
    hasError: false
  }
}
```

</div>

I poniższy szablon:

```vue-html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

Będzie renderować:

```vue-html
<div class="static active"></div>
```

Gdy `isActive` lub `hasError` ulegnie zmianie, lista klas zostanie odpowiednio zaktualizowana. Na przykład, jeśli `hasError` stanie się `true`, lista klas stanie się `"static active text-danger"`.

Obiekt związany nie musi być inline:

<div class="composition-api">

```js
const classObject = reactive({
  active: true,
  'text-danger': false
})
```

</div>

<div class="options-api">

```js
data() {
  return {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
}
```

</div>

```vue-html
<div :class="classObject"></div>
```

Spowoduje to wyświetlenie tego samego wyniku. Możemy również powiązać się z [właściwością obliczeniową](./computed), która zwraca obiekt. Jest to często stosowany i potężny wzorzec:

<div class="composition-api">

```js
const isActive = ref(true)
const error = ref(null)

const classObject = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal'
}))
```

</div>

<div class="options-api">

```js
data() {
  return {
    isActive: true,
    error: null
  }
},
computed: {
  classObject() {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

</div>

```vue-html
<div :class="classObject"></div>
```

### Wiązanie z tablicami

Możemy powiązać `:class` z tablicą, aby zastosować listę klas:

<div class="composition-api">

```js
const activeClass = ref('active')
const errorClass = ref('text-danger')
```

</div>

<div class="options-api">

```js
data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}
```

</div>

```vue-html
<div :class="[activeClass, errorClass]"></div>
```

Co wyrenderuje:

```vue-html
<div class="active text-danger"></div>
```

Jeśli chcesz również warunkowo przełączać klasy na liście, możesz to zrobić za pomocą wyrażenia warunkowego:

```vue-html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

To zawsze zastosuje `errorClass`, ale `activeClass` będzie zastosowane tylko wtedy, gdy `isActive` jest prawdziwe.

Jednak może to być trochę skomplikowane, jeśli masz wiele klas warunkowych. Dlatego możliwe jest również użycie składni obiektowej wewnątrz składni tablicowej:

```vue-html
<div :class="[{ active: isActive }, errorClass]"></div>
```

### Z komponentami

> Ta sekcja zakłada znajomość [Komponentów](/guide/essentials/component-basics). Możesz ją pominąć i wrócić do niej później.

Kiedy używasz atrybutu `class` na komponencie z pojedynczym elementem głównym, klasy te zostaną dodane do elementu głównego komponentu i połączone z wszystkimi istniejącymi już klasami.

Na przykład, jeśli mamy komponent o nazwie `MyComponent` z następującym szablonem:

```vue-html
<!-- szablon komponentu dziecka -->
<p class="foo bar">Hi!</p>
```

Następnie dodaj kilka klas podczas korzystania z niego:

```vue-html
<!-- when using the component -->
<MyComponent class="baz boo" />
```

Wyrenderowany kod HTML będzie miał postać:

```vue-html
<p class="foo bar baz boo">Hi</p>
```

To samo dotyczy wiązań klas:

```vue-html
<MyComponent :class="{ active: isActive }" />
```

Gdy `isActive` jest prawdziwe, renderowany HTML będzie taki:

```vue-html
<p class="foo bar active">Hi</p>
```

Jeśli komponent ma wiele elementów głównych, należy określić, który z nich otrzyma tę klasę. Można to zrobić za pomocą właściwości komponentu `$attrs`:

```vue-html
<!-- szablon MyComponent używający $attrs -->
<p :class="$attrs.class">Hi!</p>
<span>To jest komponent dziecka</span>
```

```vue-html
<MyComponent class="baz" />
```

Will render:

```html
<p class="baz">Hi!</p>
<span>To jest komponent dziecka</span>
```

Więcej informacji na temat dziedziczenia atrybutów komponentów można znaleźć w sekcji [Atrybuty komponentów](/guide/components/attrs.html).

## Wiązanie stylów inline

### Wiązanie z obiektami

`:style` wspiera wiązanie z wartościami obiektów JavaScript - odpowiada właściwości [HTML element `style`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style):

<div class="composition-api">

```js
const activeColor = ref('red')
const fontSize = ref(30)
```

</div>

<div class="options-api">

```js
data() {
  return {
    activeColor: 'red',
    fontSize: 30
  }
}
```

</div>

```vue-html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

Mimo jest zalecana składnia camelCase, `:style` obsługuje również składnię właściwości CSS kebab-cased (odpowiada to temu, jak są one używane w rzeczywistym CSS) - na przykład:

```vue-html
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

Często dobrym pomysłem jest bezpośrednie powiązanie z obiektem stylu, dzięki czemu szablon jest bardziej przejrzysty:

<div class="composition-api">

```js
const styleObject = reactive({
  color: 'red',
  fontSize: '13px'
})
```

</div>

<div class="options-api">

```js
data() {
  return {
    styleObject: {
      color: 'red',
      fontSize: '13px'
    }
  }
}
```

</div>

```vue-html
<div :style="styleObject"></div>
```

Ponownie, wiązanie w stylu obiektowym jest często używane w połączeniu z właściwościami obliczanymi (computed properties), które zwracają obiekty.

### Wiązanie z tablicami

Możemy powiązać `:style` z tablicą wielu obiektów stylów. Obiekty te zostaną połączone i zastosowane do tego samego elementu:

```vue-html
<div :style="[baseStyles, overridingStyles]"></div>
```

### Autoprefiksowanie

Gdy używasz właściwości CSS, która wymaga przedrostka [vendor prefix](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) w `:style`, Vue automatycznie doda odpowiedni przedrostek. Vue robi to poprzez sprawdzenie w czasie uruchamiania, które właściwości stylu są obsługiwane w bieżącej przeglądarce. Jeśli przeglądarka nie obsługuje danej właściwości, wówczas testowane są różne warianty prefiksów, aby znaleźć taki, który jest obsługiwany.

### Wielokrotne wartości

Do właściwości stylu można podać tablicę wielu (poprzedzonych prefiksem) wartości, na przykład:

```vue-html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

Spowoduje to wyrenderowanie tylko ostatniej wartości w tablicy, którą obsługuje przeglądarka. W tym przykładzie zostanie wyświetlone `display: flex` dla przeglądarek, które obsługują niefiksowaną wersję flexbox.
