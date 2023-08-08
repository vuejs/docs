# Binding per le Classi e Stili CSS {#class-and-style-bindings}

Un'esigenza comune nel binding dei dati è la modifica dell'elenco delle classi di un elemento e degli stili inline. Poiché `class` e `style` sono entrambi attributi, possiamo usare `v-bind` per assegnare dinamicamente un valore stringa, proprio come con gli altri attributi. Tuttavia, cercare di generare quei valori utilizzando la concatenazione di stringhe può essere fastidioso e incline agli errori. Per questo motivo Vue fornisce particolari miglioramenti quando `v-bind` viene utilizzato con `class` e `style`. Oltre alle stringhe, le espressioni possono anche valutare oggetti o array.

## Binding delle Classi HTML {#binding-html-classes}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/dynamic-css-classes-with-vue-3" title="Lezione Gratuita su Classi CSS Dinamiche con Vue.js"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-dynamic-css-classes-with-vue" title="Lezione Gratuita su Classi CSS Dinamiche con Vue.js"/>
</div>

### Binding di Oggetti {#binding-to-objects}

Possiamo passare un oggetto a `:class` (abbreviazione per `v-bind:class`) per attivare dinamicamente le classi:

```vue-html
<div :class="{ active: isActive }"></div>
```

La sintassi sopra significa che la presenza della classe `active` sarà determinata dalla [truthiness](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) (veridicità) della proprietà dati `isActive`.

Puoi avere varie classi attivate usando più campi nell'oggetto. Inoltre, la direttiva `:class` può coesistere anche con l'attributo `class` semplice. Quindi, dato il seguente stato:

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

E il seguente template:

```vue-html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

Verrà renderizzato:

```vue-html
<div class="static active"></div>
```

Quando `isActive` o `hasError` cambiano, l'elenco delle classi verrà aggiornato di conseguenza. Ad esempio, se `hasError` diventa `true`, l'elenco delle classi diventerà `"static active text-danger"`.

L'oggetto associato non deve essere inline:

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

Questo sarà renderizzato allo stesso modo. Possiamo anche associare a una [computed property](./computed) che restituisce un oggetto. Questo è un pattern molto comune e potente:

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

### Binding di Array {#binding-to-arrays}

Possiamo associare `:class` a un array per applicare un elenco di classi:

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

Che verrà renderizzato:

```vue-html
<div class="active text-danger"></div>
```

Se vuoi attivare anche una classe nell'elenco in maniera condizionale, puoi farlo con un'espressione ternaria:

```vue-html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

In questo modo si applicherà sempre `errorClass`, e `activeClass` verrà applicata solo quando `isActive` è truthy.

Se hai più classi condizionali, però, questo rischia di diventare un po' verboso. Ecco perché è possibile utilizzare anche la sintassi degli oggetti all'interno della sintassi dell'array:

```vue-html
<div :class="[{ active: isActive }, errorClass]"></div>
```

### Con i Componenti {#with-components}

> Questa sezione presuppone la conoscenza dei [Componenti](/guide/essentials/component-basics). Sentiti libero di saltarla e tornare in seguito.

Quando usi l'attributo `class` su un componente con un singolo elemento root (radice), queste classi verranno aggiunte all'elemento root del componente e unite a qualsiasi classe già presente.

Ad esempio, se abbiamo un componente chiamato `MyComponent` con il seguente template:

```vue-html
<!-- template del componente figlio -->
<p class="foo bar">Ciao!</p>
```

Poi aggiungi delle classi quando lo utilizzi:

```vue-html
<!-- quando si utilizza il componente -->
<MyComponent class="baz boo" />
```

L'HTML renderizzato sarà:

```vue-html
<p class="foo bar baz boo">Ciao!</p>
```

Lo stesso vale per il binding delle classi:

```vue-html
<MyComponent :class="{ active: isActive }" />
```

Quando `isActive` è truthy, l'HTML renderizzato sarà:

```vue-html
<p class="foo bar active">Ciao!</p>
```

Se il tuo componente ha più elementi root, dovresti definire quale elemento riceverà la classe. Puoi farlo utilizzando la proprietà del componente `$attrs`:

```vue-html
<!-- Template di MyComponent usando $attrs -->
<p :class="$attrs.class">Ciao!</p>
<span>Questo è un componente figlio</span>
```

```vue-html
<MyComponent class="baz" />
```

Verrà renderizzato:

```html
<p class="baz">Ciao!</p>
<span>Questo è un componente figlio</span>
```

Puoi saperne di più sull'ereditarietà degli attributi dei componenti nella sezione [Attributi Trasferibili](/guide/components/attrs) (Fallthrough Attributes).

## Binding degli Stili inline {#binding-inline-styles}

### Binding di Oggetti {#binding-to-objects-1}

`:style` supporta il binding con valori di oggetti JavaScript - esso corrisponde alla [proprietà `style` dell'elemento HTML](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style):

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

Sebbene siano consigliate le chiavi in camelCase, `:style` supporta anche le chiavi delle proprietà CSS in kebab-case (corrispondenti a come vengono utilizzate nell'effettivo CSS) - per esempio:

```vue-html
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

Spesso è una buona idea associare direttamente un oggetto per gli stili in modo che il template resti più pulito:

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

Di nuovo, l'associazione dello stile dell'oggetto spesso è utilizzata in combinazione con le computed properties che restituiscono oggetti.

### Binding di Array {#binding-to-arrays-1}

Possiamo associare `:style` a un array di più oggetti di stile. Questi oggetti verranno uniti e applicati all'elemento stesso:

```vue-html
<div :style="[baseStyles, overridingStyles]"></div>
```

### Auto-prefixing {#auto-prefixing}

Quando usi una proprietà CSS che richiede un [vendor prefix](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) in `:style`, Vue aggiungerà automaticamente il prefisso appropriato. Vue lo fa controllando a runtime quali proprietà di stile sono supportate nel browser corrente. Se il browser non supporta una determinata proprietà, verranno testate varie varianti con prefisso per cercare di trovarne una che sia supportata.

### Valori Multipli {#multiple-values}

Puoi fornire a una proprietà di stile un array di valori con vendor prefix multipli, ad esempio:

```vue-html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

Questo renderizzerà solo l'ultimo valore dell'array che il browser supporta. In questo esempio, renderizzerà `display: flex` per i browser che supportano la versione senza prefisso di flexbox.
