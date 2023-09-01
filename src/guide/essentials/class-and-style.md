# Klassen- und Stilbindungen {#class-and-style-bindings}

Ein häufiger Bedarf an Datenbindung ist die Bearbeitung der Klassenliste eines Elements und der Inline-Stile. Da `class` und `style` beides Attribute sind, können wir `v-bind` verwenden, um ihnen dynamisch einen String-Wert zuzuweisen, ähnlich wie bei anderen Attributen. Allerdings kann der Versuch, diese Werte mit Hilfe von String-Konkatenation zu erzeugen, lästig und fehleranfällig sein. Aus diesem Grund bietet Vue spezielle Erweiterungen, wenn `v-bind` mit `class` und `style` verwendet wird. Zusätzlich zu Strings können die Ausdrücke auch auf Objekte oder Arrays ausgewertet werden.

## Binden von HTML-Klassen {#binding-html-classes}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/dynamic-css-classes-with-vue-3" title="Free Vue.js Dynamic CSS Classes Lesson"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-dynamic-css-classes-with-vue" title="Free Vue.js Dynamic CSS Classes Lesson"/>
</div>

### Bindung an Objekte {#binding-to-objects}

Wir können ein Objekt an `:class` (kurz für `v-bind:class`) übergeben, um Klassen dynamisch umzuschalten:

```vue-html
<div :class="{ active: isActive }"></div>
```

Die obige Syntax bedeutet, dass das Vorhandensein der Klasse "active" durch die [Wahrhaftigkeit] (https://developer.mozilla.org/en-US/docs/Glossary/Truthy) der Dateneigenschaft "isActive" bestimmt wird.

Es können mehrere Klassen umgeschaltet werden, indem mehrere Felder im Objekt vorhanden sind. Darüber hinaus kann die `:class`-Direktive auch mit dem einfachen Attribut `class` koexistieren. Der folgende Zustand ist also gegeben:

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

Und die folgende Vorlage:

```vue-html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

Es wird wiedergegeben:

```vue-html
<div class="static active"></div>
```

Wenn sich `isActive` oder `hasError` ändert, wird die Klassenliste entsprechend aktualisiert. Wenn zum Beispiel `hasError` zu `true` wird, wird die Klassenliste zu `"static active text-danger"`.

Das gebundene Objekt muss nicht inline sein:

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

Dies wird das gleiche Ergebnis liefern. Wir können auch an eine [berechnete Eigenschaft](./computed) binden, die ein Objekt zurückgibt. Dies ist ein gängiges und leistungsfähiges Muster:

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

### Bindung an Arrays {#binding-to-arrays}

Wir können `:class` an ein Array binden, um eine Liste von Klassen anzuwenden:

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

Das wird wiedergegeben:

```vue-html
<div class="active text-danger"></div>
```

Wenn Sie eine Klasse in der Liste auch bedingt umschalten möchten, können Sie dies mit einem ternären Ausdruck tun:

```vue-html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

Dies wird immer `errorClass` anwenden, aber `activeClass` wird nur angewendet, wenn `isActive` wahr ist.

Dies kann jedoch etwas umständlich sein, wenn Sie mehrere bedingte Klassen haben. Deshalb ist es auch möglich, die Objektsyntax innerhalb der Array-Syntax zu verwenden:

```vue-html
<div :class="[{ active: isActive }, errorClass]"></div>
```

### Mit Komponenten {#with-components}

> Dieser Abschnitt setzt Kenntnisse voraus über [Komponenten](/guide/essentials/component-basics). Sie können es auch überspringen und später wiederkommen.

Wenn Sie das Attribut `class` für eine Komponente mit einem einzigen Wurzelelement verwenden, werden diese Klassen dem Wurzelelement der Komponente hinzugefügt und mit jeder bereits vorhandenen Klasse zusammengeführt.

Zum Beispiel, wenn wir eine Komponente mit dem Namen `MyComponent` mit der folgenden Vorlage haben:

```vue-html
<!-- child component template -->
<p class="foo bar">Hi!</p>
```

Fügen Sie dann einige Klassen hinzu, wenn Sie sie verwenden:

```vue-html
<!-- when using the component -->
<MyComponent class="baz boo" />
```

Das gerenderte HTML wird sein:

```vue-html
<p class="foo bar baz boo">Hi</p>
```

Das Gleiche gilt für Klassenbindungen:

```vue-html
<MyComponent :class="{ active: isActive }" />
```

Wenn "isActive" wahrheitsgemäß ist, wird der gerenderte HTML-Code so aussehen:

```vue-html
<p class="foo bar active">Hi</p>
```

Wenn Ihre Komponente mehrere Wurzelelemente hat, müssen Sie festlegen, welches Element diese Klasse erhalten soll. Sie können dies mit der Komponenteneigenschaft `$attrs` tun:

```vue-html
<!-- MyComponent template using $attrs -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>
```

```vue-html
<MyComponent class="baz" />
```

Wird gerendert:

```html
<p class="baz">Hallo!</p>
<span>Dies ist eine untergeordnete Komponente</span>
```

Weitere Informationen über die Vererbung von Komponentenattributen finden Sie unter  [Fallthrough-Attribute](/guide/components/attrs.html) Abschnitt.

## Binden von Inline-Styles {#binding-inline-styles}

### Bindung an Objekte

`:style` unterstützt die Bindung an JavaScript-Objektwerte - es entspricht einer [HTML-Element-Eigenschaft `style`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style):

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

Obwohl camelCase-Schlüssel empfohlen werden, unterstützt `:style` auch CSS-Eigenschaftsschlüssel in Großbuchstaben (wie sie in CSS verwendet werden) - zum Beispiel:

```vue-html
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

Oft ist es eine gute Idee, direkt an ein Stilobjekt zu binden, damit die Vorlage übersichtlicher ist:

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

Auch hier wird die Bindung im Objektstil häufig in Verbindung mit berechneten Eigenschaften verwendet, die Objekte zurückgeben.

### Bindung an Arrays

Wir können `:style` an ein Array von mehreren Style-Objekten binden. Diese Objekte werden zusammengeführt und auf dasselbe Element angewendet:

```vue-html
<div :style="[baseStyles, overridingStyles]"></div>
```

### Automatisches Voranstellen {#auto-prefixing}

Wenn Sie eine CSS-Eigenschaft verwenden, für die ein [vendor prefix](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) in `:style`, wird Vue automatisch das entsprechende Präfix hinzufügen. Vue macht dies, indem es zur Laufzeit überprüft, welche Style-Eigenschaften im aktuellen Browser unterstützt werden. Wenn der Browser eine bestimmte Eigenschaft nicht unterstützt, dann werden verschiedene präfixierte Varianten getestet, um eine zu finden, die unterstützt wird.

### Mehrere Werte {#multiple-values}

Sie können zum Beispiel einer Stileigenschaft ein Array mit mehreren (vorangestellten) Werten zuweisen:

```vue-html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

Dadurch wird nur der letzte Wert im Array wiedergegeben, den der Browser unterstützt. In diesem Beispiel wird `display: flex` für Browser dargestellt, die die unpräfixierte Version von flexbox unterstützen.
